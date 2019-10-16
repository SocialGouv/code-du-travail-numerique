import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fonts, colors, spacing } from "../theme";
import { ChevronRight } from "react-feather";

export const SectionTitle = React.forwardRef(
  ({ children, desc = "", as = "h2", ...props }, ref) => (
    <div>
      <Title as={as}>
        {props.href ? (
          <>
            <StyledLink ref={ref} {...props} title={desc}>
              {children}
            </StyledLink>
            <Icon aria-hidden="true" />
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
  font-family: Muli, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    Helvetica, Arial, sans-serif;
  font-size: ${fonts.sizeH4};
  margin-bottom: 0;
  font-weight: 600;
  line-height: 1.275;
  color: ${colors.blueDark};
  display: flex;
  align-items: flex-end;
`;

const Subtitle = styled.div`
  font-family: Muli, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    Helvetica, Arial, sans-serif;
  font-size: ${fonts.sizeSmall};
  font-weight: 300;
  line-height: 1.1;
  color: ${colors.blueDark};
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: ${colors.blueDark};
  &:hover {
    color: ${colors.blueLight};
  }
`;

const Icon = styled(ChevronRight)`
  color: ${colors.blueLight};
  margin-left: ${spacing.base};
`;
