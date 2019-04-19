import React from "react";
import PropTypes from "prop-types";
import { theme } from "@cdt/ui";
import styled from "styled-components";

import { Link } from "../../routes";
import { getLabelBySource } from "../sources";

class Faceting extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        doc_count: PropTypes.number
      })
    ),
    query: PropTypes.string,
    source: PropTypes.string
  };
  state = {
    facets: []
  };
  static getDerivedStateFromProps({ data = {} }) {
    const facets = data.reduce(
      (state, item) =>
        ["fiches_ministere_travail", "fiches_service_public"].includes(item.key)
          ? { ...state, fiches: (state.fiches || 0) + item.doc_count }
          : { ...state, [item.key]: item.doc_count },
      {}
    );

    return {
      facets: Object.entries(facets)
    };
  }

  render() {
    const { query, source } = this.props;

    return (
      <nav>
        <ListTitle>Type de réponse</ListTitle>
        <List>
          {this.state.facets.map(([key, count]) => (
            <Item key={key}>
              <Link
                route="recherche"
                params={{ q: query, source: key }}
                passHref
              >
                <Text active={key === source}>
                  {getLabelBySource(key)} ({count})
                </Text>
              </Link>
            </Item>
          ))}
          <Item>
            <Link route="recherche" params={{ q: query, source: "" }} passHref>
              <Text active={!source}>Toutes les réponses</Text>
            </Link>
          </Item>
        </List>
      </nav>
    );
  }
}

export { Faceting };

const { breakpoints, colors, fonts, spacing } = theme;

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const Item = styled.li`
  font-size: 0.9em;
  font-size: ${fonts.sizeSmall};
  letter-spacing: 0.5px;
  font-weight: 700;
  padding: ${spacing.small} 0;
  @media (max-width: ${breakpoints.mobile}) {
    display: inline-block;
    padding-bottom: 0;
    padding-right: ${spacing.small};
  }
`;

const ListTitle = styled.h3`
  font-size: ${fonts.sizeBase};
  color: ${colors.almostBlack};
  letter-spacing: 0.5px;
  font-weight: 700;
`;

const Text = styled.a`
  text-decoration: ${props => (props.active ? "underline" : "none")};
  color: ${props => (props.active ? colors.almostBlack : colors.darkGrey)};
  :link,
  :visited {
    text-decoration: ${props => (props.active ? "underline" : "none")};
    color: #8393a7;
    color: ${props => (props.active ? colors.almostBlack : colors.darkGrey)};
  }
  :hover {
    text-decoration: underline;
  }
`;
