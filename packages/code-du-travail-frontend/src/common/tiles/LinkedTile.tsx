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
    const handleClick = () => {
      if (onClick) onClick();
      router.push(href);
    };
    return (
      <Tile {...props} ref={ref} onClick={() => handleClick()}>
        {children}
      </Tile>
    );
  }
);
