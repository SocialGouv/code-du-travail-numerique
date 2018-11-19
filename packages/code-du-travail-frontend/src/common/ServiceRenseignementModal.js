import React from "react";
import styled from "styled-components";
import { Button } from "@cdt/ui";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { UID } from "react-uid";

import servicesDeRenseignement from "../data/services-de-renseignement.json";

const Container = styled.div``;

class ServiceRenseignementModal extends React.Component {
  state = {
    modalIsOpen: false,
    departmentData: null
  };

  inputRef = React.createRef();

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
        <Button link className="link" onClick={this.openModal}>
          Trouver votre service de renseignement
        </Button>
        <DialogOverlay
          isOpen={this.state.modalIsOpen}
          style={{ background: "rgba(0, 0, 0, .5)" }}
          initialFocusRef={this.inputRef}
          onDismiss={this.closeModal}
        >
          <DialogContent style={{ borderRadius: "3px", margin: "5vh auto" }}>
            <h2>Trouver votre service de renseignement</h2>
            <p>
              <UID name={id => `id_${id}`}>
                {id => (
                  <React.Fragment>
                    <label htmlFor={id}>
                      Saisissez votre numéro de département :
                    </label>
                    <input
                      id={id}
                      ref={this.inputRef}
                      type="text"
                      maxLength="3"
                      className="full-width"
                      onChange={this.onDepartmentInput}
                    />
                  </React.Fragment>
                )}
              </UID>
            </p>
            {department}
          </DialogContent>
        </DialogOverlay>
      </Container>
    );
  }
}

export default ServiceRenseignementModal;
