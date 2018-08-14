import React from "react";

import { Link } from '../routes'


const Header = ({ onClick }) => (
  <header class="section-light">
    <div class="container">
      <div class="main-header">
        <a href="/" class="main-header__logo">
          <img src={"/static/assets/img/marianne.svg"} alt="" />
          Code du travail numérique
        </a>
      </div>
    </div>
  </header>
);

export default Header;
