import { fr } from "@codegouvfr/react-dsfr";
import { useState } from "react";
import { Autocomplete } from "../../common/Autocomplete";
import { SUGGEST_MAX_RESULTS } from "../../../config";
import { fetchSuggestResults } from "./fetchSuggestResults";

type HeaderSearchProps = {
  onSearchSubmit: (data: string) => void;
};

export const HeaderSearch = ({ onSearchSubmit }: HeaderSearchProps) => {
  const [value, setValue] = useState("");

  return (
    <div className={fr.cx("fr-header__tools")}>
      <div
        className={fr.cx("fr-header__search", "fr-modal")}
        id="fr-header-search-modal"
        data-fr-js-modal="true"
        data-fr-js-header-modal="true"
      >
        <div className={fr.cx("fr-container", "fr-container-lg--fluid")}>
          <button
            id="fr-header-search-close-button"
            className={fr.cx("fr-btn--close", "fr-btn")}
            aria-controls="fr-header-search-modal"
            title="Fermer"
            data-fr-js-modal-button="true"
          >
            Fermer
          </button>

          <form
            role="search"
            onSubmit={() => {
              onSearchSubmit(value);
            }}
          >
            <Autocomplete<string>
              label="Rechercher sur le site"
              placeholder="Rechercher sur le site"
              isSearch
              displayLabel={(data) => data ?? ""}
              search={async (input) => {
                try {
                  const results = await fetchSuggestResults(input).then(
                    (items) => items.slice(0, SUGGEST_MAX_RESULTS)
                  );
                  return results;
                } catch (error) {
                  console.log("Failed");
                  return [];
                }
              }}
              onInputValueChange={(value) => {
                setValue(value);
              }}
              onChange={(value) => {
                setValue(value ?? "");
                if (value) {
                  onSearchSubmit(value);
                }
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
