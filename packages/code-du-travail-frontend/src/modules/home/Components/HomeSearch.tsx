import React, { useState } from "react";
import * as Sentry from "@sentry/nextjs";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { fetchSuggestResults } from "../../layout/header/fetchSuggestResults";
import { Autocomplete } from "../../common/Autocomplete";
import { SUGGEST_MAX_RESULTS } from "../../../config";
import { useRouter } from "next/navigation";
import { useSearchTracking } from "src/modules/recherche/tracking";

export const HomeSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();
  const { emitSearchEvent, emitSuggestionSelectionEvent } = useSearchTracking();

  const handleSearch = (searchTerm: string) => {
    emitSearchEvent(searchTerm.trim());
    router.push(`/recherche?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const search = async (inputValue: string) => {
    const results = await fetchSuggestResults(inputValue).then((items) =>
      items.slice(0, SUGGEST_MAX_RESULTS)
    );
    setSuggestions(results);
    return results;
  };

  const onError = (error: string) => {
    Sentry.captureMessage(
      "Échec lors de la récupération des suggestions - " + error
    );
  };

  const onSelectedItemChange = (value: string | undefined) => {
    if (value) {
      emitSuggestionSelectionEvent(query, value, suggestions);
      handleSearch(value);
    }
  };

  return (
    <form
      className={fr.cx(
        "fr-grid-row",
        "fr-grid-row--gutters",
        "fr-grid-row--bottom"
      )}
      role="search"
      onSubmit={onSubmit}
    >
      <div className={fr.cx("fr-col-12", "fr-col-md-8")}>
        <Autocomplete<string>
          hintText="par exemple : congés payés, durée de préavis"
          label={<>Recherchez par mots-clés</>}
          displayLabel={(item) => item ?? ""}
          onInputValueChange={(value) => {
            if (value) {
              setQuery(value);
            }
          }}
          onChange={onSelectedItemChange}
          search={search}
          onError={onError}
          dataTestId={"search-input"}
        />
      </div>
      <div className={fr.cx("fr-col-12", "fr-col-md-4")}>
        <Button
          iconId="fr-icon-search-line"
          iconPosition="right"
          priority="primary"
          nativeButtonProps={{
            "aria-label": "Lancer la recherche",
          }}
          className={buttonStyle}
          type="submit"
        >
          Rechercher
        </Button>
      </div>
    </form>
  );
};

const buttonStyle = css({
  mdDown: {
    width: "100%!",
    justifyContent: "center!",
  },
});
