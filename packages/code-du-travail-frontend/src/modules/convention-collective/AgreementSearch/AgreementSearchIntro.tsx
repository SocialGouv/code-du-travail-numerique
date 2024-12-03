import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";

type Props = {
  navigationUrl?: string;
};

export const AgreementSearchIntro = ({
  navigationUrl = "/outils/convention-collective",
}: Props) => {
  return (
    <>
      <div className={`${fr.cx("fr-mt-2w", "fr-ml-md-15v")}`}>
        <p className={Paragraph}>
          La convention collective est un texte conclu au niveau d&apos;une
          branche d&apos;activité (Ex: Transports routiers). Elle adapte les
          règles du Code du travail sur des points précis, en fonction des
          situations particulières de la branche (primes, congés, salaires
          minima, préavis, prévoyance...)
        </p>
        <p className={`${fr.cx("fr-text--bold", "fr-mb-2w")} ${Paragraph}`}>
          Vous pouvez retrouver le nom de votre convention collective sur votre
          bulletin de paie ou sur votre contrat de travail.
        </p>
      </div>
      <div
        className={`${fr.cx(
          "fr-grid-row",
          "fr-grid-row--center",
          "fr-px-0",
          "fr-px-md-4w",
          "fr-px-1w",
          "fr-mt-5w",
          "fr-mb-0"
        )}`}
      >
        <Button
          className={`${fr.cx(
            "fr-px-9v",
            "fr-col-12",
            "fr-col-md-3",
            "fr-mb-md-0",
            "fr-mb-2w",
            "fr-btns-group--center"
          )}`}
          iconPosition="right"
          iconId="fr-icon-arrow-right-line"
          linkProps={{
            href: `${navigationUrl}/convention`,
          }}
        >
          Je connais ma convention collective je la saisis
        </Button>
        <Button
          className={`${fr.cx(
            "fr-col-12",
            "fr-ml-md-6w",
            "fr-col-md-3",
            "fr-px-6v",
            "fr-btns-group--center"
          )}`}
          iconPosition="right"
          iconId="fr-icon-arrow-right-line"
          linkProps={{
            href: `${navigationUrl}/entreprise`,
          }}
        >
          Je cherche mon entreprise pour trouver ma convention collective
        </Button>
      </div>
    </>
  );
};

const Paragraph = css({
  fontSize: "18px !important",
});
