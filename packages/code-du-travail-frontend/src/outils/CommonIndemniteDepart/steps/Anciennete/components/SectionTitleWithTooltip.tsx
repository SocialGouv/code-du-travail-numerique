import React from "react";
import styled from "styled-components";
import { theme } from "@socialgouv/cdtn-ui";
import { Tooltip as TooltipProps } from "../../../../common/Question";
import { InfoBulle } from "../../../../common/InfoBulle";
import { SectionTitle } from "../../../../common/stepStyles";

type Props = {
  name: string;
  tooltip?: TooltipProps;
};

const SectionTitleWithTooltip = ({ tooltip, name }: Props) => {
  const [isLocalTooltipOpen, setIsLocalToolTipOpen] = React.useState(false);

  return (
    <StyledContainer>
      <StyledSectionTitle>{name}</StyledSectionTitle>
      {tooltip && (
        <StyledInfoBulle
          title={tooltip.help ?? "Plus d'informations"}
          onVisibilityChange={() => {
            tooltip.trackableFn?.(!isLocalTooltipOpen);
            setIsLocalToolTipOpen(!isLocalTooltipOpen);
          }}
        >
          {tooltip.content}
        </StyledInfoBulle>
      )}
    </StyledContainer>
  );
};

export default SectionTitleWithTooltip;

const { spacings } = theme;

const StyledContainer = styled.div`
  margin-top: ${spacings.large};
  margin-bottom: ${spacings.small};
`;

const StyledSectionTitle = styled(SectionTitle)`
  display: inline;
  margin: 0;
  padding: 0;
`;

const StyledInfoBulle = styled(InfoBulle)`
  margin-left: ${spacings.xsmall};
`;
