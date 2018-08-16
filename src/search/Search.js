import React from "react";
import Router from "next/router";
import { withRouter } from "next/router";

import Alert from "../common/Alert";
import api from "../../conf/api.js";
import SearchAnswer from "./SearchAnswer";
import SearchResults from "./SearchResults";

class Search extends React.Component {
  state = {
    query: "",
    data: null,
    error: null,
    pendingXHR: false
  };

  componentDidMount() {
    if (Router.query && Router.query.q) {
      this.setState({ query: decodeURI(Router.query.q) }, () => {
        this.fetchResults();
      });
    }
  }

  reset() {
    this.setState({ data: null, query: "" });
  }

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.query) {
      return this.reset();
    }
    Router.push({ pathname: "/", query: { q: encodeURI(this.state.query) } });
    this.fetchResults();
  };

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.reset();
    }
  };

  fetchResults = () => {
    this.setState({ pendingXHR: true, error: null }, () => {
      fetch(`${api.BASE_URL}/search?q=${this.state.query}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(api.ERROR_MSG);
        })
        .then(data => this.setState({ data, pendingXHR: false }))
        .catch(error => this.setState({ error, pendingXHR: false }));
    });
  };

  render() {
    const { data, error, pendingXHR, query } = this.state;
    const { router } = this.props;
    const xhrErrorJsx = error ? (
      <div className="section-light">
        <div className="container">
          <Alert category="danger">{error.message}</Alert>
        </div>
      </div>
    ) : null;
    const loadingJsx = pendingXHR ? <p>Chargement…</p> : null;
    const showSingleResult = router.query && router.query.type === "questions";
    let content = showSingleResult ? (
      <SearchAnswer data={data} id={router.query.id} />
    ) : (
      <SearchResults data={data} query={query} />
    );

    return (
      <div>
        <section className="section-light shadow-bottom">
          <div className="container">
            <div className="search">
              <header>
                <h1 className="no-margin">
                  Posez votre question sur le droit du travail
                </h1>
              </header>
              <form className="search__form" onSubmit={this.handleSubmit}>
                <input
                  type="search"
                  name="search"
                  placeholder="Posez votre question"
                  className="search__input"
                  value={query}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                />
                <button type="submit" className="btn btn__img btn__img__search">
                  <span className="hidden">Rechercher</span>
                </button>
              </form>
              {loadingJsx}
            </div>
          </div>
        </section>
        {xhrErrorJsx}
        {content}
      </div>
    );
  }
}

export default withRouter(Search);
