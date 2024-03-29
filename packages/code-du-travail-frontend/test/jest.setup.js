import "@testing-library/jest-dom";

import MockDate from "mockdate";

MockDate.set("2020-1-4");

/**
 * this removes the reach-ui warning that check modal css import
 */
// eslint-disable-next-line import/no-extraneous-dependencies
require("@reach/utils").checkStyles = jest.fn();

window.scrollTo = jest.fn();

jest.mock("../src/config", () => ({
  SITE_URL: "api.url",
  BUCKET_URL: "bucket.url",
  BUCKET_DEFAULT_FOLDER: "default",
  BUCKET_SITEMAP_FOLDER: "sitemap",
  PACKAGE_VERSION: "vX.Y.Z",
  ENTERPRISE_API_URL:
    "https://api.recherche-entreprises.fabrique.social.gouv.fr/api/v1",
}));

global.setImmediate = jest.useRealTimers;
