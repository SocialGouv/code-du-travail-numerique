import React, { ForwardedRef, useState } from "react";

import { searchAgreements } from "../../../conventions/Search/api/agreements.service";
import { Agreement } from "../../../conventions/Search/api/type";
import { createSuggesterHook, FetchReducerState } from "../common/Suggester";
import { TrackingProps, UserAction } from "../types";
import { SearchAgreementInput } from "./SearchAgreementInput";

type Props = {
  embeddedForm: boolean;
  renderResults: (
    renderProps: FetchReducerState<Agreement[]>,
    query: string
  ) => JSX.Element;
  inputRef: ForwardedRef<HTMLFormElement>;
} & TrackingProps;

export function SearchAgreement({
  embeddedForm,
  renderResults,
  inputRef,
  onUserAction,
}: Props): JSX.Element {
  const [query, setQuery] = useState("");

  const useAgreementSuggester = createSuggesterHook(
    searchAgreements,
    (query) => {
      onUserAction(UserAction.SearchAgreement, { query });
    }
  );

  const state = useAgreementSuggester(query);

  const searchInputHandler = (keyEvent) => {
    const value = keyEvent.target.value;
    setQuery(value);
  };

  return (
    <>
      <SearchAgreementInput
        embeddedForm={embeddedForm}
        query={query}
        onChange={searchInputHandler}
        ref={inputRef}
      />
      {renderResults(state, query)}
    </>
  );
}
