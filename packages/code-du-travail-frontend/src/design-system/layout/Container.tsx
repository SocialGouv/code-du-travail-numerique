import { cx } from "@codegouvfr/react-dsfr/tools/cx";

import { Box, type BoxProps } from "../base/Box";

export type ContainerProps = Omit<
  BoxProps,
  "ml" | "mr" | "mx" | "pl" | "pr" | "px"
> & {
  fluid?: boolean;
  size?: "lg" | "md" | "sm" | "xl";
};

export const Container = ({
  children,
  className,
  fluid,
  size,
  ...rest
}: ContainerProps) => {
  let containerClass = "fr-container";
  if (size) containerClass += `-${size}`;
  if (fluid) containerClass += `--fluid`;
  return (
    <Box className={cx(className, containerClass)} {...rest}>
      {children}
    </Box>
  );
};
