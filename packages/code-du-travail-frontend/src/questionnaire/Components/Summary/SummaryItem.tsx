import styled from "styled-components";
import { icons, Button, theme } from "@socialgouv/cdtn-ui";
const { Check: CheckIcon, ArrowTurn: UpdateIcon } = icons;
import useWindowDimensions from "../../../common/WindowDimension";

const { breakpoints } = theme;

type SymmaryItemProps = {
  data: any;
  onClick: () => void;
  noButton: boolean;
  noCheck: boolean;
};

export const SummaryItem = ({
  data,
  onClick,
  noButton = false,
  noCheck = false,
}: SymmaryItemProps) => {
  const { width } = useWindowDimensions();
  return (
    <SummaryItemWrapper>
      {!noCheck && (
        <StyledIcon>
          <CheckIcon width="18" height="18" />
        </StyledIcon>
      )}
      <StyledText>{data}</StyledText>
      {!noButton && (
        <StyledButtonWrapper>
          <StyledButton
            variant="link"
            xsmall
            onClick={onClick}
            icon={UpdateIcon}
          >
            {width > breakpoints.intMobile && <div>Modifier</div>}
          </StyledButton>
        </StyledButtonWrapper>
      )}
    </SummaryItemWrapper>
  );
};

const SummaryItemWrapper = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  margin-bottom: 6px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledIcon = styled.div`
  background: #3e486e;
  box-sizing: border-box;
  border: 1px solid #3e486e;
  width: 20px;
  height: 20px;
  color: white;
  border-radius: 12px;
  margin: 3px 15px 3px 0;
  font-size: 10px;
  @media (max-width: ${breakpoints.mobile}) {
    margin-left: 0;
  }
`;

const StyledText = styled.div`
  font-size: 16px;
  flex: 1;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: baseline;
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 8px;
    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

const StyledButtonWrapper = styled.div`
  margin-left: 5%;
`;
