import React from "react";
import { render } from "react-dom";
import { Route, HashRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GitHubForkRibbon from "react-github-fork-ribbon";

import Explorer from "./Explorer";

const Title = styled.div`
  font-size: 2em;
  margin: 1em 0 10px;
  text-align: center;
  cursor: pointer;
  color: ${props => props.theme.primary};
`;

const Baseline = styled.div`
  font-size: 1.3em;
  margin: 0 0 1em 0;
  text-align: center;
  color: ${props => props.theme.primary};
`;

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const themeBlue = {
  primary: "#000",
  light1: "#e4f2ff",
  light2: "#e4f2ff",
  light3: "#f8fbff",
  background: "white"
};

const themeNeutral = {
  primary: "#000",
  light1: "#ccc",
  light2: "#ddd",
  light3: "#eee",
  background: "white"
};

const BaselineBottom = styled.div`
  font-size: 1.4em;
  text-align: left;
  padding-left: 30px;
  margin-top: 50px;
`;

const App = () => {
  // dirty trick to handle click on main title. todo: routing
  let explorer;
  return (
    <ThemeProvider theme={themeNeutral}>
      <div>
        <GitHubForkRibbon
          href="//github.com/SocialGouv/code-du-travail-explorer"
          target="_blank"
          position="right"
          color="green"
        >
          version bêta
        </GitHubForkRibbon>
        <AppContainer role="main">
          <Title onClick={() => explorer.reset()}>
            Code du travail numérique
          </Title>
          <Baseline>
            Trouvez les réponses à vos questions sur le droit du travail
          </Baseline>
          <Explorer ref={node => (explorer = node)} />
        </AppContainer>
      </div>
    </ThemeProvider>
  );
};
render(<App />, document.getElementById("root"));
