import React from "react";
import { xssWrapper } from "../../lib";

type Props = {
  children: string;
  as?: string;
  inline?: boolean;
};

const Html = ({ children, ...props }: Props): JSX.Element => {
  return (
    <div
      {...props}
      dangerouslySetInnerHTML={{
        __html: xssWrapper(children),
      }}
    />
  );
};

export default Html;
