
//Cargar el NavBar
$.ajax({
    'url': '/navbar.html',
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
    'url': './backend/api/championship/getAllchampionship.php',
    'data': {
    },
    'type': 'get',
    'dataType': 'json',
    'beforeSend':  () => {
    }
})
    .done( (response) => {
        response.forEach( (e) => {
            $('#championships').append(
                `
                <div class="card" style="width: 18rem;">
                    <div class="card-header">
                        <h5 class="card-title">${e.championshipName} , ${e.championshipSeason} </h5>
                    </div>
                    <div class="card-body d-flex justify-content-between flex-column">
                        <p class="card-text">Country: ${e.championshipCountry} </p>
                        <p class="card-text">Youtube : <a href="${e.championshipYoutube}" class="link-primary">${e.championshipYoutube}</a></p>
                        <p class="card-text">Website : <a href="${e.championshipWebsite}" class="link-primary">${e.championshipWebsite}</a></p>
                        <p class="card-text">Twitter : <a href="${e.championshipTwitter}" class="link-primary">${e.championshipTwitter}</a></p>
                        <a href="./championshipPage.html?id=${e.championshipID}" class="btn btn-primary">Check championship</a>
                    </div>
                </div>
                `
            )
        })
    })
    .fail( function (code, status) {
    })
    .always( function (xhr, status) {
    });