import { Button, Wrapper } from "@socialgouv/cdtn-ui";
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
    window.scrollTo(0, 0);

    const main: HTMLDivElement = document.querySelector("[role=main]");
    if (main) {
      main.scrollIntoView(true);
      main.focus();
    }
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
    <WizardWrapper variant="main">
      <WizardTitle title={title} icon={icon} />
      {Step}
      {searchType && (
        <div>
          <Button small type="button" onClick={clearSearchType} variant="flat">
            Précédent
          </Button>
        </div>
      )}
    </WizardWrapper>
  );
}

const WizardWrapper = styled(Wrapper)`
  overflow: visible;
  max-width: 86rem;
  width: 100%;
  margin: 0 auto;
`;

export { AgreementSearch };
