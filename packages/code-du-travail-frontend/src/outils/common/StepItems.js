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

const { spacings, fonts, breakpoints } = theme;

const StepItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacings.medium} ${spacings.larger};
  background-color: ${({ theme }) => theme.bgSecondary};
  border-right: 1px solid ${({ theme }) => theme.border};
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: row-reverse;
    justify-content: space-between;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
`;

const Title = styled.span`
  margin: ${spacings.medium} 0;
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
  width: 13.5rem;
  padding: 0 ${spacings.tiny};
  color: ${({ isActive, theme }) =>
    isActive ? theme.altText : theme.placeholder};
  font-weight: 600;
  font-size: ${fonts.sizes.small};
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
  width: 2.5rem;
  height: 2.5rem;
  margin: ${spacings.tiny} ${spacings.small};
  margin-left: 0;
  color: ${({ theme }) => theme.white};
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.altText : theme.placeholder};
  border-radius: 49%;
`;
