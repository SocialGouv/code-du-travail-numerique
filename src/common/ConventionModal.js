import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

import ConventionPicker from "./ConventionPicker";

if (typeof document !== "undefined") {
  Modal.setAppElement("body");
}

const modalStyles = {
  overlay: {
    zIndex: 10000,
    backgroundColor: "rgba(0,0,0,0.8)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    overflow: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    maxHeight: "90%"
  }
};

const Container = styled.div``;

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
    const text = this.props.text || "Trouvez votre convention collective";
    return (
      <React.Fragment>
        <a
          href="#"
          onClick={this.openModal}
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <Modal
          style={modalStyles}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <h2>Convention collective</h2>
          <p>
            <label>
              Trouvez votre convention collective :
              <ConventionPicker />
            </label>
          </p>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ConventionModal;
