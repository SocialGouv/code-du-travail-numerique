import React from "react";
import styled from "styled-components";
import { Category, Modal, theme } from "@cdt/ui";

import ConventionForm from "./Form";

class ConventionModal extends React.Component {
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
    const { modalIsOpen } = this.state;
    return (
      <React.Fragment>
        <Button onClick={this.openModal}>
          <Category
            title="Votre convention collective"
            text="Trouvez simplement la convention collective dont vous dépendez"
            icon="/static/assets/icons/book_web.svg"
          />
        </Button>
        <Modal isOpen={modalIsOpen} onDismiss={this.closeModal}>
          <ConventionForm />
        </Modal>
      </React.Fragment>
    );
  }
}

export default ConventionModal;

const { box, colors } = theme;

const Button = styled.button`
  padding: 0;
  width: 100%;
  height: 100%;
  text-decoration: none;
  background: transparent;
  border: none;
  border-radius: ${box.borderRadius};
  appearance: none;
  cursor: pointer;
  & > * {
    transition: all 0.2s ease;
  }
  :focus > *,
  :active > *,
  :hover > * {
    border: 1px solid ${colors.focus};
    box-shadow: 0 0 2px 2px ${colors.focusShadow};
    transform: scale(1.1);
  }
`;
