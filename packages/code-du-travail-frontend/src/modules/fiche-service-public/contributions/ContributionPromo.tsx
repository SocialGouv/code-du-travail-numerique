"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import DocumentSearch from "@codegouvfr/react-dsfr/picto/DocumentSearch";
import { css } from "@styled-system/css";

import Title from "../builder/components/Title";
import {
  buildContributionEnterprisePath,
  ENTERPRISE_SEARCH_PARAM,
} from "../../contributions/contributionUtils";

type Props = {
  contributionSlug: string;
  /** Niveau de titre courant dans la fiche (cf. ElementBuilder). */
  headingLevel?: number;
};

export const REQUIRED_ENTERPRISE_ERROR =
  "Le nom de l'entreprise doit être renseigné";

/**
 * POC — bloc de mise en avant d'une contribution dans une fiche service-public.
 * L'entreprise saisie est transmise à la contribution en query string : la
 * fiche générique pré-coche alors le parcours « Je cherche mon entreprise »,
 * préremplit le champ et lance la recherche (cf. ContributionGeneric).
 *
 * Accessibilité : champ obligatoire (`required`), erreur reliée au champ par
 * `aria-describedby` (via le composant Input DSFR) et `aria-invalid`, focus
 * ramené sur le champ en erreur. `noValidate` évite la bulle native du
 * navigateur au profit de ce message ; sans JavaScript, le formulaire reste
 * fonctionnel (`action` + `name`).
 */
export const ContributionPromo = ({
  contributionSlug,
  headingLevel = 0,
}: Props) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [enterprise, setEnterprise] = useState("");
  const [error, setError] = useState<string>();
  const inputId = `contribution-promo-${contributionSlug}`;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!enterprise.trim()) {
      setError(REQUIRED_ENTERPRISE_ERROR);
      inputRef.current?.focus();
      return;
    }
    router.push(buildContributionEnterprisePath(contributionSlug, enterprise));
  };

  return (
    <div
      className={`${fr.cx("fr-p-3w", "fr-my-3w")} ${block}`}
      data-testid="contribution-promo"
    >
      <div className={`${fr.cx("fr-mb-2w")} ${header}`}>
        <DocumentSearch fontSize="2.5rem" aria-hidden />
        <Title level={headingLevel} className={fr.cx("fr-h5", "fr-mb-0")}>
          Une réponse plus précise, saisissez votre entreprise !
        </Title>
      </div>
      <form
        method="get"
        action={buildContributionEnterprisePath(contributionSlug)}
        noValidate
        onSubmit={onSubmit}
      >
        <Input
          label="Nom de l’entreprise ou n° SIRET (obligatoire)"
          state={error ? "error" : "default"}
          stateRelatedMessage={error}
          nativeInputProps={{
            ref: inputRef,
            id: inputId,
            name: ENTERPRISE_SEARCH_PARAM,
            type: "text",
            autoComplete: "off",
            required: true,
            "aria-invalid": error ? true : undefined,
            value: enterprise,
            onChange: (event) => {
              setEnterprise(event.target.value);
              if (error) setError(undefined);
            },
          }}
        />
        <Button priority="secondary" type="submit">
          Découvrir
        </Button>
      </form>
    </div>
  );
};

export default ContributionPromo;

const block = css({
  background: "var(--background-alt-blue-cumulus)",
});

const header = css({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
});
