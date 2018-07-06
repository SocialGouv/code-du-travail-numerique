import React from "react";
import { render } from "react-dom";
// import { Route, HashRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GitHubForkRibbon from "react-github-fork-ribbon";

import ExplorerToggler from "./ExplorerToggler";
import Search from "./Search";


const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 40px;
  /* should be somewhere else */
  .panel li {
    line-height: 1.5em;
  }
`;

const themeNeutral = {
  primary: "#000",
  light1: "#ccc",
  light2: "#ddd",
  light3: "#eee",
  background: "white"
};

const Header = ({ onClick }) => (
  <header className="navbar">
    <div className="navbar__container">
      <div style={{ cursor: "pointer" }} onClick={onClick}>
        <img
          className="navbar__logo"
          src={require("./images/marianne.svg")}
          alt="Accueil du code du travail numérique"
          style={{
            verticalAlign: "top",
            marginRight: 10,
            maxHeight: 50,
            flex: "0 0 120"
          }}
        />
        <div
          className="navbar__title_container"
          style={{ display: "inline-block", paddingTop: 5 }}
        >
          <div className="navbar__title" style={{ fontSize: "1.5em" }}>
            Code du travail numérique
          </div>
          <div className="navbar__subtitle">
            Trouvez les réponses à vos questions sur le droit du travail
          </div>
        </div>
      </div>
      <nav>
        <ul className="nav__links">
          <li className="nav__item">
            <a href="https://socialgouv.github.io/faq-code-du-travail">
              F.A.Q.
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

const App = () => {
  // dirty tricks to handle click on main title. todo: routing
  let explorerToggler;
  let search;
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
        <Header onClick={() => { search.reset(); explorerToggler.reset(); }} />
        <AppContainer role="main">
          <Search ref={node => (search = node)} />
          <ExplorerToggler ref={node => (explorerToggler = node)} />
        </AppContainer>
      </div>
    </ThemeProvider>
  );
};

render(<App />, document.getElementById("root"));
