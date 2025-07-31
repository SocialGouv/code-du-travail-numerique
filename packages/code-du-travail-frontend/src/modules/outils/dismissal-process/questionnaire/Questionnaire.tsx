import { useContext, useEffect, useState } from "react";
import { Summary } from "./Summary";
import { Question } from "./Question";
import { DossierLicenciementContext, useStore } from "./store";
import { PreviousResponse } from "./type";

type QuestionnaireProps = {
  slug: string;
  className?: string;
  widgetMode: boolean;
};

export const Questionnaire = ({
  slug,
  className,
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
    <div className={className}>
      <Summary
        responses={slugResponses ?? previousResponses}
        withLink={!isPersonnalizedMode(slug)}
      />
      {slug === toolSlug && <Question widgetMode={widgetMode} />}
    </div>
  );
};
