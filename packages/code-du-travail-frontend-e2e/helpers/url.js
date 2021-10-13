const Helper = require("@codeceptjs/helper");

class CurrentUrl extends Helper {
  async getCurrentUrl() {
    const helper = this.helpers["Puppeteer"];
    return helper.page.url();
  }
}

module.exports = CurrentUrl;
