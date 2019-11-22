import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { theme } from "@socialgouv/react-ui";

import { ElementBuilder } from "./ElementBuilder";

const { spacings } = theme;

class List extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    headingLevel: PropTypes.number.isRequired
  };
  render() {
    const { data, headingLevel } = this.props;
    const items = data.children.map((item, index) => (
      <StyledLi key={index}>
        <ElementBuilder data={item.children} headingLevel={headingLevel + 1} />
      </StyledLi>
    ));

    if (data.attributes.type === "puce") {
      return <ul>{items}</ul>;
    }
    return <ol>{items}</ol>;
  }
}

export default List;

const StyledLi = styled.li`
  margin-bottom: ${spacings.tiny};
`;
