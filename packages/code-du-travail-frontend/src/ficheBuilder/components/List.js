import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import elementBuilder from "../index";

const List = ({ data }) => {
  const items = data.$.map((item, index) => (
    <li key={index}>{elementBuilder(item.$)}</li>
  ));

  if (data._.type === "puce") {
    return <ul>{items}</ul>;
  }
  return <ol>{items}</ol>;
};

List.propTypes = {
  data: PropTypes.object.isRequired
};

export default List;
