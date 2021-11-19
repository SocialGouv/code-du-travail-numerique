import DOMPurify from "dompurify";
import React from "react";
import styled from "styled-components";

import { htmlParser } from "../lib";

type Props = {
  children: string;
  inline?: boolean;
};

const Html = ({ children, inline = false, ...props }: Props): JSX.Element => {
  if (typeof window !== "undefined") {
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
  }
  return <></>;
};

export default Html;

const InlineBlockDiv = styled.div`
  display: inline-block;
`;
