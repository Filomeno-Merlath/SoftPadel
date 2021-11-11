var mymap;
var marker;

window.onload=async function(){


mymap = L.map('mapid').setView([38.75298, -9.16120], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZmlsb21lbm9tIiwiYSI6ImNrdjEyaGg1NDBjdXkydW92dHVib2RtbXUifQ.YgXHEY0WXf8ptKQJ1wkUyQ'
}).addTo(mymap);
marker = L.marker([38.7363, -9.13754]).addTo(mymap);
marker.bindPopup("AEIST<br>Campos de Padel").openPopup();
marker = L.marker([38.7312, -9.14447]).addTo(mymap);
marker.bindPopup("Rackets Pro - Saldanha").openPopup();
marker = L.marker([38.72587, -9.16423]).addTo(mymap);
marker.bindPopup("CIT Padel Amoreiras").openPopup();
marker = L.marker([38.7574, -9.15351]).addTo(mymap);
marker.bindPopup("Padel Campo Grande").openPopup();
}

