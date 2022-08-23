import styled from "styled-components";
import { icons, Button } from "@socialgouv/cdtn-ui";
const { Check: CheckIcon } = icons;

export const SummaryItem = ({ data, onClick }) => {
  return (
    <SummaryItemWrapper>
      <StyledIcon>
        <CheckIcon />
      </StyledIcon>
      <StyledText>{data}</StyledText>
      <Button variant="flat" xsmall onClick={onClick}>
        Modifier
      </Button>
    </SummaryItemWrapper>
  );
};

const SummaryItemWrapper = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 11px;
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
`;

const StyledText = styled.div`
  flex: 1;
  margin-left: 15px;
`;
