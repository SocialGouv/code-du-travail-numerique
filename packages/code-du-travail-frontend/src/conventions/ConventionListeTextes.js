import React from "react";
import PropTypes from "prop-types";
import ConventionTexte from "./ConventionTexte";
import { fetchTextes } from "../common/convention.service";
import styled from "styled-components";
import { theme } from "@cdt/ui/";

class ConventionListeTextes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      textes: [],
      selectedTexte: null
    };
  }

  async componentDidMount() {
    const { conteneur, typeTextes } = this.props;
    const textes = await fetchTextes({
      conteneurId: conteneur.id,
      typeTextes
    });
    this.setState({ textes, loaded: true });
  }

  onSelectTexte(e, texte) {
    e.preventDefault();
    this.setState({ selectedTexte: texte });
  }

  render() {
    const { loaded, textes, selectedTexte } = this.state;
    return (
      <React.Fragment>
        {!loaded && <div>chargement ...</div>}
        {loaded && selectedTexte && (
          <React.Fragment>
            <Button onClick={e => this.onSelectTexte(e, null)}>
              &lt; Retour à la liste des textes
            </Button>
            <h2>{selectedTexte.titrefull}</h2>
            <ConventionTexte id={selectedTexte.id} />
          </React.Fragment>
        )}
        {loaded && !selectedTexte && textes.length == 0 && (
          <div>Aucun textes</div>
        )}
        {loaded && !selectedTexte && textes.length > 0 && (
          <ul>
            {textes.map(texte => (
              <li key={texte.id}>
                <Button onClick={e => this.onSelectTexte(e, texte)}>
                  {texte.titrefull}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </React.Fragment>
    );
  }
}

const Button = styled.button`
  padding: 0;
  margin: 0;
  border: 0;
  background-color: inherit;
  color: ${theme.colors.blue};
  text-decoration: underline;
  font-size: inherit;
  cursor: pointer;
`;

ConventionListeTextes.propTypes = {
  conteneur: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  typeTextes: PropTypes.oneOf(["base", "extensions", "attaches", "salaires"])
};

export default ConventionListeTextes;
