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

const formatNumber = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
}).format;

export default function DecryptResult(props: Props) {
  return (
    <>
      <SectionTitle>Résultat décrypté</SectionTitle>
      <Paragraph>
        Montant prévu par le code du travail&nbsp;:&nbsp;
        <strong
          dangerouslySetInnerHTML={{
            __html: formatNumber(parseInt(props.legalResult)),
          }}
        />
      </Paragraph>
      <Paragraph>
        Montant prévu par la convention collective&nbsp;:&nbsp;
        <strong
          dangerouslySetInnerHTML={{
            __html: formatNumber(
              parseInt(
                getDecryptedValueAgreement(
                  props.agreementExplanation,
                  props.agreementResult
                )
              )
            ),
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
