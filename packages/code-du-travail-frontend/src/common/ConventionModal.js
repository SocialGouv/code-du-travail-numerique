import React from "react";
import { Button } from "@cdt/ui";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { ConventionForm } from "./ConventionForm";
import { searchIdcc } from "./convention.service";

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
    return (
      <React.Fragment>
        <Button link onClick={this.openModal}>
          Trouvez votre convention collective
        </Button>
        <DialogOverlay
          isOpen={this.state.modalIsOpen}
          style={{ background: "rgba(0, 0, 0, .5)" }}
          onDismiss={this.closeModal}
        >
          <DialogContent style={{ borderRadius: "3px", margin: "5vh auto" }}>
            <ConventionForm onSearch={searchIdcc} />
          </DialogContent>
        </DialogOverlay>
      </React.Fragment>
    );
  }
}

export default ConventionModal;
