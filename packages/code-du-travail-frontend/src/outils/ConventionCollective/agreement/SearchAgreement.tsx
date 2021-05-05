import { Section } from "@socialgouv/cdtn-ui";
import { useRouter } from "next/router";
import pDebounce from "p-debounce";
import React, { useEffect, useState } from "react";
import { v4 as generateUUID } from "uuid";

import {
  Agreement,
  searchConvention,
} from "../../../conventions/Search/api/convention.service";
import { matopush } from "../../../piwik";
import { createSuggesterHook, FetchReducerState } from "../common/Suggester";
import { SearchAgreementInput } from "./SearchAgreementInput";

type Props = {
  renderResults: (
    renderProps: FetchReducerState<Agreement[]>,
    query: string
  ) => JSX.Element;
};

const trackInput = pDebounce(
  (query: string, path: string, trackingUID: string) => {
    if (query.length > 1) {
      matopush(["trackEvent", "cc_search", path, `${trackingUID} : ${query}`]);
    }
  },
  2000
);

const suggester = createSuggesterHook(searchConvention);

export function SearchAgreement({ renderResults }: Props): JSX.Element {
  const [query, setQuery] = useState("");
  const state = suggester(query);
  const [trackingUID, setTrackingUID] = useState("");
  const router = useRouter();
  useEffect(() => {
    // we want to connect events that are
    // related so we only generate an uuid on mount
    setTrackingUID(generateUUID());
  }, []);

  const searchInputHandler = (keyEvent) => {
    const value = keyEvent.target.value;
    trackInput(value, router.asPath, trackingUID);
    setQuery(value);
  };

  return (
    <>
      <SearchAgreementInput query={query} onChange={searchInputHandler} />
      <Section>{renderResults(state, query)}</Section>
    </>
  );
}
