import { fr } from "@codegouvfr/react-dsfr";
import Link from "../../common/Link";
import Image from "next/image";
import AgreementSearch from "../AgreementSearch.svg";
import BlueCard from "../../common/BlueCard";

export const AgreementsIntro = () => {
  return (
    <>
      <BlueCard>
        <div className={fr.cx("fr-mb-4v", "fr-grid-row")}>
          <Image
            priority
            src={AgreementSearch}
            alt=""
            height={52}
            className={`${fr.cx("fr-unhidden-md", "fr-hidden")}`}
          />
          <h2 className={fr.cx("fr-mt-md-2v")}>
            Trouver sa convention collective et ses accords d&apos;entreprise
          </h2>
        </div>
        <div className={`${fr.cx("fr-mt-2w", "fr-ml-md-15v")}`}>
          <p className={fr.cx("fr-text--lg")}>
            La convention collective et les accords d’entreprise viennent
            compléter le Code du travail pour l&apos;adapter aux réalités des
            entreprises et des conditions de travail.
          </p>
          <p className={`${fr.cx("fr-mb-2w", "fr-text--lg")}`}>
            La convention collective s’applique à toutes les entreprises et
            salariés d&apos;un même secteur d’activité. L’accord d’entreprise
            prévoit des règles propres à l&apos;entreprise et à leurs salariés.
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
            href="/outils/convention-collective/entreprise"
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
            Je cherche mon entreprise
          </Link>
          <Link
            href="/outils/convention-collective/convention"
            className={`${fr.cx("fr-btn", "fr-btn--secondary", "fr-btn--icon-right", "fr-icon-arrow-right-line", "fr-col-12", "fr-col-md-3", "fr-px-6v", "fr-btns-group--center")}`}
          >
            Je cherche uniquement une convention collective
          </Link>
        </div>
      </BlueCard>
    </>
  );
};
