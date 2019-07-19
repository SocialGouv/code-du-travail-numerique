// this is basically: afterEach(cleanup)
import "react-testing-library/cleanup-after-each";
import "jest-styled-components";

jest.mock("next-server/config", () => () => ({
  publicRuntimeConfig: {
    API_URL: "api.url",
    API_SIRET2IDCC_URL: "siret2idcc.url",
    API_DILA2SQL_URL: "https://api.dila2sql.num.social.gouv.fr/v1",
    SUGGEST_URL: "suggest.url/suggest",
    API_ADDRESS: "addresse-api.data",
    PACKAGE_VERSION: "x.y.z"
  }
}));

jest.mock("../src/piwik", () => ({
  matopush: jest.fn()
}));

// HACK(lionelB): trick to prevent @reach-modal warning if styles are not imported
// jsdom doesn"t support it for now @see https://github.com/jsdom/jsdom/issues/1895
// We will be able to use :
// document.documentElement.style.setProperty("--reach-modal", "1");
// when jsdom support it :)
//
// Meanwhile...
//
// HACK(douglasduteil): mock the check style function from `@reach/utils`
// As `@reach/*` packages are using the "checkStyles" function from `@reach/utils`
// to warn us about missing stylesheet, we silent it with a mock 💩
require("@reach/utils").checkStyles = jest.fn();

document.body.scrollIntoView = jest.fn();
