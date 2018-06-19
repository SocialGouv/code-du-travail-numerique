import React from "react";
import styled from "styled-components";

import Panel from "./Panel";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";


const API = 'http://localhost:1337/api/v1/search?q=';


const ErrorXhrContainer = styled.div`margin-top: 20px;`;

class ErrorXhr extends React.Component {
  render() {
    const error = this.props.error.message;
    return (<ErrorXhrContainer className="notification error">
      <p>{error}</p>
    </ErrorXhrContainer>)
  }
}


const SearchContainer = styled.div`padding: 20px; text-align: center;`;

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: null,
      pendingXHR: false,
    };
  }

  fetchResults = query => {
    if (!query) {
      return this.setState({ data: null });
    }
    this.setState({ pendingXHR: true, error: null }, () => {
      fetch(API + query)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Un problème est survenu.");
        })
        .then(data => this.setState({ data, pendingXHR: false }))
        .catch(error => this.setState({ error, pendingXHR: false }));
    });
  }

  render() {
    const data = this.state.data;
    const errorJsx = this.state.error ? (<ErrorXhr error={this.state.error} />) : null;
    const loadingJsx = this.state.pendingXHR ? (<p>Chargement…</p>) : null;
    return (
      <SearchContainer>
        <Panel title="Rechercher">
          <SearchForm fetchResults={this.fetchResults}></SearchForm>
          {loadingJsx}
          {errorJsx}
          <SearchResults data={data}></SearchResults>
        </Panel>
      </SearchContainer>
    );
  }
}

export default Search;
