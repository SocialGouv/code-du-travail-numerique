"use strict";

const Helper = codecept_helper;

class CurrentUrl extends Helper {
  async getCurrentUrl() {
    const helper = this.helpers["Puppeteer"];
    return helper.page.url();
  }
}

module.exports = CurrentUrl;
