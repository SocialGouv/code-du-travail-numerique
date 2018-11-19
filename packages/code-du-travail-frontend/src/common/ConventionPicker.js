import React from "react";
import { X, Download } from "react-feather";

import FuseInput from "../lib/FuseInput";

import kali from "../data/kali.json";
import idcc from "../data/idcc.json";
import apeByIdcc from "../data/apeByIdcc.json";

const normalizeIdcc = idcc => (("" + idcc).length === 4 ? "0" + idcc : idcc);

// todo: move to ES
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
      label: `IDCC ${k}: ${idcc[k]}`,
      id: k,
      ape:
        apeByIdcc[normalizeIdcc(k)] && apeByIdcc[normalizeIdcc(k)].join(", "),
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
          <ConventionPreview convention={this.state.selected} />
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
        <FuseInput
          data={conventions}
          onSuggestionSelected={this.onSuggestionSelected}
          placeholder="Convention collective ou code NAF"
        />
        {this.state.selected && (
          <ConventionPreview convention={this.state.selected} />
        )}
      </div>
    );
  }
}

export default ConventionPicker;
