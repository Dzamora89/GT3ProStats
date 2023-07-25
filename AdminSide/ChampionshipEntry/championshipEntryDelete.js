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
function championshipSelect() {
    let requestOptions = {
        method: 'GET', redirect: 'follow'
    };

    fetch("../../backend/api/championship/getallchampionship.php", requestOptions)
        .then(response => response.json())
        .then(data => data.sort((a,b) => {
            if (a.championshipSeason > b.championshipSeason) {
                return 1
            } else {
                return -1
            }
            return 0
        }))
        .then(data => data.forEach((dato) => {
            let select = document.getElementById('championshipEntryChampionshipID')
            let option = document.createElement("option")
            option.value = dato.championshipID
            option.text = `${dato.championshipName} ${dato.championshipSeason}`
            select.add(option);
        }))
        .catch(error => console.log('error', error));
}

$(document).ready(championshipSelect())

$(document).on('change', '#championshipEntryChampionshipID', loadEntries)
function loadEntries() {
    $.ajax({
        'url': '../../backend/api/championshipentry/getchampionshipentrybychampionshipID.php',
        'data': {
            'ChampionshipID' : $('#championshipEntryChampionshipID').val()
        },
        'type': 'get',
        'dataType': 'json',
        'beforeSend':  () => {
        }
    })
        .done( function (response) {
            $('#EntriesList').html('')
            if (response.message != 'No get found'){
                $('#EntriesList').html(`
                <table class="table table-striped mt-5 bg-light">
                    <thead>
                        <tr>
                            <th scope="col">Team Name</th>
                            <th scope="col">Car Number</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                        </tr>
                    </thead>
                    <tbody id="rows"></tbody>
                </table>
            `)
                response.forEach((e) => {
                    $('#rows').append(`
                        <tr>
                            <td>${e.teamName}</td>
                            <td>${e.carNumber}</td>
                            <td>${e.driverFirstName}</td>
                            <td>${e.driverLastName}</td>
                            <td><button  class="btn btn-danger" name="championshipEntryID" value="${e.championshipEntryID}"> Delete</button></td>
                        </tr>
                    `)
                })
            }

        })
        .fail( function (code, status) {
        })
        .always( function (xhr, status) {
        });
}

$(document).on('click','.btn-danger', (event) => {
    $.ajax({
            'url': '../../backend/api/championshipentry/deletechampionshipEntry.php',
            'data': {
                'championshipEntryID' : $(event.target).val()
            },
            'type': 'get',
            'dataType': 'html',
            'beforeSend':  () => {
            }
        })
            .done( (response) => {
                loadEntries()
            })
            .fail( function (code, status) {
            })
            .always( function (xhr, status) {
            });
})