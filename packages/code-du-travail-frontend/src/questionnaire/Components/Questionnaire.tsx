import styled from "styled-components";
import { theme } from "@socialgouv/cdtn-ui";
import { Summary } from "./Summary";
import { Question } from "./Question";
import { DossierLicenciementContext, useStore } from "../store";
import { PreviousResponse } from "../type";
import { useContext, useEffect, useState } from "react";

type QuestionnaireProps = {
  slug: string;
  title: string;
  personnalizedTitle?: string;
  widgetMode: boolean;
};

export const Questionnaire = ({
  slug,
  title,
  personnalizedTitle,
  widgetMode,
}: QuestionnaireProps) => {
  const store = useContext(DossierLicenciementContext);
  const init = useStore(store, (state) => state.init);
  const getSlugResponses = useStore(store, (state) => state.getSlugResponses);
  const isPersonnalizedMode = useStore(
    store,
    (state) => state.isPersonnalizedMode
  );
  const toolSlug = useStore(store, (state) => state.toolSlug);
  const previousResponses = useStore(store, (state) => state.previousResponses);
  const [slugResponses, setSlugResponses] = useState<PreviousResponse[]>();
  init();
  useEffect(() => {
    if (slug && !isPersonnalizedMode(slug)) {
      setSlugResponses(getSlugResponses(slug));
    }
  }, [getSlugResponses, slug]);
  return (
    <div>
      <StyledTitle>
        {isPersonnalizedMode(slug) && personnalizedTitle
          ? personnalizedTitle
          : title}
      </StyledTitle>
      <Summary
        responses={slugResponses ?? previousResponses}
        withLink={!isPersonnalizedMode(slug)}
      />
      {slug === toolSlug && <Question widgetMode={widgetMode} />}
    </div>
  );
};

const { breakpoints } = theme;

const StyledTitle = styled.div`
  font-weight: 600;
  font-size: 22px;
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 18px;
  }
`;
