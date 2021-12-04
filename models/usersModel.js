var pool = require("./connection");
var bcrypt = require("bcrypt");
var salt = 10;

module.exports.getAllUsers = async function () {
  try {
    let sql = "select * from users";
    let result = await pool.query(sql);
    let users = result.rows;
    console.log(result);
    return { status: 200, result: users };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};

module.exports.loginUser = async function (username, password) {
  try {
    let sql = "Select * from users where user_username = $1";
    let result = await pool.query(sql, [username]);
    let passwordb = result.rows[0].user_password;
    let x = true;
    let valor = bcrypt.compareSync(password, passwordb);
    if (result.rows.length > 0 && valor == x)
      return { status: 200, result: result.rows[0] };
    else return { status: 401, result: { msg: "Wrong email or password" } };
  } catch (error) {
    console.log(error);
    return { status: 500, result: { msg: "Wrong username or password" } };
  }
};

module.exports.saveUser = async function (user) {
  let hash = bcrypt.hashSync(user.password, salt);
  try {
    let sql =
      " insert into users(user_firstname, user_lastname, user_username, user_email,user_password,user_bdate,user_gender,user_address,city_fk_id,user_location) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);";
    let result = await pool.query(sql, [
      user.firstName,
      user.lastName,
      user.username,
      user.email,
      hash,
      user.bdate,
      user.gender,
      user.address,
      user.cityid,
      user.location,
    ]);
    return { status: 200, result: result };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};

module.exports.getAllUserFriends = async function (userId) {
  console.log(userId);
  try {
    let sql = `select user_id,user_username,user_firstname,user_lastname from users inner join users_friends on user2_fk_id=user_id where user1_fk_id=$1`;
    let result = await pool.query(sql, [userId]);
    let friends = result.rows;
    console.log(result.rows);
    return { status: 200, result: friends };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};

module.exports.getUserSearchBySuggest = async function (suggest) {
  try {
    let sql =
      "Select user_id,user_username from users where user_username like $1 ";
    let result = await pool.query(sql, ["%" + suggest + "%"]);
    let user = result.rows;
    return { status: 200, result: user };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
};

module.exports.getUserById = async function (id) {
  try {
    let sql =
      "select user_id,user_username, user_firstname,user_lastname from users where user_id =$1";
    let result = await pool.query(sql, [id]);
    if (result.rows.length > 0) return { status: 200, result: result.rows[0] };
    else return { status: 404, result: { msg: "User not found" } };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};
module.exports.getUserReserves = async function (id) {
  try {
    let sql = `select * from users inner join reserve on  user_id=user_fk_id 
inner join fields on field_fk_id= field_id inner join cities on fields.city_fk_id=city_id
where user_id=$1`;
    let result = await pool.query(sql, [id]);
    for (let res of result.rows) delete res.user_password;
    if (result.rows.length > 0) return { status: 200, result: result.rows };
    else return { status: 404, result: { msg: "User not found" } };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};
module.exports.getUserGroup = async function () {
  try {
    let sql = `select user_group_id, ugroup_name from users inner join users_groups on  user_id=user_fk_id 
inner join ugroups on group_fk_id= ugroup_id`;
    let result = await pool.query(sql);
    /*for (let res of result.rows) delete res.user_password;
    if (result.rows.length > 0) return { status: 200, result: result.rows };
    else return { status: 404, result: { msg: "No groups Found" } };*/
    return { status: 200, result: result.rows };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};
