// Active les traces de dépréciation dans le terminal
process.traceDeprecation = true;

const webpack = require('webpack');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const LicensePlugin = require('webpack-license-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isWatch = process.argv.includes('--watch');

module.exports = {
  mode: isProduction ? 'production' : 'development',

  entry: {
    theme: ['./assets/scripts/base.js', './assets/styles/base.scss'],
  },

  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js',
  },

  resolve: {
    preferRelative: true,
  },

    stats: {
    all: false,
    errors: true,
    builtAt: true,
    assets: true,
    timings: true,
    colors: true,
    version: false,
    warnings: false, // on cache juste les warnings
    modules: false,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
            compact: false,
          },
        },
      },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },

      {
        test: /\.(png|woff2?|eot|otf|ttf|svg|jpe?g|gif)(\?[a-z0-9=\.]+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'dist/css/[hash][ext]',
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join('..', 'css', '[name].css'),
    }),

    // ESLintPlugin pour analyse JS
    new ESLintPlugin({
      extensions: ['js'],
      emitWarning: true,
      failOnError: false,
      eslintPath: require.resolve('eslint'),
      context: path.resolve(__dirname, 'assets/scripts'), // si tu veux cibler un dossier spécifique
    }),

    ...(isProduction ? [new CssoWebpackPlugin({ forceMediaMerge: true })] : []),

    new LicensePlugin({
      outputFilename: 'thirdPartyNotice.json',
      licenseOverrides: {
        'bootstrap-touchspin@3.1.1': 'Apache-2.0',
      },
      replenishDefaultLicenseTexts: true,
    }),
  ],

  optimization: isProduction
    ? {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            extractComments: false,
            terserOptions: {
              compress: {
                drop_console: true,
              },
            },
          }),
        ],
      }
    : {
        minimize: false,
      },

  infrastructureLogging: {
    level: 'error',
  },
};