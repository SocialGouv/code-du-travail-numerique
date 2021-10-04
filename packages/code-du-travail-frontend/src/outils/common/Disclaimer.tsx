import { icons, IconStripe } from "@socialgouv/cdtn-ui";
import React from "react";

import {
  Warning,
  WarningTitle,
} from "../DureePreavisRetraite/steps/component/WarningResult";

type Props = {
  title: string;
  children: React.ReactNode;
};

const Disclaimer = ({ title, children }: Props): JSX.Element => (
  <Warning>
    <IconStripe centered icon={icons.Warning}>
      <WarningTitle>{title}</WarningTitle>
    </IconStripe>
    {children}
  </Warning>
);
export default Disclaimer;
