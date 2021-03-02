//

import { createLogger, format, transports } from "winston";

const { Console } = transports;

export const logger = createLogger({
  format: format.json(),
  level: "info",
  transports: [
    new Console({
      format: format.prettyPrint(),
    }),
  ],
});
