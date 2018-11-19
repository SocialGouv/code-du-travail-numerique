import React from "react";
import dynamic from "next/dynamic";
import { Button } from "@cdt/ui";
import { DialogContent, DialogOverlay } from "@reach/dialog";

// prevent ConventionPicker in initial bundle
const _ConventionPicker = dynamic(() => import("./ConventionPicker"), {
  loading: () => <p>Chargement des conventions...</p>
});

class ConventionModal extends React.Component {
  state = {
    modalIsOpen: false
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

  render() {
    const text = this.props.text || "Trouvez votre convention collective";
    return (
      <React.Fragment>
        <Button link onClick={this.openModal}>
          {text}
        </Button>
        <DialogOverlay
          isOpen={this.state.modalIsOpen}
          style={{ background: "rgba(0, 0, 0, .5)" }}
          initialFocusRef={this.inputRef}
          onDismiss={this.closeModal}
        >
          <DialogContent style={{ borderRadius: "3px", margin: "5vh auto" }}>
            <h2>Convention collective</h2>
            <div>
              Saisissez l&apos;identifiant de convention collective (IDCC), le
              nom de la branche, ou le code NAF :
              <div style={{ marginTop: 10 }}>
                <_ConventionPicker ref={this.inputRef} />
              </div>
              <div>
                <div style={{ marginTop: 20, fontWeight: "bold" }}>
                  Comment trouver ma convention collective ?
                </div>
                <li>
                  Elle doit figurer au <b>bulletin de paie</b>, et sur une
                  notice remise à l&apos;embauche ou{" "}
                  <b>sur le contrat de travail</b>
                </li>
                <li>
                  Sur l&apos;affichage obligatoire dans l&apos;entreprise (avec
                  les modalités de consultation en entreprise)
                </li>
                <div style={{ marginTop: 20, fontWeight: "bold" }}>
                  Quelle est la CCN applicable ?
                </div>
                <li>
                  En principe celle relevant de l&apos;activité principale dans
                  l&apos;entreprise pour les cas les plus simples.
                </li>
              </div>
            </div>
          </DialogContent>
        </DialogOverlay>
      </React.Fragment>
    );
  }
}

export default ConventionModal;
