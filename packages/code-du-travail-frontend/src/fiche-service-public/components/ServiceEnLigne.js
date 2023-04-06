import { theme } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { getText } from "../utils.js";
import { LinkedTile } from "../../common/tiles/LinkedTile";

class ServiceEnLigne extends React.PureComponent {
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

ServiceEnLigne.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ServiceEnLigne;
const { spacings } = theme;

const StyledTile = styled(LinkedTile)`
  margin-bottom: ${spacings.base};
`;
