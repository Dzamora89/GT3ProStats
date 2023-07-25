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
function createChampionship(){

    let championshipName = $('#championshipName').val()
    let championshipCountry = $('#championshipCountry').val()
    let championshipSeason = $('#championshipSeason').val()
    let championshipWebsite = $('#championshipWebsite').val()
    let championshipFacebook = $('#championshipFacebook').val()
    let championshipTwitter = $('#championshipTwitter').val()
    let championshipYouTube = $('#championshipYouTube').val()

    $.ajax({
            'url': '../../backend/api/championship/Createchampionship.php',
            'data': {
                'championshipName' : championshipName,
                'championshipCountry' : championshipCountry,
                'championshipSeason' : championshipSeason,
                'championshipWebsite' : championshipWebsite,
                'championshipFacebook' : championshipFacebook,
                'championshipTwitter' : championshipTwitter,
                'championshipYoutube' : championshipYouTube
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
                Championship Created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

                document.getElementById('principal').appendChild(alert)
            })
            .fail( function (code, status) {
                console.log('error', status)
                let alert = document.createElement("div")
                alert.innerHTML =
                    `<div class="alert alert-danger alert-dismissible fade show  m-auto mt-3" role="alert">
                Championship Not Created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

                document.getElementById('principal').appendChild(alert)
            })
            .always( function (xhr, status) {
            });

    /*

    var raw = `{\r\n    \"championshipName\" : \"${championshipName}\",
    \r\n    \"championshipCountry\" : \"${championshipCountry}\",
    \r\n    \"championshipSeason\" : \"${championshipSeason}\",
    \r\n    \"championshipWebsite\" : \"${championshipWebsite}\",
    \r\n    \"championshipFacebook\" : \"${championshipFacebook}\",
    \r\n    \"championshipTwitter\" : \"${championshipTwitter}\",
    \r\n    \"championshipYouTube\" : \"${championshipYouTube}\"}`;




    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    var requestOptions = {
        method: 'get',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };






    let result = fetch("../../backend/api/championship/Createchampionship.php", requestOptions)
        .then(response => response.text())
        .then(result => {
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-success alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Championship Created
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
                Championship Not Created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        });


     */
}