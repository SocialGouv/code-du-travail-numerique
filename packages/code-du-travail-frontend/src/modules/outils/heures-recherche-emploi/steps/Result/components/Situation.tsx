import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import {
  useHeuresRechercheEmploiStore,
  HeuresRechercheEmploiContext,
} from "../../store";
import { useContext } from "react";

export const Situation: React.FC = () => {
  const store = useContext(HeuresRechercheEmploiContext);
  const { informationsData, agreementData } =
    useHeuresRechercheEmploiStore(store);

  // Récupérer les informations depuis publicodes
  const getPublicodesValue = (key: string) => {
    const info = informationsData.input.publicodesInformations?.find(
      (info) => info.question.name === key
    );
    return info?.info || "";
  };

  const situationEntries = [
    {
      label: "Type de contrat",
      value: getPublicodesValue("contrat_travail_type"),
    },
    {
      label: "Ancienneté",
      value: getPublicodesValue("contrat_travail_duree_anciennete"),
    },
    {
      label: "Convention collective",
      value: agreementData?.input?.agreement?.shortTitle || "Non renseignée",
    },
  ];

  return (
    <div className={fr.cx("fr-callout", "fr-callout--blue-cumulus")}>
      <h3 className={fr.cx("fr-callout__title")}>Votre situation</h3>
      <div className={fr.cx("fr-callout__text")}>
        <dl>
          {situationEntries.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
