import { Questionnaire } from "./Questionnaire";
import { withStore, Provider } from "../store";

type QuestionnaireWrapperProps = {
  name: string;
  slug: string;
  title: string;
  personnalizedTitle?: string;
  widgetMode?: boolean;
};

export const QuestionnaireWrapper = ({
  name,
  slug,
  title,
  personnalizedTitle,
  widgetMode = false,
}: QuestionnaireWrapperProps) => {
  return (
    <Provider createStore={() => withStore(name)}>
      <Questionnaire
        slug={slug}
        title={title}
        personnalizedTitle={personnalizedTitle}
        widgetMode={widgetMode}
      ></Questionnaire>
    </Provider>
  );
};
