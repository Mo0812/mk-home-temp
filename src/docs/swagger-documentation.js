const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Hello World",
            version: "1.0.0",
        },
    },
    apis: ["./src/routes/Automation/Automation.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
