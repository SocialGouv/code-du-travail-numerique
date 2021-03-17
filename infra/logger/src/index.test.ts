//

import { flush, restore, use } from "std-mocks";

process.env.NODE_ENV = "production";

test("should log less than or equal to info level to stdout", async () => {
  // NOTE(douglasduteil): remove any LOG_LEVEL set in the env
  // Ensute that the external env does not interfer with the test.
  delete process.env.LOG_LEVEL;

  const { logger } = await import("./index");

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
      "{\\"message\\":\\"an error\\",\\"level\\":\\"error\\"}
    ",
      "{\\"message\\":\\"an warn\\",\\"level\\":\\"warn\\"}
    ",
      "{\\"message\\":\\"an info\\",\\"level\\":\\"info\\"}
    ",
    ]
  `);
});

test("should log all levels to stdout", async () => {
  jest.resetModules();

  process.env.LOG_LEVEL = "silly";
  const { logger } = await import("./index");

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
      "{\\"message\\":\\"an error\\",\\"level\\":\\"error\\"}
    ",
      "{\\"message\\":\\"an warn\\",\\"level\\":\\"warn\\"}
    ",
      "{\\"message\\":\\"an info\\",\\"level\\":\\"info\\"}
    ",
      "{\\"message\\":\\"an http\\",\\"level\\":\\"http\\"}
    ",
      "{\\"message\\":\\"an verbose\\",\\"level\\":\\"verbose\\"}
    ",
      "{\\"message\\":\\"an debug\\",\\"level\\":\\"debug\\"}
    ",
      "{\\"message\\":\\"an debug\\",\\"level\\":\\"silly\\"}
    ",
    ]
  `);
});
