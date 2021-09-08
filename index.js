const winston = require("winston");
const logger = require("./startup/logger");
const express = require("express");
const app = express();
require("winston-mongodb");
//const log = require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

//nston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly" });

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  logger.info(`Listening on port ${port}...`)
);

module.exports = server;
