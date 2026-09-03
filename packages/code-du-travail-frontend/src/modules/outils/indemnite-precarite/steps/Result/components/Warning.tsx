import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { ContractFamily, indemniteLabel } from "../../../types";

/**
 * Rédaction du bloc d'avertissement, selon ce qui a réellement déterminé le
 * montant affiché : le Code du travail seul, une convention de branche sans
 * dispositions, une convention de branche qui en prévoit, ou le cas
 * particulier du CDD d'usage d'enquêteur de la CC 1486 (taux à 4 %).
 */
export type WarningVariant =
  | "sans-cc"
  | "cc-sans-dispositions"
  | "cc-avec-dispositions"
  | "cc-1486-enqueteurs";

type Props = {
  variant: WarningVariant;
  family: ContractFamily;
};

/** Ordre d'application du taux, hors convention de branche renseignée. */
const OrdreSansCc = () => (
  <>
    <p>Le taux applicable est, dans l&apos;ordre suivant&nbsp;:</p>
    <ul>
      <li>
        celui prévu par l&apos;accord d&apos;entreprise, même s&apos;il est
        moins favorable que celui de la convention de branche ou du Code du
        travail&nbsp;;
      </li>
      <li>
        en l&apos;absence d&apos;accord d&apos;entreprise, celui prévu par la
        convention de branche&nbsp;;
      </li>
      <li>
        en l&apos;absence de convention de branche, celui prévu par le Code du
        travail.
      </li>
    </ul>
  </>
);

const OrdreCodeDuTravail = () => (
  <>
    <p>Le taux applicable est, dans l&apos;ordre suivant&nbsp;:</p>
    <ul>
      <li>
        celui prévu par l&apos;accord d&apos;entreprise, même s&apos;il est
        moins favorable que celui du Code du travail&nbsp;;
      </li>
      <li>
        à défaut d&apos;accord d&apos;entreprise, celui prévu par le Code du
        travail.
      </li>
    </ul>
  </>
);

const OrdreConventionDeBranche = () => (
  <>
    <p>Le taux applicable est, dans l&apos;ordre suivant&nbsp;:</p>
    <ul>
      <li>
        celui prévu par l&apos;accord d&apos;entreprise, même s&apos;il est
        moins favorable que celui de la convention de branche&nbsp;;
      </li>
      <li>
        à défaut d&apos;accord d&apos;entreprise, celui prévu par la convention
        de branche.
      </li>
    </ul>
  </>
);

const WarningBody: React.FC<Props> = ({ variant, family }) => {
  switch (variant) {
    case "cc-sans-dispositions":
      return (
        <div data-testid="warning-body-cc-sans-dispositions">
          <p>
            Votre convention de branche ne contient pas de dispositions
            relatives à l&apos;{indemniteLabel(family).toLowerCase()}. La
            réponse donnée se base sur les dispositions du Code du travail.
          </p>
          <p>
            Néanmoins, un accord d&apos;entreprise peut prévoir un taux
            différent de celui fixé par le Code du travail. Ce taux ne peut pas
            être inférieur à 6&nbsp;%, mais peut être supérieur à 10&nbsp;%.
          </p>
          <OrdreCodeDuTravail />
        </div>
      );
    case "cc-avec-dispositions":
      return (
        <div data-testid="warning-body-cc-avec-dispositions">
          <p>
            La réponse donnée se base sur les dispositions de votre convention
            de branche.
          </p>
          <p>
            Néanmoins, un accord d&apos;entreprise peut prévoir un taux
            différent de celui fixé par votre convention de branche. Ce taux ne
            peut pas être inférieur à 6&nbsp;%, mais peut être supérieur à
            10&nbsp;%.
          </p>
          <OrdreConventionDeBranche />
        </div>
      );
    case "cc-1486-enqueteurs":
      return (
        <div data-testid="warning-body-cc-1486-enqueteurs">
          <p>
            La réponse donnée est celle prévue par votre convention collective.
            Pour les enquêteurs, elle prévoit le versement d&apos;une indemnité
            de précarité égale à 4&nbsp;%.
          </p>
          <p>
            Important&nbsp;: une convention de branche ou un accord
            d&apos;entreprise ne peuvent pas prévoir un taux inférieur à
            6&nbsp;%. Toutefois, cette règle ne s&apos;applique pas aux contrats
            d&apos;usage, pour lesquels la loi ne prévoit pas le versement
            d&apos;une indemnité de précarité.
          </p>
          <OrdreConventionDeBranche />
        </div>
      );
    default:
      return (
        <div data-testid="warning-body-sans-cc">
          <p>
            Une convention de branche ou un accord d&apos;entreprise peuvent
            prévoir un taux différent de celui fixé à 10&nbsp;% par le Code du
            travail. Ce taux ne peut pas être inférieur à 6&nbsp;%, mais peut
            être supérieur à 10&nbsp;%.
          </p>
          <OrdreSansCc />
        </div>
      );
  }
};

const Warning: React.FC<Props> = ({ variant, family }) => (
  <div
    className={fr.cx("fr-mt-4w", "fr-alert", "fr-alert--info")}
    data-testid="warning-alert"
  >
    <h4 className={fr.cx("fr-alert__title")} data-testid="warning-title">
      Attention, il peut exister un autre montant applicable à votre situation.
    </h4>
    <WarningBody variant={variant} family={family} />
    <p>
      À noter&nbsp;: le contrat de travail peut prévoir un taux plus favorable
      pour le salarié. Dans ce cas, c&apos;est ce taux qui s&apos;applique.
    </p>
  </div>
);

export default Warning;
