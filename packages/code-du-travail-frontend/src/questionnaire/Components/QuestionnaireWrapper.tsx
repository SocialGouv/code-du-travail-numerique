import { Questionnaire } from "./Questionnaire";
import { withStore, Provider } from "../store";
import { useRef } from "react";

type QuestionnaireWrapperProps = {
  name: string;
  slug: string;
  title: string;
  personnalizedTitle?: string;
  widgetMode?: boolean;
  tabIndex?: string;
};

export const QuestionnaireWrapper = ({
  name,
  slug,
  title,
  personnalizedTitle,
  widgetMode = false,
  tabIndex,
}: QuestionnaireWrapperProps) => {
  const store = useRef(withStore(name)).current;
  return (
    <Provider value={store}>
      <Questionnaire
        slug={slug}
        title={title}
        personnalizedTitle={personnalizedTitle}
        widgetMode={widgetMode}
        tabIndex={tabIndex}
      ></Questionnaire>
    </Provider>
  );
};
