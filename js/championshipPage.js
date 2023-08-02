//Cargar el NavBar
$.ajax({
  url: "./navbar.html",
  type: "get",
  dataType: "html",
  beforeSend: () => {},
})
  .done((response) => {
    $("body").prepend(response);
  })
  .fail(function (code, status) {})
  .always(function (xhr, status) {});
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("id");
let fecha = new Date();
$("#date").text(`${fecha.getFullYear()}`);
//Ajax petition to get a championship by ID
$.ajax({
  url: "./BackEnd/API/Championship/GetChampionshipByID.php",
  data: {
    championshipID: myParam,
  },
  type: "get",
  dataType: "json",
  beforeSend: () => {},
})
  .done((response) => {
    console.log(response);
    $("#championshipName").text(`${response.championshipName}`);
    $("#championshipLogo").attr(
      "src",
      `./img/championship/${response.championshipID}.png`
    );
    $("#YoutubeLink").attr("href", `${response.championshipYoutube}`);
    $("#TwitterLink").attr("href", `${response.championshipTwitter}`);
    $("#FacebookLink").attr("href", `${response.championshipFacebook}`);
    $("#WebsiteLink").attr("href", `${response.championshipWebsite}`);
  })
  .fail(function (code, status) {})
  .always(function (xhr, status) {});

//Ajax petiton to get the races of a championship by ID
$.ajax({
  url: "./BackEnd/API/Race/GetRaceOfChampionshipID.php",
  data: {
    raceChampionshipID: myParam,
  },
  type: "get",
  dataType: "json",
  beforeSend: () => {},
})
  .done((response) => {
    console.log(response);
  })
  .fail(function (code, status) {})
  .always(function (xhr, status) {});
