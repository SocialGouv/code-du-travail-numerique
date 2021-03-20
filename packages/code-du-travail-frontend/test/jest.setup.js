import "jest-styled-components";

import MockDate from "mockdate";

MockDate.set("2020-1-4");

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    API_ENTREPRISE_URL: "api-entreprises.url",
    API_SIRET2IDCC_URL: "siret2idcc.url",
    API_URL: "api.url",
    AZURE_BASE_URL: "azure.url",
    AZURE_CONTAINER: "cdtn",
    PACKAGE_VERSION: "vX.Y.Z",
    SENTRY_PUBLIC_DSN: "https://xxxxxxx@sentry.test.com/n",
  },
}));

window.scrollTo = jest.fn();
