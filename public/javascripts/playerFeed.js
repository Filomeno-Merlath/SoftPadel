window.onload = async function(){
    try {
        let playerId = sessionStorage.getItem("playerId");
        let playerFriends = await $.ajax({
            url: `/api/players/${playerId}/friends`,
            method:"get",
            dataType: "json"
        });
        let html ="<h1>Friends</h1>";
        for(let playerFriend of playerFriends){

             html+=`
            <br><section>
            <p>Username:${playerFriend.player_username} </p>
            <p> Name:${playerFriend.player_firstname} ${playerFriend.player_lastname} </p>
            </section>`}
            document.getElementById("friends").innerHTML = html;
    } catch (error) {
        console.log(error);
    }

}

function createplayersHTML(player) {
    let html = "<h1>Players search</h1>";
    for (let p of player) {
        html += `<section
        onclick="toPlayer(${p.player_id})">
            <h2>Username: ${p.player_username}</h2>
            <h4>Name: ${p.player_firstname} ${p.player_lastname}</h4>
            </section>`;
    document.getElementById("players").innerHTML = html;
    }
}

async function searchByUsername() {
    try {
        let username = document.getElementById("player").value;
        let player = await $.ajax({
            url: `/api/players/search/?name=${username}`,
            method: 'get',
            dataType: 'json'
        });
        createplayersHTML(player);
    } catch (error) {
        console.log(error);
    }  
}

async function toPlayer(id){
    sessionStorage.setItem("id", id);
    window.location = "player.html";
}

async function logout(){
    sessionStorage.removeItem("playerId");
    window.location="playerLogin.html";
    console.log(sessionStorage.getItem("playerId"));
}