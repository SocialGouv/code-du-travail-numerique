import { byText, byLabelText, byTestId } from "testing-library-selector";

export const ui = {
  input: byLabelText(/Code postal ou Ville \(optionnel\)/, {
    selector: "input",
  }),
  inputCloseBtn: byTestId("locationSearchAutocomplete-autocomplete-close"),
  AutocompleteItemParis: byText(/Paris (75)/),
};
