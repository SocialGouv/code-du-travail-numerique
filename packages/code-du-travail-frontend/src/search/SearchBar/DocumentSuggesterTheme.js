import {theme} from "@socialgouv/cdtn-ui";
import React from "react"; // see https://github.com/moroshko/react-autosuggest#themeProp

// see https://github.com/moroshko/react-autosuggest#themeProp
export const suggesterTheme = {
  container: {
    flex: "1 1 auto",
  },
  suggestion: {
    borderRadius: "3px",
    cursor: "pointer",
    lineHeight: "2rem",
    listStyleType: "none",
    padding: theme.spacings.base,
  },
  suggestionHighlighted: {
    background: theme.colors.bgTertiary,
  },
  suggestionsList: {
    zIndex: 1,
    background: theme.colors.white,
    border: "1px solid " + theme.colors.border,
    borderRadius: "3px",
    boxShadow: "0 10px 10px -10px #b7bcdf",
    margin: 0,
    marginTop: theme.spacings.tiny,
    padding: 0,
  },
};
