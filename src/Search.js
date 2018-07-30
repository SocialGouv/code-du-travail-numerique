import React from "react";
import Router from 'next/router'
import styled from "styled-components";
import { withRouter } from 'next/router'

import Panel from "./Panel";
import SearchResults from "./SearchResults";


let API = 'https://cdtn-api.num.social.gouv.fr/api/v1/search?q=';

if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  console.log('Running in dev mode on localhost')
  API = 'http://localhost:1337/api/v1/search?q=';
}


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

  state = {
    query: '',
    data: null,
    error: null,
    pendingXHR: false,
  }

  componentDidMount () {
    if (Router.query && Router.query.q) {
      this.setState({query: decodeURI(Router.query.q)}, () => {
        this.fetchResults();
      })
    }
  }

  reset () {
    this.setState({data: null, query: ''});
  }

  handleChange = event => {
    this.setState({query: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.query) {
      return this.reset();
    }
    Router.push({pathname: '/', query: { q: encodeURI(this.state.query) }});
    this.fetchResults();
  }

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.reset();
    }
  }

  fetchResults = () => {
    this.setState({pendingXHR: true, error: null}, () => {
      fetch(API + this.state.query)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Un problème est survenu.");
        })
        .then(data => this.setState({data, pendingXHR: false}))
        .catch(error => this.setState({error, pendingXHR: false}));
    });
  }

  render() {

    if (this.props.router.query && this.props.router.query.type === 'result') {
      console.log('---------------------------------');
      console.log('Display result');
    };

    const data = this.state.data;
    const query = this.state.query;
    const errorJsx = this.state.error ? (<ErrorXhr error={this.state.error} />) : null;
    const loadingJsx = this.state.pendingXHR ? (<p>Chargement…</p>) : null;
    return (
      <SearchContainer>
        <Panel title="Posez votre question sur le droit du travail">
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                type="text"
                value={this.state.query}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
              />
            </label>
            <button className="button" type="submit">Rechercher</button>
          </form>
          {loadingJsx}
          {errorJsx}
          <SearchResults data={data} query={query} />
        </Panel>
      </SearchContainer>
    );
  }
}

export default withRouter(Search);
