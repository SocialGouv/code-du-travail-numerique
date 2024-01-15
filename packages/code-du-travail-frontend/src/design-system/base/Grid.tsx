import { fr } from "@codegouvfr/react-dsfr";
import { cx, type CxArg } from "@codegouvfr/react-dsfr/tools/cx";
import { forwardRef, type PropsWithChildren } from "react";

import { type MarginProps } from "../utils/spacing";
import { Box, BoxRef } from "./Box";

export type GridProps = PropsWithChildren<
  Omit<MarginProps, "ml" | "mr" | "mx"> & {
  align?: "center" | "left" | "right";
  className?: CxArg;
  haveGutters?: boolean;
  valign?: "bottom" | "middle" | "top";
}
>;

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, haveGutters, align, valign, className, ...rest }, ref) => (
    <BoxRef
      className={cx(
        fr.cx(
          "fr-grid-row",
          haveGutters && "fr-grid-row--gutters",
          align && `fr-grid-row--${align}`,
          valign && `fr-grid-row--${valign}`,
        ),
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </BoxRef>
  ),
);

Grid.displayName = "Grid";

type ColsNumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type GridColProps = PropsWithChildren & {
  base?: ColsNumberType | `${ColsNumberType}`;
  className?: CxArg;
  lg?: ColsNumberType | `${ColsNumberType}`;
  md?: ColsNumberType | `${ColsNumberType}`;
  offset?: ColsNumberType | `${ColsNumberType}`;
  offsetLg?: ColsNumberType | `${ColsNumberType}`;
  offsetMd?: ColsNumberType | `${ColsNumberType}`;
  offsetSm?: ColsNumberType | `${ColsNumberType}`;
  offsetXl?: ColsNumberType | `${ColsNumberType}`;
  sm?: ColsNumberType | `${ColsNumberType}`;
  xl?: ColsNumberType | `${ColsNumberType}`;
};

export const GridCol = ({
                          base = 12,
                          sm,
                          md,
                          lg,
                          xl,
                          offset,
                          offsetLg,
                          offsetMd,
                          offsetSm,
                          offsetXl,
                          className,
                          children,
                          ...rest
                        }: GridColProps) => (
  <Box
    className={cx(
      fr.cx(
        base && `fr-col-${base}`,
        sm && `fr-col-sm-${sm}`,
        md && `fr-col-md-${md}`,
        lg && `fr-col-lg-${lg}`,
        xl && `fr-col-xl-${xl}`,
        offset && `fr-col-offset-${offset}`,
        offsetSm && `fr-col-offset-sm-${offsetSm}`,
        offsetMd && `fr-col-offset-md-${offsetMd}`,
        offsetLg && `fr-col-offset-lg-${offsetLg}`,
        offsetXl && `fr-col-offset-xl-${offsetXl}`,
      ),
      className,
    )}
    {...rest}
  >
    {children}
  </Box>
);
