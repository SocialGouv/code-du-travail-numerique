import React, { useCallback, useState } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import Input from "@codegouvfr/react-dsfr/Input";
import Button from "@codegouvfr/react-dsfr/Button";
import { push as matopush } from "@socialgouv/matomo-next";
import { css } from "@styled-system/css";
import { AccessibleAlert } from "../outils/common/components/AccessibleAlert";

type Props = {
  idcc: string;
  shortTitle: string;
};

export function LegiFranceSearch({ idcc, shortTitle }: Props) {
  const [query, setQuery] = useState("");

  const trackSearch = useCallback(() => {
    matopush(["trackEvent", "pagecc_searchcc", shortTitle, query]);
  }, [query, shortTitle]);

  return (
    <div
      className={fr.cx("fr-mt-6w", "fr-mb-6w")}
      data-testid="agreement-search-container"
    >
      <div className={fr.cx("fr-mb-3w")}>
        <h2 data-testid="agreement-search-title">
          Recherche dans la convention collective
        </h2>
        <p id="search-description" data-testid="agreement-search-description">
          Recherchez par mots clés dans le texte de la convention collective sur
          le site Légifrance.
        </p>
      </div>

      <form
        action="https://www.legifrance.gouv.fr/search/kali"
        onSubmit={trackSearch}
        role="search"
        className={fr.cx("fr-mb-3w")}
        target="_blank"
        data-testid="agreement-search-form"
      >
        <div className={fr.cx("fr-search-bar", "fr-col-md-8", "fr-col-12")}>
          <Input
            label="Recherchez dans la convention collective sur Légifrance"
            hideLabel
            nativeInputProps={
              {
                onChange: (e) => setQuery(e.target.value),
                id: "search-agreement",
                type: "search",
                autoComplete: "off",
                name: "rawQuery",
                value: query,
                placeholder: "Rechercher sur Légifrance",
                "data-testid": "agreement-search-input",
                "aria-describedby": "search-description",
              } as any
            }
            className={`${fr.cx("fr-mb-0")} ${inputStyle}`}
          />
          <input
            type="hidden"
            name="idcc"
            value={idcc}
            data-testid="agreement-search-idcc"
          />
          <input
            type="hidden"
            name="tab_selection"
            value="kali"
            data-testid="agreement-search-tab"
          />
          <input
            type="hidden"
            name="searchField"
            value="ALL"
            data-testid="agreement-search-field"
          />
          <input
            type="hidden"
            name="query"
            value={encodeURIComponent(query)}
            data-testid="agreement-search-query"
          />
          <input
            type="hidden"
            name="searchType"
            value="ALL"
            data-testid="agreement-search-type"
          />
          <input
            type="hidden"
            name="typePagination"
            value="DEFAUT"
            data-testid="agreement-search-pagination-type"
          />
          <input
            type="hidden"
            name="sortValue"
            value="PERTINENCE"
            data-testid="agreement-search-sort"
          />
          <input
            type="hidden"
            name="pageSize"
            value="10"
            data-testid="agreement-search-pagesize"
          />
          <input
            type="hidden"
            name="page"
            value="1"
            data-testid="agreement-search-page"
          />

          <Button
            type="submit"
            iconId="fr-icon-search-line"
            nativeButtonProps={{
              title:
                "Lancer la recherche dans la convention collective sur Légifrance (nouvelle fenêtre)",
              "aria-label":
                "Lancer la recherche dans la convention collective sur Légifrance (nouvelle fenêtre)",
              "data-testid": "agreement-search-button",
            }}
          >
            Rechercher
          </Button>
        </div>
      </form>

      <AccessibleAlert
        severity="info"
        small
        className={["fr-mb-0"]}
        description="Selon le thème, un accord collectif d'entreprise peut prévoir des règles différentes par rapport à la convention collective."
        data-testid="agreement-search-alert"
      />
    </div>
  );
}

const inputStyle = css({
  width: "100%!",
});
