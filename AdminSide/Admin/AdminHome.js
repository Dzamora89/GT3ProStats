//Cargar el NavBar
    $.ajax({
            'url': './navbar.html',
            'type': 'get',
            'dataType': 'html',
            'beforeSend':  () => {
            }
        })
            .done( (response) => {
                $('nav').prepend(response);
            })
            .fail( function (code, status) {
            })
            .always( function (xhr, status) {
            });


if (document.cookie.match(/username=([^;]+)/)) {
    $.ajax({
            'url': '../../backend/api/login/checkToken.php',
            'data': {
                'username' : getCookieValue('username'),
                'token' : getCookieValue('token')
            },
            'type': 'get',
            'dataType': 'html',
            'beforeSend':  () => {
            }
        })
            .done( (response) => {
                if (parseInt(response) !== 1){
                    window.location.href = "../login/login.html";
                }
            })
            .fail( function (code, status) {
            })
            .always( function (xhr, status) {
            });
} else {
    window.location.href = "../login/login.html";
}



// Obtiene el valor de la cookie
function getCookieValue(cookieName) {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        const [name, value] = cookies[i].split("=");

        if (name === cookieName) {
            return decodeURIComponent(value);
        }
    }

    return null;
}





let fecha = new Date()
$('#date').text(`${fecha.getFullYear()}`)
$.ajax({
    'url': '../../backend/api/Race/getAllRace.php',
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
                                <a href="../../ClienteSide/championshipPage.html?id=${e.championshipID}" class="btn btn-primary">Check championship</a>
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