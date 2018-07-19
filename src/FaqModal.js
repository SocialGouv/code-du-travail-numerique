import React from "react";
import Modal from "react-modal";

const faq = require("./data/faq.json");


Modal.setAppElement(document.getElementById("root"));

const modalStyles = {
  overlay: {
    zIndex: 10000
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    maxHeight: "80%"
  }
};

class FaqModal extends React.Component {

  state = {
    modalIsOpen: false,
    departmentData: null,
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
    let faqItem = faq.find(item => item['question'] === this.props.question);
    return (
      <div>
        <a href="#" onClick={this.openModal} className="search-results-link">{this.props.children}</a>
        <Modal
          style={modalStyles}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <h2>{faqItem.question}</h2>
          <div dangerouslySetInnerHTML={{__html:faqItem.reponse}}></div>
        </Modal>
      </div>
    )
  };

}

export default FaqModal;
