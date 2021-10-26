const Helper = require("@codeceptjs/helper");

class CurrentUrl extends Helper {
  async getBaseUrl() {
    const helper = this.helpers["Puppeteer"];
    const currentUrl = helper.page.url();
    const baseUrl = currentUrl.split("/")[0] + "//" + currentUrl.split("/")[2];
    return baseUrl;
  }
}

module.exports = CurrentUrl;
