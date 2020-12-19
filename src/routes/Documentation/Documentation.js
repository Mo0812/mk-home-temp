const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../../docs/swagger-documentation");
console.log(swaggerDoc);

const documentationRouter = express.Router();

documentationRouter.use("/api", swaggerUi.serve);
documentationRouter.get("/api", swaggerUi.setup(swaggerDoc));

module.exports = documentationRouter;
