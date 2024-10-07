import { sendEvent } from "../events";
import { push } from "@socialgouv/matomo-next";

jest.mock("@socialgouv/matomo-next", () => ({
  push: jest.fn(),
}));

describe("sendEvent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if value is provided without name", () => {
    expect(() =>
      sendEvent({
        category: "testCategory",
        action: "testAction",
        value: "testValue",
      }),
    ).toThrow("value should be used with name");
  });

  it("should call push with category, action, name, and value if all are provided", () => {
    sendEvent({
      category: "testCategory",
      action: "testAction",
      name: "testName",
      value: "testValue",
    });
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "testCategory",
      "testAction",
      "testName",
      "testValue",
    ]);
  });

  it("should call push with category, action, and name if name is provided without value", () => {
    sendEvent({
      category: "testCategory",
      action: "testAction",
      name: "testName",
    });
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "testCategory",
      "testAction",
      "testName",
    ]);
  });

  it("should call push with category and action if only category and action are provided", () => {
    sendEvent({ category: "testCategory", action: "testAction" });
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "testCategory",
      "testAction",
    ]);
  });
});
