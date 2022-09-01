import { Summary } from "./Summary";
import { Question } from "./Question";
import { useStore } from "../store";
import { useEffect } from "react";

type QuestionnaireProps = {
  slug?: string;
};

export const Questionnaire = ({ slug }: QuestionnaireProps) => {
  const init = useStore((state) => state.init);
  const initSlugResponses = useStore((state) => state.initSlugResponses);
  init();
  useEffect(() => {
    if (slug) {
      initSlugResponses(slug);
    }
  }, [initSlugResponses, slug]);
  return (
    <>
      <Summary />
      {!slug && <Question />}
    </>
  );
};
