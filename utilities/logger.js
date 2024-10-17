const { createLogger, transports, format } = require("winston");
let date = require("date-and-time");
var dateForName = date.format(new Date(), "YYYYMMDD");

const info_logger = createLogger({
  transports: [
    new transports.File({
      filename: `./logs/info_logs/${dateForName}-info.log`,
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

const error_logger = createLogger({
  transports: [
    new transports.File({
      filename: `./logs/error_logs/${dateForName}-error.log`,
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = {
  info_logger,
  error_logger,
};
