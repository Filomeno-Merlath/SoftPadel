var playerId = sessionStorage.getItem("id");;
var userId = sessionStorage.getItem("playerId");;
window.onload = async function(){

    try {

        let player = await $.ajax({
            url: "/api/players/"+playerId,
            method: "get",
            dataType: "json"
        });

        document.getElementById("username").innerHTML= player.player_username;
        document.getElementById("Name").innerHTML="Name:"+player.player_firstname+" "+player.player_lastname;
    } catch (error) {
        console.log(error)
    }
}

async function makeFriend(){
    try {
        
        let data;
        data = {
            userId,
            playerId 
        }

        let result = await $.ajax({
            url:`/api/playersFriends/follow`,
            method:"post",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/JSON"})
            console.log(JSON.stringify(result));
            window.alert("Follow sucess");
            window.location = "playerFeed.html";
    } catch (error) {
        console.log(error);
    }
}