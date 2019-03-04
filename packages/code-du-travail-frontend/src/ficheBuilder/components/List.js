import React from "react";
import styled from "styled-components";

const List = ({ attr: { type } = {}, children }) => {
  if (type === "puce") {
    return <ul>{children}</ul>;
  }
  return <ol>{children}</ol>;
};

export default List;
