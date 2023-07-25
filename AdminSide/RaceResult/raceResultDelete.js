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
//Carga el Navbar
cargarNavBar()
getSelect()
//Evento para cargar el Select con las Carreras del Campeonato Anterior
const k = 5
const drivers = []

$(document).on('change','#championshipSelect', (event) => {

    if ($('#raceSelect').attr('id') !== 'raceSelect'){
        $('#principal').append(`
         <select id="raceSelect" class="form-select mt-2" aria-label="Default select example">
            <option selected hidden="hidden">Select the Race</option>
        </select>
        `)

        $.ajax({
            'url': '../../backend/api/race/getraceofchampionshipid.php',
            'data': {
                'raceChampionshipID' : $('#championshipSelect').val()
            },
            'type': 'get',
            'dataType': 'json',
            'beforeSend':  () => {
            }
        })
            .done( (response) => {
                response.forEach((e) => {
                    $('#raceSelect').append(`
                        <option value="${e.raceID}"> ${e.raceTrack} - ${e.raceDateOfRace}</option>
                    `)
                })
            })
            .fail( function (code, status) {
            })
            .always( function (xhr, status) {
            });
    }else {
        $.ajax({
            'url': '../../backend/api/race/getraceofchampionshipid.php',
            'data': {
                'raceChampionshipID' : $('#championshipSelect').val()
            },
            'type': 'get',
            'dataType': 'json',
            'beforeSend':  () => {
            }
        })
            .done( (response) => {
                $('#raceSelect').html('<option selected hidden="hidden">Select the Race</option>')
                response.forEach((e) => {
                    $('#raceSelect').append(`
                        <option value="${e.raceID}"> ${e.raceTrack} - ${e.raceDateOfRace}</option>
                    `)
                })
            })
            .fail( function (code, status) {
            })
            .always( function (xhr, status) {
            });

    }

})


//Aqui rellenamos los select de la tabla para introducir los datos de los pilotos.
$(document).on('change','#raceSelect', (event) => {
    $('#principal').append(`
        <table class="table text-center"  id="resultTable">
            <thead>
                <tr>
                    <th>Pos</th>
                    <th class="w-25">Driver</th>
                    <th >Car Number</th>
                    <th>Car Brand</th>
                    <th>Laps</th>
                    <th>Gap</th>
                    <th>Points Scored</th>
                    <th>DriverELo</th>
                    <th><button id="eloUpdate" class="btn btn-dark"> Elo Update </button></th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
            <button class="btn btn-danger mt-1" name="Borrar" value="Borrar" id="Borrar">Borrar</button>
        </table>
    `)

    $.ajax({
        'url': '../../backend/api/raceresult/getraceresultbyraceid.php',
        'data': {
            'raceID' : $('#raceSelect').val()
        },
        'type': 'get',
        'dataType': 'json',
        'beforeSend':  () => {
        }
    })
        .done( (response) => {
            response.forEach((e) => {
                drivers.push(e)
                $('#resultTable tbody').append(
                    `
                        <tr>
                            <td>
                               <input class="form-control posiciones" type="text"  placeholder="Pos" value="${e.raceResultPosition}"><input class="form-control raceResultID" value="${e.raceResultID}" type="text" hidden="hidden"></td>
                            <td>
                                <select id="driverID" name="driverID[]" class="form-select pilotos" aria-label="Default select example">
                                    <option selected value="${e.driverID}">${e.driverFirstName} ${e.driverLastName}</option>
                                </select>
                            </td>
                            <td><input class="form-control carNumber" type="text" name="carNumber[]" placeholder="#Num" value="${e.carNumber}"><input class="form-control carID" value="${e.carID}" type="text" name="carNumber[]" placeholder="#Num" hidden="hidden"></td>
                            <td><input class="form-control carBrand" type="text" name="carBrand[]" placeholder="Brand" value="${e.carManufacturer}"></td>
                            <td><input class="form-control laps" type="text" name="laps[]" placeholder="Laps" value="${e.raceResultLaps}"></td>
                            <td><input class="form-control gaps" type="text" name="gaps[]" placeholder="Gaps" value="${e.raceResultGap}"></td>
                            <td><input class="form-control points" type="text" name="points[]" placeholder="Puntos" value="${e.raceResultPointsScored}"></td>
                            <td><input class="form-control driverELO" type="text"  placeholder="Elo" value="${e.driverELO - e.raceResultEloChanged}"></td>
                            <td><input class="form-control eloUpdated" type="text"  placeholder="Gains" value="${e.raceResultEloChanged}"></td>
                        </tr>
                        `
                )
            })
            for (let i = 0; i < response.length; i++) {
                $(`.pilotos`).append(
                    `
                            <option value="${response[i].driverID}"> ${response[i].driverFirstName} ${response[i].driverLastName}</option>
                        `
                )
            }
        })
        .fail( function (code, status) {
            console.log(code)

        })
        .always( function (xhr, status) {
        });
})






//Aqui vamos a hacerlo para que al seleccionar un piloto se rellene el numero del coche y la marca de forma automatica.
$(document).on('change', '.pilotos', (event) => {
    let selectedDriver = drivers.find((element) => element.driverID === $(event.target).val())
    //Vuelves 1 atras para ir al TR y vas 1 TD adelante y ya el hijo es el input del numero
    $(event.target).parent().next().children().eq(0).val(selectedDriver.carNumber)
    $(event.target).parent().next().children().eq(1).val(selectedDriver.carID)
    //Vuelves 1 atras y 2 td adelante y el hijo es el input de la marca
    $(event.target).parent().next().next().children().val(selectedDriver.carManufacturer)
    $(event.target).parent().next().next().next().next().next().next().children().val(selectedDriver.driverELO)
})

$(document).on('click', '#Borrar', (event) => {

    for (let i = 0; i < drivers.length; i++) {
        let eloTotal =  parseInt($('.driverELO').eq(i).val()) - parseInt($('.eloUpdated').eq(i).val())
        $.ajax({
            'url': '../../backend/api/raceresult/deleteraceresult.php',
            'data': {
                'raceresultPointsScored' : $('.points').eq(i).val() ,
                'driverELO' : eloTotal,
                'raceresultID' : $('.raceResultID').eq(i).val(),
                'championshipID' : $('#championshipSelect').val(),
                'raceResultDriverID' : $('.pilotos').eq(i).val(),
            },
            'type': 'get',
            'dataType': 'html',
            'beforeSend':  () => {
            }
        })
            .done( (response) => {
            })
            .fail( function (code, status) {
            })
            .always( function (xhr, status) {
            });
    }
})


















function cargarNavBar(){
    $.ajax({
        'url': '../Admin/Navbar.html',
        'type': 'get',
        'dataType': 'html',
        'beforeSend':  () => {
        }
    })
        .done( (response) => {
            $('.navbar').html(response);
        })
        .fail( function (code, status) {
        })
        .always( function (xhr, status) {
        });
}
function getSelect() {
    $('#principal').html(`
        <select id="championshipSelect" class="form-select" aria-label="Default select example">
            <option selected hidden="hidden">Select the Championship</option>
        </select>
    `)

    $.ajax({
        'url': '../../backend/api/championship/getAllchampionship.php',
        'type': 'get',
        'dataType': 'json',
        'beforeSend':  () => {
        }
    })
        .done( (response) => {
            response.forEach((e) => {
                $('#championshipSelect').append(`
                        <option value="${e.championshipID}"> ${e.championshipName} - ${e.championshipSeason}</option>
                    `)
            })
        })
        .fail( function (code, status) {
        })
        .always( function (xhr, status) {
        });
}
function eloCalculation(driverA, driverB, score) {
    let k = 12
    let expectedScore  = 1 / (1 + (10 ** ((driverB - driverA)/400)))
    return Math.round(( k * ( score - expectedScore)))
}