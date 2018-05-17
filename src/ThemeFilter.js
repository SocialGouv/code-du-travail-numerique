import React from "react";
import styled from "styled-components";

import filterEmitter from "./events-bus";

const tagsFilters = [
  {
    value: 'cdi',
    label: 'Contrat à durée indéterminée (CDI)',
    ids: [600, 1900, 3720],
  },
  {
    value: 'cdd',
    label: 'Contrat à durée déterminée (CDD)',
    ids: [49700, 50200, 51000],
  },
  {
    value: 'ctt',
    label: 'Contrat à temps partiel (CTT)',
    ids: [51400, 51800, 52100],
  },
];

const StyledThemeFilter = styled.div`
  display: block;
`;

class ThemeFilter extends React.Component {

  changeFilter = (item) => {
    filterEmitter.emit('FILTER_CHANGED', item);
  };

  cancelFilter = (item) => {
    filterEmitter.emit('FILTER_CANCELED');
  };

  render() {
    return (
      <StyledThemeFilter>
        <ul>
          <li>
            <label for="none">Aucun</label>
            <input name="contract" type="radio" id="none" onChange={this.cancelFilter} />
          </li>
          {tagsFilters.map(item =>
            <li>
              <label for={item.value}>{item.label}</label>
              <input name="contract" type="radio" id={item.value} onChange={() => this.changeFilter(item)} />
            </li>
          )}
        </ul>
      </StyledThemeFilter>
    );
  }

};

export default ThemeFilter;
