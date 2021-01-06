exports.config = {
  output: "./output",
  helpers: {
    Puppeteer: {
      chrome: {
        args: (process.env.CI
          ? ["--no-sandbox", "--disable-setuid-sandbox"]
          : ["--window-size=1024,1024"]
        ).concat(["--lang=fr_FR"]),
        defaultViewport: {
          width: 1024,
          height: 1024,
        },
        executablePath: process.env.CI && "/usr/bin/chromium-browser",
        headless: process.env.CODECEPT_HEADED ? false : true,
      },
      restart: false,
      url: process.env.CODECEPT_BASEURL || "http://localhost:3000",
    },
    FileSystem: {},
    FocusHelper: {
      require: "./helpers/focus.js",
    },
  },
  include: {
    I: "./steps_file.js",
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: "../../features/**/*.feature",
    steps: ["./step_definitions/global.js"],
  },
  plugins: {
    pauseOnFail: {},
    screenshotOnFail: {
      enabled: true,
    },
  },
  tests: "./specs/*_test.js",
  name: "code-du-travail-numerique",
};
