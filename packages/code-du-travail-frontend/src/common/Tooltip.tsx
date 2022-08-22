import { icons } from "@socialgouv/cdtn-ui";
import { useState } from "react";
import styled from "styled-components";
const { HelpCircle: HelpIcon } = icons;

export const Tooltip = ({ onChange }) => {
  const [opened, setOpened] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <TooltipWrapper
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
    >
      {hovered || opened ? (
        <OpenedTooltip></OpenedTooltip>
      ) : (
        <HelpIcon></HelpIcon>
      )}
    </TooltipWrapper>
  );
};

const TooltipWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OpenedTooltip = styled(HelpIcon)`
  color: #ff7067;
`;
