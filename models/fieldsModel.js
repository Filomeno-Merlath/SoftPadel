var pool = require("./connection");

module.exports.getAllfields = async function () {
  try {
    let sql = "select * from fields";
    let result = await pool.query(sql);
    let fields = result.rows;
    return { status: 200, result: fields };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};
