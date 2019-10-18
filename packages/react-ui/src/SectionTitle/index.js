import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { animations, fonts, spacing } from "../theme";
import { ChevronRight } from "react-feather";

export const SectionTitle = React.forwardRef(
  ({ children, desc = "", as = "h2", ...props }, ref) => (
    <div>
      <Title as={as}>
        {props.href ? (
          <>
            <StyledLink ref={ref} {...props} title={desc}>
              {children}
              <Icon aria-hidden="true" />
            </StyledLink>
          </>
        ) : (
          <>{children}</>
        )}
      </Title>
      {desc && <Subtitle>{desc}</Subtitle>}
    </div>
  )
);

SectionTitle.displayName = "SectionTitleRef";

SectionTitle.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
  desc: PropTypes.string,
  href: PropTypes.string
};

const Title = styled.h2`
  margin-bottom: 0;
  color: ${({ theme }) => theme.blueDark};
  font-weight: 600;
  font-size: ${fonts.sizeH4};
  font-family: Muli, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    Helvetica, Arial, sans-serif;
  line-height: ${fonts.lineHeight};
`;

const Subtitle = styled.div`
  color: ${({ theme }) => theme.blueDark};
  font-weight: 300;
  font-size: ${fonts.sizeBase};
  font-family: Muli, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    Helvetica, Arial, sans-serif;
  line-height: ${fonts.lineHeight};
`;

const StyledLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.blueDark};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.blueLight};
  }
`;

const Icon = styled(ChevronRight)`
  margin-left: ${spacing.base};
  color: ${({ theme }) => theme.blueLight};
  transition: ${animations.transitionTiming} ease-out transform;
  /* stylelint-disable-next-line */
  ${StyledLink}:hover & {
    transform: translateX(7px);
  }
`;
