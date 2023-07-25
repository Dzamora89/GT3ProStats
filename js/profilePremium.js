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
let date = new Date()
$('#date').text(`${date.getFullYear()}`)

$.ajax({
    'url': './backend/api/driver/getdriverbyID.php',
    'data': {
        'driverID' : myParam
    },
    'type': 'get',
    'dataType': 'json',
    'beforeSend':  () => {
    }
})
    .done( (response) => {
        $('#profile').html(
            `
            <div class="container-fluid">
                <h3>Name: ${response.driverFirstName} ${response.driverLastName}</h3>
                <h3>Manufacturer: ${response.carManufacturer}</h3>
                <h3>Country: ${response.driverCountry}</h3>
                <h3>BirthDate: ${response.dateOfBirth} </h3>
                <h3>DriverELO: ${response.driverElo}</h3>
                <h3 class="d-flex gap-3">Socials:<a class="nav-link text-primary fs-1" href="${response.driverTwitter}"> <i class="bi bi-twitter"></i></a> <a class="nav-link text-primary fs-1" href="${response.driverWebsite}"> <i class="bi bi-globe"></i></a></h3>
            </div>                
`
        )
        if (response.driverImgUrl !== null){
            $('#driverImgUrl').attr( 'src',`${response.driverImgUrl}`)

        }
    })
    .fail( function (code, status) {
    })
    .always( function (xhr, status) {
    });


$.ajax({
    'url': './backend/api/raceResult/getRaceResultbydriverID.php',
    'data': {
        'driverID' : myParam
    },
    'type': 'get',
    'dataType': 'json',
    'beforeSend':  () => {
    }
})
    .done( (response) => {
        response.forEach( e => {
            if (response.indexOf(e) < 9){
                $('#races').append(
                    `    
                                <h2><a href="./championshipPage.html?id=${e.championshipID}">${e.championshipName}</a></h2>
                                <h3>${e.raceDateOfRace} - ${e.raceTrack} - ${e.raceResultPosition}º </h3>
                        `
                )
            }

        })
    })
    .fail( function (code, status) {
    })
    .always( function (xhr, status) {
    });
$.ajax({
    'url': './backend/api/championshipEntry/getChampionshipEntrybyDriverID.php',
    'data': {
        'driverID' : myParam
    },
    'type': 'get',
    'dataType': 'json',
    'beforeSend':  () => {
    }
})
    .done( (response) => {
        response.forEach( e => {
            if (response.indexOf(e) < 9){
                $('#championshipEntries').append(
                    `    
                                <h2><a href="./championshipPage.html?id=${e.championshipID}">${e.championshipName}</a></h2>
                                <h3>${e.teamName} - #${e.carNumber} - Points:${e.championshipEntryTotalPoints} </h3>
                        `
                )
            }

        })
    })
    .fail( function (code, status) {
    })
    .always( function (xhr, status) {
    });
