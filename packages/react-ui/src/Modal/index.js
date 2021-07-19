import { DialogContent, DialogOverlay } from "@reach/dialog";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { X } from "react-feather";
import styled from "styled-components";

import { Button } from "../Button/index.js";
import { ScreenReaderOnly } from "../ScreenReaderOnly/index.js";
import { box, breakpoints, spacings } from "../theme.js";

export const Modal = ({
  children,
  isOpen,
  onDismiss,
  ContentWrapper,
  title,
  ...props
}) => {
  const closeRef = useRef(null);
  const Wrapper = ContentWrapper || StyledDialogContent;
  return (
    <StyledDialogOverlay
      isOpen={isOpen}
      initialFocusRef={closeRef}
      onDismiss={onDismiss}
      {...props}
    >
      <Wrapper aria-label={title}>
        {children}
        <CloseButton
          variant="naked"
          small
          narrow
          title="fermer la modale"
          onClick={onDismiss}
          ref={closeRef}
        >
          <ScreenReaderOnly>fermer la modale</ScreenReaderOnly>
          <X aria-hidden="true" />
        </CloseButton>
      </Wrapper>
    </StyledDialogOverlay>
  );
};

Modal.propTypes = {
  ContentWrapper: PropTypes.object,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  title: PropTypes.string,
};

const StyledDialogOverlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  overflow: auto;
  background: rgba(0, 0, 0, 0.5);
`;
const StyledDialogContent = styled(DialogContent)`
  position: relative;
  width: 50vw;
  max-width: 74rem;
  max-height: calc(100vh - 2 * 10vh);
  margin: 10vh auto;
  padding: 2rem;
  overflow-y: auto;
  color: ${({ theme }) => theme.paragraph};
  background: ${({ theme }) => theme.white};
  border-radius: ${box.borderRadius};
  outline: none;
  @media (max-width: ${breakpoints.desktop}) {
    width: 60vw;
  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 80vw;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: calc(100% - 2 * ${spacings.base});
    max-height: calc(100vh - 2 * ${spacings.base});
    margin: ${spacings.base};
  }
`;

export const ModalContentWrapper = StyledDialogContent;

const CloseButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  color: ${({ theme }) => theme.secondary};
  @media (max-width: ${breakpoints.mobile}) {
    position: fixed;
    top: ${spacings.small};
    right: ${spacings.small};
  }
`;
