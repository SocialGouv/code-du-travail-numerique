import { formatIdcc } from "@cdt/data";
import { SOURCES } from "@socialgouv/cdtn-sources";
import {
  Button,
  ComboBoxList,
  ComboBoxOption,
  ComboBoxPopover,
  ScreenReaderOnly,
  Section as SectionUi,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React, { MutableRefObject, useRef } from "react";
import Spinner from "react-svg-spinner";
import styled from "styled-components";

import { InlineError } from "../../common/ErrorField";
import { AgreementLink } from "../agreement/AgreementLink";
import NoResultSection from "../agreement/NoResultSection";
import { SearchAgreement } from "../agreement/SearchAgreement";

type AgreementSearchStepProps = {
  onBackClick: () => void;
};

const AgreementSearchStep = ({
  onBackClick,
}: AgreementSearchStepProps): JSX.Element => {
  const refInput = useRef<HTMLFormElement>();

  return (
    <>
      <SearchAgreement
        inputRef={refInput as MutableRefObject<HTMLFormElement>}
        renderResults={(state, query) => {
          if (state.isLoading) {
            return (
              <Section>
                <Spinner aria-hidden="true" />{" "}
                <span role="status">recherche en cours</span>
              </Section>
            );
          }
          if (state.isError) {
            if (typeof state.error === "string") {
              return (
                <Section role="status">
                  <InlineError>{state.error}</InlineError>
                </Section>
              );
            }
            return <Section role="status"> {state.error}</Section>;
          }
          if (refInput.current && state.data) {
            refInput.current.scrollIntoView({ behavior: "smooth" });
          }
          if (!state.data) {
            return <></>;
          }
          return state.data.length > 0 ? (
            <ComboBoxPopover>
              <ScreenReaderOnly role="status">
                {state.data.length} résultats
              </ScreenReaderOnly>
              <ComboBoxList>
                {state.data.map((item, index) => {
                  const value = `${item.shortTitle} (IDCC ${formatIdcc(
                    item.num
                  )})`;
                  return (
                    <ComboBoxOption value={value} key={item.id}>
                      <AgreementLink isFirst={index === 0} agreement={item} />
                    </ComboBoxOption>
                  );
                })}
              </ComboBoxList>
            </ComboBoxPopover>
          ) : (
            <NoResultSection />
          );
        }}
      />
      <Link href={`/${SOURCES.TOOLS}/convention-collective`} passHref>
        <Button as="a" small type="button" onClick={onBackClick} variant="flat">
          Précédent
        </Button>
      </Link>
    </>
  );
};

export { AgreementSearchStep };

const Section = styled(SectionUi)`
  padding-top: 1rem;
`;
