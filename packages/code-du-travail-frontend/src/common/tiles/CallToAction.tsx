import { Button, theme, Tile } from "@socialgouv/cdtn-ui";
import React, { ForwardedRef } from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode | null;
  action: string;
  title?: string;
  icon?: string;
  titleTagType: string;
  noCustom?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
};

export const CallToActionTile = React.forwardRef<HTMLAnchorElement, Props>(
  function _CallToActionTile(
    { action = "", noCustom, children, ...props }: Props,
    ref: ForwardedRef<any>
  ): JSX.Element {
    return (
      <StyledTile custom={!noCustom} {...props} ref={ref}>
        <TileChildren>
          {children}
          <StyledDiv hasContentAbove={Boolean(children)}>
            <Button variant="link">{action}</Button>
          </StyledDiv>
        </TileChildren>
      </StyledTile>
    );
  }
);

CallToActionTile.displayName = "CallToActionTile";

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
