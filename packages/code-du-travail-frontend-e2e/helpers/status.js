const Helper = require("@codeceptjs/helper");

class StatusCode extends Helper {
  async getStatusCode(url) {
    return new Promise((resolve) => {
      const { page } = this.helpers.Puppeteer;
      page.goto(url, { waitUntil: "load" }).then((r) => {
        resolve(r.status());
      });
    });
  }
}

module.exports = StatusCode;
