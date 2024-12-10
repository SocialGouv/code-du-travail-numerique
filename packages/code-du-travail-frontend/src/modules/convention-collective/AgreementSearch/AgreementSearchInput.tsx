"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { ReactNode, useState } from "react";

import { Autocomplete } from "../../common/Autocomplete/Autocomplete";
import { Agreement } from "../../../outils/types";
import { searchAgreement } from "../search";
import { EnterpriseAgreement } from "../../enterprise";
import { useLocalStorageForAgreement } from "../../common/useLocalStorage";

type Props = {
  onSearch?: (query: string, value?: Agreement[]) => void;
  onAgreementSelect?: (agreement?: EnterpriseAgreement) => void;
  selectedAgreementAlert?: (
    agreement?: EnterpriseAgreement
  ) => NonNullable<ReactNode> | undefined;
};

export const AgreementSearchInput = ({
  onSearch,
  onAgreementSelect,
  selectedAgreementAlert,
}: Props) => {
  const [selectedAgreement, setSelectedAgreement] =
    useLocalStorageForAgreement();
  const [searchState, setSearchState] = useState<
    "noSearch" | "lowSearch" | "notFoundSearch" | "errorSearch" | "fullSearch"
  >("noSearch");
  const [error, setError] = useState("");
  const getStateMessage = () => {
    switch (searchState) {
      case "lowSearch":
        return (
          <>
            Indiquez au moins 3 caractères afin d&apos;affiner votre recherche
          </>
        );
      case "notFoundSearch":
        return (
          <>
            Aucune convention collective n&apos;a été trouvée.
            <br />
            Vérifiez l’orthographe de votre recherche ou le chiffre IDCC présent
            sur votre bulletin de paie
          </>
        );
      case "errorSearch":
        return <>{error}</>;
    }
  };
  const getInputState = () => {
    switch (searchState) {
      case "lowSearch":
        return "info";
      case "errorSearch":
      case "notFoundSearch":
        return "error";
    }
  };
  return (
    <>
      <p className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}>
        Précisez et sélectionnez votre convention collective
      </p>
      <div className={fr.cx("fr-mt-2w")}>
        <Autocomplete<EnterpriseAgreement>
          defaultValue={selectedAgreement ?? undefined}
          dataTestId="AgreementSearchAutocomplete"
          className={fr.cx("fr-col-12", "fr-mb-0")}
          hintText="Ex : transport routier ou 1486"
          label={
            <>
              Nom de la convention collective ou son numéro
              d’identification IDCC (4 chiffres)
            </>
          }
          state={getInputState()}
          stateRelatedMessage={getStateMessage()}
          onChange={(agreement) => {
            setSelectedAgreement(agreement);
            if (onAgreementSelect && agreement) {
              onAgreementSelect(agreement);
            }
          }}
          displayLabel={(item) => {
            return item ? `${item.shortTitle} (IDCC ${item.num})` : "";
          }}
          lineAsLink={
            !onAgreementSelect
              ? (item) => {
                  return `/${getRouteBySource(SOURCES.CCN)}/${item.slug}`;
                }
              : undefined
          }
          search={searchAgreement}
          onSearch={(query, agreements) => {
            if (onSearch) onSearch(query, agreements);
            if (!query) {
              setSearchState("noSearch");
            } else if (!agreements.length && query.length <= 2) {
              setSearchState("lowSearch");
            } else if (!agreements.length && query.length > 2) {
              setSearchState("notFoundSearch");
            } else {
              setSearchState("fullSearch");
            }
          }}
          onError={(message) => {
            setSearchState("errorSearch");
            setError(message);
          }}
        />
        {searchState === "notFoundSearch" && (
          <Alert
            className={fr.cx("fr-mt-2w")}
            title="Vous ne trouvez pas votre convention collective&nbsp;?"
            description={
              <>
                <p>Il peut y avoir plusieurs explications à cela&nbsp;:</p>
                <ul>
                  <li>
                    Votre convention collective a un autre code&nbsp;: si vous
                    le pouvez, utilisez le numéro Siret de votre entreprise. Ce
                    dernier doit être présent sur votre bulletin de paie.
                  </li>
                  <li>
                    Votre convention collective a un statut particulier&nbsp;:
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
        {selectedAgreement && selectedAgreementAlert?.(selectedAgreement) && (
          <Alert
            className={fr.cx("fr-mt-2w")}
            title="Nous n’avons pas de réponse pour cette convention collective"
            description={selectedAgreementAlert(selectedAgreement)}
            severity="warning"
          />
        )}
      </div>
    </>
  );
};
