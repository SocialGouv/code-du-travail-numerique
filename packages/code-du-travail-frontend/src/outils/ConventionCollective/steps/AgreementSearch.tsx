import { SOURCES } from "../../../../../code-du-travail-utils/build";
import { Button, Section as SectionUi } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import { TrackingProps } from "../types";
import { renderResults } from "../../common/Agreement/AgreementSearch/AgreementSearchResult";
import styled from "styled-components";
import { SectionTitle } from "../../common/stepStyles";
import { SearchAgreementInput } from "../../common/Agreement/AgreementSearch/AgreementInput/SearchAgreementInput";

type AgreementSearchStepProps = {
  onSelectAgreement: (agreement) => void;
  onBackClick: () => void;
} & TrackingProps;

const AgreementSearchStep = ({
  onBackClick,
  onSelectAgreement,
  onUserAction,
}: AgreementSearchStepProps): JSX.Element => {
  return (
    <>
      <Section>
        <SectionTitle>
          Précisez et sélectionnez votre convention collective
        </SectionTitle>
        <form onSubmit={(event) => event.preventDefault()}>
          <SearchAgreementInput
            onUserAction={onUserAction}
            renderResults={renderResults({
              onSelectAgreement,
              onUserAction,
            })}
          />
        </form>
      </Section>

      <Link
        href={`/${SOURCES.TOOLS}/convention-collective`}
        passHref
        legacyBehavior
      >
        <Button as="a" small type="button" onClick={onBackClick} variant="flat">
          Précédent
        </Button>
      </Link>
    </>
  );
};

export { AgreementSearchStep };

const Section = styled(SectionUi)`
  padding-top: 0;
`;
