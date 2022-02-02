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

import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import { InlineError } from "../../common/ErrorField";
import { useNavContext } from "../common/NavContext";
import { EnterpriseButton } from "../enterprise/EnterpriseButton";
import NoResultSection from "../enterprise/NoResultSection";
import { SearchEnterprise, SearchParams } from "../enterprise/SearchEnterprise";

type EnterpriseSearchStepProps = {
  onBackClick: () => void;
};

const EnterpriseSearchStep = ({
  onBackClick,
}: EnterpriseSearchStepProps): JSX.Element => {
  const { setSearchParams, setEnterprise } = useNavContext();
  const refInput = useRef<HTMLDivElement>();

  function handleEnterpriseSelection(
    enterprise: Enterprise,
    params: SearchParams
  ) {
    setEnterprise(enterprise);
    setSearchParams(params);
  }

  return (
    <>
      <SearchEnterprise
        inputRef={refInput as MutableRefObject<HTMLDivElement>}
        renderResults={(state, params) => {
          if (refInput.current && state.data && !state.isLoading) {
            refInput.current.scrollIntoView({ behavior: "smooth" });
          }
          const isSiret = /^\d{14}$/.test(params.query.replace(/\s/g, ""));
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
            return <Section role="status">{state.error}</Section>;
          }

          if (!state.data) {
            return <></>;
          }
          return state.data.length > 0 ? (
            <Section>
              <ScreenReaderOnly role="status">
                {state.data.length} résultats
              </ScreenReaderOnly>

              <ComboBoxPopover>
                <ComboBoxList>
                  {state.data.map((item, index) => {
                    return (
                      <ComboBoxOption value={item.simpleLabel} key={item.siren}>
                        <EnterpriseButton
                          showAddress={isSiret || item.matching == 1}
                          isFirst={index === 0}
                          enterprise={item}
                          onClick={() =>
                            handleEnterpriseSelection(item, params)
                          }
                        />
                      </ComboBoxOption>
                    );
                  })}
                </ComboBoxList>
              </ComboBoxPopover>
            </Section>
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

export { EnterpriseSearchStep };

const Section = styled(SectionUi)`
  padding-top: 1rem;
`;
