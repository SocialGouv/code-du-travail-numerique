import { push as matopush } from "@socialgouv/matomo-next";

export function trackAccordionPanelState(conventionName, eventName) {
  let previousPanelState = [];
  return function (currentPanelState) {
    // the callback provided to the onChange listener of the accordion returns
    // an array of strings containing all the opened panel's ids.
    if (currentPanelState.length > previousPanelState.length) {
      const lastOpenedPanel = currentPanelState.filter(
        (panel) => !previousPanelState.includes(panel)
      );
      matopush(["trackEvent", eventName, conventionName, lastOpenedPanel[0]]);
    }
    previousPanelState = currentPanelState;
  };
}
