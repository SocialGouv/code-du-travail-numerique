import { FrCxArg } from "@codegouvfr/react-dsfr";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";

type Props = {
  className?: FrCxArg[];
  titleAs?: "h2" | "h3" | "h4" | "h5" | "h6";
};

/**
 * Bandeau affiché lorsqu'une entité possède au moins une convention
 * collective officielle ET au moins un établissement sans convention
 * renseignée (IDCC sentinelle 9999). La sentinelle n'est jamais affichée
 * comme une convention : ce bandeau la remplace.
 */
export const PartialAgreementCoverageAlert = ({
  className = ["fr-mt-2w"],
  titleAs,
}: Props) => (
  <AccessibleAlert
    severity="info"
    title="Cette convention a été renseignée pour seulement certains établissements de cette entité."
    description="Veuillez consulter votre bulletin de salaire pour vérifier votre convention collective."
    className={className}
    titleAs={titleAs}
    data-testid="partial-agreement-coverage-alert"
  />
);
