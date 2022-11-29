import { theme } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { ElementBuilder } from "./ElementBuilder.js";

const { spacings } = theme;

class List extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    headingLevel: PropTypes.number.isRequired,
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
