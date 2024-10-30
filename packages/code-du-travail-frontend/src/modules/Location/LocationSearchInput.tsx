"use client";
import { ApiGeoResult, searchCities } from "./searchCities";
import { Autocomplete } from "../common/Autocomplete";

type Props = {
  className?: string;
  onLocationChange?: (location: ApiGeoResult | undefined) => void;
};

export const LocationSearchInput = ({ className, onLocationChange }: Props) => {
  function itemToString(item: ApiGeoResult | null) {
    return item
      ? `${item.nom} (${item.codesPostaux.length > 1 ? item.codeDepartement : item.codesPostaux[0]})`
      : "";
  }

  return (
    <>
      <Autocomplete<ApiGeoResult>
        className={className}
        onChange={(value) => {
          if (onLocationChange) onLocationChange(value);
        }}
        displayLabel={itemToString}
        search={searchCities}
        hintText="Ex: 75007"
        label="Code postal ou Ville (optionnel)"
        state="default"
      ></Autocomplete>
    </>
  );
};
