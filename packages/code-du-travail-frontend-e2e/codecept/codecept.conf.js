exports.config = {
  bootstrap: null,
  gherkin: {
    features: "./features/**/*.feature",
    steps: ["./step_definitions/global.js"],
  },
  helpers: {
    CurrentCanonicalLink: {
      require: "./helpers/canonical.js",
    },
    CurrentUrl: {
      require: "./helpers/url.js",
    },
    FileSystem: {},
    FocusHelper: {
      require: "./helpers/focus.js",
    },
    Puppeteer: {
      chrome: {
        args: (process.env.CI
          ? ["--no-sandbox", "--disable-setuid-sandbox"]
          : ["--window-size=1024,1024"]
        ).concat(["--lang=fr_FR"]),
        defaultViewport: {
          height: 1024,
          width: 1024,
        },
        executablePath: process.env.CI && "/usr/bin/chromium-browser",
        headless: process.env.CODECEPT_HEADED ? false : true,
      },
      restart: false,
      url: process.env.CODECEPT_BASEURL || "http://localhost:3000",
    },
    StatusCode: {
      require: "./helpers/status.js",
    },
  },
  hooks: [],
  mocha: {},
  name: "code-du-travail-numerique",
  output: "./output",
  plugins: {
    pauseOnFail: {},
    screenshotOnFail: {
      enabled: true,
    },
  },
  rerun: {
    maxReruns: 3,
    // run 3 times until 1st success
    minSuccess: 1,
  },
  teardown: null,
  tests: "./specs/*_test.js",
  timeout: 60000,
};
