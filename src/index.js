import React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import GitHubForkRibbon from "react-github-fork-ribbon";

import Explorer from "./Explorer";

const Title = styled.div`
  font-size: 2em;
  margin: 1em 0 10px;
  text-align: center;
  cursor: pointer;
`;

const Baseline = styled.div`
  font-size: 1.3em;
  margin: 0 0 1em 0;
  text-align: center;
`;

const AppContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const App = () => {
  // dirty trick to handle click on main title. todo: routing
  let explorer;
  return (
    <div>
      <GitHubForkRibbon
        href="//github.com/SocialGouv/code-du-travail-explorer"
        target="_blank"
        position="right"
        color="green"
      >
        version bêta
      </GitHubForkRibbon>
      <AppContainer>
        <Title onClick={() => explorer.reset()}>
          Code du travail numérique
        </Title>
        <Baseline>
          Trouvez les réponses à vos questions sur le droit du travail
        </Baseline>
        <Explorer ref={node => (explorer = node)} />
      </AppContainer>
    </div>
  );
};
render(<App />, document.getElementById("root"));
