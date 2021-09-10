import { DialogContent, DialogOverlay } from "@reach/dialog";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import styled from "styled-components";

import { Button } from "../Button/index.js";
import { Burger as BurgerIcon } from "../icons/index.js";
import { ScreenReaderOnly } from "../ScreenReaderOnly/index.js";
import { box, breakpoints, spacings } from "../theme.js";

const maxTabletWidth = parseInt(breakpoints.tablet.replace("px", ""), 10);

export const BurgerNav = ({ children, ...props }) => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    function onResize() {
      if (
        document &&
        document.documentElement &&
        document.documentElement.clientWidth > maxTabletWidth
      ) {
        if (!isDesktop) {
          setIsDesktop(true);
        }
      } else if (isDesktop) {
        setIsDesktop(false);
      }
    }

    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  });
  if (isDesktop) {
    return <Div {...props}>{children}</Div>;
  }

  return (
    <>
      <OpenButton variant="naked" onClick={() => setOpen(true)} {...props}>
        <StyledBurgerIcon />
      </OpenButton>
      <StyledDialogOverlay isOpen={isOpen} onDismiss={() => setOpen(false)}>
        <StyledDialogContent aria-label={"Main navigation menu"}>
          {children}
          <CloseButton
            variant="naked"
            small
            narrow
            title="fermer la fenêtre modale"
            onClick={() => setOpen(false)}
          >
            <ScreenReaderOnly>fermer la modal</ScreenReaderOnly>
            <X aria-hidden="true" />
          </CloseButton>
        </StyledDialogContent>
      </StyledDialogOverlay>
    </>
  );
};

BurgerNav.propTypes = {
  children: PropTypes.node.isRequired,
};

const Div = styled.div`
  display: flex;
  height: 100%;
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const OpenButton = styled(Button)`
  height: auto;
  padding: 0;
`;

const StyledBurgerIcon = styled(BurgerIcon)`
  width: 5.4rem;
  height: 5.4rem;
  color: ${({ theme }) => theme.secondary};
  @media (max-width: ${breakpoints.mobile}) {
    width: 4.2rem;
    height: 4.2rem;
  }
`;

const StyledDialogOverlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
`;

const StyledDialogContent = styled(DialogContent)`
  @media (max-width: ${breakpoints.tablet}) {
    position: relative;
    width: 50vw;
    height: auto;
    left: 50%;
    transform: translateX(-50%);
    margin: ${spacings.base};
    padding: ${spacings.larger} 0 ${spacings.base};
    overflow-y: auto;
    background: ${({ theme }) => theme.white};
    border-radius: ${box.borderRadius};
    outline: none;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: calc(100% - 2 * ${spacings.base});
    height: auto;
    margin: ${spacings.base};
    left: initial;
    transform: initial;
  }
`;

const CloseButton = styled(Button)`
  @media (max-width: ${breakpoints.tablet}) {
    position: absolute;
    top: 0;
    right: 0;
    color: ${({ theme }) => theme.secondary};
  }
`;
