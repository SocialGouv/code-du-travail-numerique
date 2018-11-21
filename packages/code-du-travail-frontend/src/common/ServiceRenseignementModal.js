import React from "react";
import { Button } from "@cdt/ui";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { ServiceRenseignement } from "./ServiceRenseignement";

class ServiceRenseignementModal extends React.Component {
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
    return (
      <React.Fragment>
        <Button link className="link" onClick={this.openModal}>
          Trouver votre service de renseignement
        </Button>
        <DialogOverlay
          isOpen={this.state.modalIsOpen}
          style={{ background: "rgba(0, 0, 0, .5)" }}
          onDismiss={this.closeModal}
        >
          <DialogContent style={{ borderRadius: "3px", margin: "5vh auto" }}>
            <ServiceRenseignement />
          </DialogContent>
        </DialogOverlay>
      </React.Fragment>
    );
  }
}

export default ServiceRenseignementModal;
