import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { Alert } from "../Alert";
import { Button } from "../Button";
import { fonts, spacings } from "../theme";

export const DisclosureIcon = ({
  icon,
  iconTitle,
  children,
  onVisibilityChange,
  isTooltipOpen,
  className,
}) => {
  return (
    <>
      <DisclosureIconButton
        title={iconTitle}
        aria-label={iconTitle}
        variant="navLink"
        size="small"
        type="button"
        onClick={onVisibilityChange}
        className={className}
      >
        {icon}
      </DisclosureIconButton>
      {isTooltipOpen && (
        <AlertWithMargin size="small" variant="secondary">
          {children}
        </AlertWithMargin>
      )}
    </>
  );
};

const DisclosureIconButton = styled(Button)`
  display: inline-block;
  font-weight: 700;
  font-size: ${fonts.sizes.small};
  color: ${({ theme }) => theme.secondary};
  margin-left: ${spacings.xsmall};
  padding: 0.5rem;
  height: 2rem;
  width: 2rem;
  position: relative;
  bottom: -0.5rem;
`;
const AlertWithMargin = styled(Alert)`
  margin-top: ${spacings.base};
`;

DisclosureIcon.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  icon: PropTypes.node.isRequired,
  iconTitle: PropTypes.string.isRequired,
  isTooltipOpen: PropTypes.bool.isRequired,
  onVisibilityChange: PropTypes.func.isRequired,
};
