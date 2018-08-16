import React from "react";

import { Link } from "../routes";

const Header = ({ onClick }) => (
  <header className="section-light">
    <div className="container">
      <div className="main-header">
        <Link route="/">
          <a className="main-header__logo">
            <img src={"/static/assets/img/marianne.svg"} alt="" />
            Code du travail numérique
          </a>
        </Link>
      </div>
    </div>
  </header>
);

export default Header;
