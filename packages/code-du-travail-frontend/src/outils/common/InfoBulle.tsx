import { DisclosureIcon, icons } from "@socialgouv/cdtn-ui";
import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  isTooltipOpen?: boolean;
  className?: string;
  onVisibilityChange?: () => void;
  dataTestid?: string;
  isDisabled?: boolean;
  tabIndex?: string;
};

export const InfoBulle = ({
  children,
  title,
  isTooltipOpen,
  className,
  onVisibilityChange,
  dataTestid,
  isDisabled,
  tabIndex,
}: Props): JSX.Element => {
  const [isLocalTooltipOpen, setIsLocalToolTipOpen] = React.useState(false);

  return (
    <DisclosureIcon
      icon={<icons.HelpCircle size="20" aria-label="?" />}
      className={className}
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
      dataTestid={dataTestid}
      isDisabled={isDisabled}
      tabIndex={tabIndex}
    >
      {children}
    </DisclosureIcon>
  );
};
