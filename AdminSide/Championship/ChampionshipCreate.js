if (document.cookie.match(/username=([^;]+)/)) {
  $.ajax({
    url: "../../backend/api/login/checkToken.php",
    data: {
      username: getCookieValue("username"),
      token: getCookieValue("token"),
    },
    type: "get",
    dataType: "html",
    beforeSend: () => {},
  })
    .done((response) => {
      if (parseInt(response) !== 1) {
        window.location.href = "../login/login.html";
      }
    })
    .fail(function (code, status) {})
    .always(function (xhr, status) {});
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
  url: "../Admin/Navbar.html",
  type: "get",
  dataType: "html",
  beforeSend: () => {},
})
  .done((response) => {
    $(".navbar").html(response);
  })
  .fail(function (code, status) {})
  .always(function (xhr, status) {});
function createChampionship() {
  $.ajax({
    url: "../../backend/api/championship/Createchampionship.php",
    data: {
      championshipName: $("#championshipName").val(),
      championshipCountry: $("#championshipCountry").val(),
      championshipSeason: $("#championshipSeason").val(),
      championshipWebsite: $("#championshipWebsite").val(),
      championshipFacebook: $("#championshipFacebook").val(),
      championshipTwitter: $("#championshipTwitter").val(),
      championshipYoutube: $("#championshipYoutube").val(),
      championshipStandings: $("#championshipStandings").val(),
    },
    type: "get",
    dataType: "html",
    beforeSend: () => {},
  })
    .done((response) => {
      let alert = document.createElement("div");
      alert.innerHTML = `<div class="alert alert-success alert-dismissible fade show  m-auto mt-3" role="alert">
                Championship Created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

      document.getElementById("principal").appendChild(alert);
    })
    .fail(function (code, status) {
      console.log("error", status);
      let alert = document.createElement("div");
      alert.innerHTML = `<div class="alert alert-danger alert-dismissible fade show  m-auto mt-3" role="alert">
                Championship Not Created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

      document.getElementById("principal").appendChild(alert);
    })
    .always(function (xhr, status) {});
}
