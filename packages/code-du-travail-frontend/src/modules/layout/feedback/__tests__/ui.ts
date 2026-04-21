import { byLabelText, byTestId } from "testing-library-selector";

export const ui = {
  input: byLabelText(/Une suggestion pour améliorer cette page/),
  characterInfo: byTestId("characterInfo"),
};
