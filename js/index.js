//Cargar el NavBar
$.ajax({
    'url': './navbar.html',
    'type': 'get',
    'dataType': 'html',
    'crossDomain': true,
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
let fecha = new Date()
$('#date').text(`${fecha.getFullYear()}`)
$.ajax({
        'url': './backend/api/Race/getAllRace.php',
        'data': {
        },
        'type': 'get',
        'dataType': 'json',
        'beforeSend':  () => {
        }
    })
        .done( (response) => {
            let fechaLimite = new Date()
            fechaLimite.setDate((fecha.getDate() + (8 - fecha.getDay())))
            let contador = 0
            response.forEach( (e) => {
                let fechaRace = new Date(e.raceDateOfRace)
                if (fechaRace > fecha && fechaRace <fechaLimite){
                    contador++
                    $('#calendar').append(`
                        <div class="card" style="width: 18rem;">
                            <div class="card-body shadow d-flex flex-column align-items-center">
                                <h5 class="card-title">${e.championshipName}</h5>
                                <p class="card-text">${e.raceTrack}</p>
                                <p class="card-text">${e.raceCountry}</p>
                                <p class="card-text"> Date: ${e.raceDateOfRace}</p>
                                <a href="./championshipPage.html?id=${e.championshipID}" class="btn btn-primary">Check championship</a>
                            </div>
                        </div>
                    `)
                }
            })
            if (contador === 0){
                $('#calendar').append(
                    `
                        <h3> There are no races this weekend </h3>
                        `
                )
            }

        })
            .fail( function (code, status) {
        })
        .always( function (xhr, status) {
        });