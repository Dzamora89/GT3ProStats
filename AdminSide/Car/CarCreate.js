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
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
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

fetch("../../backend/api/Team/getAllTeam.php", requestOptions)
    .then(response => response.json())
    .then(data => data.sort((a ,b ) => {
        if (a.teamName > b.teamName){
            return 1
        }else {
            return -1
        }
        return 0
    }))
    .then(data => data.forEach( (dato) => {
        $('#teamName').append(`<option value="${dato.teamID}">${dato.teamName}</option>`)
    }  ))
    .catch(error => console.log('error', error));

function createCar(){

    let carManufacturer = $('#carManufacturer').val()
    let carTeamID = $('#teamName').val()
    let carNumber = $('#carNumber').val()
    let carClass = $('#className').val()
$.ajax({
        'url': '../../BackEnd/API/Car/CreateCar.php',
        'data': {
            'carManufacturer' : carManufacturer,
            'carTeamID' : carTeamID,
            'carNumber' : carNumber,
            'carClass' : carClass

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
                Car Created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        })
        .fail( function (code, status) {
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-danger alert-dismissible fade show  m-auto mt-3" role="alert">
                Car Not Created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        })
        .always( function (xhr, status) {
        });

/*
    var raw = `{\r\n    \"carManufacturer\" : \"${carManufacturer}\",
    \r\n    \"carTeamID\" : \"${carTeamID}\",
    \r\n    \"carNumber\" : \"${carNumber}\",
    \r\n    \"carClass\" : \"${carClass}\"}`;




    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    var requestOptions = {
        method: 'get',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };






    let result = fetch("../../backend/api/Car/CreateCar.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            //Todo controlar errorres de PDO
            console.log(result)
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-success alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Car Created
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
                Car Not Created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        });

 */
}