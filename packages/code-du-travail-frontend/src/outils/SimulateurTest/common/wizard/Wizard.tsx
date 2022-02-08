import { theme, Wrapper } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { PrevNextBar } from "../../../common/PrevNextBar";
import { STEP_LIST_WIDTH, StepList } from "../../../common/StepList";
import { WizardTitle } from "./WizardTitle";

const anchorRef = React.createRef<HTMLLIElement>();

type Props = {
  duration?: string;
  icon?: string;
  title: string;
  children: React.ReactNode;
  step: number;
  items: Array<{ name: string; label: string; isValid?: boolean }>;
  onPrev: () => void;
  onNext: () => void;
  hasError?: boolean;
};

export function Wizard({
  title,
  icon,
  children,
  duration,
  step,
  items,
  onPrev,
  onNext,
  hasError = false,
}: Props): JSX.Element {
  return (
    <Wrapper variant="main">
      <StyledDiv>
        <WizardTitle
          title={title}
          icon={icon}
          duration={duration}
          stepIndex={step}
          hasNoMarginBottom={true}
        />
        <StepList activeIndex={step} items={items} anchorRef={anchorRef} />
        {children}
        <PrevNextBar
          hasError={hasError}
          onPrev={onPrev}
          nextVisible={step !== items.length - 1}
          printVisible={step === items.length - 1}
          previousVisible={step !== 0}
          onNext={onNext}
        />
      </StyledDiv>
    </Wrapper>
  );
}

const { breakpoints } = theme;
//TODO: mettre dans un autre fichier
const StyledDiv = styled.div`
  padding: 0 0 0 ${STEP_LIST_WIDTH};
  overflow: visible;
  @media (max-width: ${breakpoints.tablet}) {
    padding: 0;
  }
  @media print {
    border: 0;
  }
`;
