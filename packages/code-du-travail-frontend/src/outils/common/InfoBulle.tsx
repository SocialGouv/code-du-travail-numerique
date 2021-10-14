import { DisclosureIcon, icons } from "@socialgouv/cdtn-ui";
import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const InfoBulle = ({ children, title }: Props): JSX.Element => (
  <DisclosureIcon
    icon={<icons.HelpCircle size="20" aria-label="?" />}
    iconTitle={title}
  >
    {children}
  </DisclosureIcon>
);
