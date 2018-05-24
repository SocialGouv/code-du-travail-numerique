import React from "react";
import { Search, X, Download } from "react-feather";
import Delay from "react-delay";

import FuseInput from "./lib/FuseInput";

import kali from "./data/kali.json";
import idcc from "./data/idcc.json";

const conventions = []
  // use https://www.legifrance.gouv.fr/rechConvColl.do?reprise=true&page=1
  .concat(
    kali.map(c => ({
      ...c,
      label: c.titre
    }))
  )
  // use http://travail-emploi.gouv.fr/dialogue-social/negociation-collective/conventions-collectives/article/conventions-collectives-nomenclatures#2
  .concat(
    Object.keys(idcc).map(k => ({
      label: `${k}: ${idcc[k]}`,
      id: k,
      url: `https://www.legifrance.gouv.fr/rechConvColl.do?&champIDCC=${parseInt(
        k
      )}` // TODO: better
    }))
  );

const ConventionPreview = ({ convention }) => (
  <a target="_blank" href={convention.url}>
    <Download
      alt="Télécharger la convention"
      title="Télécharger la convention"
      size="16"
      style={{ marginRight: 5 }}
    />
    {convention.label}
  </a>
);

class ConventionPicker extends React.Component {
  state = {
    selected: null
  };
  onSuggestionSelected = (e, data) => {
    this.setState({ selected: data.suggestion.item });
  };
  reset = () => {
    this.setState({
      selected: null
    });
  };
  render() {
    if (this.state.selected) {
      return (
        <div>
          <ConventionPreview
            style={{ marginTop: 10 }}
            convention={this.state.selected}
          />
          <X
            size="16"
            onClick={this.reset}
            style={{ marginLeft: 5, cursor: "pointer" }}
          />
        </div>
      );
    }
    return (
      <div>
        <Search size="16" style={{ marginRight: 5, verticalAlign: "top" }} />
        <Delay wait={250}>
          <FuseInput
            data={conventions}
            onSuggestionSelected={this.onSuggestionSelected}
            placeholder="Convention collective ou code NAF"
          />
        </Delay>
        {this.state.selected && (
          <ConventionPreview
            style={{ marginTop: 10 }}
            convention={this.state.selected}
          />
        )}
      </div>
    );
  }
}

export default ConventionPicker;
