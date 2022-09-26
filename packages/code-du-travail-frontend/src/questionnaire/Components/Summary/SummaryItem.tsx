import styled from "styled-components";
import { icons, Button, theme } from "@socialgouv/cdtn-ui";
const { Check: CheckIcon, ArrowTurn: UpdateIcon } = icons;
import useWindowDimensions from "../../../common/WindowDimension";

const { breakpoints } = theme;

export const SummaryItem = ({ data, onClick, noButton }) => {
  const { width } = useWindowDimensions();
  return (
    <SummaryItemWrapper>
      <StyledIcon>
        <CheckIcon width="18" height="18" />
      </StyledIcon>
      <StyledText>{data}</StyledText>
      {!noButton && (
        <StyledButton variant="flat" xsmall onClick={onClick}>
          {width > breakpoints.intMobile ? "Modifier" : ""}
          <UpdateIconWrapper>
            <UpdateIcon width="18" height="18" />
          </UpdateIconWrapper>
        </StyledButton>
      )}
    </SummaryItemWrapper>
  );
};

const SummaryItemWrapper = styled.li`
  list-style-type: none;
  margin-bottom: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
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
    margin-left: 0;
  }
`;

const UpdateIconWrapper = styled.div`
  margin-left: 6px;
  @media (max-width: ${breakpoints.mobile}) {
    margin-left: 0;
  }
`;

const StyledText = styled.div`
  margin: 0 15px;
  font-size: 16px;
  flex: 1;
`;

const StyledButton = styled(Button)`
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 8px;
  }
`;
