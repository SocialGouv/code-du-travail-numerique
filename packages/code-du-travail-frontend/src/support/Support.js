import React from "react";
import { Support as SupportView } from "@cdt/ui";
import { searchAddress } from "../annuaire/adresse.service";
import { AdresseSuggester } from "./AdresseSuggester";
import { Router } from "../../routes";

class Support extends React.Component {
  static propTypes = {};
  state = {
    q: undefined
  };
  onSubmit = ({ target }) => {
    this.setState(
      { q: target.elements[0].value, coord: undefined },
      this.updateRoute
    );
  };

  onSelect = (suggestion, event) => {
    event.preventDefault();
    const { name, city, postcode } = suggestion.properties;
    const [lon, lat] = suggestion.geometry.coordinates;
    this.setState(
      {
        q: `${name}, ${postcode} ${city}`,
        coord: `${lon}:${lat}`
      },
      this.updateRoute
    );
  };

  updateRoute() {
    Router.pushRoute("index", {
      q: this.state.q,
      coord: this.state.coord,
      facet: "annuaire"
    });
  }

  render() {
    return (
      <SupportView onSubmit={this.onSubmit}>
        <AdresseSuggester onSearch={searchAddress} onSelect={this.onSelect} />
      </SupportView>
    );
  }
}

export { Support };
