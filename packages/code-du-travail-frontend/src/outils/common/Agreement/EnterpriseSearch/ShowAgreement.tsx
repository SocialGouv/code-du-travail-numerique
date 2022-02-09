import { formatIdcc } from "@cdt/data";
import { Paragraph, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

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
      <SelectedAgreement>
        {agreement.shortTitle} (IDCC {formatIdcc(agreement.num)})
      </SelectedAgreement>
      <ShowAlert
        currentIdcc={agreement.num}
        supportedAgreements={supportedAgreements}
      />
      <Paragraph>Cliquez sur Suivant pour poursuivre la simulation.</Paragraph>
    </>
  );
};

const { spacings, fonts } = theme;

const SelectedAgreement = styled(Paragraph)`
  margin-bottom: ${spacings.small};
  font-weight: bold;
  font-size: ${fonts.sizes.headings.small};
`;

export default ShowAgreement;
