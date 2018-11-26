//

import { CSSProperties } from "react";

//

type Flavour =
  | "primary"
  | "secondary"
  | "warning"
  | "success"
  | "info"
  | "danger"
  | "link"
  | string;

export const flavors: Flavour[] = [
  "primary",
  "secondary",
  "warning",
  "success",
  "info",
  "danger",
  "link"
];

//

/**
 * Return the 1st truthy prop that is one of an Button versions
 *
 * TODO(douglasduteil): handle legacy potential bug
 * * Here the function is return the "first" truthy prop however this prop my be
 * * random as Objects have no key order in JS and it's using "Object.keys" to
 * * list the props object
 *
 * @param props Props to look into
 * @param prefix Props prefix
 */
export const getFirstFlavor = (
  props: Partial<FlavourProps>,
  prefix = "btn"
) => {
  const versionProps = (Object.keys(props) as Array<keyof FlavourProps>).find(
    flavor => flavors.includes(flavor) && Boolean(props[flavor])
  );
  return (versionProps && `${prefix}__${versionProps}`) || "";
};

/**
 * Removes falsy flavour values from the props
 * @param props Props clean
 */
export const cleanProps: (
  props: Partial<FlavourProps>
) => Partial<FlavourProps> = props =>
  (Object.keys(props) as Array<keyof FlavourProps>).reduce(
    (newProps, key) => ({
      ...newProps,
      ...(flavors.includes(key) && Boolean(props[key]) === false
        ? {}
        : { [key]: String(props[key]) })
    }),
    {}
  );

//

export interface FlavourProps {
  /** use .btn.btn__primary */
  primary?: boolean;
  /** use .btn.btn__secondary */
  secondary?: boolean;
  /** use .btn.btn__warning */
  warning?: boolean;
  /** use .btn.btn__success */
  success?: boolean;
  /** use .btn.btnrt__info */
  info?: boolean;
  /** use .btn.btn__danger */
  danger?: boolean;
  link?: boolean;
  style?: CSSProperties;
}

export const defaultFlavourProps: FlavourProps = {
  danger: false,
  info: false,
  link: false,
  primary: false,
  secondary: false,
  style: {},
  success: false,
  warning: false
};
