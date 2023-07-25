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
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
let fecha = new Date()
$('#date').text(`${fecha.getFullYear()}`)
//Este es el Ajax que crea la tabla del Campeonato.
$.ajax({
    'url': './backend/api/championshipEntry/getchampionshipentrybychampionshipID.php',
        'data': {
            'ChampionshipID' : myParam
        },
        'type': 'get',
        'dataType': 'json',
        'beforeSend':  () => {
        }
    })
        .done( (response) => {
            $('#championshipName').html(`${response[0].championshipName}`)
            response.sort( (a,b) => {
                a.championshipEntryTotalPoints  - b.championshipEntryTotalPoints
            })
            response.forEach( e => {
                $('#championshipTable tbody').append(
                    `
                     <tr>
                        <th scope="row">${response.indexOf(e) + 1}</th>
                        <td>${e.driverFirstName} ${e.driverLastName}</td>
                        <td>${e.carBrand}</td>
                        <td>${e.carNumber}</td>
                        <td>${e.teamName}</td>
                        <td>${e.championshipEntryTotalPoints}</td>
                     </tr>
                    `
                )
            })
        })
        .fail( function (code, status) {
        })
        .always( function (xhr, status) {
        });

//Ajax para llenar el Selector de Carreras
$.ajax({
    'url': './backend/api/race/getraceofchampionshipid.php',
        'data': {
            'raceChampionshipID' : myParam
        },
        'type': 'get',
        'dataType': 'json',
        'beforeSend':  () => {
        }
    })
        .done( (response) => {
            $('#raceSelect').append(' <option selected hidden="hidden">Select the Race results</option>')
            response.forEach( e => {
                $('#raceSelect').append(
                    `
                    <option value="${e.raceID}">${e.raceTrack} ${e.raceDateOfRace}</option>
                    `
                )
            })
        })
        .fail( function (code, status) {
        })
        .always( function (xhr, status) {
        });

$(document).on('change', '#raceSelect' , (e) => {
    $.ajax({
            'url': './backend/api/raceresult/getraceresultbyraceid.php',
            'data': {
                'raceID' : $('#raceSelect').val()
            },
            'type': 'get',
            'dataType': 'json',
            'beforeSend':  () => {
            }
        })
            .done( (response) => {
                $('#racesResult').html('')
                $('#racesResult').html(
                    `
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Driver</th>
                                <th scope="col">Car Manufacturer</th>
                                <th scope="col">Car Number</th>
                                <th scope="col">Laps</th>
                                <th scope="col">Gap</th>
                                <th scope="col">Points Gained</th>
                                <th scope="col">Driver Elo</th>
                                <th scope="col">Elo Change</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    `)
                response.forEach( e => {
                    $('#racesResult table tbody').append(
                        `
                        <tr>
                        <th scope="row">${e.raceResultPosition}</th>
                        <td>${e.driverFirstName} ${e.driverLastName}</td>
                        <td>${e.carManufacturer}</td>
                        <td>${e.carNumber}</td>
                        <td>${e.raceResultLaps} Laps</td>
                        <td>${e.raceResultGap} s</td>
                        <td>${e.raceResultPointsScored}</td>
                        <td>${e.driverELO}</td>
                        <td>${e.raceResultEloChanged}</td>
                        </tr>
                        `
                    )
                })
            })
            .fail( function (code, status) {
            })
            .always( function (xhr, status) {
            });
})

