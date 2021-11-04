var pg = require('pg');

const connectionString = "postgres://postgres:junior@localhost:5432/softpadel"
const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 10,
    /*ssl: {
        require: true, 
        rejectUnauthorized: false
    }*/
})

module.exports = pool;