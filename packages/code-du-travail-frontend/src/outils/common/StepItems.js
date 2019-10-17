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
  display: flex;
  flex-wrap: wrap;
  margin-top: ${spacing.interComponent};
  padding-bottom: ${spacing.interComponent};
  border-bottom: 1px solid ${colors.grey};
`;

const StepWrapper = styled.span`
  display: flex;
  align-items: center;
  width: 8.4375rem;
  padding: 0 ${spacing.tiny};
  color: ${props => (props.isActive ? colors.blueLight : colors.grey)};
  font-weight: 600;
  font-size: ${fonts.sizeSmall};
  line-height: 1;
  text-align: left;
  text-decoration: none;
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
  color: ${colors.white};
  background-color: ${props =>
    props.isActive ? colors.blueLight : colors.grey};
  border-radius: 49%;
`;
