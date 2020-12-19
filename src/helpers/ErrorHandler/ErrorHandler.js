const handleError = (err, res) => {
    const { statusCode, message, error } = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
        error,
    });
};

module.exports = {
    handleError,
};
