"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Input from "@codegouvfr/react-dsfr/Input";
import { Agreement, ElasticAgreement } from "@socialgouv/cdtn-types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAllAgreements } from "./queries";

type Props = {
  navigationUrl?: string;
};

export const AgreementSearchByName = ({
  navigationUrl = "/outils/convention-collective",
}: Props) => {
  const [agreements, setAgreements] = useState<
    Pick<ElasticAgreement, "shortTitle">[]
  >([]);

  const handleChange = (event) => {
    const filterTitle = event.target.value;
    fetchAllAgreements({
      fields: ["shortTitle"],
      filterTitle,
      size: 10,
    }).then(setAgreements);
    // setAgreements(agreements);
  };

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
          nativeInputProps={{
            onChange: handleChange,
          }}
        />
        {JSON.stringify(agreements)}
      </div>
      <Link
        href={navigationUrl}
        className={`${fr.cx("fr-btn", "fr-btn--secondary", "fr-mt-2w")}`}
      >
        Précédent
      </Link>
    </>
  );
};
