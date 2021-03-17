const {
  createLogger,
  format,
  transports: { Console },
} = require("winston");

exports.LOG_LEVEL = process.env.LOG_LEVEL ?? "info";

exports.logger = createLogger({
  level: exports.LOG_LEVEL,
  transports: [],
});

if (process.env.NODE_ENV !== "production") {
  exports.logger.add(
    new Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
} else {
  exports.logger.add(
    new Console({
      format: format.json(),
    })
  );
}
