import React from "react";
import PropTypes from "prop-types";
import {
  searchAnnuaireByQuery,
  searchAnnuaireByCoord
} from "../annuaire/adresse.service";
import styled from "styled-components";
import AsyncFetch from "../lib/AsyncFetch";
import { AddressResults } from "./AddressResults";

export class AddressQuery extends React.Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    coord: PropTypes.object
  };
  static defaultProps = {
    coord: null
  };

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.query === this.props.query &&
      nextProps.coord === this.props.coord
    ) {
      return false;
    }
    return true;
  }

  fetch = () => {
    const { query, coord } = this.props;
    return coord ? searchAnnuaireByCoord(coord) : searchAnnuaireByQuery(query);
  };

  renderFetch = ({ status, result }) => {
    const { query } = this.props;
    switch (status) {
      case "loading":
        return <Loading>...</Loading>;
      case "success":
        return <AddressResults query={query} results={result} />;
      default:
        return (
          <div>
            {status} - <pre>{result}</pre>
          </div>
        );
    }
  };

  render() {
    return (
      <AsyncFetch
        autoFetch={true}
        fetch={() => this.fetch()}
        render={this.renderFetch}
      />
    );
  }
}

const Loading = styled.div`
  text-align: center;
`;
