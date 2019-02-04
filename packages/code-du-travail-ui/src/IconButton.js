import React from "react";
import PropTypes from "prop-types";

function IconButton(props) {
  return <button className="btn-icon" {...props} />;
}

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export { IconButton };
