import React from "react";
import styled from "styled-components";
import { xssWrapper } from "../lib";

type Props = {
  children: string;
  as?: string;
  inline?: boolean;
};

const Html = ({ children, as = "div", ...props }: Props): JSX.Element => {
  return (
    <Div
      {...props}
      as={as}
      dangerouslySetInnerHTML={{
        __html: xssWrapper(children),
      }}
    />
  );
};

export default Html;

const Div = styled.div``;
