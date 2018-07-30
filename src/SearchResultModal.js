import React from "react";
import Modal from "react-modal";

if (typeof document !== 'undefined') {
  Modal.setAppElement(document.getElementById("root"));
}

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

class SearchResultModal extends React.Component {

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
    return (
      <div>
        <a href="#" onClick={this.openModal} className="search-results-link">{this.props.children}</a>
        <Modal
          style={modalStyles}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <h2>{this.props.title}</h2>
          <div dangerouslySetInnerHTML={{__html:this.props.text}}></div>
        </Modal>
      </div>
    )
  };

}

export default SearchResultModal;
