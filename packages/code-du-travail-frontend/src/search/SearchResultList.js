import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { List, ListItem, theme } from "@cdt/ui";

import Link from "../lib/Link";
import { getRouteBySource, getLabelBySource } from "../sources";
import { SourceIcon } from "./SourceIcon";

const SearchResultList = ({ items, query }) => {
  return (
    <List>
      {items.map(({ _id, _source }) => {
        const { author, slug, source, title } = _source;
        return (
          <ListItem key={_id}>
            <Link
              pathname={getRouteBySource(source)}
              query={{
                slug,
                q: query
              }}
              passHref
            >
              <ResultLink>
                <SourceIcon source={source} />
                <Content>
                  <strong>{title.replace(/ \?/, " ?")}</strong>
                  <P>
                    <Label>Source</Label>:{" "}
                    <Label>{getLabelBySource(source)}</Label>
                    {source && author ? " - " : null}
                    <Value>{author}</Value>
                  </P>
                </Content>
              </ResultLink>
            </Link>
          </ListItem>
        );
      })}
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

export { SearchResultList };

const { colors, spacing, fonts, box } = theme;

const ResultLink = styled.a`
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

const Label = styled.span`
  font-weight: 700;
  color: ${colors.darkerGrey};
`;

const Value = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  color: ${colors.grey};
`;
