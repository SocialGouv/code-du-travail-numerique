import { matopush } from "../../piwik";

export function trackAccordionPanelState(conventionName, eventName) {
  let previousPanelState = [];
  return function (currentPanelState) {
    if (currentPanelState.length > previousPanelState.length) {
      const lastOpenedPanel = currentPanelState.filter(
        (panel) => !previousPanelState.includes(panel)
      );
      matopush(["trackEvent", eventName, conventionName, lastOpenedPanel[0]]);
    }
    previousPanelState = currentPanelState;
  };
}
