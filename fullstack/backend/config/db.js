const path = require('path');
const mysql = require('mysql2');

require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
});

const connectionString = process.env.DATABASE_URL || process.env.DB_HOST;
const isConnectionString = typeof connectionString === 'string'
    && /^mysql:\/\//i.test(connectionString.trim());

const connection = isConnectionString
    ? mysql.createPool(connectionString.trim())
    : mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

module.exports = connection.promise();