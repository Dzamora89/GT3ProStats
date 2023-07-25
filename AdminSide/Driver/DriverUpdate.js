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

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };


    fetch("../../backend/api/driver/getalldriver.php", requestOptions)
        .then(response => response.json())
        .then(data => data.sort((a,b) => {
            if (a.driverLastName > b.driverLastName){
                return 1
            }else {
                return -1
            }
            return 0}))
        .then(data => data.forEach( (dato) => {
            let select = document.getElementById('updateSelect')
            let option = document.createElement("option")
            option.value = dato.driverID
            option.text = `${dato.driverLastName} , ${dato.driverFirstName} `
            select.add(option);
        }  ))
        .catch(error => console.log('error', error));


}





$('#updateSelect').change((() => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let url = `../../backend/api/Driver/getDriverByID.php?driverID=${$("#updateSelect").val()}`

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(jsonResult => {
            $('#showDriver').html(`
            <form class="d-flex flex-wrap justify-content-center w-100 gap-3">
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="firstName">First Name</span>
            <input id="firstNameInput" type="text" class="form-control" placeholder="First Name" aria-label="FirstName" aria-describedby="First-Name" value="${jsonResult.driverFirstName}"> 
        </div>
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="lastName">Last Name</span>
            <input  id="lastNameInput" type="text" class="form-control" placeholder="Last Name" aria-label="LastName" aria-describedby="Last-Name" value="${jsonResult.driverLastName}">
        </div>
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="Country">Country</span>
            <input id="countryInput" type="text" class="form-control" placeholder="Country" aria-label="Country" aria-describedby="Country" value="${jsonResult.driverCountry}">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text" id="DriverWebsite">Driver Website</span>
            <input  id="urlInput" type="url" class="form-control" placeholder="Driver Website" aria-label="DriverWebsite" aria-describedby="Driver-Website" value="${jsonResult.driverWebsite}">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text" id="driverImgUrlLabel">Driver Image URL</span>
            <input id="driverImgUrl" type="url" class="form-control" placeholder="driverImgUrl" aria-label="DriverWebsite" aria-describedby="Driver-Website" value="${jsonResult.driverImgUrl}">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text" id="Twitter">Twitter </span>
            <input id="twitterInput" type="text" class="form-control" placeholder="Twitter Handle" aria-label="Twitter" aria-describedby="Twitter" value="${jsonResult.driverTwitter}">
        </div>
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="DriverStatus">Driver Status</span>
            <input id="driverStatusInput" type="text" class="form-control" placeholder="Active" aria-label="DriverStatus"  aria-describedby="Driver-Status" value="${jsonResult.driverStatus}">
        </div>
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="DriverELo">Initial Elo Rating</span>
            <input id="initialEloInput" type="number" class="form-control" placeholder="Elo Rating"  aria-label="LastName" aria-describedby="Elo-Rating" value="${jsonResult.driverElo}">
        </div>
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="DriverbirthDate">Driver birth date</span>
            <input id="birthDayInput" type="date" class="form-control" placeholder="DriverAge"  aria-label="LastName" aria-describedby="Elo-Rating" value="${jsonResult.driverDateOfBirth}">
        </div>

    </form>
    <button class="btn bg-black  text-white align-items w-50 m-auto mt-5" onclick="updateDriver()">Update Driver</button>
            `);


        })
        .catch(error => console.log('error', error));
    getSelect()
}))





function updateDriver() {
    let driverID = $('#updateSelect').val()
    let firstName = $('#firstNameInput').val()
    let lastName = $('#lastNameInput').val()
    let country = $('#countryInput').val()
    let url = $('#urlInput').val()
    let twitter = $('#twitterInput').val()
    let status = $('#driverStatusInput').val()
    let initialElo = $('#initialEloInput').val()
    let birthday = $('#birthDayInput').val()
    let driverImgUrl = $('#driverImgUrl').val()


    $.ajax({
        'url': '../../backend/api/driver/UpdateDriver.php',
        'data': {
            'driverID' : driverID,
            'driverFirstName' :firstName,
            'driverLastName' : lastName,
            'driverCountry' : country,
            'driverDateOfBirth' : birthday,
            'driverWebsite' : url,
            'driverTwitter' : twitter,
            'driverStatus' : status,
            'driverELO' : initialElo,
            'driverImgUrl' : driverImgUrl
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
                Driver Updated
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)        })
        .fail( function (code, status) {
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-danger alert-dismissible fade show  m-auto mt-3" role="alert">
                Driver NOT UPDATED
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        })
        .always( function (xhr, status) {
        });
    /*
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var raw = `{\r\n    \"driverID\" : \"${driverID}\",
    \r\n    \"driverFirstName\" : \"${firstName}\",
    \r\n    \"driverLastName\" : \"${lastName}\",
    \r\n    \"driverCountry\" : \"${country}\",
    \r\n    \"driverDateOfBirth\" : \"${birthday}\",
    \r\n    \"driverWebsite\" : \"${url}\",
    \r\n    \"driverTwitter\" : \"${twitter}\",
    \r\n    \"driverLicenseLevel\" : \"\",
    \r\n    \"driverStatus\" : \"${status}\",
    \r\n    \"driverELO\" : \"${initialElo}\"\r\n}`;

    var requestOptions = {
        method: 'get',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("../../backend/api/driver/UpdateDriver.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-success alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Driver Updated
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        })
        .catch(error => {
            console.log(error)

            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-danger alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Driver NOT UPDATED
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        });

     */

}