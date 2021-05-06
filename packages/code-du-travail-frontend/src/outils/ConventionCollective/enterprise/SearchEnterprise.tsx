import { Section } from "@socialgouv/cdtn-ui";
import { useRouter } from "next/router";
import pDebounce from "p-debounce";
import React, { useEffect, useState } from "react";
import { v4 as generateUUID } from "uuid";

import {
  Entreprise,
  searchEntreprises,
} from "../../../conventions/Search/api/entreprises.service";
import { matopush } from "../../../piwik";
import { createSuggesterHook, FetchReducerState } from "../common/Suggester";
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

const trackInput = pDebounce(
  (query: string, path: string, trackingUID: string) => {
    if (query.length > 1) {
      matopush([
        "trackEvent",
        "compagny_search",
        path,
        `${trackingUID} : ${query}`,
      ]);
    }
  },
  2000
);

const suggester = createSuggesterHook(searchEntreprises);

export function SearchEnterprise({ renderResults }: Props): JSX.Element {
  const [search, setSearch] = useState<SearchParams>({
    address: "",
    query: "",
  });
  const state = suggester(search.query, search.address);
  const [trackingUID, setTrackingUID] = useState("");
  const router = useRouter();
  useEffect(() => {
    // we want to connect events that are
    // related so we only generate an uuid on mount
    setTrackingUID(generateUUID());
  }, []);

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    trackInput(value, router.asPath, trackingUID);
    setSearch({ ...search, [name]: value });
  };

  return (
    <>
      <SearchEnterpriseInput
        query={search.query}
        address={search.address}
        onChange={searchInputHandler}
      />
      <Section>{renderResults(state, search)}</Section>
    </>
  );
}
