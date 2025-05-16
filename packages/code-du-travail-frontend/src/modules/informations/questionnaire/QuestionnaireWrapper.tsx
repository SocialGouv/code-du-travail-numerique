"use client";

import { useRef } from "react";
import { Provider, withStore } from "src/questionnaire";
import { Questionnaire } from "./Questionnaire";

type QuestionnaireWrapperProps = {
  name: string;
  slug: string;
  title: string;
  className?: string;
};

export const QuestionnaireWrapper = ({
  name,
  slug,
  title,
  className,
}: QuestionnaireWrapperProps) => {
  const store = useRef(withStore(name)).current;
  return (
    <Provider value={store}>
      <Questionnaire slug={slug} title={title} className={className} />
    </Provider>
  );
};
