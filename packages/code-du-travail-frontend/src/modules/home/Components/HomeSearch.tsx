import React, { useState } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { fetchSuggestResults } from "../../layout/header/fetchSuggestResults";
import { Autocomplete } from "../../common/Autocomplete";

type Props = {
  onSearchSubmit: (text: string) => void;
};

export const HomeSearch = (props: Props) => {
  const [query, setQuery] = useState("");

  const onSubmit = () => {
    props.onSearchSubmit(query);
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
          onChange={(value) => {
            value && setQuery(value);
          }}
          search={fetchSuggestResults}
        />
      </div>
      <div className={fr.cx("fr-col-12", "fr-col-md-4")}>
        <Button
          iconId="fr-icon-search-line"
          iconPosition="right"
          priority="primary"
          aria-label="Lancer la recherche"
          className={buttonStyle}
          onClick={() => props.onSearchSubmit(query)}
        >
          Rechercher
        </Button>
      </div>
    </form>
  );
};

const buttonStyle = css({
  mdDown: {
    width: "100% !important",
    display: "flex !important",
    justifyContent: "center !important",
  },
});
