var mymap;
var user;
var dat = new Date();
var uId = sessionStorage.getItem("userId");
var rId = sessionStorage.getItem("rId");
window.onload = async function () {
  getLocation();
  loadUser();
  loadField();
};
async function showMap(position) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZmlsb21lbm9tIiwiYSI6ImNrdjEyaGg1NDBjdXkydW92dHVib2RtbXUifQ.YgXHEY0WXf8ptKQJ1wkUyQ";
  mymap = new mapboxgl.Map({
    container: "mapid",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [position.coords.longitude, position.coords.latitude],
    zoom: 13,
  });
  mymap.addControl(
    new mapboxgl.NavigationControl({
      accessToken: mapboxgl.accessToken
    })
  );
  mymap.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    })
  );  

  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${position.coords.longitude},${position.coords.latitude};-9.22159091551652,38.7178972842154?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
    {method: 'GET'}
  );
  const json = await query.json();
  const data = json.routes[0];
  console.log(json);
  const route = data.geometry.coordinates;
  
  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: route
    }
  };
  if (mymap.getSource('route')) {
    mymap.getSource('route').setData(geojson);
  }
  // otherwise, we'll make a new request
  else {
    mymap.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
  }

}
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
    navigator.geolocation.getCurrentPosition(showMap);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
async function loadField(){
  console.log(rId);
    try {
        let reserve = await $.ajax({
          url: `api/reserves/${rId}`,
          method: "get",
          dataType: "json"
        });
        let data = await $.ajax({
          url: `api/fields/${reserve.field_fk_id}`,
          method: "get",
          dataType: "json",
        });
        console.log(data);
        document.getElementById(
          "conteiner"
        ).innerHTML = `<h3>Name: ${data.field_name}</h3>
                       <h3>Field Address: ${data.field_address}</h3>`;
      } catch (error) {}
}

