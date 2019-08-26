import React from "react";
import PropTypes from "prop-types";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import styled from "styled-components";
import X from "react-feather/dist/icons/x";
import { box, breakpoints, colors, spacing } from "../theme";
import ScreenReaderOnly from "../ScreenReaderOnly";

export class Modal extends React.Component {
  render() {
    const {
      children,
      isOpen,
      onDismiss,
      ContentWrapper,
      ...props
    } = this.props;
    const Wrapper = ContentWrapper || StyledDialogContent;
    return (
      <StyledDialogOverlay isOpen={isOpen} onDismiss={onDismiss} {...props}>
        <Wrapper>
          {children}
          <CloseIcon title="fermer la modale" onClick={onDismiss}>
            <ScreenReaderOnly>fermer la modale</ScreenReaderOnly>
            <X aria-hidden />
          </CloseIcon>
        </Wrapper>
      </StyledDialogOverlay>
    );
  }
}

Modal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  ContentWrapper: PropTypes.object
};

const StyledDialogOverlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  overflow: auto;
`;
const StyledDialogContent = styled(DialogContent)`
  position: relative;
  margin: 10vh auto;
  padding: 2rem;
  width: 50vw;
  max-height: calc(100vh - 2 * 10vh);
  background: white;
  border-radius: ${box.borderRadius};
  outline: none;
  overflow-y: auto;
  @media (max-width: ${breakpoints.desktop}) {
    width: 60vw;
  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 80vw;
  }
  @media (max-width: ${breakpoints.mobile}) {
    margin: ${spacing.base};
    max-height: calc(100vh - 2 * ${spacing.base});
    width: calc(100% - 2 * ${spacing.base});
  }
`;

export const ModalContentWrapper = StyledDialogContent;

const CloseIcon = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${spacing.small};
  color: ${colors.darkGrey};
  line-height: 0;
  background: transparent;
  border: none;
  -webkit-appearance: none;
  cursor: pointer;
  @media (max-width: ${breakpoints.desktop}) {
  }
  @media (max-width: ${breakpoints.tablet}) {
  }
  @media (max-width: ${breakpoints.mobile}) {
    position: fixed;
    top: ${spacing.small};
    right: ${spacing.small};
  }
`;
