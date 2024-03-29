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
    $('#showRace').hide()
    $('#deleteSelect2').hide()
    const requestOptions1 = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("../../backend/api/championship/getallchampionship.php", requestOptions1)
        .then(response => response.json())
        .then(data => data.forEach((dato) => {
            let select = document.getElementById('deleteSelect')
            let option = document.createElement("option")
            option.value = dato.championshipID
            option.text = `${dato.championshipName} , ${dato.championshipSeason} `
            select.add(option);
        }))
        .catch(error => console.log('error', error));

}

$('#deleteSelect').change(() => {
    $('#deleteSelect2').show()
    $('#deleteSelect2').empty()
    const requestOptions1 = {
        method: 'GET',
        redirect: 'follow'
    };

    let url = `../../backend/api/race/getraceofchampionshipid.php?raceChampionshipID=${document.getElementById("deleteSelect").value}`

    fetch(url, requestOptions1)
        .then(response => response.json())
        .then(data => data.forEach((dato) => {
            let select = document.getElementById('deleteSelect2')
            let option = document.createElement("option")

                option.value = dato.raceID
                option.text = `${dato.raceTrack} , ${dato.raceCountry} `
                select.add(option);

        }))
        .catch(error => console.log('error', error));

})

$('#deleteSelect2').change(() => {
    const requestOptions2 = {
        method: 'GET',
        redirect: 'follow'
    };

    let url = `../../backend/api/Race/getRaceByID.php?raceID=${$('#deleteSelect2').val()}`
    $('#showRace').show();
    fetch(url, requestOptions2)
        .then(response => response.json())
        .then(jsonResult => {
            $('#showRace').html(`<form class="d-flex flex-wrap justify-content-center w-100 gap-3">
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" >Track Name</span>
            <input disabled value="${jsonResult.raceTrack}" id="track" type="text" class="form-control" placeholder="Circuit" aria-label="circuit" aria-describedby="circuit">
        </div>

        <div class="input-group mb-3 w-25">
            <span class="input-group-text" >Country</span>
            <input disabled value="${jsonResult.raceCountry}" id="country" type="text" class="form-control" placeholder="Country" aria-label="Country" aria-describedby="Country">
        </div>

        <div class="input-group mb-3 w-25">
            <span class="input-group-text" >Race date</span>
            <input disabled value="${jsonResult.raceDateOfRace}" id="dateOfRace" type="date" class="form-control"   aria-label="Race date" aria-describedby="Race-date">
        </div>
    </form>
    <button class="btn bg-danger align-items w-50 m-auto mt-5" onclick="deleteRace()">Delete a Race</button>`)
        }).catch(error => console.log('error', error));

})

function deleteRace() {
/*    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");*/
    let raceID = $('#deleteSelect2').val()

$.ajax({
        'url': '../../backend/api/race/Deleterace.php',
        'data': {
            'raceID' : raceID
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
                Race Deleted
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
            document.getElementById('principal').appendChild(alert)
        })
        .fail( function (code, status) {
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-danger alert-dismissible fade show  m-auto mt-3" role="alert">
                Race NOT DELETED
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        })
        .always( function (xhr, status) {
        });

    $('#deleteSelect').empty()
    getSelect();

/*    var raw = `{\r\n    \"raceID\" : \"${raceID}\"
    \r\n}`;

    var requestOptions = {
        method: 'get',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("../../backend/api/race/Deleterace.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-success alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Race Deleted
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
                Race NOT DELETED
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        });*/

}