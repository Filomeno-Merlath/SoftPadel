var user2Id = sessionStorage.getItem("id");
var user1Id = sessionStorage.getItem("userId");
window.onload = async function () {
  try {
    let user = await $.ajax({
      url: "/api/users/" + user2Id,
      method: "get",
      dataType: "json",
    });

    document.getElementById("username").innerHTML = user.user_username;
    document.getElementById("Name").innerHTML =
      "Name:" + user.user_firstname + " " + user.user_lastname;
  } catch (error) {
    console.log(error);
  }
};

async function makeFriend() {
  try {
    let data;
    data = {
      user1Id,
      user2Id,
    };

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
