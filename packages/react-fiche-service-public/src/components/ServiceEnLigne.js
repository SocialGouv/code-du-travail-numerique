import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, theme } from "@socialgouv/react-ui";

import { getText } from "../utils";

const { colors, spacings, box } = theme;

class ServiceEnLigne extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  };
  render() {
    const { data } = this.props;
    const type = data.attributes.type;
    const url = data.attributes.URL;
    const title = getText(data.children[0]);
    const source = getText(data.children[1]);
    return (
      <Wrapper>
        <Type>{type}</Type>
        <Button
          as="a"
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          className="no-after"
        >
          {title}
        </Button>
        <Source>{source}</Source>
      </Wrapper>
    );
  }
}

export default ServiceEnLigne;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-bottom: ${spacings.base};
  padding: ${spacings.large};
  background-color: ${colors.bgTertiary};
  border-radius: ${box.borderRadius};
`;

const Type = styled.div`
  align-self: flex-start;
  margin-bottom: ${spacings.tiny};
  color: ${colors.paragraph};
  font-weight: bold;
  font-size: 1.1rem;
`;

const Source = styled.small`
  display: inline-block;
  margin-top: ${spacings.tiny};
`;
