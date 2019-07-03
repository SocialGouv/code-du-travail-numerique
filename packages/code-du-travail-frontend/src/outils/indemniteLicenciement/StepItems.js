import React from "react";
import styled from "styled-components";
import { theme } from "@cdt/ui";
/**
 * For now, only <Step /> are used but stepItems will
 * allows to navigate between form’s steps
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
    <StepBase index={index} isActive={isActive} {...props}>
      <IndexCircle isActive={isActive}>{index + 1}</IndexCircle>
      {label}
    </StepBase>
  );
}

const { colors, spacing, fonts } = theme;

const StepItemsContainer = styled.div`
  border-bottom: 1px solid ${colors.grey};
  padding: ${spacing.interComponent} 0;
  display: flex;
  flex-wrap: wrap;
`;

const StepBase = styled.span`
  text-align: left;
  flex-basis: 130px;
  display: flex;
  align-items: center;
  padding-left: ${props => (props.index === 0 ? 0 : spacing.interComponent)};
  text-decoration: none;
  font-size: ${fonts.sizeSmall};
  font-weight: 600;
  line-height: 1;
  color: ${props => (props.isActive ? colors.blue : colors.grey)};
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
