import React from "react";
import styled from "styled-components";

const tagsFilters = [
  {
    type: 'contract',
    value: 'cdi',
    label: 'Contrat à durée indéterminée (CDI)',
    ids: [600, 1900, 3720],
  },
  {
    type: 'contract',
    value: 'cdd',
    label: 'Contrat à durée déterminée (CDD)',
    ids: [49700, 50200, 51000],
  },
  {
    type: 'contract',
    value: 'ctt',
    label: 'Contrat à temps partiel (CTT)',
    ids: [51400, 51800, 52100],
  },
];

const StyledThemeFilter = styled.div`
  display: block;
`;

class ThemeFilter extends React.Component {

  render() {
    const onFilterChange = this.props.onFilterChange;
    return (
      <StyledThemeFilter>
        <ul>
          <li>
            <label for="none">Aucun</label>
            <input name="contract" type="radio" id="none" onChange={() => onFilterChange()} />
          </li>
          {tagsFilters.map(item =>
            <li>
              <label for={item.value}>{item.label}</label>
              <input name="contract" type="radio" id={item.value} onChange={() => onFilterChange(item)} />
            </li>
          )}
        </ul>
      </StyledThemeFilter>
    );
  }

};

export default ThemeFilter;
