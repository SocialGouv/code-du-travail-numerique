import { Tile } from "@socialgouv/cdtn-ui";
import React, { ForwardedRef } from "react";
import { useRouter } from "next/router";

export type Props = {
  children: React.ReactNode | null;
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
};

type LinkedTileProps = Props & { onClick?: () => void };

export const LinkedTile = React.forwardRef<HTMLAnchorElement, LinkedTileProps>(
  function _LinkedTile(
    { children, onClick, href, ...props }: LinkedTileProps,
    ref: ForwardedRef<any>
  ): JSX.Element {
    const router = useRouter();
    const handleClick = (e) => {
      if (onClick) onClick();
      e.preventDefault();
      if (props.target === "_blank") {
        return window.open(href, "_blank");
      }
      router.push(href);
    };
    return (
      <Tile {...props} href={href} ref={ref} onClick={(e) => handleClick(e)}>
        {children}
      </Tile>
    );
  }
);
