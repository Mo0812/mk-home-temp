class ApiError extends Error {
    constructor(statusCode, payload) {
        super();
        this.statusCode = statusCode;
        if (payload instanceof Error) {
            this.error = payload;
            this.message = payload.message;
        } else {
            this.message = payload;
        }
    }
}

module.exports = ApiError;
