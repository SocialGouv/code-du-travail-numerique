import React from "react";
import { Tag } from "@socialgouv/code-du-travail-ui";
import styled from "styled-components";

const CrossContainer = styled.span`
  float: right;
  color: #ccc;
  font-size: 2em;
  line-height: 1em;
  margin-left: 5px;
  margin-top: -8px;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const Cross = props => <CrossContainer {...props}>⨯</CrossContainer>;

const _Tag = ({ label, onDelete }) => (
  <Tag primary>
    <React.Fragment>
      {label}
      <Cross onClick={onDelete} />
    </React.Fragment>
  </Tag>
);

export default _Tag;
