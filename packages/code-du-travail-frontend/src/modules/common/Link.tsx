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
  if (!props.title && props.target === "_blank" && props.children) {
    props.title = `${props.children.toString()} - nouvelle fenêtre`;
  }
  return <BaseLink {...props} />;
};

export default Link;
