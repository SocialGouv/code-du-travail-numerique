import React from "react";
import PropTypes from "prop-types";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import styled from "styled-components";
import { X } from "react-feather";
import { box, colors, spacing } from "../theme";
export class Modal extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    onDismiss: PropTypes.func,
    children: PropTypes.node.isRequired,
    ContentWrapper: PropTypes.object
  };

  render() {
    const {
      children,
      className,
      isOpen,
      onDismiss,
      ContentWrapper
    } = this.props;
    const Wrapper = ContentWrapper || StyledDialogContent;
    return (
      <StyledDialogOverlay
        isOpen={isOpen}
        onDismiss={onDismiss}
        className={className}
      >
        <Wrapper>
          {children}
          <CloseIcon onClick={onDismiss}>
            <X title="fermer la modale" />
          </CloseIcon>
        </Wrapper>
      </StyledDialogOverlay>
    );
  }
}

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
  background: white;
  border-radius: ${box.borderRadius};
  outline: none;
`;

export const ModalContentWrapper = StyledDialogContent;

const CloseIcon = styled.button`
  position: absolute;
  top: 1em;
  right: 1em;
  padding: ${spacing.small};
  color: ${colors.darkGrey};
  line-height: 0;
  background: transparent;
  border: none;
  -webkit-appearance: none;
  cursor: pointer;
`;
