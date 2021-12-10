var pool = require("./connection");

module.exports.getAllReserves = async function () {
  try {
    let sql = "select * from reserve";
    let result = await pool.query(sql);
    let reserves = result.rows;
    return { status: 200, result: reserves };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};

module.exports.getReservesFilterByDate = async function (date) {
  try {
    let sql = "select*from reserve where reserve_date=$1";
    let result = await pool.query(sql, ["'" + date + "'"]);
    let reserves = result.rows;
    return { status: 200, result: reserves };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
};

module.exports.newReserve = async function (reserve) {
  try {
    let sql =
      "insert into reserve(reserve_date,reserve_estate,user_fk_id,field_fk_id,reserve_hour) values($1,$2,$3,$4,$5);";
    let result = await pool.query(sql, [
      reserve.date,
      reserve.estate,
      reserve.userId,
      reserve.fieldId,
      reserve.hour,
    ]);
    return { status: 200, result: result };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};

module.exports.getReserveById = async function (id) {
  try {
    let sql =
      "select * from reserve where reserve_id =$1";
    let result = await pool.query(sql, [id]);
    if (result.rows.length > 0) return { status: 200, result: result.rows[0] };
    else return { status: 404, result: { msg: "Reserve not found" } };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};