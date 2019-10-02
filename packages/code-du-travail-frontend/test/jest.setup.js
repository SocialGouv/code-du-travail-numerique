import "jest-styled-components";
import { textesSalaires } from "../src/conventions/__tests__/api.conventions.mock";

import { fetchResponse } from "./mockFetch";

import fetch from "isomorphic-unfetch";
jest.mock("isomorphic-unfetch");

const mockedConfig = {
  API_ADDRESS: "addresse-api.data",
  API_SIRET2IDCC_URL: "siret2idcc.url",
  API_URL: "api.url",
  PACKAGE_VERSION: "vX.Y.Z",
  SENTRY_PUBLIC_DSN: "https://xxxxxxx@sentry.test.com/n",
  SUGGEST_URL: "suggest.url/suggest"
};

fetch.mockImplementation(url => {
  let response = [];
  // each fetch call made outside of an getInitialProps should be mocked here
  if (
    url.match(
      // eslint-disable-next-line no-useless-escape
      new RegExp(`^${mockedConfig.API_URL}\/conventions\/.*\/salaires`, "gi")
    )
  ) {
    response = { _source: textesSalaires };
  }
  return Promise.resolve(fetchResponse(response));
});

jest.mock("next/config", () => () => ({ publicRuntimeConfig: mockedConfig }));

document.body.scrollIntoView = jest.fn();
