var pool = require("./connection");

module.exports.getAllfields = async  function() {
    try {
        let sql = "select * from fields";
        let result = await pool.query(sql);
        let fields = result.rows;
        return {status:200, result: fields};
    } catch (error) {
        console.log(error);
        return{status:500, result:error};
    }
}
module.exports.registerField = async function(newField){
    try {
        let sql="insert into fields (field_name, field_address, field_number, field_open, field_close, field_price_h, field_location, city_fk_id) values($1, $2, $3, $4, $5, $6, $7, $8) ";
        let result = await pool.query(sql, [newField.name, newField.address, newField.number, newField.openedTime, newField.closedTime, newField.price, newField.location, newField.cityid]);
        return{ status: 200, result: result};
    } catch (error) {
        console.log(error);
        return{ status: 500, result: error};
    }
}
}
