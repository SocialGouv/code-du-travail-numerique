import React from "react";
import styled from "styled-components";

// Permet de filtrer la liste des catégories.

const filters = [
  {
    id: "contract",
    label: "Choisissez votre type de contrat : ",
    tag: "select",
    showInPath: "Contrat de travail",
    options: [
      {
        type: 'contract',
        value: null,
        label: '----',
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
  },
  {
    id: "duration",
    label: "Précisez la durée de votre contrat de travail : ",
    tag: "select",
    showInPath: "Emploi - Formation > Apprentissage > Examen",
    options: [
      {
        type: 'duration',
        value: null,
        label: '----',
        ids: [],
      },
      {
        type: 'duration',
        value: 'full-time',
        label: 'Temps plein',
        ids: [156101, 156102, 156103],
      },
      {
        type: 'duration',
        value: 'partial-time',
        label: 'Temps partiel',
        ids: [58100],
      },
    ]
  },
];

const StyledThemeFilter = styled.div`
  display: block;
`;

class ThemeFilter extends React.Component {

  handleChange = (e) => {
    this.props.onFilterChange(JSON.parse(e.target.value));
  }

  render() {

    // Current path as string, e.g.: "Emploi - Formation > Apprentissage > Examen".
    let currentPath = this.props.breadcrumbs.map(elem => { return elem.title; }).join(' > ');

    // Render some filters as <select> elements depending on the current path.
    let content = filters.map(item => {
      if (currentPath && currentPath.startsWith(item.showInPath)) {
        return (
          <div key={item.id}>
            <label htmlFor={item.id}>{item.label}</label>
            <select id={item.id} onChange={this.handleChange}>
              {item.options.map(option => (
                <option key={option.value} value={JSON.stringify(option)}>{option.label}</option>
              ))}
            </select>
          </div>
        )
      }
    });

    return (
      <StyledThemeFilter>
        {content}
      </StyledThemeFilter>
    );

  }

};

export default ThemeFilter;
