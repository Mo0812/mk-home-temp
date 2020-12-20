const logConsole = parseInt(process.env.LOG_CONSOLE) == 1;
const appLogPath = "app.log";
const errorLogPath = "error.log";

module.exports = {
    logConsole,
    appLogPath,
    errorLogPath,
};
