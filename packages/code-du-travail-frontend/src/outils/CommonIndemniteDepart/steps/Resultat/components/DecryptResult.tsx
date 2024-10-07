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
import { formatToEuro } from "../../../../../common/formatToEuro";

type Props = {
  label: string;
  agreementResult?: string;
  agreementExplanation?: ExplanationAgreementResult;
  legalResult: string;
  resultExplanation?: ExplanationMainResult;
};

export default function DecryptResult(props: Props) {
  const agreementResult = getDecryptedValueAgreement(
    props.agreementExplanation,
    props.agreementResult,
  );
  return (
    <>
      <SectionTitle>Résultat décrypté</SectionTitle>
      <Paragraph>
        Montant prévu par le code du travail&nbsp;:&nbsp;
        <strong
          dangerouslySetInnerHTML={{
            __html: formatToEuro(parseFloat(props.legalResult)),
          }}
        />
      </Paragraph>
      <Paragraph>
        Montant prévu par la convention collective&nbsp;:&nbsp;
        <strong
          dangerouslySetInnerHTML={{
            __html: isNaN(parseFloat(agreementResult))
              ? agreementResult
              : formatToEuro(parseFloat(agreementResult)),
          }}
        />
      </Paragraph>
      {props.resultExplanation && (
        <Paragraph>
          {getDecryptedValue(props.label, props.resultExplanation)}
        </Paragraph>
      )}
    </>
  );
}
