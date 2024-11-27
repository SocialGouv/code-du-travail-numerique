"use client";
import { ApiGeoResult, searchCities } from "./searchCities";
import {
  Autocomplete,
  AutocompleteProps,
} from "../common/Autocomplete/Autocomplete";
import { useState } from "react";

type Props = Pick<AutocompleteProps<ApiGeoResult>, "classes"> & {
  className?: string;
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
  className,
  onLocationChange,
  classes,
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
      className={className}
      onChange={(value) => {
        if (onLocationChange) onLocationChange(value);
      }}
      onInputValueChange={(value) => {
        console.log("value", value);
        setPostalCode(detectIfPostalCode(value) ? value : undefined);
      }}
      displayLabel={itemToString}
      search={searchCities}
      hintText={"Ex: 75007"}
      label={<>Code&nbsp;postal&nbsp;ou&nbsp;Ville&nbsp;(optionnel)</>}
      state={"default"}
      dataTestId={"locationSearchAutocomplete"}
      classes={classes}
      displayNoResult
      defaultValue={defaultValue}
    />
  );
};
