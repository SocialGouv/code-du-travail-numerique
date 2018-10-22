import React from "react";
import PropTypes from "prop-types";

function DateContenu(props) {
  return <div className="article__date">Publié le&nbsp;: {props.value}</div>;
}
DateContenu.propTypes = {
  value: PropTypes.string
};

export { DateContenu };
