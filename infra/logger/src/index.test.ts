//

import { flush, restore, use } from "std-mocks";

import { logger } from "./index";

test("should log less than or equal to info level to stdout", () => {
  use();

  logger.error("an error");
  logger.warn("an warn");
  logger.info("an info");
  logger.http("an http");
  logger.verbose("an verbose");
  logger.debug("an debug");
  logger.silly("an debug");

  restore();

  const output = flush();
  expect(output.stderr).toMatchInlineSnapshot(`Array []`);
  expect(output.stdout).toMatchInlineSnapshot(`
    Array [
      "{ message: 'an error', level: 'error' }
    ",
      "{ message: 'an warn', level: 'warn' }
    ",
      "{ message: 'an info', level: 'info' }
    ",
    ]
  `);
});
