window.onload = async function () {
  document.getElementsByTagName("button")[1].focus();
  document.getElementsByTagName("button")[1].click();
  loadUser();
};
async function showResults(val) {
  if (val == "") {
    return;
  }
  try {
    data = await $.ajax({
      url: `api/users/suggest?q=` + val,
      method: "get",
      dataType: "json",
    });
    createUsersHTML(data);
  } catch (error) {
    console.warn("Something went wrong.", err);
    return false;
  }
}
async function createUsersHTML(data) {
  try {
    let userId = sessionStorage.getItem("userId");
    let userFriends = await $.ajax({
      url: `/api/users/${userId}/friends`,
      method: "get",
      dataType: "json",
    });
    let list = "";
    let re = "";
    let v = "";
    res = document.getElementById("result");
    res.innerHTML = "";
    console.log(data);
    for (i = 0; i < data.length; i++) {
      re = list;
      if (data[i].user_id == userId) {
        v = data[i].user_id;
        list += ``;
      } else {
        list += `
                <br><section id="users">  
                <p onclick="toUser(${data[i].user_id})">${data[i].user_username}</p>
                <button id="makef" value="${data[i].user_id}" onclick="makeFriend()">+</button> 
                </section>`;
      }
      for (userFriend of userFriends) {
        if (userFriend.user_id == data[i].user_id)
          list =
            re +
            `<br><section id="users" onclick="toUser(${data[i].user_id})">  
                <p>${data[i].user_username}</p>
                </section>`;
      }
    }
    if (data.length == 0 || v == userId) {
      res.innerHTML = `<p>No users found with this username.</p>`;
      console.log(1);
    } else {
      console.log(2);
      res.innerHTML = `<section id="friends">` + list + `</section>`;
    }
  } catch (error) {}

  return true;
}
async function toUser(id) {
  sessionStorage.setItem("id", id);
  window.location = "user.html";
}
async function logout() {
  sessionStorage.removeItem("userId");
  window.location = "userLogin.html";
  console.log(sessionStorage.getItem("userId"));
}
async function ShowSearch() {
  res = document.getElementById("conteiner");
  res.innerHTML =
    '<section id="search">' +
    '<input type="text" id="userPlayer" placeholder="Search by username:" onkeyup="showResults(this.value)">' +
    '<button id="myCheck" type="button" onclick="searchByUsername()"><h5>SEARCH</h5></button> ' +
    "</section>" +
    '<section id="result"></section>';
}
async function ShowFriends() {
  try {
    let userId = sessionStorage.getItem("userId");
    let userFriends = await $.ajax({
      url: `/api/users/${userId}/friends`,
      method: "get",
      dataType: "json",
    });
    let html = ``;

    for (let userFriend of userFriends) {
      html += `
            <br><section>
            <p>${userFriend.user_username}</p>
            <p>${userFriend.user_firstname} ${userFriend.user_lastname} </p>
            </section>`;
    }
    if (userFriends.length == 0)
      html +=
        "<p>You haven't added any friends yet. Click the Find Friends tab above to get started.</p>";
    document.getElementById("conteiner").innerHTML =
      `<h1>Friends(${userFriends.length})</h1>` +
      `<section id="friends" >` +
      html +
      `</section>`;
  } catch (error) {
    console.log(error);
  }
}
async function loadUser() {
  try {
    let id = sessionStorage.getItem("userId");
    let data = await $.ajax({
      url: `api/users/${id}`,
      method: "get",
      dataType: "json",
    });
    document.getElementById(
      "user"
    ).innerHTML = `<h1>${data.user_username}</h1>`;
  } catch (error) {}
}
async function makeFriend() {
  try {
    let data;
    let user1Id = sessionStorage.getItem("userId");
    let user2Id = document.getElementById("makef").value;
    data = {
      user1Id,
      user2Id,
    };
    console.log(data);
    let result = await $.ajax({
      url: `/api/usersFriends/follow`,
      method: "post",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/JSON",
    });
    console.log(JSON.stringify(result));
    window.alert("Follow sucess");
    window.location = "userFriends.html";
  } catch (error) {
    console.log(error);
  }
}

async function ShowGroupUsers() {
  CreateGroupHtml(Group);
}
