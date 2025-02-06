import {
  getDecryptedValue,
  getDecryptedValueAgreement,
} from "../utils/getDecryptedValue";
import {
  ExplanationAgreementResult,
  ExplanationMainResult,
} from "@socialgouv/modeles-social";
import { formatToEuro } from "src/common/formatToEuro";

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
    props.agreementResult
  );
  return (
    <>
      <h2>Résultat décrypté</h2>
      <p>
        Montant prévu par le code du travail&nbsp;:&nbsp;
        <strong
          dangerouslySetInnerHTML={{
            __html: formatToEuro(parseFloat(props.legalResult)),
          }}
        />
      </p>
      <p>
        Montant prévu par la convention collective&nbsp;:&nbsp;
        <strong
          dangerouslySetInnerHTML={{
            __html: isNaN(parseFloat(agreementResult))
              ? agreementResult
              : formatToEuro(parseFloat(agreementResult)),
          }}
        />
      </p>
      {props.resultExplanation && (
        <p>{getDecryptedValue(props.label, props.resultExplanation)}</p>
      )}
    </>
  );
}
