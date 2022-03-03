import { DisclosureIcon, icons } from "@socialgouv/cdtn-ui";
import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  isTooltipOpen?: boolean;
  onVisibilityChange?: () => void;
};

export const InfoBulle = ({
  children,
  title,
  isTooltipOpen,
  onVisibilityChange,
}: Props): JSX.Element => {
  const [isLocalTooltipOpen, setIsLocalToolTipOpen] = React.useState(false);

  return (
    <DisclosureIcon
      icon={<icons.HelpCircle size="20" aria-label="?" />}
      iconTitle={title}
      isTooltipOpen={
        isTooltipOpen === undefined ? isLocalTooltipOpen : isTooltipOpen
      }
      onVisibilityChange={() => {
        setIsLocalToolTipOpen(
          isTooltipOpen === undefined ? !isLocalTooltipOpen : isTooltipOpen
        );
        onVisibilityChange?.();
      }}
    >
      {children}
    </DisclosureIcon>
  );
};
