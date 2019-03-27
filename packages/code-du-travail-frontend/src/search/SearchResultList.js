import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "../../routes";
import { getRouteBySource, getLabelBySource } from "../sources";
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

class ListLink extends React.Component {
  ref = React.createRef();
  static propTypes = {
    focused: PropTypes.bool
  };
  static defaultProps = {
    focused: false
  };
  componentDidMount() {
    if (this.ref.current && this.props.focused) {
      this.ref.current.focus();
    }
  }

  render() {
    return <ResultLink ref={this.ref} {...this.props} />;
  }
}

export { SearchResultList };

const List = styled.ul`
  list-style-type: none;
  margin-left: 0;
`;

const ResultLink = styled.a`
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
