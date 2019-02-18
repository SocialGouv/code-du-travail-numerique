#!/usr/bin/env node

const { copyFile, access } = require("fs");
const { promisify } = require("util");

const promisedCopyFile = promisify(copyFile);
const promisedAccess = promisify(access);

//

(async () => {
  try {
    await promisedAccess("./dockerenv");
    // Running inside a docker instance, dont modify files
    return;
  } catch (e) {}

  try {
    await promisedAccess("./.env");
    // Existing `.env` file, dont change it
  } catch (e) {
    // No `.env` file
    // Create one from the `.env.sample` file
    await promisedCopyFile(".env.sample", ".env");
    console.log('Copy ".env.sample" to ".env"');
  }

  try {
    await promisedAccess("docker-compose.override.yml");
    // Existing `docker-compose.override.yml` file, dont change it
  } catch (e) {
    // No `docker-compose.override.yml` file
    // Create one from the `docker-compose.override.dev.yml` or `docker-compose.override.prod.yml` file
    // Depending if the current NODE_ENV is "production" or else.
    const env = process.env.NODE_ENV === "production" ? "prod" : "dev";
    await promisedCopyFile(
      `docker-compose.override.${env}.yml`,
      "docker-compose.override.yml"
    );
    console.log(
      `Copy "docker-composeoverride.override.${env}.yml" to "docker-compose.override.yml"`
    );
  }
})();
