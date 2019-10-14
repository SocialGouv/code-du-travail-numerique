import React from "react";
import { Modal, Tile } from "@socialgouv/react-ui";

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
        <Tile button="Rechercher" onClick={this.openModal}>
          Votre convention collective
        </Tile>
        <Modal isOpen={modalIsOpen} onDismiss={this.closeModal}>
          <ConventionForm />
        </Modal>
      </React.Fragment>
    );
  }
}

export default ConventionModal;
