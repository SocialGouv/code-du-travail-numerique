import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "@cdt/ui";
import { ServiceRenseignement } from "./ServiceRenseignement";

class ServiceRenseignementModal extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };
  static defaultProps = {
    children: "Trouver votre service de renseignement"
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
    return (
      <React.Fragment>
        <Button link className="link" onClick={this.openModal}>
          {this.props.children}
        </Button>
        <Modal isOpen={this.state.modalIsOpen} onDismiss={this.closeModal}>
          <ServiceRenseignement />
        </Modal>
      </React.Fragment>
    );
  }
}

export default ServiceRenseignementModal;
