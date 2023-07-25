//Cargar el NavBar
$.ajax({
    'url': './navbar.html',
    'type': 'get',
    'dataType': 'html',
    'beforeSend':  () => {
    }
})
    .done( (response) => {
        $('body').prepend(response);
    })
    .fail( function (code, status) {
    })
    .always( function (xhr, status) {
    });
let events = []
$.ajax({
    'url': './backend/api/race/getAllRace.php',
    'data': {
    },
    'type': 'get',
    'dataType': 'json',
    'beforeSend':  () => {
    }
})
    .done( (response) => {
        response.forEach( e => {
            events.push({
                id: e.raceID,
                title: `${e.championshipName} ${e.raceTrack}`,
                start : e.raceDateOfRace
            })

        })
    })
    .fail( function (code, status) {
    })
    .always( function (xhr, status) {
        let calendarEl = document.getElementById('calendar');
        let calendar = new FullCalendar.Calendar(calendarEl, {
            schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
            weekends : true,
            hiddenDays: [ 1 , 2 , 3, 4 ],
            initialView: 'dayGridMonth',
            firstDay : 5,
            events
        });
        calendar.render();
    });

