import React from "react";
import PropTypes from "prop-types";
import { box, breakpoints, colors, spacing, fonts } from "../theme";
import styled, { css } from "styled-components";

/**
 * CategoryCell should be added to Categories and renamed Cell
 * since it's a generic grid component
 */
const CategoryCell = styled.li`
  flex-shrink: 1;
  flex-grow: 0;
  flex-basis: calc(100% / 4 - 2 * ${spacing.small});
  @media (max-width: ${breakpoints.tablet}) {
    flex-basis: calc(100% / 3 - 2 * ${spacing.small});
  }
  @media (max-width: ${breakpoints.mobile}) {
    flex-basis: calc(100% - 2 * ${spacing.small});
  }
  margin: ${spacing.small};
  text-align: center;
`;
export default CategoryCell;

export function Category({ title, text, icon, small = false }) {
  return (
    <CategoryWrapper small={small}>
      <Icon small={small} src={icon} alt="" />
      <Title small={small}>{title}</Title>
      {text && <Text small={small}>{text}</Text>}
    </CategoryWrapper>
  );
}

const CategoryWrapper = styled.div`
  padding: ${spacing.small} ${spacing.base};
  border: 1px solid ${colors.elementBorder};
  border-radius: ${box.borderRadius};
  background: ${colors.white};
  text-decoration: none;
  height: 100%;
  ${props => {
    if (props.small) {
      return css`
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        text-align: left;
        align-items: center;
      `;
    }
  }}
`;

Category.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string,
  small: PropTypes.bool
};

export const Text = styled.p`
  font-size: ${fonts.sizeSmall};
  color: ${colors.lightText};
`;

export const Title = styled.h3`
  font-size: ${fonts.sizeSmall};
  color: ${colors.blue};
`;

export const Icon = styled.img`
  width: ${props => (props.small ? "2rem" : "2.5rem")};
  display: inline-block;
  margin: ${props =>
    props.small ? `0.2rem ${spacing.small} 0.2rem 0` : spacing.base};
`;
