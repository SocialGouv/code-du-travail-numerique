import Sentry from "@sentry/browser";
import { initializeSentry, notifySentry } from "../sentry";

jest.mock("@sentry/browser", () => ({
  captureMessage: jest.fn(),
  init: jest.fn(),
  withScope: jest.fn(cb => cb({ setTag: jest.fn()}))
}));

test("should initialize sentry in production mode", () => {
  initializeSentry();

  expect(Sentry.init).toHaveBeenCalledWith(
    expect.objectContaining({
      debug: false,
      dsn: "https://xxxxxxx@sentry.test.com/n",
      environment: "production",
      release: "vX.Y.Z"
    })
  );
});

test("should initialize sentry in pre-production mode", () => {
  Object.defineProperty(window, "location", {
    value: new URL("https://v11-22-33.code.travail.gouv.fr/")
  });

  initializeSentry();

  expect(Sentry.init).toHaveBeenCalledWith(
    expect.objectContaining({
      debug: true,
      dsn: "https://xxxxxxx@sentry.test.com/n",
      environment: "preproduction",
      release: "vX.Y.Z"
    })
  );
});

test("should notify sentry", () => {
  notifySentry(418, "I'm a teapot")

  expect(Sentry.captureMessage).toHaveBeenCalledWith("Error 418 - I'm a teapot", "error")
})
