import pDebounce from "p-debounce";
import React, { ForwardedRef, useEffect, useMemo, useState } from "react";

import {
  Agreement,
  searchAgreements,
} from "../../../conventions/Search/api/agreements.service";
import { createSuggesterHook, FetchReducerState } from "../common/Suggester";
import { useTrackingContext } from "../common/TrackingContext";
import { SearchAgreementInput } from "./SearchAgreementInput";

type Props = {
  renderResults: (
    renderProps: FetchReducerState<Agreement[]>,
    query: string
  ) => JSX.Element;
  inputRef: ForwardedRef<HTMLFormElement>;
};

const useAgreementSuggester = createSuggesterHook(searchAgreements);

export function SearchAgreement({
  renderResults,
  inputRef,
}: Props): JSX.Element {
  const [query, setQuery] = useState("");
  const state = useAgreementSuggester(query);
  const { trackEvent, title, uuid } = useTrackingContext();
  const debouncedTrackEvent = useMemo(
    () => pDebounce(trackEvent, 500),
    [trackEvent]
  );
  useEffect(() => {
    debouncedTrackEvent("cc_search", title, query, uuid);
  }, [query, debouncedTrackEvent, title, uuid]);

  const searchInputHandler = (keyEvent) => {
    const value = keyEvent.target.value;
    setQuery(value);
  };

  return (
    <>
      <SearchAgreementInput
        query={query}
        onChange={searchInputHandler}
        ref={inputRef}
      />
      {renderResults(state, query)}
    </>
  );
}
