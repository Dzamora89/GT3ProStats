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
//Carga el Navbar
cargarNavBar();
//Evento para cargar el Selecto con los campeonatos en ese momento.
getSelect();
//Evento para cargar el Select con las Carreras del Campeonato Anterior
const k = 5;
const drivers = [];
$(document).on("change", "#championshipSelect", (event) => {
  if ($("#raceSelect").attr("id") !== "raceSelect") {
    $("#principal").append(`
         <select id="raceSelect" class="form-select mt-2" aria-label="Default select example">
            <option selected hidden="hidden">Select the Race</option>
        </select>
        `);

    $.ajax({
      url: "../../backend/api/race/getraceofchampionshipid.php",
      data: {
        raceChampionshipID: $("#championshipSelect").val(),
      },
      type: "get",
      dataType: "json",
      beforeSend: () => {},
    })
      .done((response) => {
        response.forEach((e) => {
          $("#raceSelect").append(`
                        <option value="${e.raceID}"> ${e.raceTrack} - ${e.raceDateOfRace}</option>
                    `);
        });
      })
      .fail(function (code, status) {})
      .always(function (xhr, status) {});
  } else {
    $.ajax({
      url: "../../backend/api/race/getraceofchampionshipid.php",
      data: {
        raceChampionshipID: $("#championshipSelect").val(),
      },
      type: "get",
      dataType: "json",
      beforeSend: () => {},
    })
      .done((response) => {
        $("#raceSelect").html(
          '<option selected hidden="hidden">Select the Race</option>'
        );
        response.forEach((e) => {
          $("#raceSelect").append(`
                        <option value="${e.raceID}"> ${e.raceTrack} - ${e.raceDateOfRace}</option>
                    `);
        });
      })
      .fail(function (code, status) {})
      .always(function (xhr, status) {});
  }
});
//Aqui rellenamos los select de la tabla para introducir los datos de los pilotos.
$(document).on("change", "#raceSelect", (event) => {
  $("#principal").append(`
        <table class="table text-center"  id="resultTable">
            <thead>
                <tr>
                    <th>Pos</th>
                    <th class="w-25">Driver</th>
                    <th >Car Number</th>
                    <th>Car Brand</th>
                    <th>Laps</th>
                    <th>Gap</th>
                    <th>Points Scored</th>
                    <th>DriverELo</th>
                    <th>Elo Update </th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
            <button class="btn btn-success m-3" name="guardar" value="guardar" id="guardar">Guardar</button>
        </table>
    `);
  $.ajax({
    url: "../../backend/api/championshipentry/getchampionshipentrybychampionshipID.php",
    data: {
      ChampionshipID: $("#championshipSelect").val(),
    },
    type: "get",
    dataType: "json",
    beforeSend: () => {},
  })
    .done((response) => {
      response.forEach((e) => {
        drivers.push(e);
        $("#resultTable tbody").append(
          `
                        <tr>
                            <td>
                               <input class="form-control posiciones" type="text"  placeholder="Pos"></td>
                            <td>
                                <select id="driverID" name="driverID[]" class="form-select pilotos" aria-label="Default select example">
                                    <option selected hidden="hidden">Select the Driver</option>
                                </select>
                            </td>
                            <td><input class="form-control carNumber" type="text" name="carNumber[]" placeholder="#Num"><input class="form-control carID" type="text" name="carNumber[]" placeholder="#Num" hidden="hidden"></td>
                            <td><input class="form-control carBrand" type="text" name="carBrand[]" placeholder="Brand"></td>
                            <td><input class="form-control laps" type="text" name="laps[]" placeholder="Laps"></td>
                            <td><input class="form-control gaps" type="text" name="gaps[]" placeholder="Gaps"></td>
                            <td><input class="form-control points" type="text" name="points[]" placeholder="Puntos"></td>
                            <td><input class="form-control driverElo" type="text"  placeholder="Elo" value="0"></td>
                            <td><input class="form-control eloUpdated" type="text"  placeholder="Gains"></td>
                        </tr>
                        `
        );
      });
      for (let i = 0; i < response.length; i++) {
        $(`.pilotos`).append(
          `
                            <option value="${response[i].championshipEntryDriverID}"> ${response[i].driverLastName} , ${response[i].driverFirstName} </option>
                        `
        );
      }
    })
    .fail(function (code, status) {})
    .always(function (xhr, status) {});
});

//Aqui vamos a hacerlo para que al seleccionar un piloto se rellene el numero del coche y la marca de forma automatica.
$(document).on("change", ".pilotos", (event) => {
  let selectedDriver = drivers.find(
    (element) =>
      parseInt(element.championshipEntryDriverID) ===
      parseInt(event.target.value)
  );
  //Vuelves 1 atras para ir al TR y vas 1 TD adelante y ya el hijo es el input del numero
  $(event.target)
    .parent()
    .next()
    .children()
    .eq(0)
    .val(selectedDriver.carNumber);
  $(event.target).parent().next().children().eq(1).val(selectedDriver.carID);
  //Vuelves 1 atras y 2 td adelante y el hijo es el input de la marca
  $(event.target)
    .parent()
    .next()
    .next()
    .children()
    .val(selectedDriver.carBrand);
  $(event.target)
    .parent()
    .next()
    .next()
    .next()
    .next()
    .next()
    .next()
    .children()
    .val(selectedDriver.driverELO);
});

$(document).on("click", "#guardar", (event) => {
  let eloChanges = [];
  for (let i = 0; i < $(".driverElo").length; i++) {
    let driverA = parseInt($(".driverElo").eq(i).val());
    eloChanges.push(0);
    for (let j = 0; j < $(".driverElo").length; j++) {
      let driverB = parseInt($(".driverElo").eq(j).val());
      if (
        i > j &&
        $(".carNumber").eq(i).val() !== $(".carNumber").eq(j).val() &&
        driverA !== 0 &&
        driverB !== 0
      ) {
        eloChanges[i] += eloCalculation(driverA, driverB, 0);
      } else if (
        j > i &&
        $(".carNumber").eq(i).val() !== $(".carNumber").eq(j).val() &&
        driverA !== 0 &&
        driverB !== 0
      ) {
        eloChanges[i] += eloCalculation(driverA, driverB, 1);
      }
    }
  }
  eloChanges.forEach((value, index, array) => {
    $(".eloUpdated").eq(index).val(`${value}`);
  });
  for (let i = 0; i < drivers.length; i++) {
    let eloTotal = parseInt($(".driverElo").eq(i).val()) + eloChanges[i];
    $.ajax({
      url: "../../backEnd/API/RaceResult/CreateRaceResult.php",
      data: {
        raceResultCarID: $(".carID").eq(i).val(),
        raceResultRaceID: $("#raceSelect").val(),
        raceResultDriverID: $(".pilotos").eq(i).val(),
        raceResultGap: $(".gaps").eq(i).val(),
        raceResultLaps: $(".laps").eq(i).val(),
        driverELO: eloTotal,
        raceResultPointsScored: $(".points").eq(i).val(),
        raceResultEloChanged: $(".eloUpdated").eq(i).val(),
        raceResultPosition: $(".posiciones").eq(i).val(),
        championshipID: $("#championshipSelect").val(),
      },
      type: "get",
      dataType: "html",
      beforeSend: () => {},
    })
      .done((response) => {})
      .fail(function (code, status) {})
      .always(function (xhr, status) {});
  }
});

function getSelect() {
  $("#principal").html(`
        <select id="championshipSelect" class="form-select" aria-label="Default select example">
            <option selected hidden="hidden">Select the Championship</option>
        </select>
    `);

  $.ajax({
    url: "../../backend/api/championship/getAllchampionship.php",
    type: "get",
    dataType: "json",
    beforeSend: () => {},
  })
    .done((response) => {
      response.forEach((e) => {
        $("#championshipSelect").append(`
                        <option value="${e.championshipID}"> ${e.championshipName} - ${e.championshipSeason}</option>
                    `);
      });
    })
    .fail(function (code, status) {})
    .always(function (xhr, status) {});
}

function cargarNavBar() {
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
}
function eloCalculation(driverA, driverB, score) {
  let k = 12;
  let expectedScore = 1 / (1 + 10 ** ((driverB - driverA) / 400));
  return Math.round(k * (score - expectedScore));
}
