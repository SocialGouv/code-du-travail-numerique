import React from "react";
import styled from "styled-components";

const Html = ({ children, inline = false, ...props }) => {
  return inline ? (
    <InlineBlockDiv {...props} dangerouslySetInnerHTML={{ __html: children }} />
  ) : (
    <div {...props} dangerouslySetInnerHTML={{ __html: children }} />
  );
};

export default Html;

const InlineBlockDiv = styled.div`
  display: inline-block;
`;
