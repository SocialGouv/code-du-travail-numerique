import React from "react";
import { Search, X, Download } from "react-feather";

import FuseInput from "./lib/FuseInput";
import idcc from "../data/idcc.json";

// Input qui permet de selectionner une CC

const conventions = Object.keys(idcc).map(k => ({
  label: `${k}: ${idcc[k]}`,
  id: k
}));

const ConventionPreview = ({ convention }) => (
  <a href="#">
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
        <FuseInput
          data={conventions}
          onSuggestionSelected={this.onSuggestionSelected}
          placeholder="Convention collective ou code NAF"
        />
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
