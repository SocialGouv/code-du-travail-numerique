import DOMPurify from "isomorphic-dompurify";
import React from "react";
import styled from "styled-components";

import { htmlParser } from "../lib";

type Props = {
  children: string;
  inline?: boolean;
};

const Html = ({ children, inline = false, ...props }: Props): JSX.Element => {
  return inline ? (
    <InlineBlockDiv
      {...props}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(htmlParser(children)),
      }}
    />
  ) : (
    <div
      {...props}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(htmlParser(children)),
      }}
    />
  );
};

export default Html;

const InlineBlockDiv = styled.div`
  display: inline-block;
`;
