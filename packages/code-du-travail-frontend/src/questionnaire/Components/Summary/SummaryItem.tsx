import styled from "styled-components";
import { icons, Button, theme } from "@socialgouv/cdtn-ui";
const { Check: CheckIcon } = icons;
const { breakpoints } = theme;

export const SummaryItem = ({ data, onClick }) => {
  return (
    <SummaryItemWrapper>
      <SummaryText>
        <StyledIcon>
          <CheckIcon width="18" height="18" />
        </StyledIcon>
        <StyledText>{data}</StyledText>
      </SummaryText>
      <StyledButton variant="flat" xsmall onClick={onClick}>
        Modifier
      </StyledButton>
    </SummaryItemWrapper>
  );
};

const SummaryItemWrapper = styled.li`
  list-style-type: none;
  margin-bottom: 11px;
  @media (min-width: ${breakpoints.mobile}) {
    display: flex;
    flex-direction: row;
  }
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const SummaryText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex: 1;
`;

const StyledIcon = styled.div`
  background: #3e486e;
  box-sizing: border-box;
  border: 1px solid #3e486e;
  width: 20px;
  height: 20px;
  color: white;
  border-radius: 12px;
  margin-left: 32px;
  font-size: 10px;
  @media (max-width: ${breakpoints.mobile}) {
    margin-left: 6px 0;
  }
`;

const StyledText = styled.div`
  margin: 0 15px;
  font-size: 16px;
`;

const StyledButton = styled(Button)`
  @media (max-width: ${breakpoints.mobile}) {
    margin: 3px 32px 0;
  }
`;
