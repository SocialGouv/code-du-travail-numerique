"use client";
import { useEffect, useRef, useState } from "react";
import { searchEnterprises } from "../queries";
import { Enterprise } from "../types";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { ApiGeoResult } from "./searchCities";
import { getEnterpriseAgreements } from "./utils";
import { useEnterpriseAgreementSearchTracking } from "./tracking";

type SearchState =
  | "noSearch"
  | "notFoundSearch"
  | "errorSearch"
  | "fullSearch"
  | "required";

type Params = {
  defaultSearch?: string;
  defaultLocation?: ApiGeoResult;
  trackingActionName: string;
  agreement?: Agreement;
  enterprise?: Enterprise;
};

export const useEnterpriseAgreementSearch = ({
  defaultSearch,
  defaultLocation,
  trackingActionName,
  agreement,
  enterprise,
}: Params) => {
  const [selectedAgreement, setSelectedAgreement] = useState<
    Agreement | undefined
  >(agreement);
  const [searchState, setSearchState] = useState<SearchState>("noSearch");
  const tracking = useEnterpriseAgreementSearchTracking();

  const [search, setSearch] = useState<string | undefined>(defaultSearch);
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<ApiGeoResult | undefined>(
    defaultLocation
  );
  const [enterprises, setEnterprises] = useState<Enterprise[]>();
  const [selectedEnterprise, setSelectedEnterprise] = useState<
    Enterprise | undefined
  >(enterprise);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLHeadingElement>(null);
  const selectedConventionTitleRef = useRef<HTMLParagraphElement>(null);

  const getStateMargin = (): string => {
    switch (searchState) {
      case "notFoundSearch":
        return "fr-mb-14v";
      case "errorSearch":
      case "required":
        return "fr-mb-9v";
    }
    return "fr-mb-0";
  };

  const getInputState = (): "error" | undefined => {
    switch (searchState) {
      case "errorSearch":
      case "notFoundSearch":
      case "required":
        return "error";
    }
  };

  const getQueries = (): string => {
    const jsonString = location ? JSON.stringify(location) : "";
    const base64String = jsonString
      ? btoa(
          encodeURIComponent(jsonString).replace(
            /%([0-9A-F]{2})/g,
            (_match, p1) => String.fromCharCode(parseInt(p1, 16))
          )
        )
      : "";
    return (
      "?q=" +
      encodeURIComponent(search ?? "") +
      (base64String ? "&cp=" + base64String : "")
    );
  };

  const onSubmit = async () => {
    if (!search) {
      setSearchState("required");
      return;
    }
    tracking.emitEnterpriseAgreementSearchInputEvent(
      trackingActionName,
      search,
      location
    );
    setLoading(true);
    try {
      const result = await searchEnterprises({
        query: search,
        codesPostaux: location?.codesPostaux,
      });
      setSearchState(!result.length ? "errorSearch" : "fullSearch");
      setSearchState(
        search.length > 0 && !result.length ? "notFoundSearch" : "noSearch"
      );
      setEnterprises(result);
    } catch (e) {
      setSearchState("errorSearch");
      setEnterprises(undefined);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (defaultSearch) {
      onSubmit();
    }
  }, [defaultSearch]);

  useEffect(() => {
    if (selectedEnterprise?.conventions?.length === 1) {
      const [enterpriseAgreement] = getEnterpriseAgreements(
        selectedEnterprise.conventions
      );
      setSelectedAgreement(enterpriseAgreement);
    }
  }, [selectedEnterprise]);

  useEffect(() => {
    resultRef.current?.focus();
  }, [enterprises]);

  useEffect(() => {
    if (agreement) {
      setSelectedAgreement(agreement);
    }
  }, [agreement]);

  useEffect(() => {
    if (enterprise) {
      setSelectedEnterprise(enterprise);
    }
  }, [enterprise]);

  return {
    search,
    setSearch,
    location,
    setLocation,
    enterprises,
    loading,
    selectedEnterprise,
    setSelectedEnterprise,
    selectedAgreement,
    setSelectedAgreement,
    searchState,
    error,
    resultRef,
    selectedConventionTitleRef,
    getStateMargin,
    getInputState,
    getQueries,
    onSubmit,
    tracking,
  };
};
