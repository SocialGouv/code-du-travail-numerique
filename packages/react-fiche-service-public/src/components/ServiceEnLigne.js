import { theme, Tile } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { getText } from "../utils.js";

class ServiceEnLigne extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  render() {
    const { data } = this.props;
    const type = data.attributes.type;
    const url = data.attributes.URL;
    const title = getText(data.children[0]);
    const source = getText(data.children[1]);
    return (
      <StyledTile
        wide
        href={url}
        rel="noopener noreferrer"
        target="_blank"
        aria-label={`${type} ${title} (nouvelle fenêtre)`}
        className="no-after"
        subtitle={type}
        title={title}
      >
        Source: {source}
      </StyledTile>
    );
  }
}

export default ServiceEnLigne;

const { spacings } = theme;

const StyledTile = styled(Tile)`
  margin-bottom: ${spacings.base};
`;
