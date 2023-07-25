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
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
fetch("../../BackEnd/API/Championship/GetAllChampionship.php", requestOptions)
    .then(response => response.json())
    .then(data => data.forEach(dato => {
        let table = document.getElementById('ChampionshipTable')
        let row = document.createElement('tr')
        let cell1 = document.createElement('td')
        let cell2 = document.createElement('td')
        let cell3 = document.createElement('td')
        let cell4 = document.createElement('td')


        cell1.innerHTML = dato.championshipID
        cell2.innerHTML = dato.championshipName
        cell3.innerHTML = dato.championshipSeason
        cell4.innerHTML = dato.championshipCountry





        row.appendChild(cell1)
        row.appendChild(cell2)
        row.appendChild(cell3)
        row.appendChild(cell4)

        table.appendChild(row)
    }))
    .catch(error => console.log('error', error));

