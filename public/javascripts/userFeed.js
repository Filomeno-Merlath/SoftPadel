window.onload = async function () {
  loadUser();
  loadCalendar();
};
/*
async function searchByUsername() {
    try {
        let username = document.getElementById("userPlayer").value;
        let user = await $.ajax({
            url: `/api/users/search/?name=${username}`,
            method: 'get',
            dataType: 'json'
        });
        createUsersHTML(user);
    } catch (error) {
        console.log(error);
    }  
}*/
async function loadCalendar() {
  document.addEventListener("DOMContentLoaded", function () {
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
    });
    calendar.render();
  });
}
async function logout() {
  sessionStorage.removeItem("userId");
  window.location = "userLogin.html";
  console.log(sessionStorage.getItem("userId"));
}

async function loadUser() {
  try {
    let html = "";
    let id = sessionStorage.getItem("userId");
    let data = await $.ajax({
      url: `api/users/${id}`,
      method: "get",
      dataType: "json",
    });
    document.getElementById(
      "user"
    ).innerHTML = `<h1>${data.user_username}-</h1>`;
  } catch (error) {}
}
