import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getRouteBySource, getLabelBySource } from "@cdt/sources";
import { List, ListItem, theme } from "@cdt/ui-old";

import { SourceIcon } from "./SourceIcon";

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
    return <A ref={this.ref} {...this.props} />;
  }
}

const SearchResults = ({ items = [], query = "" }) => {
  return (
    <List>
      {items.map(
        ({ _id, _source: { url, source, slug, author, title } }, i) => (
          <ListItem key={_id}>
            {source === "external" ? (
              <ListLink
                focused={i === 0}
                href={url}
                target="_blank"
                className="no-after"
              >
                <SourceIcon source={source} />
                <Content>
                  <strong>{title.replace(/ \?/, " ?")}</strong>
                  <P>
                    <Span>Source</Span>: <Span>{getLabelBySource(source)}</Span>
                    {source && author ? " - " : null}
                    <Value>{author}</Value>
                  </P>
                </Content>
              </ListLink>
            ) : (
              <Link
                href={{
                  pathname: `/${getRouteBySource(source)}/[slug]`,
                  query: { q: query, slug: slug }
                }}
                as={`/${getRouteBySource(source)}/${slug}?q=${query}`}
                passHref
              >
                <ListLink focused={i === 0}>
                  <SourceIcon source={source} />
                  <Content>
                    <strong>{title.replace(/ \?/, " ?")}</strong>
                    <P>
                      <Span>Source</Span>:{" "}
                      <Span>{getLabelBySource(source)}</Span>
                      {source && author ? " - " : null}
                      <Value>{author}</Value>
                    </P>
                  </Content>
                </ListLink>
              </Link>
            )}
          </ListItem>
        )
      )}
    </List>
  );
};

SearchResults.propTypes = {
  query: PropTypes.string,
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

export { SearchResults };

const { colors, spacing, fonts, box } = theme;

const A = styled.a`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: ${box.borderRadius};
  padding: ${spacing.base};
  :link {
    text-decoration: none;
  }
  :hover {
    border-color: ${colors.elementBorder};
    background: ${colors.darkBackground};
  }
  :hover strong {
    text-decoration: underline;
  }
`;

const Content = styled.div`
  padding-left: ${spacing.base};
`;
const P = styled.p`
  margin-bottom: 0;
  font-size: ${fonts.sizeSmall};
`;

const Span = styled.span`
  font-weight: 700;
  color: ${colors.darkerGrey};
`;

const Value = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  color: ${colors.grey};
`;
