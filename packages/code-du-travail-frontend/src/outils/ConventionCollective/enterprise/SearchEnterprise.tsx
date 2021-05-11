import pDebounce from "p-debounce";
import React, { useEffect, useMemo, useState } from "react";

import {
  Enterprise,
  searchEnterprises,
} from "../../../conventions/Search/api/enterprises.service";
import { createSuggesterHook, FetchReducerState } from "../common/Suggester";
import { useTrackingContext } from "../common/TrackingContext";
import { SearchEnterpriseInput } from "./SearchEnterpriseInput";

type Props = {
  renderResults: (
    renderProps: FetchReducerState<Enterprise[]>,
    params: SearchParams
  ) => JSX.Element;
};

export type SearchParams = {
  address: string;
  query: string;
};

const useEnterpriseSuggester = createSuggesterHook(searchEnterprises);

export function SearchEnterprise({ renderResults }: Props): JSX.Element {
  const [search, setSearch] = useState<SearchParams>({
    address: "",
    query: "",
  });
  const state = useEnterpriseSuggester(search.query, search.address);
  const { trackEvent, title, uuid } = useTrackingContext();
  const debouncedTrackEvent = useMemo(() => pDebounce(trackEvent, 1000), [
    trackEvent,
  ]);
  const { query, address } = search;

  useEffect(() => {
    let fullquery = query;
    if (address) {
      fullquery += `##${address}`;
    }
    debouncedTrackEvent("enterprise_search", title, fullquery, uuid);
  }, [query, address, debouncedTrackEvent, title, uuid]);

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearch({ ...search, [name]: value });
  };

  return (
    <>
      <SearchEnterpriseInput
        query={search.query}
        address={search.address}
        onChange={searchInputHandler}
      />
      {renderResults(state, search)}
    </>
  );
}
