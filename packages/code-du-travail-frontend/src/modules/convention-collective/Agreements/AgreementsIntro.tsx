import { fr } from "@codegouvfr/react-dsfr";
import Link from "../../common/Link";
import { css } from "@styled-system/css";
import Image from "next/image";
import AgreementSearch from "../AgreementSearch.svg";

export const AgreementsIntro = () => {
  return (
    <>
      <div
        className={`${fr.cx("fr-px-3w", "fr-pt-4w", "fr-pb-11v", "fr-mb-6w")} ${block}`}
      >
        <div className={fr.cx("fr-mb-4v", "fr-grid-row")}>
          <Image
            priority
            src={AgreementSearch}
            alt=""
            className={`${fr.cx("fr-unhidden-md", "fr-hidden")} ${ImageContainer}`}
          />
          <h2 className={fr.cx("fr-mt-md-2v")}>
            Trouver sa convention collective
          </h2>
        </div>
        <div className={`${fr.cx("fr-mt-2w", "fr-ml-md-15v")}`}>
          <p className={fr.cx("fr-text--lg")}>
            La convention collective est un texte conclu au niveau d&apos;une
            branche d&apos;activité (Ex: Transports routiers). Elle adapte les
            règles du Code du travail sur des points précis, en fonction des
            situations particulières de la branche (primes, congés, salaires
            minima, préavis, prévoyance...)
          </p>
          <p className={`${fr.cx("fr-text--bold", "fr-mb-2w", "fr-text--lg")}`}>
            Vous pouvez retrouver le nom de votre convention collective sur
            votre bulletin de paie ou sur votre contrat de travail.
          </p>
        </div>
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

const ImageContainer = css({
  height: "52px",
});
