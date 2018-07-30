import React from "react";

import { Link } from '../routes'


const Header = ({ onClick }) => (
  <header className="navbar">
    <div className="navbar__container">
      <Link href="/">
        <a>
          <img
            className="navbar__logo"
            src={"/static/images/marianne.svg"}
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
          <nav>
            <ul className="nav__links">
              <li className="nav__item">
                <a href="https://socialgouv.github.io/faq-code-du-travail">
                  F.A.Q.
                </a>
              </li>
            </ul>
          </nav>
        </a>
      </Link>
    </div>
  </header>
);

export default Header;
