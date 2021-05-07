import { Section } from "@socialgouv/cdtn-ui";
import React, { useEffect, useState } from "react";

import {
  Entreprise,
  searchEntreprises,
} from "../../../conventions/Search/api/entreprises.service";
import { createSuggesterHook, FetchReducerState } from "../common/Suggester";
import { useTrackingContext } from "../common/TrackingContext";
import { SearchEnterpriseInput } from "./SearchEnterpriseInput";

type Props = {
  renderResults: (
    renderProps: FetchReducerState<Entreprise[]>,
    params: SearchParams
  ) => JSX.Element;
};

export type SearchParams = {
  address: string;
  query: string;
};

const useEntrepriseSuggester = createSuggesterHook(searchEntreprises);

export function SearchEnterprise({ renderResults }: Props): JSX.Element {
  const [search, setSearch] = useState<SearchParams>({
    address: "",
    query: "",
  });
  const state = useEntrepriseSuggester(search.query, search.address);

  const { trackEvent, title, uuid } = useTrackingContext();

  const { query, address } = search;

  useEffect(() => {
    let fullquery = query;
    if (address) {
      fullquery += `##${address}`;
    }
    trackEvent("enterprise_search", title, fullquery, uuid);
  }, [query, address, trackEvent, title, uuid]);

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
