import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

import servicesDeRenseignement from "../data/services-de-renseignement.json";

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
    overflow: "visible",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "70%"
  }
};

const Container = styled.div``;

class ServiceRenseignementModal extends React.Component {
  state = {
    modalIsOpen: false,
    departmentData: null
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

  onDepartmentInput = e => {
    let departmentNum = (e.target.value || "").toLowerCase();
    let departmentData = servicesDeRenseignement[departmentNum];
    this.setState({
      departmentData: departmentData
    });
  };

  render() {
    let department = null;
    if (this.state.departmentData) {
      department = (
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={this.state.departmentData.url}
            className="external-link__after"
          >
            <mark>{this.state.departmentData.url}</mark>
          </a>
        </p>
      );
    }

    return (
      <Container>
        <a href="#" role="button" onClick={this.openModal}>
          Trouver votre service de renseignement
        </a>
        <Modal
          style={modalStyles}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <h2>Trouver votre service de renseignement</h2>
          <p>
            <label>Saisissez votre numéro de département :</label>
            <input
              autoFocus
              type="text"
              maxLength="3"
              className="full-width"
              onChange={this.onDepartmentInput}
            />
          </p>
          {department}
        </Modal>
      </Container>
    );
  }
}

export default ServiceRenseignementModal;
