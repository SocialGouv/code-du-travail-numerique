"use client";

import { Input } from "@codegouvfr/react-dsfr/Input";
import Image from "next/image";
import { useState } from "react";
import { useNeedMoreInfoEvents } from "./tracking";
import servicesDeRenseignement from "../../../data/services-de-renseignement.json";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "../../../../styled-system/css";

type ServiceRenseignement = {
  name: string;
  url: string;
};

export function PopupContent() {
  const [department, setDepartment] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [result, setResult] = useState<undefined | ServiceRenseignement>(
    undefined
  );
  const { emitTrackNumber } = useNeedMoreInfoEvents();

  const onSearchInput = () => {
    const departmentNum = (department.replace(/^0+/, "") || "").toLowerCase();
    const departmentData = servicesDeRenseignement[departmentNum];
    setResult(departmentData);
    setHasSearched(true);
  };

  const onClickLinkPhoneNumber = () => {
    emitTrackNumber();
  };

  return (
    <>
      <h2 className={fr.cx("fr-h5")}>Contact téléphonique</h2>
      <a href="tel:+33806000126" onClick={onClickLinkPhoneNumber}>
        <Image
          src="/static/assets/img/srdt.svg"
          alt="Contactez les services de renseignements au droit du travail au 0800 026 080"
          width={350}
          height={100}
        />
      </a>
      <h2 className={fr.cx("fr-h5", "fr-mt-3w")}>
        Contact par email et prise de rendez-vous
      </h2>
      <Input
        id="search-service"
        label="Saisissez le numéro de votre département"
        nativeInputProps={{
          maxLength: 3,
          onChange: (e) => setDepartment(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              onSearchInput();
            }
          },
        }}
        addon={
          <Button
            iconId="fr-icon-search-line"
            onClick={onSearchInput}
            title="Lancer la recherche par numéro de département"
          />
        }
        classes={{
          nativeInputOrTextArea: inputCss,
        }}
      />
      {result && (
        <a className={fr.cx("fr-link")} href={result.url} target="_blank">
          {result.url}
        </a>
      )}
      {hasSearched && !result && (
        <p className={fr.cx("fr-error-text", "fr-text--md")}>
          Aucun service de renseignement n&apos;a été trouvé pour ce
          département.
        </p>
      )}
      <div className={fr.cx("fr-mt-3w")}>
        <p className={fr.cx("fr-text--sm", "fr-mb-0")}>
          Attention, ces services délivrent une information juridique, ils ne
          sont pas compétents pour :
        </p>
        <ul>
          <li className={fr.cx("fr-text--sm", "fr-mb-0")}>
            les demandes d&apos;intervention en entreprise
          </li>
          <li className={fr.cx("fr-text--sm", "fr-mb-0")}>
            la constitution des dossiers prud’homaux
          </li>
          <li className={fr.cx("fr-text--sm", "fr-mb-0")}>
            les calculs de droit au chômage
          </li>
          <li className={fr.cx("fr-text--sm", "fr-mb-0")}>
            vous renseigner sur les cotisations sociales
          </li>
        </ul>
      </div>
    </>
  );
}

const inputCss = css({
  maxWidth: "280px",
});
