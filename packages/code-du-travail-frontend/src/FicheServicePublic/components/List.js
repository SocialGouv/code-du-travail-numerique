import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { spacing } from "../css/variables";
import { ElementBuilder } from "../index";

class List extends React.PureComponent {
  render() {
    const { data, headingLevel } = this.props;
    const items = data.$.map((item, index) => (
      <StyledLi key={index}>
        <ElementBuilder data={item.$} headingLevel={headingLevel + 1} />
      </StyledLi>
    ));

    if (data._.type === "puce") {
      return <ul>{items}</ul>;
    }
    return <ol>{items}</ol>;
  }
}

List.propTypes = {
  data: PropTypes.object.isRequired,
  headingLevel: PropTypes.number.isRequired
};

export default List;

const StyledLi = styled.li`
  margin-bottom: ${spacing.tiny};
`;
