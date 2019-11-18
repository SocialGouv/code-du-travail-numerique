import React from "react";
import PropTypes from "prop-types";
import { Title as UITitle, Heading } from "@socialgouv/react-ui";

class Title extends React.PureComponent {
  static propTypes = {
    level: PropTypes.number,
    children: PropTypes.node
  };
  render() {
    const { level, children } = this.props;
    switch (level) {
      case 0:
        return <UITitle>{children}</UITitle>;
      case 1:
        return <UITitle as="h3">{children}</UITitle>;
      case 2:
        return <Heading as="h4">{children}</Heading>;
      case 3:
        return <Heading as="h5">{children}</Heading>;
      default:
        return <Heading as="h6">{children}</Heading>;
    }
  }
}

export default Title;
