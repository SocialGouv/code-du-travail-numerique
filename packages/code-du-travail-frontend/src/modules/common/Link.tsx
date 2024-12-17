import React, { ReactNode } from "react";
import BaseLink, { LinkProps } from "next/link";

type Props = LinkProps & {
  children: ReactNode;
  title?: string;
  target?: string;
  className?: string;
  rel?: string;
};

const Link = ({ ...props }: Props): JSX.Element => {
  return (
    <BaseLink
      {...props}
      title={`${props.title || props.children?.toString()}${props.target === "_blank" ? " - nouvelle fenêtre" : ""}`}
    />
  );
};

export default Link;
