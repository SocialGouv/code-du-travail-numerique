import { formatToEuro } from "src/modules/outils/common/utils/formatCurrency";
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
  const agreementResult = getDecryptedValueAgreement(
    props.agreementExplanation,
    props.agreementResult
  );
  return (
    <>
      <h3>Résultat décrypté</h3>
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
