import React, { ReactNode, Ref } from "react";
import BaseLink, { LinkProps } from "next/link";

type Props = LinkProps & {
  children: ReactNode;
  title?: string;
  target?: string;
  className?: string;
  rel?: string;
  ref?: Ref<HTMLAnchorElement>;
};

const Link = ({ ...props }: Props): JSX.Element => {
  if (props.target === "_blank" && props.children) {
    props.title = `${props.title || props.children.toString()} - nouvelle fenêtre`;
  }
  return <BaseLink {...props} />;
};

export default Link;
