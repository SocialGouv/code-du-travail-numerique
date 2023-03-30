import styled from "styled-components";
import { InputRadio, Paragraph } from "@socialgouv/cdtn-ui";
import { DossierLicenciementContext, useStore } from "../../store";
import { trackClickHelp } from "../../tracking";
import { QuestionnaireResponse } from "../../type";
import { InfoBulle } from "../../../outils/common/InfoBulle";
import { useContext } from "react";

export const Response = ({
  response: { text, description, info, trackingName },
  index,
}: {
  response: QuestionnaireResponse;
  index: number;
}) => {
  const store = useContext(DossierLicenciementContext);
  const answer = useStore(store, (state) => state.answer);
  let label = (
    <Paragraph noMargin>
      {text} {description && `(${description})`}
      {info && (
        <StyledInfoBulle
          title={"Plus d'informations"}
          dataTestid={`Tooltip-${text}`}
          onVisibilityChange={() => {
            trackClickHelp(trackingName);
          }}
        >
          {info}
        </StyledInfoBulle>
      )}
    </Paragraph>
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
        />
      </div>
    </ResponseWrapper>
  );
};

const StyledInfoBulle = styled(InfoBulle)`
  padding: 0;
`;

const ResponseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12px;
`;
