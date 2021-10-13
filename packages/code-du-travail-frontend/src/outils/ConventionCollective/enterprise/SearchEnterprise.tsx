import React, { ForwardedRef } from "react";

import {
  Enterprise,
  searchEnterprises,
} from "../../../conventions/Search/api/enterprises.service";
import { useNavContext } from "../common/NavContext";
import { createSuggesterHook, FetchReducerState } from "../common/Suggester";
import { useTrackingContext } from "../common/TrackingContext";
import { SearchEnterpriseInput } from "./SearchEnterpriseInput";

type Props = {
  renderResults: (
    renderProps: FetchReducerState<Enterprise[]>,
    params: SearchParams
  ) => JSX.Element;
  inputRef: ForwardedRef<HTMLDivElement>;
};

export type SearchParams = {
  address: string;
  query: string;
};

export function SearchEnterprise({
  renderResults,
  inputRef,
}: Props): JSX.Element {
  const { searchParams, setSearchParams } = useNavContext();

  const trackingContext = useTrackingContext();

  const useEnterpriseSuggester = createSuggesterHook(
    searchEnterprises,
    "enterprise_search",
    trackingContext
  );

  const state = useEnterpriseSuggester(
    searchParams.query,
    searchParams.address
  );

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearchParams({ ...searchParams, [name]: value });
  };

  return (
    <>
      <SearchEnterpriseInput
        ref={inputRef}
        query={searchParams.query}
        address={searchParams.address}
        onChange={searchInputHandler}
      />
      {renderResults(state, searchParams)}
    </>
  );
}
