import React from "react";
import { xssWrapper } from "../../lib";

type Props = {
  children: string;
  as?: string;
  className?: string;
};

const Html = ({ children, ...props }: Props): JSX.Element => {
  if (props.as === "p") {
    return (
      <p
        dangerouslySetInnerHTML={{
          __html: xssWrapper(children),
        }}
        className={props.className}
      />
    );
  } else if (props.as === "span") {
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: xssWrapper(children),
        }}
        className={props.className}
      />
    );
  } else if (props.as === "div") {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: xssWrapper(children),
        }}
        className={props.className}
      />
    );
  }
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: xssWrapper(children),
      }}
      className={props.className}
    />
  );
};

export default Html;
