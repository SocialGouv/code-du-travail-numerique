import { Paragraph, theme } from "@socialgouv/cdtn-ui";
import React, { ForwardedRef } from "react";
import styled from "styled-components";
import { LinkedTile, Props } from "./LinkedTile";
import { icons } from "@socialgouv/cdtn-ui";

const { DirectionRight } = icons;

type CallToActionTileProps = Props & { action?: string };

export const CallToActionTile = React.forwardRef<
  HTMLAnchorElement,
  CallToActionTileProps
>(function _CallToActionTile(
  { action = "", children, centerTitle, ...props }: CallToActionTileProps,
  ref: ForwardedRef<any>
): JSX.Element {
  return (
    <StyledTile centerTitle={centerTitle} {...props} ref={ref}>
      <TileChildren>
        {children}
        {action && (
          <StyledDiv>
            <Paragraph variant="primary" fontWeight="600">
              {action} <DirectionRight />
            </Paragraph>
          </StyledDiv>
        )}
      </TileChildren>
    </StyledTile>
  );
});

CallToActionTile.displayName = "CallToActionTile";

const { spacings, breakpoints, fonts } = theme;

const TileChildren = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1 1 auto;

  p {
    margin: 0 auto;
    flex: 1 0 auto;
    display: flex;
  }
`;

const StyledTile = styled(LinkedTile)`
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
  padding-top: ${spacings.base};

  &:first-child {
    padding-top: ${spacings.small};
  }
  p {
    display: inline-flex;
    align-items: center;
    &:hover {
      text-decoration: underline;

      svg {
        align-self: center;
        transform: translateX(4px);
      }
    }

    svg {
      width: 2.6rem;
      height: 1.4rem;
      margin: 0 ${spacings.tiny} 0 ${spacings.small};
      transition: transform ${theme.animations.transitionTiming} linear;
      fill: ${theme.primary};
    }
  }
`;
