import { Button, theme } from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import styled from "styled-components";

import { WizardTitle } from "../common/Wizard";
import Steps from "./steps";

interface Props {
  icon: string;
  title: string;
}

export enum SearchType {
  agreement = "convention",
  compagny = "entreprise",
}

function AgreementSearch({ icon, title }: Props): JSX.Element {
  const [searchType, setSearchType] = useState<SearchType>(null);

  function clearSearchType() {
    setSearchType(null);
  }

  let Step;

  switch (searchType) {
    case SearchType.agreement:
      Step = <Steps.AgreementSearchStep />;
      break;
    case SearchType.compagny:
      Step = <Steps.EnterpriseSearchStep />;
      break;
    default:
      Step = <Steps.IntroductionStep onSelecSearchType={setSearchType} />;
  }
  return (
    <WizardWrapper>
      <WizardTitle title={title} icon={icon} />
      {Step}
      {searchType && (
        <p>
          <Button small type="button" onClick={clearSearchType} variant="flat">
            Précédent
          </Button>
        </p>
      )}
    </WizardWrapper>
  );
}

const WizardWrapper = styled.div`
  overflow: visible;
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0;
  }
  @media print {
    border: 0;
  }
`;

export { AgreementSearch };
