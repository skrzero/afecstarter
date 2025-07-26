document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridWeek', // vue hebdo
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      {
        title: 'Réunion',
        start: '2025-07-28T10:00:00',
        end: '2025-07-28T11:00:00'
      }
    ]
  });

  calendar.render();
});
