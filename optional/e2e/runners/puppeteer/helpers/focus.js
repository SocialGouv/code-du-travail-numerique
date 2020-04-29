const Helper = codecept_helper;

class FocusHelper extends Helper {
  async resetInputFocus(selector) {
    const { page } = this.helpers.Puppeteer;
    const [firstMatch] = await page.$x(
      `//label[contains(., "${selector}")] | //*[@name="${selector}"]`
    );
    await firstMatch.click();
  }
}

module.exports = FocusHelper;
