const path = require('path');
const mysql = require('mysql2');

require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
});

const connectionString = process.env.DATABASE_URL || process.env.MYSQL_URL || process.env.DB_HOST;
const isConnectionString = typeof connectionString === 'string'
    && /^mysql:\/\//i.test(connectionString.trim());

const connection = isConnectionString
    ? mysql.createPool(connectionString.trim())
    : mysql.createPool({
        host: process.env.DB_HOST || process.env.MYSQLHOST,
        port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
        user: process.env.DB_USER || process.env.MYSQLUSER,
        password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
        database: process.env.DB_NAME || process.env.MYSQLDATABASE
    });

module.exports = connection.promise();