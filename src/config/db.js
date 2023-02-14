const mysql = require('mysql');
const util = require('util');

const dbconf = mysql.createPool({
    // connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const query = util.promisify(dbconf.query).bind(dbconf);

module.exports = { dbconf, query }