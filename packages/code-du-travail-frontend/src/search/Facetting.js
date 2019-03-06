import React from "react";
import PropTypes from "prop-types";
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
    query: PropTypes.string
  };
  state = {
    facets: []
  };
  static getDerivedStateFromProps({ data = {} }) {
    const facets = data.reduce((state, item) => {
      if (
        ["fiches_ministere_travail", "fiches_service_public"].includes(item.key)
      ) {
        state.fiches = (state.fiches || 0) + item.doc_count;
      } else {
        state[item.key] = item.doc_count;
      }
      return state;
    }, {});

    return {
      facets: Object.entries(facets)
    };
  }

  render() {
    const { query } = this.props;
    const facets = this.state.facets.map(([key, count]) => (
      <Item key={key}>
        <Link route="recherche" params={{ q: query, source: key }}>
          <Text>
            {getLabelBySource(key)} ({count})
          </Text>
        </Link>
      </Item>
    ));
    return (
      <nav>
        <ListTitle>Type de réponse</ListTitle>
        <List>
          {facets}
          <Item>
            <Link route="recherche" params={{ q: query, source: "" }}>
              <Text>Toutes les réponses</Text>
            </Link>
          </Item>
        </List>
      </nav>
    );
  }
}

export { Faceting };

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const Item = styled.li`
  font-size: 0.9em;
  letter-spacing: 0.5px;
  font-weight: 700;
  color: #8393a7;
  padding: 0.5em 0;
`;

const ListTitle = styled.h3`
  font-size: 1em;
  color: #26353f;
  letter-spacing: 0.5px;
  font-weight: 700;
`;

const Text = styled.a`
  color: #8393a7;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
