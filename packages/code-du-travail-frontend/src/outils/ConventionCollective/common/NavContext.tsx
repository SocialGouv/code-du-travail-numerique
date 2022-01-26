import React, { createContext, useContext } from "react";

import { Enterprise } from "../../../conventions/Search/api/enterprises.service";

export enum ScreenType {
  intro = "introduction",
  agreement = "convention",
  enterprise = "entreprise",
  agreementSelection = "selection",
}

export type SearchParams = {
  query: string;
  address: string;
};

type NavContext = {
  enterprise: Enterprise | null;
  setEnterprise: (enterprise: Enterprise | null) => void;
  searchParams: SearchParams;
  setSearchParams: (search: SearchParams) => void;
};

export const navContext = createContext<NavContext>({
  enterprise: null,
  searchParams: { address: "", query: "" },
  setEnterprise: () => {
    /* nothing to do */
  },
  setSearchParams: () => {
    /* nothing to do */
  },
});

export function useNavContext(): NavContext {
  return useContext(navContext);
}

const { Provider } = navContext;
type Props = {
  enterprise: Enterprise | null;
  setEnterprise: (enterprise: Enterprise) => void;
  children: React.ReactNode;
  searchParams: SearchParams;
  setSearchParams: (search: SearchParams) => void;
};

export function NavProvider({
  enterprise,
  setEnterprise,
  children,
  searchParams,
  setSearchParams,
}: Props): JSX.Element {
  return (
    <Provider
      value={{
        enterprise,
        searchParams,
        setEnterprise,
        setSearchParams,
      }}
    >
      {children}
    </Provider>
  );
}
