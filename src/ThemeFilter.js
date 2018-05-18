import React from "react";
import styled from "styled-components";

const filters = {
  contract: {
    label: "Choisissez votre type de contrat : ",
    options: [
      {
        type: 'contract',
        value: null,
        label: 'Tous',
        ids: [],
      },
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
    ]
  }
};

const StyledThemeFilter = styled.div`
  display: block;
`;

class ThemeFilter extends React.Component {

  handleChange = (e) => {
    this.props.onFilterChange(JSON.parse(e.target.value));
  }

  render() {
    return (
      <StyledThemeFilter>
        <label for="contract">{filters.contract.label}</label>
        <select id="contract" onChange={this.handleChange}>
          {filters.contract.options.map(item => (
            <option key={item.value} value={JSON.stringify(item)}>{item.label}</option>
          ))}
        </select>
      </StyledThemeFilter>
    );
  }

};

export default ThemeFilter;
