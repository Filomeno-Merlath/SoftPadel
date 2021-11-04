var pool = require("./connection");

module.exports.getAllPlayerFriends = async function(){
    try {
        let sql ="select * from player_friends";
        let result = await pool.query(sql);
        let playerFriends = result.rows;
        return{status:200, result: playerFriends};
    } catch (error) {
        console.log(error);
        return{status:500, result:error};
    }
}

module.exports.followPlayer = async function(userId,playerId){
    try {
        let sql="insert into player_friends(player1_fk_id,player2_fk_id) values($1,$2)";
        let result = await pool.query(sql,[userId,playerId]);
        return{status:200, result:result};
    } catch (error) {
        console.log(error);
        return{status:500, result:error};
    }
}