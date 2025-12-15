import React, { ReactNode, ForwardedRef } from "react";
import BaseLink, { LinkProps } from "next/link";

type Props = LinkProps & {
  children: ReactNode;
  title?: string;
  target?: string;
  className?: string;
  rel?: string;
};

const Link = React.forwardRef<HTMLAnchorElement, Props>(
  (props, ref: ForwardedRef<HTMLAnchorElement>) => {
    const newProps = { ...props };

    if (newProps.target === "_blank" && newProps.children) {
      newProps.title = `${
        newProps.title || newProps.children.toString()
      } - nouvelle fenêtre`;
    }

    return <BaseLink ref={ref} {...newProps} />;
  }
);

Link.displayName = "Link";

export default Link;
