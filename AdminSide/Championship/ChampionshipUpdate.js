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
//Todo: Jquery Events
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
var requestOptions = {
  method: "GET",
  redirect: "follow",
};
//Todo: Cambiar los Select al evento de Jquery para Change on Select

fetch("../../backend/api/championship/getallchampionship.php", requestOptions)
  .then((response) => response.json())
  .then((data) =>
    data.forEach((dato) => {
      let select = document.getElementById("updateSelect");
      let option = document.createElement("option");
      option.value = dato.championshipID;
      option.text = `${dato.championshipName} ${dato.championshipSeason}`;
      select.add(option);
    })
  )
  .catch((error) => console.log("error", error));

$("#updateSelect").change(function () {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let url = `../../backend/api/championship/getchampionshipByID.php?championshipID=${$(
    "#updateSelect"
  ).val()}`;

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      $("#showChampionship").html(` 
    <form class="d-flex flex-wrap justify-content-center w-100 gap-3">

        <div class="input-group mb-3 w-50">
            <span class="input-group-text">Championship Name</span>
            <input id="championshipName" type="text" class="form-control" value="${result.championshipName}"
                   aria-label="name" aria-describedby="name">
        </div>

        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="Class">Country</span>
            <input id="championshipCountry" type="text" class="form-control" value="${result.championshipCountry}" aria-label="country"
                   aria-describedby="country">
        </div>
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" id="number">Season</span>
            <input id="championshipSeason" type="number" class="form-control" value="${result.championshipSeason}" aria-label="season"
                   aria-describedby="season">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text">Championship Website</span>
            <input id="championshipWebsite" type="text" class="form-control" value="${result.championshipWebsite}"
                   aria-label="website" aria-describedby="website">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text">Facebook</span>
            <input id="championshipFacebook" type="text" class="form-control" value="${result.championshipFacebook}"
                   aria-label="facebook" aria-describedby="facebook">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text">Twitter</span>
            <input id="championshipTwitter" type="text" class="form-control" value="${result.championshipTwitter}/"
                   aria-label="twitter" aria-describedby="twitter">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text">Youtube Channel</span>
            <input id="championshipYoutube" type="text" class="form-control" value="${result.championshipYoutube}/"
                   aria-label="YouTube" aria-describedby="YouTube">
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text">Standings Link</span>
            <input id="championshipStandings" type="text" class="form-control" value="${result.championshipStandings}/"
                   aria-label="Standings" aria-describedby="Standings">
        </div>

    </form>
    <button class="btn bg-success align-items w-50 m-auto mt-5" onclick="updateChampionship(${result.championshipID})">Update championship
    </button>`);
    })
    .catch((error) => console.log("error", error));
});

function updateChampionship() {
  $.ajax({
    url: "../../backend/api/championship/updatechampionship.php",
    data: {
      championshipID: $("#updateSelect").val(),
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
                Championship Updated
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

      document.getElementById("principal").appendChild(alert);
    })
    .fail(function (code, status) {
      console.log("error", status);
      let alert = document.createElement("div");
      alert.innerHTML = `<div class="alert alert-danger alert-dismissible fade show  m-auto mt-3" role="alert">
                Championship Not Updated
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

      document.getElementById("principal").appendChild(alert);
    })
    .always(function (xhr, status) {});
}
