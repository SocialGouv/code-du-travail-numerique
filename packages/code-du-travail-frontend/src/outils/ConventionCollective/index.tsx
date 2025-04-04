import { SOURCES } from "@socialgouv/cdtn-utils";
import { Wrapper, Modal, Button, Paragraph } from "@socialgouv/cdtn-ui";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Enterprise } from "../../conventions/Search/api/enterprises.service";
import { Title } from "../Components/SimulatorDecorator/Components";
import { NavProvider, ScreenType, useNavContext } from "./common/NavContext";
import { TrackingProvider, useTrackingContext } from "./common/TrackingContext";
import Steps from "./steps";
import handleTrackEvent from "./tracking/HandleTrackEvent";
import { OnUserAction, UserAction } from "./types";
import { MatomoSearchAgreementCategory } from "../../lib";
import { SearchParams } from "../common/Agreement/EnterpriseSearch/EntrepriseSearchInput/SearchEnterpriseInput";

interface Props {
  icon: string;
  title: string;
  displayTitle: string;
  widgetMode?: boolean;
  noRedirect?: string;
}

function AgreementSearchTool({
  icon,
  title,
  displayTitle,
  widgetMode,
  noRedirect,
}: Props): JSX.Element {
  const router = useRouter();

  const [screen, setScreen] = useState<ScreenType | null>(
    widgetMode ? ScreenType.enterprise : null
  );
  const [isAgreementModalOpened, showAgreementModal] = useState(false);

  useEffect(() => {
    const slug = router.query.slug;
    setScreen(
      slug === "convention"
        ? ScreenType.agreement
        : slug === "entreprise" || widgetMode
          ? ScreenType.enterprise
          : slug === "selection"
            ? ScreenType.agreementSelection
            : ScreenType.intro
    );
  }, [router.query.slug]);

  const { setEnterprise, setSearchParams, searchParams } = useNavContext();
  const { uuid, trackEvent } = useTrackingContext();

  const onUserAction: OnUserAction = (action: UserAction, extra?: unknown) => {
    handleTrackEvent(trackEvent, uuid, title, action, extra);
  };

  function clearSelection() {
    if (widgetMode) {
      setScreen(ScreenType.enterprise);
    } else {
      setEnterprise(null);
    }
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
    setSearchParams({
      query: "",
    });
  }

  function handleEnterpriseSelection(
    enterprise: Enterprise,
    params: SearchParams
  ) {
    setEnterprise(enterprise);
    setSearchParams(params);
    if (widgetMode) {
      setScreen(ScreenType.agreementSelection);
    } else {
      router.push({
        pathname: `/${SOURCES.TOOLS}/convention-collective/${ScreenType.agreementSelection}`,
        query: {
          noRedirect,
        },
      });
    }
  }

  let Step;
  switch (screen) {
    case ScreenType.agreement:
      Step = (
        <>
          <Steps.AgreementSearchStep
            onBackClick={clearSearchType}
            onSelectAgreement={(agreement) => {
              if (agreement.url || agreement.contributions) {
                trackEvent(
                  MatomoSearchAgreementCategory.AGREEMENT_SELECT_P1,
                  title,
                  `idcc${agreement.num.toString()}`,
                  uuid
                );
                router.push(`/convention-collective/${agreement.slug}`);
              } else {
                showAgreementModal(true);
              }
            }}
            onUserAction={onUserAction}
          />
          <Modal
            title="Covention collective"
            isOpen={isAgreementModalOpened}
            onDismiss={() => {
              showAgreementModal(false);
            }}
          >
            <Paragraph>
              Nous n&apos;avons pas d&apos;informations concernant cette
              convention collective.
            </Paragraph>
            <Center>
              <Button
                variant="primary"
                onClick={() => {
                  showAgreementModal(false);
                }}
              >
                Fermer
              </Button>
            </Center>
          </Modal>
        </>
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
          widgetMode={!!widgetMode}
        />
      );
      break;
    case ScreenType.agreementSelection:
      Step = (
        <Steps.AgreementSelectionStep
          onBackClick={clearSelection}
          onUserAction={onUserAction}
          isWidgetMode={widgetMode}
          noRedirect={noRedirect === "true"}
        />
      );
      break;
    default:
      Step = <Steps.IntroductionStep onUserAction={onUserAction} />;
  }
  return (
    <WizardWrapper variant="main" hasMaxWidth={!widgetMode}>
      <Title title={displayTitle} icon={icon} />
      {Step}
    </WizardWrapper>
  );
}

const AgreementSearchUI = (props: Props): JSX.Element => {
  const [enterprise, setEnterprise] = useState<Enterprise | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({
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
  max-width: ${({ hasMaxWidth }) => (hasMaxWidth ? "86rem" : "100%")};
  width: 100%;
  margin: 0 auto;
`;

const Center = styled.div`
  width: 100%;
  text-align: center;
`;

export { AgreementSearchWithContext as AgreementSearch };
