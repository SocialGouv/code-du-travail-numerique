import { Questionnaire } from "./Questionnaire";
import { withStore, Provider } from "../store";

type QuestionnaireWrapperProps = {
  name: string;
  slug: string;
  title: string;
  personnalizedTitle?: string;
  variant?: string;
};

export const QuestionnaireWrapper = ({
  name,
  slug,
  title,
  personnalizedTitle,
  variant,
}: QuestionnaireWrapperProps) => {
  return (
    <Provider createStore={() => withStore(name)}>
      <Questionnaire
        slug={slug}
        title={title}
        personnalizedTitle={personnalizedTitle}
        variant={variant}
      ></Questionnaire>
    </Provider>
  );
};
