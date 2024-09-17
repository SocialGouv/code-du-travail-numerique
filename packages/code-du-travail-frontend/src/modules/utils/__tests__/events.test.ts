import { sendEvent } from "../events";
import { push } from "@socialgouv/matomo-next";

jest.mock("@socialgouv/matomo-next", () => ({
  push: jest.fn(),
}));

describe("sendEvent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call push with category, action, and name when name is provided", () => {
    const props = {
      category: "testCategory",
      action: "testAction",
      name: "testName",
    };

    sendEvent(props);

    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "testCategory",
      "testAction",
      "testName",
    ]);
  });

  it("should call push with category, action, name, and value when value is provided", () => {
    const props = {
      category: "testCategory",
      action: "testAction",
      name: "testName",
      value: "testValue",
    };

    sendEvent(props);

    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "testCategory",
      "testAction",
      "testName",
      "testValue",
    ]);
  });

  it("should call push with category and action when neither name nor value is provided", () => {
    const props = {
      category: "testCategory",
      action: "testAction",
    };

    sendEvent(props);

    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "testCategory",
      "testAction",
    ]);
  });
});
