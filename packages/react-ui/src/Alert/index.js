import PropTypes from "prop-types";
import React from "react";
import { AlertCircle } from "react-feather";
import styled from "styled-components";

import { box, fonts, spacings } from "../theme.js";

export const Alert = styled.div`
  margin-bottom: ${spacings.base};
  padding: ${spacings.base} ${spacings.medium};
  color: ${({ theme }) => theme.paragraph};
  font-size: ${({ size }) =>
    size === "medium" ? fonts.sizes.default : fonts.sizes.small};
  background-color: ${({ theme }) => theme.bgSecondary};
  border: 1px solid
    ${({ theme, variant }) =>
      variant === "primary" ? theme.primary : theme.bgSecondary};
  border-radius: ${box.borderRadius};
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["small", "medium"]),
  variant: PropTypes.oneOf(["primary", "secondary"]),
};

Alert.defaultProps = {
  size: "medium",
  variant: "secondary",
};

export const AlertWithIcon = ({ variant, size, children, ...props }) => {
  return (
    <Flex variant={variant} size={size} {...props}>
      <AlertCircle aria-hidden="true" />
      <Box>{children}</Box>
    </Flex>
  );
};

AlertWithIcon.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["small", "medium"]),
  variant: PropTypes.oneOf(["primary", "secondary"]),
};

AlertWithIcon.defaultProps = {
  size: "medium",
  variant: "secondary",
};

const Flex = styled(Alert)`
  display: flex;
  align-items: center;
`;

const Box = styled.div`
  flex: 1;
  padding-left: ${spacings.medium};
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;
