const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
const db = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
});

db.connect((error) => {
    if (error) {
        console.log("**** ERROR ****");
        console.log(error);
    }
});

module.exports = db;