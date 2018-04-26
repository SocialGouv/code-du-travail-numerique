import React from "react";
import styled from "styled-components";

import BreadCrumbs from "./BreadCrumbs";
import ThemeSelector from "./ThemeSelector";
import Result from "./Result";

import parseThemes from "./parse-themes";
import rawThemes from "./data/themes.js";

import "./theme.css";

// convert themes.js at runtime for easy editing
const themes = parseThemes(rawThemes);

//
// Fil d'ariane (BreadCrumbs)
// + Choix du thème (ThemeSelector)
// + résultats (Result)
//

const ExplorerContainer = styled.div`padding: 20px;`;

const IntroContainer = styled.div`
  margin: 40px 20px;
  font-size: 1.3em;
  color: #888;
  text-align: center;
`;

const Intro = () => (
  <IntroContainer>
    Choisissez un thème pour explorer les ressources du code du travail numérique
    <br />
    <br />
    1604 thèmes, 10789 articles, 206 fiches pratiques, 680 conventions, 50 réponses
  </IntroContainer>
);

const Teaser = () => (
  <IntroContainer>
    todo : Afficher les contenus les plus demandés/utiles de ces thèmes ?
  </IntroContainer>
);

class Explorer extends React.Component {
  state = {
    selection: [
      /*
      { title: "Contrat de travail" },
      { title: "Congés autres" },
      { title: "Champ d'application" }
      */
    ]
  };
  reset = node => {
    this.setState({ selection: [] });
  };
  onSelectNode = node => {
    this.setState(curState => ({
      selection: [
        ...curState.selection,
        {
          ...node,
          articles: undefined,
          children: undefined
        }
      ]
    }));
    window.state = this.state;
  };
  onBreadCrumbClick = (item, idx) => {
    this.setState(curState => ({
      selection: curState.selection.slice(0, idx)
    }));
  };
  getCurrentTheme = () => {
    let node = themes;
    this.state.selection.forEach(theme => {
      const subNode = node.children.find(n => n.title === theme.title);
      if (subNode) {
        node = subNode;
      }
    });
    return node;
  };

  render() {
    const breadcrumbs = this.state.selection;
    const isStarted = breadcrumbs.length;
    const currentTheme = this.getCurrentTheme();
    const isLeaf = currentTheme.children.length === 0;
    return (
      <ExplorerContainer>
        <BreadCrumbs
          style={{ marginBottom: 10, marginLeft: 10 }}
          entries={breadcrumbs}
          onClick={this.onBreadCrumbClick}
        />
        <ThemeSelector node={currentTheme} onSelect={this.onSelectNode} />
        {isLeaf && <Result onResetClick={this.reset} theme={currentTheme} />}
        {!isStarted && <Intro />}
        {(isStarted && !isLeaf && <Teaser />) || null}
      </ExplorerContainer>
    );
  }
}

export default Explorer;
