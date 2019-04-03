import React from "react";
import PropTypes from "prop-types";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import styled, { createGlobalStyle } from "styled-components";
import { X } from "react-feather";
import { box, colors, spacing } from "../theme";

const GlobalStyle = createGlobalStyle`
  :root {
    --reach-dialog: 1;
  }
`;

class Modal extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  };
  state = {
    modalIsOpen: false
  };
  openModal = e => {
    e.preventDefault();
    this.setState({
      modalIsOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  };

  render() {
    const { children } = this.props;
    console.log("Y'SPASSE QUOI LA ? KESKIAAA ?");
    return (
      <>
        <GlobalStyle />
        <StyledDialogOverlay
          isOpen={this.state.modalIsOpen}
          onDismiss={this.closeModal}
        >
          <StyledDialogContent>
            {children}
            <CloseIcon onClick={this.closeModal}>
              <X title="fermer la modale" />
            </CloseIcon>
          </StyledDialogContent>
        </StyledDialogOverlay>
      </>
    );
  }
}

export default Modal;

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
  width: 50vw;
  margin: 10vh auto;
  background: white;
  padding: 2rem;
  outline: none;
  position: relative;
  border-radius: ${box.borderRadius};
`;

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
