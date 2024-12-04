import { byText, byLabelText, byTestId } from "testing-library-selector";

export const ui = {
  input: byLabelText(/Code postal ou Ville \(optionnel\)/),
  inputCloseBtn: byTestId("locationSearchAutocomplete-autocomplete-close"),
  AutocompleteItemParis: byText("Paris (75)"),
};
