import { formatIdcc } from "@cdt/data";
import { Paragraph } from "@socialgouv/cdtn-ui";
import React from "react";

import { Agreement } from "../../../../conventions/Search/api/type";
import { SectionTitle } from "../../stepStyles";
import ShowAlert from "../ShowAlert";
import { AgreementSupportInfo } from "../types";

type Props = {
  agreement: Agreement;
  supportedAgreements?: AgreementSupportInfo[];
};

const ShowAgreement = ({
  agreement,
  supportedAgreements,
}: Props): JSX.Element => {
  return (
    <>
      <SectionTitle>
        Une convention collective a été trouvée pour cette
        entreprise&nbsp;:&nbsp;
      </SectionTitle>
      <Paragraph fontSize="hsmall" fontWeight="bold">
        {agreement.shortTitle} (IDCC {formatIdcc(agreement.num)})
      </Paragraph>
      <ShowAlert
        currentIdcc={agreement.num}
        supportedAgreements={supportedAgreements}
      />
      <Paragraph>Cliquez sur Suivant pour poursuivre la simulation.</Paragraph>
    </>
  );
};

export default ShowAgreement;
