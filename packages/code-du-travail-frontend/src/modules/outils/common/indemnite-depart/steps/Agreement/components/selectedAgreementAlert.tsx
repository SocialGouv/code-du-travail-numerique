import { isCcFullySupportedIndemniteLicenciement } from "../../../common";
import { Agreement } from "../../../types";

export const selectedAgreementAlert = (agreement: Agreement) => {
  const isSupported = isCcFullySupportedIndemniteLicenciement(agreement.num);
  if (!isSupported) {
    return (
      <>
        <p>
          La convention collective sélectionnée n&apos;est pas traitée par nos
          services.
        </p>
        <p>
          Vous pouvez tout de même poursuivre la simulation qui vous fournira un
          résultat basé sur le code du travail.
        </p>
      </>
    );
  }
};
