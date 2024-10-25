"use client";
import { ContainerSimulator } from "../../layout/ContainerSimulator";
import { RelatedItem } from "../../documents";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import AgreementSearch from "../../convention-collective/AgreementSearch.svg";
import { Highlight } from "@codegouvfr/react-dsfr/Highlight";
import { css } from "../../../../styled-system/css";
import Button from "@codegouvfr/react-dsfr/Button";
import { useState } from "react";
import SearchBar from "@codegouvfr/react-dsfr/SearchBar";
import Input from "@codegouvfr/react-dsfr/Input";

type Props = {
  relatedItems: {
    items: RelatedItem[];
    title: string;
  }[];
  description: string;
};

export const FindAgreement = ({ relatedItems, description }: Props) => {
  const [mode, setMode] = useState<"intro" | "agreement" | "entreprise">(
    "agreement"
  );
  const getModeElement = () => {
    switch (mode) {
      case "intro":
        return (
          <>
            <Highlight size="lg">
              <span className={fr.cx("fr-text--bold")}>
                La réponse dépend de la convention collective à laquelle votre
                entreprise est rattachée. Veuillez renseigner votre situation
                afin d&apos;obtenir une réponse adaptée.
              </span>
            </Highlight>
            <div
              className={`${fr.cx(
                "fr-grid-row",
                "fr-grid-row--center",
                "fr-px-0",
                "fr-px-md-4w",
                "fr-px-1w",
                "fr-mt-2w",
                "fr-mb-0"
              )}`}
            >
              <Button
                className={`${fr.cx(
                  "fr-btn",
                  "fr-btn--icon-right",
                  "fr-icon-arrow-right-line",
                  "fr-px-9v",
                  "fr-col-12",
                  "fr-col-md-3",
                  "fr-mr-md-6w",
                  "fr-mb-md-0",
                  "fr-mb-2w",
                  "fr-btns-group--center"
                )}`}
                onClick={() => {
                  setMode("agreement");
                }}
              >
                Je connais ma convention collective je la saisis
              </Button>
              <Button
                className={`${fr.cx("fr-btn", "fr-btn--icon-right", "fr-icon-arrow-right-line", "fr-col-12", "fr-col-md-3", "fr-px-6v", "fr-mr-md-6w", "fr-btns-group--center")}`}
                onClick={() => {
                  setMode("entreprise");
                }}
              >
                Je cherche mon entreprise pour trouver ma convention collective
              </Button>
              <Button
                className={`${fr.cx("fr-btn", "fr-btn--icon-right", "fr-icon-arrow-right-line", "fr-col-12", "fr-col-md-3", "fr-px-6v")}`}
                priority="tertiary"
              >
                Afficher les informations sans sélectionner une convention
                collective
              </Button>
            </div>
          </>
        );
      case "agreement":
        return (
          <>
            <p className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}>
              Précisez et sélectionnez votre convention collective
            </p>
            <div className={fr.cx("fr-grid-row", "fr-mt-2w")}>
              <Input
                className={fr.cx("fr-col-12", "fr-mb-0")}
                hintText="Ex : transport routier ou 1486"
                label="Nom de la convention collective ou son numéro d’identification IDCC (4 chiffres)"
                state="default"
                stateRelatedMessage="Text de validation / d'explication de l'erreur"
              />
            </div>
            <Button priority="tertiary" className={fr.cx("fr-mt-2w")}>
              Précédent
            </Button>
          </>
        );
      case "entreprise":
        return (
          <>
            <p className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}>
              Précisez votre entreprise
            </p>
            <div className={fr.cx("fr-grid-row", "fr-mt-2w", "fr-mb-0")}>
              <Input
                className={fr.cx(
                  "fr-col-12",
                  "fr-col-md-5",
                  "fr-mt-3w",
                  "fr-mb-0"
                )}
                hintText="Ex : Café de la mairie ou 40123778000127"
                label="Nom de votre entreprise ou numéro Siren/Siret"
                state="default"
                stateRelatedMessage="Text de validation / d'explication de l'erreur"
              />
              <Input
                className={fr.cx(
                  "fr-col-12",
                  "fr-col-md-2",
                  "fr-ml-3w",
                  "fr-mb-0"
                )}
                hintText="Ex : 75007"
                label="Code postal ou Ville (optionnel)"
                state="default"
                stateRelatedMessage="Text de validation / d'explication de l'erreur"
              />
              <div className={`${fr.cx("fr-col-2", "fr-ml-3w", "fr-mt-10w")}`}>
                <Button
                  className={`${fr.cx("fr-btn--icon-right", "fr-icon-search-line")}`}
                >
                  Rechercher
                </Button>
              </div>
            </div>
            <Button priority="tertiary" className={fr.cx("fr-mt-2w")}>
              Précédent
            </Button>
          </>
        );
    }
  };
  return (
    <ContainerSimulator
      relatedItems={relatedItems}
      title="Trouver sa convention collective"
      description={description}
      segments={[{ label: "Simulateurs", linkProps: { href: "/outils" } }]}
    >
      <div
        id="convention-collective"
        className={`${fr.cx("fr-p-3w", "fr-mb-6w")} ${block}`}
      >
        <div className={"fr-grid-row"}>
          <Image
            priority
            src={AgreementSearch}
            alt="Trouver sa convention collective"
            className={fr.cx("fr-unhidden-md", "fr-hidden")}
          />
          <h1 className={fr.cx("fr-h3", "fr-mt-1w", "fr-mb-1w")}>
            Trouver sa convention collective
          </h1>
        </div>
        <div>{getModeElement()}</div>
      </div>
    </ContainerSimulator>
  );
};

const block = css({
  background: "var(--background-alt-blue-cumulus) !important",
});
