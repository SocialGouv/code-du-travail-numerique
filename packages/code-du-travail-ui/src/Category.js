import React from "react";
import PropTypes from "prop-types";

const Category = ({ href, icon, title, text }) => (
  <li className="categories__list-item">
    <a href={href}>
      <img src={icon} alt={title} />
      <h3>{title}</h3>
      <p>{text}</p>
    </a>
  </li>
);

Category.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

Category.defaultProps = {
  href: "#",
  icon: "assets/icons/handshake.svg",
  title: "Embauche et contrat",
  text: "Fluctuat nec mergitur."
};

export default Category;
