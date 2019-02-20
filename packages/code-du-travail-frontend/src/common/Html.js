import React from "react";
import styled from "styled-components";

const Html = ({ children, className, inline = false }) => {
  const Div = styled.div`
    ${inline && `display: inline-block;`}
  `;
  return (
    <Div className={className} dangerouslySetInnerHTML={{ __html: children }} />
  );
};

export default Html;
