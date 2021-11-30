var mymap;
var marker;

window.onload=async function(){
    getLocation()
    loadUser();
    getfields();
}
async function loadUser(){
    try {
        let html="";
        let id= sessionStorage.getItem("userId");
        let data = await $.ajax({
            url: `api/users/${id}`,
            method:"get",
            dataType:"json"
        });
        document.getElementById("user").innerHTML = `<h1>${data.user_username}</h1>`;
    } catch (error) {
        
    }
}
async function logout(){
    sessionStorage.removeItem("userId");
    window.location="userLogin.html";
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
    var mymap = L.map('mapid').setView([position.coords.latitude, position.coords.longitude], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZmlsb21lbm9tIiwiYSI6ImNrdjEyaGg1NDBjdXkydW92dHVib2RtbXUifQ.YgXHEY0WXf8ptKQJ1wkUyQ'
    }).addTo(mymap);
    
    try {
        let fields = await $.ajax({
            url:`/api/fields`,
            method:"get",
            datatype:"json"
        });
        for (let field of fields){
            marker = L.marker([field.field_location.x,field.field_location.y]).addTo(mymap);
        }
    } catch (error) {
        console.log(error);
    }
}
async function getfields(){
    try {
        let fields = await $.ajax({
            url:`api/fields`,
            method:"get",
            dataType:"json"
        });
        console.log(fields);
        createHtmlFields(fields);
    } catch (error) {
        console.log(error);
    }
}

function createHtmlFields(fields){
    let list='';
    res= document.getElementById("conteiner");
    res.innerHTML='';

    for(let field of fields){
        list+=`<section class="field">
        <section onclick="toField(${field.field_id})">
        <p>${field.field_name}</p>
        </section>
        </section>`
    }
    res.innerHTML=list;
}

