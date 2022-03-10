import { push as matopush } from "@socialgouv/matomo-next";

import { trackAccordionPanelState } from "../utils";

jest.mock("@socialgouv/matomo-next");
matopush.mockImplementation();

describe("trackAccordionPanelState", () => {
  it("calls matopush only when a panel is opened", () => {
    const conventionName = "double ok";
    const eventName = "ok ok";
    const tracker = trackAccordionPanelState(conventionName, eventName);
    tracker(["panel1"]);
    tracker(["panel1", "panel2"]);
    tracker(["panel1"]);
    expect(matopush).toHaveBeenLastCalledWith([
      "trackEvent",
      eventName,
      conventionName,
      "panel2",
    ]);
    tracker(["panel1", "panel3"]);
    tracker(["panel3"]);
    expect(matopush).toHaveBeenLastCalledWith([
      "trackEvent",
      eventName,
      conventionName,
      "panel3",
    ]);
    expect(matopush.mock.calls.length).toBe(3);
  });
});
