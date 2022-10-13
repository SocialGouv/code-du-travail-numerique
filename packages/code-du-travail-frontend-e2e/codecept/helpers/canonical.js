const Helper = require("@codeceptjs/helper");

class CurrentCanonicalLink extends Helper {
  async getCanonicalLink() {
    const helper = this.helpers["Puppeteer"];
    const href = await helper.page.$eval(
      "head > link[rel='canonical']",
      (element) => element.href
    );
    return href;
  }
}

module.exports = CurrentCanonicalLink;
