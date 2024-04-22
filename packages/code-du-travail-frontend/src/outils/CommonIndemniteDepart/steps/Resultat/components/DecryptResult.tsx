import { Paragraph } from "@socialgouv/cdtn-ui";
import { SectionTitle } from "../../../../common/stepStyles";
import {
  getDecryptedValue,
  getDecryptedValueAgreement,
} from "../utils/getDecryptedValue";
import {
  ExplanationAgreementResult,
  ExplanationMainResult,
} from "@socialgouv/modeles-social";

type Props = {
  label: string;
  agreementResult?: string;
  agreementExplanation?: ExplanationAgreementResult;
  legalResult: string;
  resultExplanation?: ExplanationMainResult;
};

export default function DecryptResult(props: Props) {
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
          {getDecryptedValueAgreement(
            props.agreementExplanation,
            props.agreementResult
          )}
        </strong>
      </Paragraph>
      {props.resultExplanation && (
        <Paragraph>
          {getDecryptedValue(props.label, props.resultExplanation)}
        </Paragraph>
      )}
    </>
  );
}
