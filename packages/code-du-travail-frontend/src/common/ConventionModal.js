import React from "react";
import Modal from "react-modal";
import dynamic from "next/dynamic";

// prevent ConventionPicker in initial bundle
const _ConventionPicker = dynamic(() => import("./ConventionPicker"), {
  loading: () => <p>Chargement des conventions...</p>
});

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
    width: "70%",
    maxHeight: "90%"
  }
};

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
          <div>
            Saisissez l'identifiant de convention collective (IDCC), le nom de
            la branche, ou le code NAF :
            <div style={{ marginTop: 10 }}>
              <_ConventionPicker />
            </div>
            <div>
              <div style={{ marginTop: 20, fontWeight: "bold" }}>
                Comment trouver ma convention collective ?
              </div>
              <li>
                Elle doit figurer au <b>bulletin de paie</b>, et sur une notice
                remise à l’embauche ou <b>sur le contrat de travail</b>
              </li>
              <li>
                Sur l’affichage obligatoire dans l’entreprise (avec les
                modalités de consultation en entreprise)
              </li>
              <div style={{ marginTop: 20, fontWeight: "bold" }}>
                Quelle est la CCN applicable ?
              </div>
              <li>
                En principe celle relevant de l’activité principale dans
                l’entreprise pour les cas les plus simples.
              </li>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ConventionModal;
