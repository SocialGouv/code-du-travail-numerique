import { Section } from "@socialgouv/cdtn-ui";
import React, { useEffect, useState } from "react";

import {
  Agreement,
  searchConvention,
} from "../../../conventions/Search/api/convention.service";
import { createSuggesterHook, FetchReducerState } from "../common/Suggester";
import { useTrackingContext } from "../common/TrackingContext";
import { SearchAgreementInput } from "./SearchAgreementInput";

type Props = {
  renderResults: (
    renderProps: FetchReducerState<Agreement[]>,
    query: string
  ) => JSX.Element;
};

const useAgreementSuggester = createSuggesterHook(searchConvention);

export function SearchAgreement({ renderResults }: Props): JSX.Element {
  const [query, setQuery] = useState("");
  const state = useAgreementSuggester(query);
  const { trackEvent, title, uuid } = useTrackingContext();

  useEffect(() => {
    trackEvent("cc_search", title, query, uuid);
  }, [query, trackEvent, title, uuid]);

  const searchInputHandler = (keyEvent) => {
    const value = keyEvent.target.value;
    setQuery(value);
  };

  return (
    <>
      <SearchAgreementInput query={query} onChange={searchInputHandler} />
      <Section>{renderResults(state, query)}</Section>
    </>
  );
}
