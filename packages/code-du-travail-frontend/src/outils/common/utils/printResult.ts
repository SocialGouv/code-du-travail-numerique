import { matopush } from "../../../piwik";

export const printResult = (simulatorTitle: string): void => {
  matopush(["trackEvent", "click_print", simulatorTitle]);
  const detailsTags = document.getElementsByTagName("details");
  for (let i = 0; i < detailsTags.length; i++) {
    detailsTags[i].setAttribute("open", "");
  }
  window.print();
};
