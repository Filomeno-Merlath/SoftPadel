window.onload = async function () {
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
};

async function newPlayer() {
  try {
    let data;
    data = {
      firstName: document.getElementById("fname").value,
      lastName: document.getElementById("lname").value,
      username: document.getElementById("uname").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      bdate: document.getElementById("birthday").value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      address: document.getElementById("address").value,
      cityid: parseInt(document.getElementById("cities").value),
    };

    let result = await $.ajax({
      url: `/api/players`,
      method: "post",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json",
    });
    console.log(JSON.stringify(result));
    window.alert("Registration successful!");
  } catch (error) {
    console.log(error);
  }
}
