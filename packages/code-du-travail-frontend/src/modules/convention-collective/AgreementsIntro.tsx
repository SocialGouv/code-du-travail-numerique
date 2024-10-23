"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Link from "next/link";
import { css } from "../../../styled-system/css";
import Image from "next/image";
import { Highlight } from "@codegouvfr/react-dsfr/Highlight";
import AgreementSearch from "./AgreementSearch.svg";

export const AgreementsIntro = () => {
  return (
    <>
      <div className={`${fr.cx("fr-p-3w", "fr-mb-6w")} ${block}`}>
        <h2 className={fr.cx("fr-mb-4v")}>
          <div className={fr.cx("fr-grid-row")}>
            <Image
              priority
              src={AgreementSearch}
              alt="Trouver sa convention collective"
              className={fr.cx("fr-unhidden-md", "fr-hidden")}
            />
            <span className={fr.cx("fr-mt-md-2v")}>
              Trouver sa convention collective
            </span>
          </div>
        </h2>
        <Highlight size="lg">
          <span>
            La convention collective est un texte conclu au niveau d&apos;une
            branche d&apos;activité (Ex: Transports routiers). Elle adapte les
            règles du Code du travail sur des points précis, en fonction des
            situations particulières de la branche (primes, congés, salaires
            minima, préavis, prévoyance...)
          </span>
          <br />
          <br />
          <span className={fr.cx("fr-text--bold")}>
            Vous pouvez retrouver le nom de votre convention collective sur
            votre bulletin de paie ou sur votre contrat de travail.
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
          <Link
            href="/outils/convention-collective/convention"
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
          >
            Je connais ma convention collective je la saisis
          </Link>
          <Link
            href="/outils/convention-collective/entreprise"
            className={`${fr.cx("fr-btn", "fr-btn--icon-right", "fr-icon-arrow-right-line", "fr-col-12", "fr-col-md-3", "fr-px-6v", "fr-btns-group--center")}`}
          >
            Je cherche mon entreprise pour trouver ma convention collective
          </Link>
        </div>
      </div>
    </>
  );
};

const block = css({
  background: "var(--background-alt-blue-cumulus)",
});
