import React from "react";
import * as Feather from "react-feather";
import Modal from "react-modal";
import styled from "styled-components";

import servicesDeRenseignement from "../data/services-de-renseignement.json";

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

const Container = styled.div`display: inline-block;`

class ServiceRenseignementModal extends React.Component {

  state = {
    modalIsOpen: false,
    departmentData: null,
  };

  openModal = () => {
    this.setState({
      modalIsOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  };

  onDepartmentInput = (e) => {
    let departmentNum = (e.target.value || '').toLowerCase();
    let departmentData = servicesDeRenseignement[departmentNum];
    this.setState({
      departmentData: departmentData
    });
  };

  render () {

    let department = null;
    if (this.state.departmentData) {
      department = (
        <p>
          <a target="_blank" rel="noopener noreferrer" href={this.state.departmentData.url}>
            {this.state.departmentData.url} <Feather.ExternalLink size="12" />
          </a>
        </p>
      );
    }

    return (
      <Container>
        <a onClick={this.openModal}>Trouver votre service de renseignement</a>
        <Modal
          style={modalStyles}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <h2>Trouver votre service de renseignement</h2>
          <p>
            <label>
              Saisissez votre numéro de département : 
              <input type="text" maxlength="3" onChange={this.onDepartmentInput} />
            </label>
          </p>
          {department}
        </Modal>
      </Container>
    )
  };

}

export default ServiceRenseignementModal;
