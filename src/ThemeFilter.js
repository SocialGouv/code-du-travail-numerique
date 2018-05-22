import React from "react";
import styled from "styled-components";

// Permet de filtrer la liste des catégories.

const filters = [
  {
    id: "contract",
    label: "Choisissez votre type de contrat : ",
    tag: "select",
    showInPath: "Contrat de travail",
    idsCommonToAll: [29700, 29400, 29500, 29900, 29300, 29800, 30000, 27900, 28100, 28000, 28200, 28300, 28400, 28500, 28600, 28700, 28800, 28900, 29000, 29100, 27400, 27500, 27600, 27700, 27800, 30100, 30200, 30300, 30400, 30500, 30600, 30700, 30800, 30900, 31000, 31100, 31200, 31300, 31500, 31400, 31600, 32600, 31700, 31800, 31900, 32000, 32100, 32200, 32300, 32400, 32500, 3700, 710, 720, 730, 740, 750, 760, 770, 780, 2700, 32800, 32900, 33000, 33100, 33200, 33300, 33400, 33500, 33600, 33700, 33800, 33900, 34000, 34100, 34200, 34300, 34400, 34500, 34600, 35000, 34700, 34800, 34900, 35100, 35200, 35300, 35400, 35500, 35600, 35700, 35800, 35900, 36000, 36100, 36200, 36300, 36400, 36500, 36600, 36700, 36800, 37000, 37100, 37200, 37300, 37400, 37500, 37600, 37700, 37900, 37800, 38000, 38100, 38200, 38300, 38400, 38500, 38600, 38700, 38800, 38900, 39000, 39100, 39200, 39300, 39400, 39500, 39600, 39700, 39800, 39900, 40000, 40100, 40200, 40300, 40400, 40500, 40600, 40700, 120, 1800],
    options: [
      {
        value: null,
        label: '----',
        ids: [],
      },
      {
        value: 'cdi',
        label: 'Contrat à durée indéterminée (CDI)',
        ids: [10700, 10800, 10900, 11000, 11100, 11200, 11300, 11400, 11500, 11600, 11700, 11800, 11900, 12000, 12100, 12200, 12300, 12400, 12500, 12600, 12700, 12800, 12900, 13000, 13100, 13200, 13300, 13400, 13500, 13600, 13700, 13800, 13900, 14000, 14100, 14200, 14300, 14400, 14500, 14600, 14700, 14800, 14900, 15000, 15100, 15200, 15300, 15400, 15500, 15600, 15700, 15800, 15900, 2400, 2500, 2600, 2700, 2800, 2900, 29200, 29600, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3800, 3900, 4000, 49100, 49200, 49300, 49400, 49500, 49600, 49700, 49800, 49900, 50000, 50100, 50200, 50300, 50400, 50500, 50600, 50700, 50800, 50900, 51000, 51100, 51200, 51300, 51400, 51500, 51600, 51700, 51800, 51900, 52000, 52100, 52200, 52300, 52400, 52500, 52600, 52700, 52800, 52900, 53000, 53100, 53200, 53300, 53400],
      },
      {
        value: 'cdd',
        label: 'Contrat à durée déterminée (CDD)',
        ids: [1000, 1010, 1020, 1030, 1040, 1050, 1060, 7900, 8000, 8100, 8200, 8300, 8400, 8500, 8600, 8700, 8800, 8900, 9000, 9100, 9200, 9300, 9400, 9500, 9600, 9700, 9900],
      },
      {
        value: 'ctt',
        label: 'Contrat à temps partiel (CTT)',
        ids: [100, 1000, 1100, 130, 1300, 1400, 1500, 1600, 1900, 200, 2000, 300, 410, 420, 430, 600, 700, 800, 810, 820, 830, 900],
      },
      {
        value: 'foreigner',
        label: 'Salariés étrangers',
        ids: [46400, 46500, 46600, 46700, 46800, 46900, 47000, 47100, 47200, 47300, 47400, 47500, 47600, 47700, 47800, 47900, 48000, 48100, 48200, 48300, 48400, 48500, 48600, 48700, 48800, 48900, 49000, 53500, 53600, 53700, 53800, 53900, 54000, 54100, 54200, 54300, 54400, 54500, 54600, 54700, 54800, 54900],
      },
      {
        value: 'autre',
        label: 'Autres contrats',
        ids: [6600, 6700, 6800, 6900, 7000, 7100, 7200, 7300, 7400, 7500, 7600, 7700, 7800],
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
              {item.options.map(option => {
                option.ids = option.ids.concat(item.idsCommonToAll)
                option.showInPath = item.showInPath
                return (
                  <option key={option.value} value={JSON.stringify(option)}>{option.label}</option>
                )
              })}
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
