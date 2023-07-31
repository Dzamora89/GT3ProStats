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
$(document).ready(getSelect());
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
function getSelect() {
  $("#showRace").hide();
  $("#updateSelect2").hide();
  const requestOptions1 = {
    method: "GET",
    redirect: "follow",
  };
  fetch(
    "../../backend/api/championship/getallchampionship.php",
    requestOptions1
  )
    .then((response) => response.json())
    .then((data) =>
      data.forEach((dato) => {
        let select = document.getElementById("updateSelect");
        let option = document.createElement("option");
        option.value = dato.championshipID;
        option.text = `${dato.championshipName} , ${dato.championshipSeason} `;
        select.add(option);
      })
    )
    .catch((error) => console.log("error", error));
}

$("#updateSelect").change(() => {
  $("#updateSelect2").show();
  $("#updateSelect2").empty();
  const requestOptions1 = {
    method: "GET",
    redirect: "follow",
  };

  let url = `../../backend/api/race/getraceofchampionshipid.php?raceChampionshipID=${
    document.getElementById("updateSelect").value
  }`;

  fetch(url, requestOptions1)
    .then((response) => response.json())
    .then((data) =>
      data.forEach((dato) => {
        let select = document.getElementById("updateSelect2");
        let option = document.createElement("option");
        option.value = dato.raceID;
        option.text = `${dato.raceTrack} , ${dato.raceCountry} `;
        select.add(option);
      })
    )
    .catch((error) => console.log("error", error));
});

$("#updateSelect2").change(() => {
  const requestOptions2 = {
    method: "GET",
    redirect: "follow",
  };

  let url = `../../backend/api/Race/getRaceByID.php?raceID=${$(
    "#updateSelect2"
  ).val()}`;
  $("#showRace").show();
  fetch(url, requestOptions2)
    .then((response) => response.json())
    .then((jsonResult) => {
      $("#showRace")
        .html(`<form class="d-flex flex-wrap justify-content-center w-100 gap-3">
             <div class="input-group mb-3 w-25">
          <span class="input-group-text">Event Name</span>
          <input
            id="raceEventName"
            type="text"
            class="form-control"
            value="${jsonResult.raceEventName}"
            placeholder="Event Name"
            aria-label="Event Name"
            aria-describedby="Event Name"
          />
        </div>

        <div class="input-group mb-3 w-25">
          <span class="input-group-text">Race Duration</span>
          <input
            id="raceDuration"
            type="text"
            class="form-control"
            value = "${jsonResult.raceDuration}"
            placeholder="Event Duration"
            aria-label="Event Duration"
            aria-describedby="Event Duration"
          />
        </div>
        <div class="input-group mb-3 w-25">
            <span class="input-group-text" >Track Name</span>
            <input value="${jsonResult.raceTrack}" id="track" type="text" class="form-control" placeholder="Circuit" aria-label="circuit" aria-describedby="circuit">
        </div>

        <div class="input-group mb-3 w-25">
            <span class="input-group-text" >Country</span>
            <input value="${jsonResult.raceCountry}" id="country" type="text" class="form-control" placeholder="Country" aria-label="Country" aria-describedby="Country">
        </div>

        <div class="input-group mb-3 w-25">
            <span class="input-group-text" >Race date</span>
            <input value="${jsonResult.raceDateOfRace}" id="dateOfRace" type="date" class="form-control"   aria-label="Race date" aria-describedby="Race-date">
        </div>
         <div class="input-group mb-3 w-25">
          <span class="input-group-text">Race Youtube Link</span>
          <input
            id="raceYoutubeLink"
            type="text"
            class="form-control"
            value="${jsonResult.raceYoutubeLink}"
            placeholder="Race Youtube Link"
            aria-label="Race Youtube Link"
            aria-describedby="Race Youtube Link"
          />
        </div>

        <div class="input-group mb-3 w-25">
          <span class="input-group-text">Race Result Link</span>
          <input
            id="raceResultLink"
            type="text"
            class="form-control"
            value="${jsonResult.raceResultLink}"
            placeholder="raceResultLink"
            aria-label="raceResultLink"
            aria-describedby="raceResultLink"
          />
        </div>
    </form>
    <button class="btn bg-success align-items w-50 m-auto mt-5" onclick="updateRace()">Update a Race</button>`);
    })
    .catch((error) => console.log("error", error));
});

function updateRace() {
  let raceID = $("#updateSelect2").val();
  let track = $("#track").val();
  let dateOfRace = $("#dateOfRace").val();
  let country = $("#country").val();
  let championshipID = $("#updateSelect").val();

  $.ajax({
    url: "../../backend/api/Race/UpdateRace.php",
    data: {
      raceID: raceID,
      track: track,
      country: country,
      dateOfRace: dateOfRace,
      championshipID: championshipID,
    },
    type: "get",
    dataType: "html",
    beforeSend: () => {},
  })
    .done((response) => {
      let alert = document.createElement("div");
      alert.innerHTML = `<div class="alert alert-success alert-dismissible fade show  m-auto mt-3" role="alert">
                Race Updated
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

      document.getElementById("principal").appendChild(alert);
    })
    .fail(function (code, status) {
      let alert = document.createElement("div");
      alert.innerHTML = `<div class="alert alert-danger alert-dismissible fade show  m-auto mt-3" role="alert">
                Race NOT UPDATED
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

      document.getElementById("principal").appendChild(alert);
    })
    .always(function (xhr, status) {});

  $("#showRace").hide();
  getSelect();

  /*

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");





    var raw = `{\r\n    \"raceID\" : \"${raceID}\",
    \r\n    \"raceTrack\" : \"${track}\",
    \r\n    \"raceDateOfRace\" : \"${dateOfRace}\",
    \r\n    \"raceCountry\" : \"${country}\",
    \r\n    \"raceChampionshipID\" : \"${championshipID}\"}`;

    var requestOptions3 = {
        method: 'get',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("../../backend/api/Race/UpdateRace.php", requestOptions3)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-success alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Race Updated
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        })
        .catch(error => {
            let alert = document.createElement("div")
            alert.innerHTML =
                `<div class="alert alert-danger alert-dismissible fade show w-50 m-auto mt-3" role="alert">
                Race NOT UPDATED
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById('principal').appendChild(alert)
        });

     */
}
