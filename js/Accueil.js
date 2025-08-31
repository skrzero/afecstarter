document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("close-btn");
  const overlay = document.getElementById("overlay");

  function openMenu() {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  }

  function closeMenu() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }

  menuBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
});

const apiKey = "f87082ca227e4c50a5325643eb07cc4a"; // 🔑 à remplacer par ta clé OpenWeatherMap
const city = "Dax";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiKey}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // debug console

    const weatherDiv = document.getElementById("weather");
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherDiv.innerHTML = `
          <h4>${data.name}</h4>
          <img src="${icon}" alt="${desc}">
          <p><strong>${temp}°C</strong> - ${desc}</p>
        `;
  })
  .catch((err) => {
    document.getElementById("weather").innerHTML = "❌ Erreur météo";
    console.error(err);
  });
