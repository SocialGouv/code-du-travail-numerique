"use client";

import React, {
  ReactNode,
  ForwardedRef,
  FocusEvent,
  MouseEvent,
  TouchEvent,
  useState,
} from "react";
import BaseLink, { LinkProps } from "next/link";

type Props = LinkProps & {
  children: ReactNode;
  title?: string;
  target?: string;
  className?: string;
  rel?: string;
  id?: string;
  onFocus?: (event: FocusEvent<HTMLAnchorElement>) => void;
};

const Link = React.forwardRef<HTMLAnchorElement, Props>(
  (props, ref: ForwardedRef<HTMLAnchorElement>) => {
    const [hasIntent, setHasIntent] = useState(false);
    const newProps = { ...props };

    if (newProps.target === "_blank" && newProps.children) {
      newProps.title = `${
        newProps.title || newProps.children.toString()
      } - nouvelle fenêtre`;
    }

    const prefetch =
      props.prefetch !== undefined ? props.prefetch : hasIntent ? null : false;

    return (
      <BaseLink
        ref={ref}
        {...newProps}
        prefetch={prefetch}
        onMouseEnter={(event: MouseEvent<HTMLAnchorElement>) => {
          setHasIntent(true);
          props.onMouseEnter?.(event);
        }}
        onTouchStart={(event: TouchEvent<HTMLAnchorElement>) => {
          setHasIntent(true);
          props.onTouchStart?.(event);
        }}
        onFocus={(event: FocusEvent<HTMLAnchorElement>) => {
          setHasIntent(true);
          props.onFocus?.(event);
        }}
      />
    );
  }
);

Link.displayName = "Link";

export default Link;
