import "jest-styled-components";

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    API_SIRET2IDCC_URL: "siret2idcc.url",
    API_URL: "api.url",
    PACKAGE_VERSION: "vX.Y.Z",
    SENTRY_PUBLIC_DSN: "https://xxxxxxx@sentry.test.com/n",
    SUGGEST_URL: "suggest.url/suggest"
  }
}));

document.body.scrollIntoView = jest.fn();
