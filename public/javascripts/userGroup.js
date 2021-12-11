var userId = sessionStorage.getItem("userId");

window.onload = async function () {
  document.getElementsByTagName("button")[1].focus();
  document.getElementsByTagName("button")[1].click();
};

async function ShowGroupUsers() {
  try {
    let group = await $.ajax({
      url: `/api/users/${userId}/groups`,
      method: "get",
      dataType: "json",
    });
    getGroupUsers(group);
  } catch (error) {
    document.getElementById("group").innerHTML = `GROUP`;
    document.getElementById(
      "conteiner"
    ).innerHTML = `<p>You haven't have any group yet.</p><button onclick="groupCreateHtml()">Create</button>`;
  }
}
function groupCreateHtml() {
  document.getElementById(
    "conteiner"
  ).innerHTML = `<section id="createSection"><input type="text" id="groupName" placeholder="Group name:">
                 <button id="myCheck" onclick="createGroup()"><h4>Create</h4></button><section>`;
}
async function getGroupUsers(group) {
  document.getElementById("group").innerHTML = `${group.ugroup_name} GROUP`;
  try {
    let data = await $.ajax({
      url: `api/users/group/${group.group_fk_id}/users`,
      method: `get`,
      dataType: `json`,
    });
    createGroupHtml(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
function createGroupHtml(users) {
  console.log(users.user_id == userId);

  for (let user of users) {
    if (users.length < 0 || user.user_id == userId) {
      document.getElementById(
        "conteiner"
      ).innerHTML = `<p>Looks like you're alone in the group.</p> <button onclick="createAddPlayer()">Add players</button>`;
    }
  }
}
function createAddPlayer() {
  document.getElementById(
    "conteiner"
  ).innerHTML = `<select id=users></select><button onclick="AddPlayer()">Add players</button>`;
  loadusers();
}
async function loadusers() {
  try {
    let userFriends = await $.ajax({
      url: `/api/users/${userId}/friends`,
      method: "get",
      dataType: "json",
    });
    let html = ``;
    for (let userFriend of userFriends) {
      html += `<option value="${userFriend.user_id}">${userFriend.user_username}</option>`;
    }
    document.getElementById("users").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}
async function createGroup() {
  try {
    let data = {
      groupName: document.getElementById("groupName").value,
    };

    let result = await $.ajax({
      url: `/api/users/${userId}/createGroup`,
      method: "post",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json",
    });
    location.reload();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
