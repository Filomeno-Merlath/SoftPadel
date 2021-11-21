var pg = require('pg');

const connectionString = "postgres://hirtpgpu:x5bIxEbHrAire_U8iNQOrSKEaJV1ZzXP@surus.db.elephantsql.com/hirtpgpu"

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