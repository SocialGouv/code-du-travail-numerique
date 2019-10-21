import React from "react";
import styled from "styled-components";
import { theme } from "@socialgouv/react-ui";
/**
 * For now, only <Step /> are used but stepItems will
 * allows to navigate between form's steps
 */
export function StepItems({ activeIndex = 0, items = [] }) {
  return (
    <StepItemsContainer>
      <Title>
        Étapes{" "}
        <StepProgress>{`${activeIndex + 1}/${items.length}`}</StepProgress>
      </Title>
      {items.map((item, index) => (
        <Step
          key={item.name}
          label={item.label}
          index={index}
          activeIndex={activeIndex}
        />
      ))}
    </StepItemsContainer>
  );
}

function Step({ label, index, activeIndex, ...props }) {
  const isActive = activeIndex === index;
  return (
    <StepWrapper index={index} isActive={isActive} {...props}>
      <IndexCircle isActive={isActive}>{index + 1}</IndexCircle>
      {label}
    </StepWrapper>
  );
}

const { spacing, fonts, breakpoints } = theme;

const StepItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacing.medium} ${spacing.larger};
  background-color: ${({ theme }) => theme.lightBackground};
  border-right: 1px solid ${({ theme }) => theme.lightGrey};
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: row-reverse;
    justify-content: space-between;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
  }
`;

const Title = styled.span`
  margin: ${spacing.medium} 0;
  font-weight: 600;
`;
const StepProgress = styled.span`
  display: none;
  @media (max-width: ${breakpoints.mobile}) {
    display: inline-block;
  }
`;

const StepWrapper = styled.span`
  display: flex;
  align-items: center;
  width: 8.4375rem;
  padding: 0 ${spacing.tiny};
  color: ${({ isActive, theme }) => (isActive ? theme.blueLight : theme.grey)};
  font-weight: 600;
  font-size: ${fonts.sizeSmall};
  line-height: 1;
  text-align: left;
  text-decoration: none;
  @media (max-width: ${breakpoints.mobile}) {
    display: ${({ isActive }) => (isActive ? "flex" : "none")};
  }
`;

const IndexCircle = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  margin: ${spacing.xsmall} ${spacing.small};
  margin-left: 0;
  color: ${({ theme }) => theme.white};
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.blueLight : theme.grey};
  border-radius: 49%;
`;
