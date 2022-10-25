import { Paragraph } from "@socialgouv/cdtn-ui";
import { SectionTitle } from "../../../../common/stepStyles";

type Props = {
  hasSelectedAgreement: boolean;
  isAgreementSupported: boolean;
  legalResult: string;
  agreementResult?: string;
};

export default function DecryptResult(props: Props) {
  const getExplanation = () => {
    const parseAgreementResult = parseFloat(props.agreementResult ?? "");
    const legalAgreementResult = parseFloat(props.legalResult);
    if (!props.hasSelectedAgreement) {
      return "La convention collective n’ayant pas été renseignée, le montant de l’indemnité de licenciement affiché correspond au montant prévu par le code du travail.";
    } else if (!props.isAgreementSupported) {
      return "La convention collective n’ayant pas été traitée par nos services, le montant de l’indemnité de licenciement affiché correspond au montant prévu par le code du travail.";
    } else if (!isNaN(parseAgreementResult)) {
      if (parseAgreementResult === 0) {
        return "En l’absence de montant prévu par la convention collective, le montant de l’indemnité de licenciement à appliquer pour le salarié est donc le montant prévu par le code du travail.";
      } else if (legalAgreementResult === 0 && parseAgreementResult > 0) {
        return "En l’absence de montant prévu par le code du travail, le montant de l’indemnité de licenciement à appliquer pour le salarié est donc le montant prévu par la convention collective.";
      } else if (parseAgreementResult !== 0 && legalAgreementResult !== 0) {
        if (parseAgreementResult === legalAgreementResult) {
          return "Le montant prévu par le code du travail est le même que celui prévu par la convention collective.";
        } else if (parseAgreementResult > legalAgreementResult) {
          return "Le montant à retenir pour le salarié est celui prévu par la convention collective, celui-ci étant plus favorable que le montant prévu par le code du travail.";
        } else if (parseAgreementResult < legalAgreementResult) {
          return "Le montant à retenir pour le salarié est celui prévu par le code du travail, celui-ci étant plus favorable que le montant prévu par la convention collective.";
        }
      }
    }
  };
  return (
    <>
      <SectionTitle>Résultat décrypté</SectionTitle>
      <Paragraph>
        Montant prévu par le code du travail&nbsp;:&nbsp;
        <strong>{props.legalResult} €</strong>
      </Paragraph>
      <Paragraph>
        Montant prévu par la convention collective&nbsp;:&nbsp;
        <strong>
          {!props.hasSelectedAgreement
            ? "Convention collective non renseignée"
            : !props.isAgreementSupported
            ? "Convention collective non traitée"
            : `${props.agreementResult} €`}
        </strong>
      </Paragraph>
      <Paragraph>{getExplanation()}</Paragraph>
    </>
  );
}
