import React from "react";

import Search from "../src/search/Search";
import Categories from "../src/Categories";
//import FuseInput from "./lib/FuseInput";

import Autosuggest from "react-autosuggest";

const getSuggestionValue = suggestion => suggestion._id;

const getSuggestionHtml = suggestion =>
  (suggestion.highlight &&
    suggestion.highlight.title &&
    suggestion.highlight.title[0]) ||
  suggestion._source.title;

const renderSuggestion = suggestion => (
  <div
    dangerouslySetInnerHTML={{
      __html: `${suggestion._source.source} > ${getSuggestionHtml(suggestion)}`
    }}
  />
);

class AsyncFetch extends React.Component {
  state = {
    status: "idle",
    result: null
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = args => {
    this.setState(
      {
        status: "loading"
      },
      () => {
        this.props
          .fetch(args)
          .then(r => r.json())
          .then(result => {
            this.setState({
              status: "success",
              result
            });
          })
          .catch(e => {
            console.log("e", e);
            this.setState({
              status: "error",
              result: e.message
            });
          });
      }
    );
  };

  clear = () => {
    this.setState({
      result: null
    });
  };

  render() {
    return this.props.render({
      ...this.state,
      fetch: this.fetch,
      clear: this.clear
    });
  }
}

const elasticsearchIndexName = "code_du_travail_numerique";
const elasticsearchTypeName = "code_du_travail_numerique";

const getElasticSuggestionQuery = query => ({
  size: 10,
  query: {
    multi_match: {
      query,
      fields: ["title", "text"]
      //analyzer: "french_stemmed"
    }
  },
  highlight: {
    number_of_fragments: 1,
    fragment_size: 150,
    pre_tags: ["<mark>"],
    post_tags: ["</mark>"],
    fields: {
      title: {},
      text: {}
    }
  }
});

const elasticFetch = (endPoint, query) =>
  fetch(`${endPoint}/_search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(getElasticSuggestionQuery(query))
  });

class ElasticSuggester extends React.Component {
  state = {
    value: "boulangerie"
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  render() {
    const { value } = this.state;
    const inputProps = {
      placeholder: "Posez votre question",
      "aria-label": "Posez votre question",
      type: "search",
      className: "search__input",
      value,
      onChange: this.onChange
    };
    return (
      <AsyncFetch
        fetch={() =>
          elasticFetch("http://127.0.0.1:9200/code_du_travail_numerique", value)
        }
        render={({ status, result, fetch, clear }) => {
          return (
            <div>
              <Autosuggest
                suggestions={
                  (status === "success" &&
                    result &&
                    result.hits &&
                    result.hits.hits) ||
                  []
                }
                onSuggestionsFetchRequested={fetch}
                onSuggestionsClearRequested={clear}
                getSuggestionValue={suggest => suggest._id}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
            </div>
          );
        }}
      />
    );
  }
}

/*<div>
  <Autosuggest
    suggestions={suggestions}
    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
    getSuggestionValue={getSuggestionValue}
    renderSuggestion={renderSuggestion}
    inputProps={inputProps}
  />
</div>;
*/
// }

const Home = ({ onSuggestionSelected }) => {
  return (
    <div>
      <Search />
      <Categories />
    </div>
  );
};

export default props => <Home {...props} onSuggestionSelected={() => {}} />;
