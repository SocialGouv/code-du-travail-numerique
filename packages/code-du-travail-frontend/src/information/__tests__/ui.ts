import { byTestId } from "testing-library-selector";

export const ui = {
  accordionButton: (index) => byTestId(`contents-accordions-${index}`),
  tabButton: (index) => byTestId(`contents-tabs-${index}`),
};
