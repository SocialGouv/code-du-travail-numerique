import React, { useState } from "react";
import * as Sentry from "@sentry/nextjs";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { fetchSuggestResults } from "../../layout/header/fetchSuggestResults";
import { Autocomplete } from "../../common/Autocomplete";
import { SUGGEST_MAX_RESULTS } from "../../../config";
import { useLayoutTracking } from "../../layout/tracking";

type Props = {
  onSearchSubmit: (text: string) => void;
};

export const HomeSearch = (props: Props) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { emitSuggestionEvent } = useLayoutTracking();

  const onSubmit = () => {
    props.onSearchSubmit(query);
  };

  const search = async (inputValue: string) => {
    const results = await fetchSuggestResults(inputValue).then((items) =>
      items.slice(0, SUGGEST_MAX_RESULTS)
    );
    setSuggestions(results);
    return results;
  };
  const onError = (error: string) => {
    console.error("Echec lors de la récupération des suggestions", error);
    Sentry.captureMessage("Echec lors de la récupération des suggestions");
  };
  const onSelectedItemChange = (value) => {
    if (value) {
      setQuery(value);
      emitSuggestionEvent(query, value, suggestions);
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
            setQuery(value);
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
          aria-label="Lancer la recherche"
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
