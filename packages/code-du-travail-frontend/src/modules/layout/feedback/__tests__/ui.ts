import { byLabelText, byTestId } from "testing-library-selector";

export const ui = {
  input: byLabelText(/Faire une suggestion pour améliorer cette page/),
  characterInfo: byTestId("characterInfo"),
};
