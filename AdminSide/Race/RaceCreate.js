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
$( document ).ready(getSelect() )
//Cargar el NavBar
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
function getSelect() {

    const requestOptions1 = {
        method: 'GET',
        redirect: 'follow'
    };


    fetch("../../backend/api/championship/getallchampionship.php", requestOptions1)
        .then(response => response.json())
        .then(data => data.forEach((dato) => {
            let select = document.getElementById('championshipSelect')
            let option = document.createElement("option")
            option.value = dato.championshipID
            option.text = `${dato.championshipName} , ${dato.championshipSeason} `
            select.add(option);
        }))
        .catch(error => console.log('error', error));

}


function createRace(){

    let track = $('#track').val()
    let dateOfRace = $('#dateOfRace').val()
    let country = $('#country').val()
    let championshipID = $('#championshipSelect').val()

    $.ajax({
            'url': '../../BackEnd/API/Race/CreateRace.php',
            'data': {
                'raceTrack' : track,
                'raceDateOfRace' : dateOfRace,
                'raceCountry' : country,
                'raceChampionshipID' : championshipID
            },
            'type': 'get',
            'dataType': 'html',
            'beforeSend':  () => {
            }
        })
            .done( (response) => {
                let alert = document.createElement("div")
                alert.innerHTML =
                    `<div class="alert alert-success alert-dismissible fade show  m-auto mt-3" role="alert">
                Race Created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

                document.getElementById('principal').appendChild(alert)
            })
            .fail( function (code, status) {
                console.log('error', status, code)
                let alert = document.createElement("div")
                alert.innerHTML =
                    `<div class="alert alert-danger alert-dismissible fade show  m-auto mt-3" role="alert">
                Race Not Created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

                document.getElementById('principal').appendChild(alert)
            })
            .always( function (xhr, status) {
            });


    /*




    var raw = `{\r\n    \"raceTrack\" : \"${track}\",
    \r\n    \"raceDateOfRace\" : \"${dateOfRace}\",
    \r\n    \"raceCountry\" : \"${country}\",
    \r\n    \"raceChampionshipID\" : \"${championshipID}\"}`;




    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    var requestOptions = {
        method: 'get',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };






    let result = fetch("../../backend/api/race/Createrace.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-success alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Race Created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        })
        .catch(error => {
            console.log('error', error)
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-danger alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Race Not Created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        });


     */
}