import { Tile } from "@socialgouv/cdtn-ui";
import React, { ForwardedRef } from "react";
import { useRouter } from "next/router";

export type Props = {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: string;
  titleTagType?: string;
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  centerTitle?: boolean;
  wide?: boolean;
  custom?: boolean;
  onClick?: () => void;
};

export const LinkedTile = React.forwardRef<HTMLAnchorElement, Props>(
  function _LinkedTile(
    { children, onClick, href, ...props }: Props,
    ref: ForwardedRef<any>
  ): JSX.Element {
    const router = useRouter();
    const handleClick = async (e) => {
      if (onClick) onClick();
      e.preventDefault();
      if (props.target === "_blank") {
        window.open(href, "_blank");
        return false;
      }
      router.push(href);
      return false;
    };
    return (
      <Tile {...props} href={href} ref={ref} onClick={handleClick}>
        {children}
      </Tile>
    );
  }
);
