//

import { createLogger, format, transports } from "winston";

const { Console } = transports;

export const LOG_LEVEL = process.env.LOG_LEVEL ?? "info";
export const logger = createLogger({
  level: LOG_LEVEL,
  transports: [],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
} else {
  logger.add(
    new Console({
      format: format.json(),
    })
  );
}
