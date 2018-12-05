// this is basically: afterEach(cleanup)
import "react-testing-library/cleanup-after-each";

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    API_URL: "api.url",
    API_ADDRESS: "addresse-api.data"
  }
}));
jest.mock("react-piwik", () => ({
  push: jest.fn()
}));

global.fetch = jest.fn();

// trick to prevent @reach-modal warning if styles are not imported
// jsdom doesn"t support it for now @see https://github.com/jsdom/jsdom/issues/1895
document.documentElement.style.setProperty("--reach-modal", "1");
