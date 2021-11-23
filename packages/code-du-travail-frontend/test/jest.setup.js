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
    NEXT_PUBLIC_SENTRY_DSN: "https://xxxxxxx@sentry.test.com/n",
    PACKAGE_VERSION: "vX.Y.Z",
  },
}));

/**
 * this removes the reach-ui warning that check modal css import
 */
// eslint-disable-next-line import/no-extraneous-dependencies
require("@reach/utils").checkStyles = jest.fn();

window.scrollTo = jest.fn();
