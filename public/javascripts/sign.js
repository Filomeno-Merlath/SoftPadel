window.onload = async function () {
  loadCities();
};
async function loadCities() {
  try {
    let cities = await $.ajax({
      url: `/api/cities`,
      method: "get",
      datatype: "json",
    });
    //let html="";
    for (let cit of cities) {
      let objectElement = document.createElement("option");
      objectElement.value = cit.city_id;
      objectElement.innerHTML = cit.city_name;
      document.getElementById("cities").appendChild(objectElement);

      /*html += `<option value =${cit.city_id}>${cit.city_name}</option>`;}
          console.log(html);
        document.getElementById("cities").innerHTML = html;*/
    }
  } catch (error) {
    console.log(error);
  }
}
async function newUser() {
  let address = document.querySelector("#address").value;
  console.log(address);
  let sel = document.querySelector("#cities");
  let city = sel.options[sel.selectedIndex].text;
  var url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    " " +
    city +
    ".json?limit=1&access_token=pk.eyJ1IjoiZmlsb21lbm9tIiwiYSI6ImNrdjEyaGg1NDBjdXkydW92dHVib2RtbXUifQ.YgXHEY0WXf8ptKQJ1wkUyQ";
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then(async (element) => {
      console.log(element);
      try {
        let data;
        data = {
          firstName: document.getElementById("fname").value,
          lastName: document.getElementById("lname").value,
          username: document.getElementById("uname").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password2").value,
          bdate: document.getElementById("birthday").value,
          gender: document.querySelector('input[name="gender"]:checked').value,
          address: document.getElementById("address").value,
          cityid: parseInt(document.getElementById("cities").value),
          location: `${element.features[0].geometry.coordinates[1]},${element.features[0].geometry.coordinates[0]}`,
        };

        let result = await $.ajax({
          url: `/api/users/sign`,
          method: "post",
          data: JSON.stringify(data),
          dataType: "json",
          contentType: "application/json",
        });
        console.log(JSON.stringify(result));
        window.alert("Registration successful!");
        window.location = "userLogin.html";
      } catch (error) {
        console.log(error);
        return;
      }
    })
    .catch((err) => console.log(err));
}
async function newField() {
  let address = document.querySelector("#address").value;
  let sel = document.querySelector("#cities");
  let city = sel.options[sel.selectedIndex].text;
  var url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    " " +
    city +
    ".json?limit=1&access_token=pk.eyJ1IjoiZmlsb21lbm9tIiwiYSI6ImNrdjEyaGg1NDBjdXkydW92dHVib2RtbXUifQ.YgXHEY0WXf8ptKQJ1wkUyQ";
  console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then(async (element) => {
      console.log(element);
      try {
        let data;
        data = {
          name: document.getElementById("fname").value,
          address: document.getElementById("address").value,
          number: document.getElementById("number").value,
          openedTime: document.getElementById("opened").value,
          closedTime: document.getElementById("closed").value,
          price: document.getElementById("price").value,
          cityid: parseInt(document.getElementById("cities").value),
          location: `${element.features[0].geometry.coordinates[1]},${element.features[0].geometry.coordinates[0]}`,
        };
        console.log(data);
        let result = await $.ajax({
          url: `/api/fields`,
          method: "post",
          data: JSON.stringify(data),
          dataType: "json",
          contentType: "application/json",
        });
        window.alert("Registration successful!");
        window.location = "index.html";
      } catch (error) {
        console.log(error);
        return;
      }
    })
    .catch((err) => console.log(err));
}
