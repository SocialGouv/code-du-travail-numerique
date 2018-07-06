import React from "react";
import Modal from "react-modal";
import { Search } from "react-feather";

import suppletives from "./data/suppletives";
import { THEMES_L22531, THEMES_L22532 } from "./data/L2253";

import Article from "./Article";
import ConventionModal from "./ConventionModal";


const getAllThemes = themes =>
  Array.from(
    new Set(
      Object.keys(themes).reduce((uniques, c) => [...uniques, ...themes[c]], [])
    )
  );

const isInL22531 = id => getAllThemes(THEMES_L22531).indexOf(id) > -1;

const isInL22532 = id => getAllThemes(THEMES_L22532).indexOf(id) > -1;

const DispositionsSuppletives = ({ theme }) => {
  const dispos = suppletives[theme.id];
  if (dispos) {
    return (
      <div>
        <br />
        <b>Dispositions supplétives associées</b>
        <br />
        {dispos.map(article => <Article key={article} id={article} />)}
      </div>
    );
  }
  return <div />;
};

// retourne un texte pour un thème donné
const getArticulation = ({ theme, onEntrepriseClick }) => {
  if (isInL22531(theme.id)) {
    // article entre dans le champ du L.2253-1
    return (
      <div>
        Consultez votre{" "}
        <ConventionModal text="convention collective de branche" />{" "}
        ses dispositions sur ce thème s'appliquent pour votre question.
        <br />
        <br />
        Vérifiez aussi{" "}
        <a onClick={onEntrepriseClick}>
          votre accord d'entreprise
        </a>{" "}
        : S'il prévoit sur ce sujet des "garanties au moins équivalentes" , ces
        clauses s'appliquent dans votre cas.
      </div>
    );
  } else if (isInL22532(theme.id)) {
    // article entre dans le champ du L.2253-2
    return (
      <div>
        Consultez{" "}
        <a onClick={onEntrepriseClick}>
          votre accord d'entreprise
        </a>{" "}
        dont les clauses à ce sujet s’appliquent à votre situation.
        <b>Attention</b>, sur ce thème la{" "}
        <ConventionModal text="convention collective de branche" />{" "}
        peut décider qu'elle prime sur l'accord d'entreprise.
        <br />
        <br />
        Si c’est le cas :
        <br />
        - Votre accord d'entreprise a été signé avant la convention collective
        de branche ? Les clauses de votre accord d’entreprise s’appliquent même
        si elles sont moins favorables que celles de la convention collective de
        branche.
        <br />- Votre accord d'entreprise a été signé après la convention
        collective de branche Les clauses de votre accord d’entreprise
        s’appliquent si elles offrent des "garanties au moins équivalentes" sur
        ce sujet. Sinon, il faut vous référer aux clauses de la convention
        collective de branche.
      </div>
    );
  } else {
    // autres cas
    return (
      <div>
        Consultez{" "}
        <ConventionModal text="votre convention" />{" "}
        ou{" "}
        <a onClick={onEntrepriseClick}>
          accord d'<b>entreprise</b>
        </a>.
        <p />
        <u>
          Il n'y a pas de clause sur ce thème au niveau de l'accord
          d'entreprise?
        </u>
        <p />
        - Consultez{" "}
        <ConventionModal text="votre <b>convention collective</b>" />{" "}
        ou l'accord à portée plus large: Ils peuvent comporter des clauses sur
        ce thèmes qui vous sont opposables. <p />
        <u>
          Il n'y a aucune clause sur ce thème : tant dans l'accord d'entreprise,
          que dans la Convention collective ou l'accord à portée plus large ?
        </u>
        <p />
        - Ce sont les dispositions (dites supplétives) du code du travail, qui
        s'appliquent par défaut.
      </div>
    );
  }
};

const modalStyles = {
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

class Articulation extends React.Component {

  state = {
    modalBrancheIsOpen: false,
    modalEntrepriseIsOpen: false
  };

  openModalEntreprise = () => {
    this.setState({
      modalEntrepriseIsOpen: true
    });
  };

  closeModalEntreprise = () => {
    this.setState({
      modalEntrepriseIsOpen: false
    });
  };

  render() {
    const { theme } = this.props;
    return (
      <div>

        <div>
          {getArticulation({
            theme,
            onEntrepriseClick: this.openModalEntreprise
          })}
        </div>

        <DispositionsSuppletives theme={theme} />

        <Modal
          style={modalStyles}
          isOpen={this.state.modalEntrepriseIsOpen}
          onRequestClose={this.closeModalEntreprise}
          contentLabel="Modal Entreprise"
        >
          <h2>Accords d'entreprise</h2>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.legifrance.gouv.fr/initRechAccordsEntreprise.do"
          >
            Trouver votre accord d'entreprise sur LegiFrance{" "}
            <Search size="12" />
          </a>
        </Modal>

      </div>
    );
  }

}

export default Articulation;
