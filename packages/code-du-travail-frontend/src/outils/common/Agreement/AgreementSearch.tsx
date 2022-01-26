import { Paragraph, theme, Toast } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { Agreement } from "../../../conventions/Search/api/type";
import { AgreementSearchStep } from "../../ConventionCollective/steps/AgreementSearch";

type Props = {
  selectedAgreement?: Agreement;
  onSelectAgreement: (agreement: Agreement | null) => void;
};

const AgreementSearch = ({
  selectedAgreement,
  onSelectAgreement,
}: Props): JSX.Element => {
  if (selectedAgreement) {
    return (
      <>
        <SelectedAgreementTitle>
          Vous avez sélectionné la convention collective&nbsp;:&nbsp;
        </SelectedAgreementTitle>
        <SelectedAgreement
          variant="secondary"
          onRemove={(event) => {
            event.preventDefault();
            onSelectAgreement(null);
          }}
        >
          {selectedAgreement.shortTitle}
        </SelectedAgreement>
        <Paragraph>
          Cliquez sur Suivant pour poursuivre la simulation.
        </Paragraph>
      </>
    );
  }
  return <AgreementSearchStep onSelectAgreement={onSelectAgreement} />;
};

const { spacings } = theme;

const SelectedAgreement = styled(Toast)`
  width: 100%;
`;

const SelectedAgreementTitle = styled(Paragraph)`
  margin-bottom: ${spacings.small};
  font-weight: bold;
`;

export default AgreementSearch;
