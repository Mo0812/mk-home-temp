const sqlite3 = require("sqlite3");

const connection = new sqlite3.Database("./db/mkht.db");

module.exports = connection;
