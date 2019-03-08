const parseLegifranceUrl = require("./parseLegifranceUrl");

const testsUrls = require("./parseLegifranceUrl.examples.json");

testsUrls.forEach(url => {
  test(url, () => {
    expect(parseLegifranceUrl(url)).toMatchSnapshot();
  });
});
