const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
// const db = mysql.createConnection({
//     host: process.env.DB_HOSTNAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     multipleStatements: true
// });

// db.connect((error) => {
//     if (error) {
//         console.log("**** ERROR ****");
//         console.log(error);
//     }
// });

var db_config = {
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
};

var db;

function handleDisconnect() {
    db = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.

    db.connect(function (err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    db.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();
module.exports = db;