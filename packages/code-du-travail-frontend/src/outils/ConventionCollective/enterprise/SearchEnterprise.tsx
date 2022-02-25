import React, { ForwardedRef } from "react";

import {
  Enterprise,
  searchEnterprises,
} from "../../../conventions/Search/api/enterprises.service";
import { createSuggesterHook, FetchReducerState } from "../common/Suggester";
import { TrackingProps, UserAction } from "../types";
import { SearchEnterpriseInput } from "./SearchEnterpriseInput";

type Props = {
  embeddedForm: boolean;
  renderResults: (
    renderProps: FetchReducerState<Enterprise[]>,
    params: SearchParams
  ) => JSX.Element;
  inputRef: ForwardedRef<HTMLFormElement>;
  searchParams: SearchParams;
  onSearchParamsChange: (params: SearchParams) => void;
} & TrackingProps;

export type SearchParams = {
  address: string;
  query: string;
};

export function SearchEnterprise({
  renderResults,
  inputRef,
  searchParams,
  onSearchParamsChange,
  embeddedForm,
  onUserAction,
}: Props): JSX.Element {
  const useEnterpriseSuggester = createSuggesterHook(
    searchEnterprises,
    (query, address) => {
      onUserAction(UserAction.SearchEnterprise, { address, query });
    }
  );

  const state = useEnterpriseSuggester(
    searchParams.query,
    searchParams.address
  );

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    onSearchParamsChange({ ...searchParams, [name]: value });
  };

  return (
    <>
      <SearchEnterpriseInput
        embeddedForm={embeddedForm}
        ref={inputRef}
        query={searchParams.query}
        address={searchParams.address}
        onChange={searchInputHandler}
      />
      {renderResults(state, searchParams)}
    </>
  );
}
