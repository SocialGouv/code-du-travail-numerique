import "jest-styled-components";
import Intl from "intl";

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    API_SIRET2IDCC_URL: "siret2idcc.url",
    API_ENTREPRISE_URL: "api-entreprises.url",
    API_URL: "api.url",
    PACKAGE_VERSION: "vX.Y.Z",
    SENTRY_PUBLIC_DSN: "https://xxxxxxx@sentry.test.com/n",
  },
}));

/**
 * Mocking Date.now with default date
 */
jest.spyOn(Date, "now").mockImplementation(() => {
  return 1231231231230;
});
const fr = new Intl.DateTimeFormat("fr-FR", {
  minute: "2-digit",
  hour: "2-digit",
  day: "2-digit",
  month: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

jest.spyOn(Date.prototype, "toLocaleString").mockImplementation(function() {
  return fr.format(this);
});
/**
 * this removes the reach-ui warning that check modal css import
 */
// eslint-disable-next-line import/no-extraneous-dependencies
require("@reach/utils").checkStyles = jest.fn();

window.scrollTo = jest.fn();
