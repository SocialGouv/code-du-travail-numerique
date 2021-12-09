import { Button, theme, Tile } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

export const CallToActionTile = React.forwardRef(
  ({ action, children, ...props }, ref) => (
    <StyledTile custom {...props} ref={ref}>
      <TileChildren>
        {children}
        <StyledDiv hasContentAbove={Boolean(children)}>
          <Button variant="link" as="p">
            {action}
          </Button>
        </StyledDiv>
      </TileChildren>
    </StyledTile>
  )
);

CallToActionTile.displayName = "CallToActionTile";

CallToActionTile.propTypes = {
  action: PropTypes.string,
  children: PropTypes.node,
};

CallToActionTile.defaultProps = {
  action: "",
  children: null,
};

const { spacings, breakpoints, fonts } = theme;

const TileChildren = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const StyledTile = styled(Tile)`
  h2 {
    font-weight: 600;
    font-size: ${fonts.sizes.headings.small};
    font-family: "Open Sans", sans-serif;
    @media (max-width: ${breakpoints.mobile}) {
      font-size: ${fonts.sizes.default};
    }
  }
`;

const StyledDiv = styled.div`
  margin-top: ${({ hasContentAbove }) =>
    hasContentAbove ? spacings.base : spacings.small};
`;
