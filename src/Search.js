import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { withRouter } from 'next/router'

import api from '../conf/api.js'
import ErrorXhr from './ErrorXhr'
import Panel from './Panel'
import SearchResult from './SearchResult'
import SearchResults from './SearchResults'


const SearchContainer = styled.div`padding: 20px;`

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
        this.fetchResults()
      })
    }
  }

  reset () {
    this.setState({data: null, query: ''})
  }

  handleChange = event => {
    this.setState({query: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    if (!this.state.query) {
      return this.reset()
    }
    Router.push({pathname: '/', query: { q: encodeURI(this.state.query) }})
    this.fetchResults()
  }

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.reset()
    }
  }

  fetchResults = () => {
    this.setState({pendingXHR: true, error: null}, () => {
      fetch(`${api.BASE_URL}/search?q=${this.state.query}`)
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error(api.ERROR_MSG)
        })
        .then(data => this.setState({data, pendingXHR: false}))
        .catch(error => this.setState({error, pendingXHR: false}))
    })
  }

  render() {

    const errorJsx = this.state.error ? (<ErrorXhr error={this.state.error.message} />) : null
    const loadingJsx = this.state.pendingXHR ? (<p>Chargement…</p>) : null
    const showSingleResult = this.props.router.query && this.props.router.query.type === 'questions'

    let content = showSingleResult
      ? (<SearchResult data={this.state.data} id={this.props.router.query.id} />)
      : (<SearchResults data={this.state.data} query={this.state.query} />)

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
          {content}
        </Panel>
      </SearchContainer>
    )

  }
}

export default withRouter(Search)
