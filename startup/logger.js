require("winston-mongodb");
const winston = require("winston");
const { createLogger, format, transports } = require("winston");

module.exports = createLogger({
  transports: [
    new transports.Console({
      filename: "logs/server.log",
      level: "info",
      handleExceptions: true,

      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.colorize(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
    new transports.MongoDB({
      level: "error",
      //mongo database connection link
      db: "mongodb://localhost:27017/vidly",
      options: {
        useUnifiedTopology: true,
      },
      // A collection to save json formatted logs
      collection: "server_logs",
      format: format.combine(
        format.timestamp(),
        // Convert logs to a json format
        format.json()
      ),
    }),
  ],
});
