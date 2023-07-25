//Cargar el NavBar
$.ajax({
    'url': './navbar.html',
    'type': 'get',
    'dataType': 'html',
    'beforeSend':  () => {
    }
})
    .done( (response) => {
        $('body').prepend(response);
    })
    .fail( function (code, status) {
    })
    .always( function (xhr, status) {
    });
let date = new Date()
$('#date').text(`${date.getFullYear()}`)
$.ajax({
        'url': './backend/api/driver/getalldriver.php',
        'data': {
        },
        'type': 'get',
        'dataType': 'json',
        'beforeSend':  () => {
        }
    })
        .done( (response) => {

            $('#driver1st').html(`<a class="nav-link text-primary fs-1" href="./driverprofile.html?id=${response[0].driverID}"> ${response[0].driverFirstName} ${response[0].driverLastName} </a>`)
            $('#driver1stCar').html(`${response[0].carManufacturer} `)
            $('#driver1stELO').html(`${response[0].driverELO}`)
            $('#driver2nd').html(`<a class="nav-link text-primary fs-2" href="./driverprofile.html?id=${response[1].driverID}"> ${response[1].driverFirstName} ${response[1].driverLastName} </a>`)
            $('#driver2ndCar').html(`${response[1].carManufacturer} `)
            $('#driver2ndELO').html(`${response[1].driverELO}`)
            $('#driver3rd').html(`<a class="nav-link text-primary fs-2" href="./driverprofile.html?id=${response[2].driverID}"> ${response[2].driverFirstName} ${response[2].driverLastName} </a>`)
            $('#driver3rdCar').html(`${response[2].carManufacturer} `)
            $('#driver3rdELO').html(`${response[2].driverELO}`)
            response.forEach(e => {
                if (response.indexOf(e) > 2){
                    $('#tableRanking').append(
                        `
                        <tr>
                            <th scope="row">${response.indexOf(e) +1}</th>
                             <td><a class="nav-link text-primary fs-3" href="./driverprofile.html?id=${e.driverID}"> ${e.driverFirstName} ${e.driverLastName} </a></td>
                             <td>${e.carManufacturer}</td>
                            <td>${e.driverELO}</td>

                        </tr>
                        `
                    )
                }
            })
        })
        .fail( function (code, status) {
        })
        .always( function (xhr, status) {
        });