import styled from "styled-components";
import { InputRadio } from "@socialgouv/cdtn-ui";
import { DossierLicenciementContext, useStore } from "../../store";
import { trackClickHelp } from "../../tracking";
import { QuestionnaireResponse } from "../../type";
import { InfoBulle } from "../../../outils/common/InfoBulle";
import { useContext } from "react";

export const Response = ({
  response: { text, description, info, trackingName },
  index,
  tabIndex,
  autoFocus = false,
}: {
  response: QuestionnaireResponse;
  index: number;
  tabIndex?: string;
  autoFocus?: boolean;
}) => {
  const store = useContext(DossierLicenciementContext);
  const answer = useStore(store, (state) => state.answer);
  let label = (
    <StyledDiv>
      {text} {description && `(${description})`}
      {info && (
        <StyledInfoBulle
          title={"Plus d'informations"}
          dataTestid={`Tooltip-${text}`}
          onVisibilityChange={() => {
            trackClickHelp(trackingName);
          }}
          tabIndex={tabIndex}
        >
          {info}
        </StyledInfoBulle>
      )}
    </StyledDiv>
  );

  return (
    <ResponseWrapper>
      <div>
        <InputRadio
          id={text}
          name={text}
          label={label}
          onChange={() => {
            answer(index);
          }}
          tabIndex={tabIndex}
          autoFocus={autoFocus}
        />
      </div>
    </ResponseWrapper>
  );
};

const StyledInfoBulle = styled(InfoBulle)`
  padding: 0;
`;

const StyledDiv = styled.div`
  div {
    margin-left: -30px;
  }
`;
const ResponseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12px;
`;
