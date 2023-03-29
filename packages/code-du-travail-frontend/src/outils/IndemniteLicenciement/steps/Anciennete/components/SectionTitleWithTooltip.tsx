import React from "react";
import styled from "styled-components";
import { theme, Alert } from "@socialgouv/cdtn-ui"
import { Tooltip as TooltipProps } from "../../../../common/Question";
import { Tooltip } from "../../../../../common/Tooltip";

type Props = {
  name: string;
  tooltip?: TooltipProps;
}

const SectionTitleWithTooltip = ({ tooltip, name }: Props) => {
  const [isLocalTooltipOpen, setIsLocalToolTipOpen] = React.useState(false);

  return (
    <StyledContainer>
      <StyledDiv>
        <SectionTitle>{name}</SectionTitle>
        {tooltip && (<StyledTooltip onChange={() => setIsLocalToolTipOpen(!isLocalTooltipOpen)} />)}
      </StyledDiv>
      {tooltip && isLocalTooltipOpen &&
        (
          <Alert size="small" variant="secondary">
            {tooltip?.content}
          </Alert>
        )
      }
    </StyledContainer>
  )
}

export default SectionTitleWithTooltip;

const { fonts, spacings } = theme;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledDiv = styled.div`
  display: flex;
  margin-top: ${(props) =>
    props.hasSmallMarginTop ? spacings.small : spacings.large};
  margin-bottom: ${spacings.small};
  align-items: center;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.altText};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  margin: 0;
  padding: 0;
`;

const StyledTooltip = styled(Tooltip)`
  margin-left: ${spacings.xsmall};
`
