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
//Todo: Jquery Events
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
$(document).ready(getSelect());
function getSelect() {

    const requestOptions1 = {
        method: 'GET',
        redirect: 'follow'
    };


    fetch("../../backend/api/driver/getalldriver.php", requestOptions1)
        .then(response => response.json())
        .then(data => data.sort((a,b) => {
            if (a.driverLastName > b.driverLastName){
                return 1
            }else {
                return -1
            }
            return 0
        }))
        .then(data => data.forEach((dato) => {
            let select = document.getElementById('deleteSelect')
            let option = document.createElement("option")
            option.value = dato.driverID
            option.text = `${dato.driverLastName} , ${dato.driverFirstName} `
            select.add(option);
        }))
        .catch(error => console.log('error', error));

}

$('#deleteSelect').change(() => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let url = `../../backend/api/Driver/getDriverByID.php?driverID=${document.getElementById("deleteSelect").value}`

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
            let jsonResult = JSON.parse(result)
            let div = document.getElementById('showDriver')
            div.innerHTML = `
            <form class="d-flex flex-wrap justify-content-center w-100 gap-3">
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="firstName">First Name</span>
            <input readonly id="firstNameInput" type="text" class="form-control" placeholder="First Name" aria-label="FirstName" aria-describedby="First-Name" value="${jsonResult.driverFirstName}"> 
        </div>
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="lastName">Last Name</span>
            <input readonly id="lastNameInput" type="text" class="form-control" placeholder="Last Name" aria-label="LastName" aria-describedby="Last-Name" value="${jsonResult.driverLastName}">
        </div>
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="Country">Country</span>
            <input  readonly id="countryInput" type="text" class="form-control" placeholder="Country" aria-label="Country" aria-describedby="Country" value="${jsonResult.driverCountry}">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text" id="DriverWebsite">Driver Website</span>
            <input readonly id="urlInput" type="url" class="form-control" placeholder="Driver Website" aria-label="DriverWebsite" aria-describedby="Driver-Website" value="${jsonResult.driverWebsite}">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text" id="driverImgUrl">Driver Image URL</span>
            <input readonly id="driverImgUrl" type="url" class="form-control" placeholder="driverImgUrl" aria-label="DriverWebsite" aria-describedby="Driver-Website" value="${jsonResult.driverImgUrl}">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text" id="Twitter">Twitter @</span>
            <input readonly id="twitterInput" type="text" class="form-control" placeholder="Twitter Handle" aria-label="Twitter" aria-describedby="Twitter" value="${jsonResult.driverTwitter}">
        </div>
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="DriverStatus">Driver Status</span>
            <input  readonly id="driverStatusInput" type="text" class="form-control" placeholder="Active" aria-label="DriverStatus" value="Active" aria-describedby="Driver-Status" value="${jsonResult.driverStatus}">
        </div>
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="DriverELo">Initial Elo Rating</span>
            <input  readonly id="initialEloInput" type="number" class="form-control" placeholder="Elo Rating" value="1500" aria-label="LastName" aria-describedby="Elo-Rating" value="${jsonResult.driverElo}">
        </div>
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="DriverbirthDate">Driver birth date</span>
            <input readonly id="birthDayInput" type="date" class="form-control" placeholder="DriverAge"  aria-label="LastName" aria-describedby="Elo-Rating" value="${jsonResult.driverDateOfBirth}">
        </div>

    </form>
    <button class="btn bg-danger  text-white align-items w-50 m-auto mt-5" onclick="deleteDriver()">Delete Driver</button>
            `;


        })
        .catch(error => console.log('error', error));
})
function deleteDriver() {/*
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");*/

    //Todo Jquery
    let driverID = document.getElementById("deleteSelect").value
    $.ajax({
            'url': '../../backend/api/driver/DeleteDriver.php',
            'data': {
                'driverID' : driverID
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
                Driver Deleted
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
                document.getElementById('principal').appendChild(alert)
            })
            .fail( function (code, status) {
                let alert = document.createElement("div")
                alert.innerHTML =
                    `<div class="alert alert-danger alert-dismissible fade show  m-auto mt-3" role="alert">
                Driver NOT DELETED
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

                document.getElementById('principal').appendChild(alert)
            })
            .always( function (xhr, status) {
            });

/*

    var raw = `{\r\n    \"driverID\" : \"${driverID}\"
    \r\n}`;

    var requestOptions = {
        method: 'get',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("../../backend/api/driver/DeleteDriver.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-success alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Driver Deleted
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
                Driver NOT DELETED
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        });
*/

}