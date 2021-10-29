import { DisclosureIcon, icons } from "@socialgouv/cdtn-ui";
import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  onSwitchVisibility?: (actualVisibility: boolean) => void;
};

export const InfoBulle = ({
  children,
  title,
  onSwitchVisibility,
}: Props): JSX.Element => (
  <DisclosureIcon
    icon={<icons.HelpCircle size="20" aria-label="?" />}
    iconTitle={title}
    onSwitchVisibility={onSwitchVisibility}
  >
    {children}
  </DisclosureIcon>
);
