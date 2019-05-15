import React from "react";
import PropTypes from "prop-types";
import getConfig from "next/config";
import ConventionTexte from "./ConventionTexte";

const {
  publicRuntimeConfig: { API_DILA2SQL_URL }
} = getConfig();

class ConventionListeTextes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, textes: [], selectedTexte: null };
  }

  fetchTextes({ conteneurId, typeTextes }) {
    const url = `${API_DILA2SQL_URL}/base/KALI/conteneur/${conteneurId}/textes/${typeTextes}`;
    return fetch(url)
      .then(r => r.json())
      .then(res => res.textes);
  }

  async componentDidMount() {
    const { conteneur, typeTextes } = this.props;
    const textes = await this.fetchTextes({
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
            <a href="" onClick={e => this.onSelectTexte(e, null)}>
              &lt; Retour à la liste des textes
            </a>
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
                <a href="#" onClick={e => this.onSelectTexte(e, texte)}>
                  {texte.titrefull}
                </a>
              </li>
            ))}
          </ul>
        )}
      </React.Fragment>
    );
  }
}

ConventionListeTextes.propTypes = {
  conteneur: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  typeTextes: PropTypes.oneOf(["base", "extensions", "attaches", "salaires"])
};

export default ConventionListeTextes;
