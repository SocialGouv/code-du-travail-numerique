import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { Agreement } from "../../../types";
import isCcFullySupported from "src/modules/outils/common/utils/isCcFullySupported";

export const selectedAgreementAlert = (
  agreement: Agreement,
  simulator: PublicodesSimulator
) => {
  const isSupported = isCcFullySupported(agreement.num, simulator);
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
