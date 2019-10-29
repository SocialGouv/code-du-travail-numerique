import React from "react";
import PropTypes from "prop-types";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import styled from "styled-components";
import { X } from "react-feather";
import { box, breakpoints, spacing } from "../theme";
import { Button } from "../Button";
import { ScreenReaderOnly } from "../ScreenReaderOnly";

export const Modal = ({
  children,
  isOpen,
  onDismiss,
  ContentWrapper,
  title,
  ...props
}) => {
  const Wrapper = ContentWrapper || StyledDialogContent;
  return (
    <StyledDialogOverlay isOpen={isOpen} onDismiss={onDismiss} {...props}>
      <Wrapper aria-label={title}>
        {children}
        <CloseButton
          variant="icon"
          title="fermer la modale"
          onClick={onDismiss}
        >
          <ScreenReaderOnly>fermer la modale</ScreenReaderOnly>
          <X aria-hidden />
        </CloseButton>
      </Wrapper>
    </StyledDialogOverlay>
  );
};

Modal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  ContentWrapper: PropTypes.object,
  title: PropTypes.string.isRequired
};

const StyledDialogOverlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background: rgba(0, 0, 0, 0.5);
`;
const StyledDialogContent = styled(DialogContent)`
  position: relative;
  width: 50vw;
  max-height: calc(100vh - 2 * 10vh);
  margin: 10vh auto;
  padding: 2rem;
  overflow-y: auto;
  color: ${({ theme }) => theme.darkText};
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
    width: calc(100% - 2 * ${spacing.base});
    max-height: calc(100vh - 2 * ${spacing.base});
    margin: ${spacing.base};
  }
`;

export const ModalContentWrapper = StyledDialogContent;

const CloseButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  @media (max-width: ${breakpoints.mobile}) {
    position: fixed;
    top: ${spacing.small};
    right: ${spacing.small};
  }
`;
