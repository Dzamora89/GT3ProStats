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
$(document).ready(getSelect())
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
    $('#updateSelect').empty()
    $('#updateSelect').append('<option selected hidden>Select the Car you want to Update</option>')
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("../../backend/api/Car/getallCar.php", requestOptions)
        .then(response => response.json())
        .then(data => data.forEach( (dato) => {
            let select = document.getElementById('updateSelect')
            let option = document.createElement("option")
            option.value = dato.carID
            option.text = `#${dato.carNumber} --> ${dato.carManufacturer} --> ${dato.teamName} `
            select.add(option);
        }  ))
        .catch(error => console.log('error', error));
}
$('#updateSelect').change(() => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let url = `../../backend/api/Car/getCarByID.php?carID=${document.getElementById("updateSelect").value}`

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            let div = document.getElementById('showCar')
            div.innerHTML = `
            <form class="d-flex flex-wrap justify-content-center w-100 gap-3">
            <div class="input-group mb-3 ">
                <span class="input-group-text w-25">Manufacturer</span>
                <input id="carManufacturer" type="text" class="form-control" placeholder="Manufacturer" aria-label="Manufacturer" aria-describedby="Manufacturer" value="${result.carManufacturer}">
            </div>
            <div class="input-group mb-3 ">
                <span class="input-group-text" id="number">Number</span>
                <input id="carNumber" type="text" class="form-control"  aria-label="Number" aria-describedby="Number" value="${result.carNumber}">
        </div>
            <div class="input-group mb-3 ">
                <span class="input-group-text" id="Class">class</span>
                <input id="className" type="text" class="form-control"  aria-label="Class" aria-describedby="Class" value="${result.carClass}">
        </div>
        <select id="teamName" class="form-select w-50" aria-label="Team Select">
        </select>
        </form>
        <button class="btn bg-success align-items w-50 m-auto mt-5" onclick="updateCar()"> Update Car </button>
    </div>
        </form>
    
    `;
            let team = result.carTeamID

            fetch("../../backend/api/Team/getAllTeam.php", requestOptions)
                .then(response => response.json())
                .then(data => data.forEach( (dato) => {
                    if (dato.teamID === team){
                        $('#teamName').append(`<option value="${dato.teamID}" selected>${dato.teamName}</option>`)
                    }else {
                        $('#teamName').append(`<option value="${dato.teamID}">${dato.teamName}</option>`)
                    }

                }  ))
                .catch(error => console.log('error', error));
        })
        .catch(error => console.log('error', error));
})


function updateCar() {
    let carID = document.getElementById("updateSelect").value
    let carManufacturer = $('#carManufacturer').val()
    let carTeamID = $('#teamName').val()
    let carNumber = $('#carNumber').val()
    let carClass = $('#className').val()


    $.ajax({
            'url': '../../BackEnd/API/Car/UpdateCar.php',
            'data': {
                'carID' : carID,
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
                Car Updated
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

                document.getElementById('principal').appendChild(alert)
            })
            .fail( function (code, status) {
                let alert = document.createElement("div")
                alert.innerHTML =
                    `<div class="alert alert-danger alert-dismissible fade show  m-auto mt-3" role="alert">
                Car NOT UPDATED
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

                document.getElementById('principal').appendChild(alert)
            })
            .always( function (xhr, status) {
            });
    getSelect()

    /*
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");


    let carID = document.getElementById("updateSelect").value
    let carManufacturer = $('#carManufacturer').val()
    let carTeamID = $('#teamName').val()
    let carNumber = $('#carNumber').val()
    let carClass = $('#className').val()


    var raw = `{\r\n    \"carID\" : \"${carID}\", 
    \"carManufacturer\" : \"${carManufacturer}\",   
    \r\n    \"carTeamID\" : \"${carTeamID}\",
    \r\n    \"carNumber\" : \"${carNumber}\",
    \r\n    \"carClass\" : \"${carClass}\"}`;

    var requestOptions = {
        method: 'get',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("../../backend/api/car/UpdateCar.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-success alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Car Updated
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        })
        .catch(error => {
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-danger alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Car NOT UPDATED
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        });

     */
}