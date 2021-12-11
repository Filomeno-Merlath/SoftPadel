var pool = require("./connection");

module.exports.getAllgroups = async function () {
  try {
    let sql = "select * from ugroups";
    let result = await pool.query(sql);
    let fields = result.rows;
    return { status: 200, result: fields };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};

module.exports.createGroup = async function (newGroup) {
  try {
    let sql =
      "insert into ugroups (ugroup_name) values($1) returning ugroup_id";
    let result = await pool.query(sql, [newGroup]);
    return { status: 200, result: result.rows[0] };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};
