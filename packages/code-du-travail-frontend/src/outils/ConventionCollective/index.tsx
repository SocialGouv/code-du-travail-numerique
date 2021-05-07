import { Button, Wrapper } from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import styled from "styled-components";

import { WizardTitle } from "../common/Wizard";
import { TrackingProvider, useTrackingContext } from "./common/TrackingContext";
import Steps from "./steps";

interface Props {
  icon: string;
  title: string;
}

export enum SearchType {
  agreement = "convention",
  enterprise = "entreprise",
}

function AgreementSearch({ icon, title }: Props): JSX.Element {
  const [searchType, setSearchType] = useState<SearchType>(null);
  const { uuid, trackEvent } = useTrackingContext();
  function clearSearchType() {
    window.scrollTo(0, 0);

    const main: HTMLDivElement = document.querySelector("[role=main]");
    if (main) {
      main.scrollIntoView(true);
      main.focus();
    }
    if (searchType === SearchType.agreement) {
      trackEvent("click_search_agreement", title, uuid);
    } else {
      trackEvent("click_search_enterprise", title, uuid);
    }

    setSearchType(null);
  }

  function handleSearchType(value) {
    if (value === SearchType.agreement) {
      trackEvent(
        "view_step_cc_search_p1",
        "click_view_step_cc_search_p1",
        title,
        uuid
      );
    } else {
      trackEvent(
        "view_step_cc_search_p2",
        "click_view_step_cc_search_p2",
        title,
        uuid
      );
    }
    setSearchType(value);
  }

  let Step;

  switch (searchType) {
    case SearchType.agreement:
      Step = <Steps.AgreementSearchStep />;
      break;
    case SearchType.enterprise:
      Step = <Steps.EnterpriseSearchStep />;
      break;
    default:
      Step = <Steps.IntroductionStep onSelecSearchType={handleSearchType} />;
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

const AgreementSearchWithContext = (props: Props): JSX.Element => (
  <TrackingProvider title={props.title}>
    <AgreementSearch {...props} />
  </TrackingProvider>
);

export { AgreementSearchWithContext as AgreementSearch };
