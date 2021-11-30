var mymap;
var user;
var dat = new Date();
var uId = sessionStorage.getItem("userId");
window.onload = async function () {
  getLocation();
  loadUser();
  getFields();
  createHourhtml();
};
async function loadUser() {
  try {
    let data = await $.ajax({
      url: `api/users/${uId}`,
      method: "get",
      dataType: "json",
    });
    document.getElementById(
      "user"
    ).innerHTML = `<h1>${data.user_username}</h1>`;
  } catch (error) {}
}
async function logout() {
  sessionStorage.removeItem("userId");
  window.location = "userLogin.html";
  console.log(sessionStorage.getItem("userId"));
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
async function showPosition(position) {
  mymap = L.map("mapid").setView(
    [position.coords.latitude, position.coords.longitude],
    13
  );

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiZmlsb21lbm9tIiwiYSI6ImNrdjEyaGg1NDBjdXkydW92dHVib2RtbXUifQ.YgXHEY0WXf8ptKQJ1wkUyQ",
    }
  ).addTo(mymap);
  try {
    let fields = await $.ajax({
      url: `/api/fields`,
      method: "get",
      datatype: "json",
    });
    for (let field of fields) {
      marker = L.marker([field.field_location.x, field.field_location.y])
        .bindPopup(`${field.field_name}`)
        .addTo(mymap);
    }
  } catch (error) {
    console.log(error);
  }
}
async function logout(){
    sessionStorage.removeItem("userId");
    window.location="userLogin.html";
    console.log(sessionStorage.getItem("userId"));
async function getFields() {
  let dateYMD =
    dat.getFullYear() + "-" + (dat.getMonth() + 1) + "-" + dat.getDate();
  try {
    let fields = await $.ajax({
      url: `api/fields`,
      method: "get",
      dataType: "json",
    });
    let reserves = await $.ajax({
      url: `api/reserves/filter?date=` + dateYMD,
      method: `get`,
      dataType: `json`,
    });
    createHtmlFields(fields, reserves);
  } catch (error) {
    console.log(error);
  }
}
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
function createHtmlFields(fields, reserves) {
  let list = "";
  let re = "";
  let l = 0;
  res = document.getElementById("conteiner");
  res.innerHTML = "";
  for (let field of fields) {
    list += `<section class="field">
            <section onclick='center(${l})'>
            <p>${field.field_name}</p>
            </section ><section class="hours">`;
    let hour = field.field_close.slice(0, 2);
    if (hour == 00) hour = 24;

    for (i = field.field_open.slice(0, 2); i < hour; i++) {
      re = list;
      list += `<button onclick="createHtmlReserve(${i},${field.field_id})" class="hour"><p>${i}:00</p></button>`;

      for (reserve of reserves) {
        if (
          reserve.reserve_hour.slice(0, 2) == i &&
          reserve.field_fk_id == field.field_id
        ) {
          list = re + `<button class="hourr">${i}:00</button>`;
        }
      }
    }
    list += `</section></section><section id="field${field.field_id}"></section>`;
    l++;
  }
async function showPosition(position) {
    var mymap = L.map('mapid').setView([position.coords.latitude, position.coords.longitude], 13);
  res.innerHTML = list;
}
function createHourhtml() {
  let dMS = dat.getTime();

  for (i = 0; i < 7; i++) {
    let date = new Date(dMS + 86400000 * i);
    let objectElement = document.createElement("option");
    objectElement.value =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    objectElement.innerHTML = date.getDate() + "-" + (date.getMonth() + 1);
    document.getElementById("date").appendChild(objectElement);
  }
}
async function filterByDate() {
  let select = document.getElementById("date");
  let value = select.options[select.selectedIndex].value;
  try {
    let fields = await $.ajax({
      url: `api/fields`,
      method: "get",
      dataType: "json",
    });
    let reserves = await $.ajax({
      url: `api/reserves/filter?date=` + value,
      method: `get`,
      dataType: `json`,
    });
    createHtmlFields(fields, reserves);
  } catch (error) {
    console.log(error);
  }
}
async function center(pos) {
  let fields = await $.ajax({
    url: `/api/fields`,
    method: "get",
    datatype: "json",
  });
  let field = fields[pos];
  if (field.field_location) {
    mymap.setView([field.field_location.x, field.field_location.y]);
  }
}
function createHtmlReserve(rHour, fId) {
  let select = document.getElementById("date");
  let value = select.options[select.selectedIndex].value;

  document.getElementById(`field${fId}`).innerHTML = `<p>${
    value.slice(5, 10) + " ás " + rHour + ":00"
  }</p> <button id="reFielB" onclick="reField(${rHour},${fId})">RESERVE</button>`;
}
async function reField(rHour, fId) {
  let select = document.getElementById("date");
  let value = select.options[select.selectedIndex].value;
  let reserve = {
    date: value,
    estate: 0,
    userId: uId,
    fieldId: fId,
    hour: rHour + ":00:00",
  };
  try {
    reserve = await $.ajax({
      url: `api/reserves/new`,
      method: "post",
      data: JSON.stringify(reserve),
      dataType: "json",
      contentType: "application/json",
    });
    location.reload();
  } catch (error) {
    console.log(error);
  }
}
