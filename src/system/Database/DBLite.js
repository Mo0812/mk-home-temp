const dblite = require("dblite");

const connection = dblite("./db/mkht.db", "-header");

module.exports = connection;
