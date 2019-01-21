#!/usr/bin/env node

const { copyFile, stat } = require("fs");
const { promisify } = require("util");

//

(async () => {
  try {
    await promisify(stat)("./dockerenv");
    // Running inside a docker instance, dont modify files
    return;
  } catch (e) {}

  try {
    await promisify(stat)("./.env");
    // Existing `.env` file, dont change it
  } catch (e) {
    // No `.env` file
    // Create one from the `.env.sample` file
    await promisify(copyFile)(".env.sample", ".env");
    console.log('Copy ".env.sample" to ".env"');
  }

  try {
    await promisify(stat)("docker-compose.override.yml");
    // Existing `docker-compose.override.yml` file, dont change it
  } catch (e) {
    // No `docker-compose.override.yml` file
    // Create one from the `docker-compose.override.dev.yml` or `docker-compose.override.prod.yml` file
    // Depending if the current NODE_ENV is "production" or else.
    const env = process.env.NODE_ENV === "production" ? "prod" : "dev";
    await promisify(copyFile)(
      `docker-compose.override.${env}.yml`,
      "docker-compose.override.yml"
    );
    console.log(
      `Copy "docker-composeoverride.override.${env}.yml" to "docker-compose.override.yml"`
    );
  }
})();
