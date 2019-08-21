const {
  createLogger,
  format,
  transports: { Console }
} = require("winston");

export const logger = createLogger({
  level: "info",
  transports: [
    new Console({
      format: format.simple()
    })
  ]
});
