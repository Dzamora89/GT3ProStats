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


    fetch("../../backend/api/team/getallteam.php", requestOptions1)
        .then(response => response.json())
        .then(data => data.forEach((dato) => {
            let select = document.getElementById('updateSelect')
            let option = document.createElement("option")
            option.value = dato.teamID
            option.text = `${dato.teamName} , ${dato.teamCarBrand} `
            select.add(option);
        }))
        .catch(error => console.log('error', error));

}


$('#updateSelect').change((() => {
    const requestOptions2 = {
        method: 'GET',
        redirect: 'follow'
    };

    let url = `../../backend/api/team/getteamByID.php?teamID=${document.getElementById("updateSelect").value}`

    fetch(url, requestOptions2)
        .then(response => response.json())
        .then(jsonResult => {
            $('#showTeam').html(`<div class="container d-flex flex-column">
 
    <form class="d-flex flex-wrap justify-content-center w-100 gap-3">
        <div class="input-group mb-3">
            <span class="input-group-text" >Team Name</span>
            <input id="teamName" type="text" class="form-control" placeholder="Team Name" aria-label="TeamName" 
            aria-describedby="Team-Name" value="${jsonResult.teamName}">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" >Team owner</span>
            <input id="teamOwner" type="text" class="form-control" placeholder="Team owner" aria-label="TeamOwner" 
            aria-describedby="Team-Owner" value="${jsonResult.teamOwner}" >
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" >Team coutnry</span>
            <input id="teamCountry" type="text" class="form-control" placeholder="Team Country" aria-label="TeamCountry" 
            aria-describedby="Team-Country" value="${jsonResult.teamCountry}">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" >Team Website</span>
            <input  id="teamWebsite" type="url" class="form-control" placeholder="Team Website" aria-label="TeamWebsite" 
            aria-describedby="Team-Website" value="${jsonResult.teamWebsite}">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" >Team Twitter</span>
            <input id="teamTwitter" type="text" class="form-control" placeholder="Team Twitter" aria-label="TeamTwitter" 
            aria-describedby="Team-Twitter" value="${jsonResult.teamTwitter}">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" >Team car brand</span>
            <input id="teamCarBrand" type="text" class="form-control" placeholder="teamCarBrand" aria-label="teamCarBrand" 
            aria-describedby="team-car-brand" value="${jsonResult.teamCarBrand}">
        </div>



    </form>
    <button class="btn bg-success align-items w-50 m-auto mt-5" onclick="updateTeam()">Update Team</button>
</div> `);


        })
        .catch(error => console.log('error', error));
}))


function updateTeam() {



    let teamID = document.getElementById("updateSelect").value
    let teamName = $('#teamName').val()
    let teamOwner = $('#teamOwner').val()
    let teamCountry = $('#teamCountry').val()
    let teamTwitter = $('#teamTwitter').val()
    let teamWebsite = $('#teamWebsite').val()
    let teamCarBrand = $('#teamCarBrand').val()
    $.ajax({
            'url': '../../backend/api/Team/UpdateTeam.php',
            'data': {
                'teamID' : teamID,
                'teamName' : teamName,
                'teamOwner' : teamOwner,
                'teamCountry' : teamCountry,
                'teamTwitter' : teamTwitter,
                'teamWebsite' : teamWebsite,
                'teamCarBrand' : teamCarBrand
            },
            'type': 'post',
            'dataType': 'html',
            'beforeSend':  () => {
            }
        })
            .done( (response) => {
                let alert = document.createElement("div")
                alert.innerHTML =
                    `<div class="alert alert-success alert-dismissible fade show  m-auto mt-3" role="alert">
                    Team Updated
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `;

                document.getElementById('principal').appendChild(alert)
            })
            .fail( function (code, status) {
                let alert = document.createElement("div")
                alert.innerHTML =
                    `<div class="alert alert-danger alert-dismissible fade show  m-auto mt-3" role="alert">
                    Team NOT UPDATED
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


        var raw = `{\r\n    \"teamID\" : \"${teamID}\",
        \"teamName\" : \"${teamName}\",
        \r\n    \"teamOwner\" : \"${teamOwner}\",
        \r\n    \"teamCountry\" : \"${teamCountry}\",
        \r\n    \"teamTwitter\" : \"${teamTwitter}\",
        \r\n    \"teamWebsite\" : \"${teamWebsite}\",
        \r\n    \"teamCarBrand\" : \"${teamCarBrand}\"}`;

        var requestOptions3 = {
            method: 'get',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("../../backend/api/Team/UpdateTeam.php", requestOptions3)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                let alert = document.createElement("div")
                alert.innerHTML =
                    `<div class="alert alert-success alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                    Team Updated
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `;

                document.getElementById('principal').appendChild(alert)
            })
            .catch(error => {
                let alert = document.createElement("div")
                alert.innerHTML =
                    `<div class="alert alert-danger alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                    Team NOT UPDATED
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `;

                document.getElementById('principal').appendChild(alert)
            });

     */
}

