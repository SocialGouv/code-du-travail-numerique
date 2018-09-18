import React from "react";
import Autosuggest from "react-autosuggest";

import AsyncFetch from "../lib/AsyncFetch";
import { Router } from "../../routes";

const getSuggestionHtmlTitle = suggestion =>
  (suggestion.highlight &&
    suggestion.highlight.title &&
    suggestion.highlight.title[0]) ||
  suggestion._source.title;

const getSuggestionValue = suggestion =>
  `${suggestion._source.source} > ${suggestion._source.title}`;

const getSuggestionHtml = suggestion =>
  `<b>${suggestion._source.source}</b> > ${getSuggestionHtmlTitle(suggestion)}`;

const renderSuggestion = suggestion => (
  <div
    dangerouslySetInnerHTML={{
      __html: getSuggestionHtml(suggestion)
    }}
  />
);

const getElasticSuggestionQuery = query => ({
  size: 10,
  query: {
    bool: {
      must: [
        {
          terms: {
            source: ["faq", "fiches_service_public", "fiches_ministere_travail"]
          }
        }
      ],
      should: [
        {
          multi_match: {
            query,
            fields: ["title", "text"]
            //analyzer: "french_stemmed"
          }
        }
      ]
    }
  },
  highlight: {
    number_of_fragments: 1,
    //fragment_size: 150,
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

const getRouteBySource = source =>
  ({
    faq: "questions",
    fiches_ministere_travail: "fiche-ministere-travail",
    fiches_service_public: "fiche-service-public"
  }[source]);

const onSuggestionSelected = (e, suggestion) => {
  const url = `/${getRouteBySource(suggestion.suggestion._source.source)}/${
    suggestion.suggestion._source.slug
  }`;
  Router.push(url);
};

class Suggester extends React.Component {
  state = {
    value: ""
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
      onChange: this.onChange,
      style: { width: "100%" }
    };
    return (
      <AsyncFetch
        fetch={() =>
          elasticFetch("http://127.0.0.1:9200/code_du_travail_numerique", value)
        }
        render={({ status, result, fetch, clear }) => {
          return (
            <Autosuggest
              theme={{
                container: {
                  flex: "1 0 auto",
                  // width: "calc(100% - 36px)",
                  textAlign: "left",
                  border: 0,
                  width: "calc(100% - 36px)"
                },
                suggestionsList: {
                  margin: 0,
                  padding: 0,
                  paddingTop: 10,
                  border: "1px solid silver",
                  background: "white",
                  borderTop: 0,
                  position: "absolute"
                },
                suggestion: {
                  listStyleType: "none",
                  padding: 5,
                  lineHeight: "2rem",
                  cursor: "pointer"
                },
                suggestionHighlighted: {
                  background: "#eee"
                }
              }}
              suggestions={
                (status === "success" &&
                  result &&
                  result.hits &&
                  result.hits.hits) ||
                []
              }
              alwaysRenderSuggestions={false}
              onSuggestionSelected={onSuggestionSelected}
              onSuggestionsFetchRequested={fetch}
              onSuggestionsClearRequested={clear}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          );
        }}
      />
    );
  }
}

export default Suggester;
