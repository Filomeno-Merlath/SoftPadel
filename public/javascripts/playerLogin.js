async function login(){
try {
    let object = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }
    let player = await $.ajax({
        url: `/api/players/login`,
        method: 'post',
        dataType: 'json',
        data: JSON.stringify(object),
        contentType: 'application/json'

    });
    sessionStorage.setItem("playerId",player.player_id);
    window.alert("login sucesfully");
    window.location = "playerFeed.html";
} catch (err) {
    document.getElementById("msg").innerText = err.responseJSON.msg;
}
}