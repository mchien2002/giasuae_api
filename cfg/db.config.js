const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mchien2002',
    database: 'db_giasuae',
});

db.connect((error) => {
    if (error) {
        console.log("**** ERROR ****");
        console.log(error);
    }
});

module.exports = db;