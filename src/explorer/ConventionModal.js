import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

import ConventionPicker from "./ConventionPicker";

const modalStyles = {
  overlay: {
    zIndex: 10000
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    overflow: "visible",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 150
  }
};

const Container = styled.span`display: inline-block;`

class ConventionModal extends React.Component {

  state = {
    modalIsOpen: false,
  };

  openModal = (e) => {
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

  render () {
    const text = this.props.text || 'Trouvez votre convention collective';
    return (
      <Container>
        <a onClick={this.openModal} dangerouslySetInnerHTML={{__html:text}}></a>
        <Modal
          style={modalStyles}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <h2>Convention collective</h2>
          Trouvez votre convention collective :
          <br />
          <br />
          <ConventionPicker />
        </Modal>
      </Container>
    )
  };

}

export default ConventionModal;
