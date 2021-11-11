var pool = require("./connection");

module.exports.getAllmaps = async function() {
    try {
        let sql ="select * from maps";
        let result = await pool.query(sql);
        let cities = result.rows;
        return {status:200, result: cities};
    }catch(error){
        console.log(error);
        return {status:500, result: error};
    }
}
