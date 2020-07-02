import React from "react";
import styled from "styled-components";

const SuggestionsContainer = styled.div`
  li[role="option"]:nth-child(2n + 1) {
    background: #f7f7f7;
  }
`;

export const renderSuggestionsContainer = ({ containerProps, children }) => (
  <SuggestionsContainer {...containerProps}>{children}</SuggestionsContainer>
);

export const Suggestion = styled.div`
  width: 90%;
  padding: 5px;
  overflow: hidden;
  font-size: 0.9rem;
  text-decoration: underline;
  :hover {
    text-decoration: none;
  }
`;

// see https://github.com/moroshko/react-autosuggest#themeProp
export const suggesterTheme = {
  container: {
    position: "relative",
  },
  suggestionHighlighted: {
    background: "#eee",
  },
  suggestionsContainerOpen: {
    border: "1px solid silver",
    borderRadius: "3px",
    borderRopLeftRadius: 0,
    borderTopRightRadius: 0,
    boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.3)",
    left: 0,
    marginTop: "-3px",
    maxHeight: "300px",
    overflowY: "scroll",
    position: "absolute",
    right: 0,
  },
  suggestionsList: {
    background: "white",
    margin: 0,
    padding: 0,
  },
};
