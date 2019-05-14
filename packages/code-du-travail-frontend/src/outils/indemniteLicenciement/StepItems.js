import React from "react";
import styled from "styled-components";
import { theme } from "@cdt/ui";

export function StepItems({ page, items, onNavigate = () => {} }) {
  return (
    <StepItemsContainer>
      {items.map((item, index) =>
        item.isValid ? (
          <ButtonStep
            key={item.name}
            index={index}
            step={item}
            onClick={() => onNavigate(index)}
          />
        ) : (
          <Step key={item.name} step={item} index={index} page={page} />
        )
      )}
    </StepItemsContainer>
  );
}

function ButtonStep({ step, onClick, index, ...props }) {
  return (
    <ClickableStep index={index} onClick={() => onClick(step.id)} {...props}>
      <IndexCircle>{index + 1}</IndexCircle>
      {step.label}
    </ClickableStep>
  );
}

function Step({ step, index, page, ...props }) {
  const isCurrentPage = page === index;
  return (
    <StepBase index={index} isCurrentPage={isCurrentPage} {...props}>
      <IndexCircle isCurrentPage={isCurrentPage}>{index + 1}</IndexCircle>
      {step.label}
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
  color: ${props => (props.isCurrentPage ? colors.blue : colors.grey)};
`;

const ClickableStep = styled(StepBase).attrs(() => ({ as: "button" }))`
  appearance: none;
  cursor: pointer;
  border: none;
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
  background-color: ${props =>
    props.isCurrentPage ? colors.blue : colors.grey};
`;
