async function login() {
  try {
    let object = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    let user = await $.ajax({
      url: `/api/users/login`,
      method: "post",
      dataType: "json",
      data: JSON.stringify(object),
      contentType: "application/json",
    });
    console.log(user);
    sessionStorage.setItem("userId", user.user_id);
    window.alert("login sucesfully");
    window.location = "userFeed.html";
  } catch (err) {
    document.getElementById("msg").innerText = err.responseJSON.msg;
  }
}
