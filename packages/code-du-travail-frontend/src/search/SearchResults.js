import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Alert, NoAnswer, Button } from "@cdt/ui";

import { FeedbackModal } from "../common/FeedbackModal";
import { Link } from "../../routes";

import { getLabelBySource, getRouteBySource } from "../sources";
import ReponseIcon from "../icons/ReponseIcon";
import ArticleIcon from "../icons/ArticleIcon";
import ModeleCourrierIcon from "../icons/ModeleCourrierIcon";
import DossierIcon from "../icons/DossierIcon";
import OutilIcon from "../icons/OutilsIcon";

const SearchResultList = ({ items, query }) => {
  return (
    <List>
      {items.map(({ _id, _source }, i) => (
        <li key={_id}>
          <Link
            route={getRouteBySource(_source.source)}
            params={{ q: query, slug: _source.slug }}
            passHref
          >
            <ListLink focused={i === 0}>
              <SearchResult result={_source} />
            </ListLink>
          </Link>
        </li>
      ))}
    </List>
  );
};

SearchResultList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      _source: PropTypes.shape({
        title: PropTypes.string,
        source: PropTypes.string,
        slug: PropTypes.string
      })
    })
  )
};

const Icon = ({ source }) => {
  switch (source) {
    case "faq":
      return <ResultIcon as={ReponseIcon} />;
    case "fiches_service_public":
    case "fiches_ministere_travail":
      return <ResultIcon as={ReponseIcon} />;

    case "code_du_travail":
      return <ResultIcon as={ArticleIcon} />;
    case "modeles_de_courriers":
      return <ResultIcon as={ModeleCourrierIcon} />;
    case "themes":
      return <ResultIcon as={DossierIcon} />;
    case "outils":
      return <ResultIcon as={OutilIcon} />;
    case "kali":
      return <ResultIcon as={ArticleIcon} />;
  }
};

const SearchResult = ({ result }) => {
  const { title, source, author } = result;
  return (
    <React.Fragment>
      <Icon source={source} />
      <Content>
        <strong>{title.replace(/ \?/, " ?")}</strong>
        <P>
          <Label>Source</Label>: <Label>{getLabelBySource(source)}</Label>
          {source && author ? " - " : null}
          <Value>{author}</Value>
        </P>
      </Content>
    </React.Fragment>
  );
};

class SearchResults extends React.Component {
  static propTypes = {
    query: PropTypes.string,
    source: PropTypes.string,
    data: PropTypes.shape({
      hits: PropTypes.shape({
        total: PropTypes.integer,
        hits: PropTypes.array.isRequired
      }).isRequired
    })
  };

  static defaultProps = {
    query: "",
    source: "",
    data: { hits: { total: 0, hits: [] } }
  };

  state = {
    feedbackVisible: false
  };

  // contains the first result item ref
  // in order to move focus to it
  firtResultRef = React.createRef();

  componentDidMount() {
    if (this.firtResultRef.current) {
      this.firtResultRef.current.focus();
    }
  }
  showFeedBackPopup = () => {
    this.setState({ feedbackVisible: true });
  };

  closeModal = () => {
    this.setState({ feedbackVisible: false });
  };

  render() {
    const { data, query, source } = this.props;
    console.log("[searchresult] render");
    // No results.
    if (!data || !data.hits || !data.hits.total) {
      return (
        <React.Fragment>
          <Alert category="primary">
            <p>
              Nous n&apos;avons pas trouvé de résultat pour votre recherche.
            </p>
            {source.length > 0 && (
              <p>
                Vous pouvez élargir la recherche en intégrant&nbsp;
                <strong>
                  <Link route="index" params={{ q: query, source: "" }}>
                    <a>les autres sources de documents</a>
                  </Link>
                </strong>
              </p>
            )}
          </Alert>
          <NoAnswer>
            <Button onClick={this.showFeedBackPopup}>
              Posez votre question
            </Button>
          </NoAnswer>
          <FeedbackModal
            results={[]}
            isOpen={this.state.feedbackVisible}
            closeModal={this.closeModal}
            query={query}
            source={source}
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className="search-results">
          {data.snippet && (
            <ResultSnippet>
              <p
                dangerouslySetInnerHTML={{
                  __html: data.snippet._source.html
                }}
              />
              {data.snippet._source.references && (
                <SourceLink
                  href={data.snippet._source.references[0].url}
                  norel
                  noopener
                >
                  {data.snippet._source.references[0].titre}
                </SourceLink>
              )}
            </ResultSnippet>
          )}
          {source && <Title> {getLabelBySource(source)} </Title>}
          <SearchResultList items={data.hits.hits} query={query} />
        </div>
        <NoAnswer>
          <Button onClick={this.showFeedBackPopup}>Posez votre question</Button>
        </NoAnswer>
        <FeedbackModal
          results={data.hits.hits.slice(3)}
          isOpen={this.state.feedbackVisible}
          closeModal={this.closeModal}
          query={query}
        />
      </React.Fragment>
    );
  }
}

export default SearchResults;

const Title = styled.h3`
  text-align: center;
`;

const List = styled.ul`
  list-style-type: none;
  margin-left: 0;
`;

const ListLink = styled.a`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  border-radius: var(--border-radius-base);
  padding: 1rem;
  padding: var(--spacing-base);
  :link {
    text-decoration: none;
  }
  :hover {
    border-color: #c9d3df;
    border-color: var(--color-element-border);
    background: #ebeff3;
    background: var(--color-dark-background);
  }
  :hover strong {
    text-decoration: underline;
  }
`;

const Content = styled.div`
  padding-left: 1rem;
`;

const ResultSnippet = styled.div`
  border-radius: 0.5rem;
  background-color: #fff;
  padding: 0.75rem;
  margin-bottom: 2rem;
  p {
    font-size: 1.1rem;
  }
`;

const SourceLink = styled.a`
  font-size: 0.9rem;
`;

const P = styled.p`
  margin-bottom: 0;
  font-size: 0.9em;
`;

const ResultIcon = styled.svg`
  width: 2rem;
  flex-shrink: 0;
  color: #8393a7;
  color: var(--color-dark-grey);
`;

const Label = styled.span`
  font-weight: 700;
  color: #53657d;
  color: var(--color-darker-grey);
`;

const Value = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  color: #adb9c9;
  color: var(--color-grey);
`;
