var pool = require("./connection");
var bcrypt = require('bcrypt');
var salt = 10;


module.exports.loginPlayer = async function(username,password) {

    try{
        let sql ="Select * from players where player_username = $1";
        let result = await pool.query(sql,[username]);
        let passwordb = result.rows[0].player_password;
        let x = true;
        let valor = bcrypt.compareSync(password, passwordb);
            if(result.rows.length>0 && valor== x)
               return {status:200, result:result.rows[0]};
            else return { status:401, result: {msg: "Wrong email or password"}};
    }catch(error){
        console.log(error);
        return { status:500, result: {msg: "No user was found with this username"}};
    }
    
}

module.exports.getAllplayers = async function(){
    try{
        let sql = "select * from players";
        let result = await pool.query(sql);
        let players = result.rows;
        console.log(result);
        return{status:200, result:players};
    }catch(error){
        console.log(error);
        return {status:500, result:error};
    }
}

module.exports.savePlayer = async function(player) {
    let hash = bcrypt.hashSync(player.password, salt);
        try{
            let sql = " insert into players(player_firstname, player_lastname, player_username, player_email,player_password,player_bdate,player_gender,player_address,city_fk_id) values($1,$2,$3,$4,$5,$6,$7,$8,$9);";
            let result = await pool.query(sql,[ player.firstName , player.lastName,player.username, player.email, hash, player.bdate, player.gender, player.address, player.cityid]);
            return { status:200, result:result};
        } catch (error){
            console.log(error);
            return { status:500, result: error};
        }  
}

module.exports.getAllPlayerFriends = async function(playerId){
    console.log(playerId);
    try {
        let sql = `select * from players inner join player_friends on player2_fk_id=player_id where player1_fk_id=$1`;
        let result = await pool.query(sql,[playerId]);
        let friends = result.rows;
        console.log(result.rows);
        return { status:200, result:friends}
    } catch (error) {
        console.log(error);
        return { status:500, result:error};
    }
}

module.exports.getPlayerSearchBy = async function(username) {
    try {
        let sql ="Select * from players where player_username like $1 ";
        let result = await pool.query(sql,["%"+username+"%"]);
        let player = result.rows;
        return { status:200, result:player};
    } catch (err) {
        console.log(err);
        return { status:500, result: err};
    }   
}

module.exports.getPlayerById = async function(id){
    try {
        let sql = "select * from players where player_id =$1";
        let result = await pool.query(sql,[id]);
        if(result.rows.length>0)
        return{status:200 , result:result.rows[0]};
        else return{status:404, result: {msg: "Player not found"}};
    } catch (error) {
        console.log(error);
        return{status:500, result: error};
    }
}


    
