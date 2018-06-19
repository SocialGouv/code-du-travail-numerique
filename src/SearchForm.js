import React from "react";


class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {query: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    this.setState({query: event.target.value});
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.fetchResults(this.state.query);
  }

  handleKeyDown (event) {
    if (event.keyCode === 27) {
      this.setState({query: ''});
      this.props.fetchResults('');
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={this.state.query} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
        </label>
        <button className="button" type="submit">Rechercher</button>
      </form>
    );
  }

}

export default SearchForm;
