//

import { createLogger, format, transports } from "winston";

const { Console } = transports;

export const LOG_LEVEL = process.env.LOG_LEVEL ?? "info";
export const logger = createLogger({
  format: format.json(),
  level: LOG_LEVEL,
  transports: [
    new Console({
      format: format.prettyPrint(),
    }),
  ],
});
