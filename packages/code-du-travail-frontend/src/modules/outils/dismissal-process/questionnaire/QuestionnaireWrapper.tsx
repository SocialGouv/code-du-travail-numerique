"use client";
import { Questionnaire } from "./Questionnaire";
import { Provider, withStore } from "./store";
import { useRef } from "react";

type QuestionnaireWrapperProps = {
  name: string;
  slug: string;
  className?: string;
  widgetMode?: boolean;
};

export const QuestionnaireWrapper = ({
  name,
  slug,
  className,
  widgetMode = false,
}: QuestionnaireWrapperProps) => {
  const store = useRef(withStore(name)).current;
  return (
    <Provider value={store}>
      <Questionnaire
        slug={slug}
        className={className}
        widgetMode={widgetMode}
      />
    </Provider>
  );
};
