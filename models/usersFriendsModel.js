var pool = require("./connection");

module.exports.getAllUsersFriends = async function () {
  try {
    let sql = "select * from users_friends";
    let result = await pool.query(sql);
    let userFriends = result.rows;
    return { status: 200, result: userFriends };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};

module.exports.followUser = async function (user1Id, user2Id) {
  try {
    let sql =
      "insert into users_friends(user1_fk_id,user2_fk_id) values($1,$2)";
    let result = await pool.query(sql, [user1Id, user2Id]);
    return { status: 200, result: result };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};
