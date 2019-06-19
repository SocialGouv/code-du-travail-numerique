import React from "react";
import PropTypes from "prop-types";
import { box, colors, spacing, fonts } from "../theme";
import styled, { css } from "styled-components";

export function Category({ title, text, icon, small = false }) {
  return (
    <CategoryWrapper small={small}>
      <Icon small={small} src={icon} alt="" />
      <Title>{title}</Title>
      {text && <Text>{text}</Text>}
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
  color: ${colors.lightText};
  font-size: ${fonts.sizeSmall};
`;

export const Title = styled.h3`
  color: ${colors.blue};
  font-size: ${fonts.sizeH5};
`;

export const Icon = styled.img`
  width: ${props => (props.small ? "2rem" : "2.5rem")};
  display: inline-block;
  margin: ${props =>
    props.small ? `0.2rem ${spacing.small} 0.2rem 0` : spacing.base};
`;
