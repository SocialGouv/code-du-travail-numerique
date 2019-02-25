import React from "react";
import PropTypes from "prop-types";

const Search = ({ title, ...props }) => (
  <svg viewBox="0 0 20 20" {...props}>
    <title>{title}</title>
    <path
      fill={props.fill ? props.fill : "currentColor"}
      fillRule="evenodd"
      d="M17.876 8.939c0 2.197-.819 4.208-2.123 5.773l4.023 4.022a.72.72 0 0 1 0 1.043.735.735 0 0 1-.522.223.736.736 0 0 1-.52-.223l-4.023-4.023a8.813 8.813 0 0 1-5.772 2.123C4.022 17.877 0 13.855 0 8.939 0 4.022 4.023 0 8.939 0c4.915 0 8.937 4.023 8.937 8.939zM9.001 16.5c4.124 0 7.499-3.375 7.499-7.5S13.125 1.5 9 1.5C4.877 1.5 1.5 4.875 1.5 9s3.376 7.5 7.5 7.5z"
    />
  </svg>
);

export default Search;

Search.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string
};
