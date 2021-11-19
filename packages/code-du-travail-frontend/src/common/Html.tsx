import React from "react";
import styled from "styled-components";
import xss from "xss";

import { htmlParser } from "../lib";

type Props = {
  children: string;
  inline?: boolean;
};

const Html = ({ children, inline = false, ...props }: Props): JSX.Element => {
  return (
    <Div
      {...props}
      isInline={inline}
      dangerouslySetInnerHTML={{
        __html: xss(htmlParser(children)),
      }}
    />
  );
};

export default Html;

const Div = styled.div`
  ${({ isInline }: { isInline: boolean }) =>
    isInline && "display: inline-block;"};
`;
