import PropTypes from "prop-types";
import styled from "styled-components";

export const Progress = styled.div`
  width: ${({ ratio }) => `${ratio * 100}%`};
  height: 0.2rem;
  background-color: ${({ theme, variant }) => theme[variant]};
`;

Progress.propTypes = {
  ratio: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary"]),
};

Progress.defaultProps = {
  ratio: 0.5,
  variant: "primary",
};
