import React from "react";
import { xssWrapper } from "../../lib";

type Props = {
  children: string;
  as?: string;
};

const Html = ({ children, ...props }: Props): JSX.Element => {
  if (props.as === "p") {
    return (
      <p
        dangerouslySetInnerHTML={{
          __html: xssWrapper(children),
        }}
      />
    );
  } else if (props.as === "span") {
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: xssWrapper(children),
        }}
      />
    );
  } else if (props.as === "div") {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: xssWrapper(children),
        }}
      />
    );
  }
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: xssWrapper(children),
      }}
    />
  );
};

export default Html;
