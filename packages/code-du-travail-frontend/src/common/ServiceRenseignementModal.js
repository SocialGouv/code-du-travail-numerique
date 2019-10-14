import React from "react";
import PropTypes from "prop-types";
import { Modal } from "@socialgouv/react-ui";
import { ServiceRenseignement } from "./ServiceRenseignement";

class ServiceRenseignementModal extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
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
        {React.cloneElement(this.props.children, {
          onClick: this.openModal
        })}
        <Modal isOpen={this.state.modalIsOpen} onDismiss={this.closeModal}>
          <ServiceRenseignement />
        </Modal>
      </React.Fragment>
    );
  }
}

export default ServiceRenseignementModal;
