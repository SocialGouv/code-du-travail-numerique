import { SOURCES } from "@socialgouv/cdtn-sources";
import { Wrapper } from "@socialgouv/cdtn-ui";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Enterprise } from "../../conventions/Search/api/enterprises.service";
import { Title } from "../Components/SimulatorDecorator/Components";
import {
  NavProvider,
  ScreenType,
  SearchParams,
  useNavContext,
} from "./common/NavContext";
import { TrackingProvider, useTrackingContext } from "./common/TrackingContext";
import Steps from "./steps";
import handleTrackEvent from "./tracking/HandleTrackEvent";
import { OnUserAction, UserAction } from "./types";

interface Props {
  icon: string;
  title: string;
  displayTitle: string;
}

function AgreementSearchTool({
  icon,
  title,
  displayTitle,
}: Props): JSX.Element {
  const [screen, setScreen] = useState<ScreenType | null>(null);
  const { setEnterprise, setSearchParams, searchParams } = useNavContext();
  const { uuid, trackEvent } = useTrackingContext();
  const router = useRouter();

  const onUserAction: OnUserAction = (action: UserAction, extra?: unknown) => {
    handleTrackEvent(trackEvent, uuid, title, action, extra);
  };

  function clearSelection() {
    setEnterprise(null);
    trackEvent("view_step_cc_search_p2", "back_step_cc_select_p2", title, uuid);
  }

  function clearSearchType() {
    if (screen === ScreenType.agreement) {
      trackEvent(
        "view_step_cc_search_p1",
        "back_step_cc_search_p1",
        title,
        uuid
      );
    } else {
      trackEvent(
        "view_step_cc_search_p2",
        "back_step_cc_search_p2",
        title,
        uuid
      );
    }

    setScreen(null);
    setEnterprise(null);
    setSearchParams({ address: "", query: "" });
  }

  function handleHashNavigation(url) {
    const [, hash = ""] = url.split("#");
    window.scrollTo(0, 0);
    const main: HTMLDivElement | null = document.querySelector("[role=main]");
    if (main) {
      main.focus();
    }
    handleSearchType(hash);
  }

  function handleSearchType(value) {
    setScreen(value);
  }

  function handleEnterpriseSelection(
    enterprise: Enterprise,
    params: SearchParams
  ) {
    setEnterprise(enterprise);
    setSearchParams(params);

    router.push(
      `/${SOURCES.TOOLS}/convention-collective#${ScreenType.agreementSelection}`
    );
  }

  useEffect(() => {
    router.replace(`/${SOURCES.TOOLS}/convention-collective`, undefined, {
      shallow: true,
    });
    router.events.on("hashChangeStart", handleHashNavigation);
    return () => {
      router.events.off("hashChangeStart", handleHashNavigation);
    };
  }, []);

  let Step;
  switch (screen) {
    case ScreenType.agreement:
      Step = (
        <Steps.AgreementSearchStep
          onBackClick={clearSearchType}
          onSelectAgreement={(agreement) => {
            trackEvent(
              "cc_select_p1",
              title,
              `idcc${agreement.num.toString()}`,
              uuid
            );
            router.push(`/convention-collective/${agreement.slug}`);
          }}
          onUserAction={onUserAction}
        />
      );
      break;
    case ScreenType.enterprise:
      Step = (
        <Steps.EnterpriseSearchStep
          onSearchParamsChange={(params) => setSearchParams(params)}
          searchParams={searchParams}
          handleEnterpriseSelection={handleEnterpriseSelection}
          onBackClick={clearSearchType}
          onUserAction={onUserAction}
        />
      );
      break;
    case ScreenType.agreementSelection:
      Step = (
        <Steps.AgreementSelectionStep
          onBackClick={clearSelection}
          onUserAction={onUserAction}
        />
      );
      break;
    default:
      Step = <Steps.IntroductionStep onUserAction={onUserAction} />;
  }
  return (
    <WizardWrapper variant="main">
      <Title title={displayTitle} icon={icon} />
      {Step}
    </WizardWrapper>
  );
}

const AgreementSearchUI = (props: Props): JSX.Element => {
  const [enterprise, setEnterprise] = useState<Enterprise | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    address: "",
    query: "",
  });

  return (
    <NavProvider
      enterprise={enterprise}
      setEnterprise={setEnterprise}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    >
      <AgreementSearchTool {...props} />
    </NavProvider>
  );
};

const AgreementSearchWithContext = (props: Props): JSX.Element => {
  return (
    <TrackingProvider title={props.title}>
      <AgreementSearchUI {...props} />
    </TrackingProvider>
  );
};

const WizardWrapper = styled(Wrapper)`
  overflow: visible;
  max-width: 86rem;
  width: 100%;
  margin: 0 auto;
`;
export { AgreementSearchWithContext as AgreementSearch };
