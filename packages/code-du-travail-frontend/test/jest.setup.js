// this is basically: afterEach(cleanup)
import "react-testing-library/cleanup-after-each";

global.fetch = jest.fn();

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    API_URL: "api.url"
  }
}));
jest.mock("react-piwik", () => ({
  push: jest.fn()
}));
// trick to prevent @reach-modal warning if styles are not imported
// jsdom doesn"t support it for now @see https://github.com/jsdom/jsdom/issues/1895
document.documentElement.style.setProperty("--reach-modal", "1");
