import { SOURCES } from "@socialgouv/cdtn-utils";
import { Button, Section as SectionUi } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import { TrackingProps } from "../types";
import {
  SearchEnterpriseInput,
  SearchParams,
} from "../../common/Agreement/EnterpriseSearch/EntrepriseSearchInput/SearchEnterpriseInput";
import { SectionTitle } from "../../common/stepStyles";
import { NoEnterprise } from "../common/NoEnterprise";

type EnterpriseSearchStepProps = {
  onBackClick?: () => void;
  handleEnterpriseSelection: (
    enterprise: Enterprise,
    params: SearchParams
  ) => void;
  searchParams?: SearchParams;
  onSearchParamsChange: (params: SearchParams) => void;
  widgetMode: boolean;
} & TrackingProps;

const EnterpriseSearchStep = ({
  onBackClick,
  handleEnterpriseSelection,
  searchParams,
  onSearchParamsChange,
  onUserAction,
  widgetMode,
}: EnterpriseSearchStepProps): JSX.Element => {
  return (
    <>
      <Section>
        <SectionTitle>Précisez et sélectionnez votre entreprise</SectionTitle>
        <form onSubmit={(event) => event.preventDefault()}>
          <SearchEnterpriseInput
            searchParams={searchParams}
            onUserAction={onUserAction}
            onSearchParamsChange={onSearchParamsChange}
            handleEnterpriseSelection={handleEnterpriseSelection}
          />
        </form>
        <NoEnterprise widgetMode={widgetMode} />
      </Section>
      {!widgetMode && (
        <Link
          href={`/${SOURCES.TOOLS}/convention-collective`}
          passHref
          legacyBehavior
        >
          <Button
            as="a"
            small
            type="button"
            onClick={onBackClick}
            variant="flat"
          >
            Précédent
          </Button>
        </Link>
      )}
    </>
  );
};

export { EnterpriseSearchStep };

const Section = styled(SectionUi)`
  padding-top: 0;
`;
