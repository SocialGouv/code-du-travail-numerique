const Helper = require("@codeceptjs/helper");

class StatusCode extends Helper {
  _before() {
    const helper = this.helpers["Puppeteer"];
    helper.page.emitter.on("response", (response) => {
      if (!this.statusCode) {
        this.statusCode = response.status();
      }
    });
  }

  async getStatusCode() {
    return this.statusCode;
  }
}

module.exports = StatusCode;
