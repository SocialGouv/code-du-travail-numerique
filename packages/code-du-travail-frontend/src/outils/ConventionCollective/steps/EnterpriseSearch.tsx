import { SOURCES } from "@socialgouv/cdtn-sources";
import { Button, Section as SectionUi, theme } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import { TrackingProps } from "../types";
import { renderResults } from "../../common/Agreement/EnterpriseSearch/EntrepriseSearchResult";
import {
  SearchEnterpriseInput,
  SearchParams,
} from "../../common/Agreement/EnterpriseSearch/EntrepriseSearchInput/SearchEnterpriseInput";
import { SectionTitle } from "../../common/stepStyles";

type EnterpriseSearchStepProps = {
  onBackClick?: () => void;
  handleEnterpriseSelection: (
    enterprise: Enterprise,
    params: SearchParams
  ) => void;
  searchParams?: SearchParams;
  onSearchParamsChange: (params: SearchParams) => void;
} & TrackingProps;

const EnterpriseSearchStep = ({
  onBackClick,
  handleEnterpriseSelection,
  searchParams,
  onSearchParamsChange,
  onUserAction,
}: EnterpriseSearchStepProps): JSX.Element => {
  return (
    <Section>
      <SectionTitle>Précisez et sélectionnez votre entreprise</SectionTitle>
      <form onSubmit={(event) => event.preventDefault()}>
        <SearchEnterpriseInput
          searchParams={searchParams}
          onUserAction={onUserAction}
          onSearchParamsChange={onSearchParamsChange}
          renderResults={renderResults({
            handleEnterpriseSelection,
            onUserAction,
          })}
        />
      </form>
      <Link href={`/${SOURCES.TOOLS}/convention-collective`} passHref>
        <Button as="a" small type="button" onClick={onBackClick} variant="flat">
          Précédent
        </Button>
      </Link>
    </Section>
  );
};

export { EnterpriseSearchStep };

const Section = styled(SectionUi)`
  padding-top: ${theme.spacings.small};
`;
