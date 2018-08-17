import React from "react";
import Router from "next/router";
import { withRouter } from "next/router";

import Alert from "../common/Alert";
import api from "../../conf/api.js";
import SearchAnswer from "./SearchAnswer";
import SearchResults from "./SearchResults";
import Categories from "./Categories";

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

  // Automatically get results for the given query.
  autoFetchForQuery = query => {
    this.setState({ query: query }, () => {
      this.fetchResults();
    });
  };

  // When the input's value is changed.
  handleChange = event => {
    let query = event.target.value;
    if (!query) {
      this.reset();
    }
    this.setState({ query: query });
  };

  // When the form is submitted.
  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.query) {
      return this.reset();
    }
    this.fetchResults();
  };

  // Clear the form when pressing esc.
  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.reset();
    }
  };

  // Get results from the backend.
  fetchResults = () => {
    Router.push({ pathname: "/", query: { q: encodeURI(this.state.query) } });
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
    const loadingJsx = pendingXHR ? (
      <p className="search__loading" role="alert" aria-live="assertive">
        Chargement…
      </p>
    ) : null;
    const showAnswer = router.query && router.query.type === "questions";

    let content = null;
    if (showAnswer) {
      content = <SearchAnswer data={data} id={router.query.id} />;
    } else {
      if (!data) {
        // No query.
        content = <Categories autoFetchForQuery={this.autoFetchForQuery} />;
      } else {
        content = <SearchResults data={data} query={query} />;
      }
    }

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
                  autoFocus
                  className="search__input"
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                  placeholder="Posez votre question"
                  type="search"
                  value={query}
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
