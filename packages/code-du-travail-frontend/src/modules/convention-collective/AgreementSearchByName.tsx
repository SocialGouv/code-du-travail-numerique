"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { useState } from "react";
import { css } from "../../../styled-system/css";

import { Autocomplete } from "../common/Autocomplete";
import { Agreement } from "../../outils/types";
import { searchAgreement } from "./agreement.service";
import Button from "@codegouvfr/react-dsfr/Button";
import { ButtonStyle } from "./style";

export const AgreementSearchByName = () => {
  const [searchState, setSearchState] = useState<
    "noSearch" | "lowSearch" | "errorSearch" | "fullSearch"
  >("noSearch");
  const [inputState, setInputState] = useState<"error" | "info" | undefined>(
    "info"
  );
  const getStateMessage = () => {
    switch (searchState) {
      case "noSearch":
        return (
          <>
            L’Identifiant de la Convention Collective (IDCC) est un numéro
            unique de 4 chiffres déterminant chaque convention collective
            (Ex&nbsp; : 1090 ou 1486).
            <br />
            Attention à ne pas confondre avec les codes APE (Activité Principale
            Exercée) ou NAF (Nomenclature des Activités Françaises) qui sont des
            numéros composés de 4 chiffres et d’une lettre dont l’objectif est
            d’identifier l’activité principale de l’entreprise (Ex : 4752A).
          </>
        );
      case "lowSearch":
        return (
          <>
            Indiquez au moins 3 caractères afin d&apos;affiner votre recherche
          </>
        );
      case "errorSearch":
        return (
          <>
            Aucune convention collective n&apos;a été trouvée.
            <br />
            Vérifiez l’orthographe de votre recherche ou le chiffre IDCC présent
            sur votre bulletin de paie
          </>
        );
    }
  };
  return (
    <>
      <p className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}>
        Précisez et sélectionnez votre convention collective
      </p>
      <div className={fr.cx("fr-mt-2w")}>
        <Autocomplete<Agreement>
          dataTestId="AgreementSearchAutocomplete"
          className={fr.cx("fr-col-12", "fr-mb-0")}
          hintText="Ex : transport routier ou 1486"
          label={
            <>
              Nom de la convention collective ou son numéro
              d’identification IDCC (4 chiffres)
            </>
          }
          classes={{
            label: css({
              "& > button": {
                padding: "0!",
                minHeight: "0!",
                maxHeight: "24px!",
                width: "24px!",
                marginLeft: "3px!",
              },
            }),
          }}
          state={inputState}
          stateRelatedMessage={getStateMessage()}
          displayLabel={(item) => {
            return item ? `${item.shortTitle} (IDCC ${item.num})` : "";
          }}
          lineAsLink={(item) => {
            return `/${getRouteBySource(SOURCES.CCN)}/${item.slug}`;
          }}
          search={searchAgreement}
          onSearch={(query, agreements) => {
            if (!agreements.length && !query) {
              setInputState("info");
              setSearchState("noSearch");
            } else if (!agreements.length && query.length <= 2) {
              setInputState("info");
              setSearchState("lowSearch");
            } else if (!agreements.length && query.length > 2) {
              setInputState("error");
              setSearchState("errorSearch");
            } else {
              setInputState(undefined);
              setSearchState("fullSearch");
            }
          }}
        />
        {inputState === "error" && (
          <Alert
            className={fr.cx("fr-mt-2w")}
            title="Vous ne trouvez pas votre convention collective ?"
            description={
              <>
                <p>Il peut y avoir plusieurs explications à cela :</p>
                <ul>
                  <li>
                    Votre convention collective a un autre code : si vous le
                    pouvez, utilisez le numéro Siret de votre entreprise. Ce
                    dernier doit être présent sur votre bulletin de paie.
                  </li>
                  <li>
                    Votre convention collective a un statut particulier :
                    administration ou établissements publics, associations,
                    secteur agricole, La Poste, La Croix Rouge etc.
                  </li>
                  <li>
                    Votre entreprise n’est rattachée à aucune convention
                    collective.
                  </li>
                </ul>
              </>
            }
            severity="info"
          />
        )}
      </div>
      <div className={fr.cx("fr-mt-2w")}>
        <Button
          linkProps={{ href: "/outils/convention-collective" }}
          priority="secondary"
          className={ButtonStyle}
        >
          Précédent
        </Button>
        {inputState === "error" && (
          <Button
            linkProps={{ href: `/outils/convention-collective/entreprise` }}
            priority="secondary"
            className={`${fr.cx("fr-ml-md-2w", "fr-mt-2w", "fr-mt-md-0")} ${ButtonStyle}`}
          >
            Rechercher par entreprise
          </Button>
        )}
      </div>
    </>
  );
};
