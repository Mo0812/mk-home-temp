const mysql = require("mysql");
const logger = require("../Logger/Logger");

const connectionCredentials = {
    host: process.env.MARIADB_HOST,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PW,
    database: process.env.MARIADB_DB,
    port: process.env.MARIADB_PORT,
};

const connection = mysql.createConnection(connectionCredentials);
connection.connect(function (err) {
    if (err) {
        logger.log("error", "MySQL connection failed: " + err.message);
    }
});

module.exports = connection;
