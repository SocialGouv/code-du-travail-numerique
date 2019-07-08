import React from "react";
import styled from "styled-components";
import { theme } from "@cdt/ui";
/**
 * For now, only <Step /> are used but stepItems will
 * allows to navigate between form's steps
 */
export function StepItems({ activeIndex = 0, items = [] }) {
  return (
    <StepItemsContainer>
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

const { colors, spacing, fonts } = theme;

const StepItemsContainer = styled.div`
  border-bottom: 1px solid ${colors.grey};
  margin-top: ${spacing.interComponent};
  padding-bottom: ${spacing.interComponent};
  display: flex;
  flex-wrap: wrap;
`;

const StepWrapper = styled.span`
  display: flex;
  width: 8.4375rem; // 135px
  align-items: center;
  padding: 0 ${spacing.tiny};
  font-size: ${fonts.sizeSmall};
  text-align: left;
  color: ${props => (props.isActive ? colors.blue : colors.grey)};
  text-decoration: none;
  font-weight: 600;
  line-height: 1;
`;

const IndexCircle = styled.span`
  border-radius: 49%;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1.6rem;
  width: 1.6rem;
  margin: ${spacing.xsmall} ${spacing.small};
  margin-left: 0;
  color: ${colors.white};
  background-color: ${props => (props.isActive ? colors.blue : colors.grey)};
`;
