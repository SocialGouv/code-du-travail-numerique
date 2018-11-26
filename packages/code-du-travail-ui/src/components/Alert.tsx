//

import React, { SFC } from "react";
import {
  cleanProps,
  defaultFlavourProps,
  FlavourProps,
  getFirstFlavor
} from "../utils/flavors";

//

export type AlertProps = FlavourProps;

export const Alert: SFC<AlertProps> = (
  props: AlertProps = defaultFlavourProps
) => (
  <div
    className={`alert ${getFirstFlavor(props, "alert")}`}
    {...cleanProps(props)}
  />
);
