import { DisclosureIcon, icons } from "@socialgouv/cdtn-ui";
import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  onVisibilityChange?: (actualVisibility: boolean) => void;
};

export const InfoBulle = ({
  children,
  title,
  onVisibilityChange,
}: Props): JSX.Element => (
  <DisclosureIcon
    icon={<icons.HelpCircle size="20" aria-label="?" />}
    iconTitle={title}
    onVisibilityChange={onVisibilityChange}
  >
    {children}
  </DisclosureIcon>
);
