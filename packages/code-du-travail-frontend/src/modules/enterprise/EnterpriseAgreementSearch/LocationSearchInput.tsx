"use client";
import { Autocomplete, AutocompleteProps } from "../../common/Autocomplete";
import { useState } from "react";
import { ApiGeoResult, searchCities } from "./searchCities";

type Props = Pick<AutocompleteProps<ApiGeoResult>, "classes"> & {
  onLocationChange?: (location: ApiGeoResult | undefined) => void;
  defaultValue?: ApiGeoResult;
};

const detectIfPostalCode = (postalCodeOrName: string): boolean => {
  if (/^\d{5}$/.test(postalCodeOrName)) {
    return true;
  }
  return false;
};

export const LocationSearchInput = ({
  onLocationChange,
  defaultValue,
}: Props) => {
  const [postalCode, setPostalCode] = useState<string | undefined>();

  function itemToString(item: ApiGeoResult | null) {
    return item
      ? `${item.nom} (${postalCode ?? (item.codesPostaux.length > 1 ? item.codeDepartement : item.codesPostaux[0])})`
      : "";
  }

  return (
    <Autocomplete<ApiGeoResult>
      id="location-search-autocomplete"
      onChange={(value) => {
        if (onLocationChange) onLocationChange(value);
      }}
      onInputValueChange={(value) => {
        setPostalCode(detectIfPostalCode(value) ? value : undefined);
      }}
      displayLabel={itemToString}
      search={searchCities}
      hintText={"Ex: 75007"}
      label={<>Code postal ou Ville</>}
      state={"default"}
      dataTestId={"locationSearchAutocomplete"}
      displayNoResult
      defaultValue={defaultValue}
    />
  );
};
