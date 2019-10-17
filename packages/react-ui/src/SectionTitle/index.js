import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fonts, spacing } from "../theme";
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
  display: flex;
  align-items: flex-end;
  margin-bottom: 0;
  color: ${({ theme }) => theme.blueDark};
  font-weight: 600;
  font-size: ${fonts.sizeH4};
  font-family: Muli, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    Helvetica, Arial, sans-serif;
  line-height: 1.275;
`;

const Subtitle = styled.div`
  color: ${({ theme }) => theme.blueDark};
  font-weight: 300;
  font-size: ${fonts.sizeSmall};
  font-family: Muli, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    Helvetica, Arial, sans-serif;
  line-height: 1.1;
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.blueDark};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.blueLight};
  }
`;

const Icon = styled(ChevronRight)`
  margin-left: ${spacing.base};
  color: ${({ theme }) => theme.blueLight};
`;
