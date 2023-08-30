import { icons, Button } from "@socialgouv/cdtn-ui";
import { useState } from "react";
import styled from "styled-components";
const { HelpCircle: HelpIcon } = icons;

type TooltipParameters = {
  title: string;
  onChange: (boolean) => void;
  "data-testid"?: string;
  tabIndex?: string;
};

export const Tooltip = ({ onChange, ...parameters }: TooltipParameters) => {
  const [opened, setOpened] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <TooltipWrapper
      type="button"
      onClick={() => {
        onChange(!opened);
        setOpened(!opened);
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      {...parameters}
    >
      {hovered || opened ? (
        <OpenedTooltipIcon aria-label="?"></OpenedTooltipIcon>
      ) : (
        <TooltipIcon aria-label="?"></TooltipIcon>
      )}
    </TooltipWrapper>
  );
};

const TooltipWrapper = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OpenedTooltipIcon = styled(HelpIcon)`
  color: #ff7067;
  margin-top: 2px;
  padding: 2px;
`;

const TooltipIcon = styled(HelpIcon)`
  color: #7598d6;
  margin-top: 2px;
  padding: 2px;
`;
