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
            if (parseInt(response) === 1){
                window.location.href = "../Admin/adminHome.html";
            }
        })
        .fail( function (code, status) {
        })
        .always( function (xhr, status) {
        });
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


$.ajax({
    'url': '../admin/navbar.html',
    'type': 'get',
    'dataType': 'html',
    'beforeSend':  () => {
    }
})
    .done( (response) => {
        $('nav').prepend(response);
    })
    .fail( function (code, status) {
    })
    .always( function (xhr, status) {
    });

$(document).on('click','#login-btn', event => {
    $.ajax({
        'url': '../../Backend/API/Login/Login.php',
        'data': {
            'username' : $('#username').val(),
            'password' : $('#password').val()
        },
        'type': 'get',
        'dataType': 'html',
        'beforeSend':  () => {
        }
    })
        .done( (response) => {
            if (parseInt(response) !== 0) {
                const expires = new Date((new Date()).getTime() + 24 * 60 * 60 * 1000).toGMTString();
                document.cookie = `token=${parseInt(response)}; expires=${expires}; path=/`;
                document.cookie = `username=${$('#username').val()}; expires=${expires}; path=/`;
                // Redirecciona a la página "adminhome"
                window.location.href = "../admin/adminHome.html";
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de inicio de sesión',
                    text: 'Usuario y/o contraseña incorrectos',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar'
                })
            }
        })
        .fail( function (code, status) {
        })
        .always( function (xhr, status) {
        });
})