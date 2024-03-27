const mysql = require('mysql2');
//pool of connections which manage all connections
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'SDFG3456'
});

module.exports = pool.promise();