import React, { useCallback, useState } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import Input from "@codegouvfr/react-dsfr/Input";
import Button from "@codegouvfr/react-dsfr/Button";
import { sendEvent } from "../utils";
import { css } from "@styled-system/css";
import { AccessibleAlert } from "../outils/common/components/AccessibleAlert";

type Props = {
  idcc: string;
  shortTitle: string;
};

export function LegiFranceSearch({ idcc, shortTitle }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const q = query.trim();
      if (!q) return;

      sendEvent({ category: "pagecc_searchcc", action: shortTitle, name: q });

      const params = new URLSearchParams({
        rawQuery: q,
        idcc,
        tab_selection: "kali",
        searchField: "ALL",
        query: q,
        searchType: "ALL",
        typePagination: "DEFAUT",
        sortValue: "PERTINENCE",
        pageSize: "10",
        page: "1",
      });

      const url = `https://www.legifrance.gouv.fr/search/kali?${params.toString()}`;

      window.open(url, "_blank", "noopener,noreferrer");
    },
    [query, idcc, shortTitle]
  );

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
        onSubmit={handleSubmit}
        role="search"
        className={fr.cx("fr-mb-3w")}
        data-testid="agreement-search-form"
      >
        <div className={fr.cx("fr-search-bar", "fr-col-md-8", "fr-col-12")}>
          <Input
            label="Recherchez dans la convention collective sur Légifrance"
            hideLabel
            nativeInputProps={{
              onChange: (e) => setQuery(e.target.value),
              value: query,
              placeholder: "Rechercher sur Légifrance",
              type: "search",
              autoComplete: "off",
              name: "rawQuery",
              id: "search-agreement",
              // @ts-ignore
              "data-testid": "agreement-search-input",
              "aria-describedby": "search-description",
            }}
            className={`${fr.cx("fr-mb-0")} ${inputStyle}`}
          />

          <Button
            type="submit"
            iconId="fr-icon-search-line"
            nativeButtonProps={{
              title:
                "Lancer la recherche dans la convention collective sur Légifrance (nouvelle fenêtre)",
              "data-testid": "agreement-search-button",
            }}
          >
            Lancer la recherche dans la convention collective sur Légifrance
            (nouvelle fenêtre)
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
