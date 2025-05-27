"use client";

import { FEEDBACK_RESULT } from "./tracking";
import { SmileyQuestionnaireItem } from "./SmileyQuestionnaireItem";
import { NumberedScaleQuestionnaireItem } from "./NumberedScaleQuestionnaireItem";

// Re-export the Status enums from both components for backward compatibility
export { Status as SmileyStatus } from "./SmileyQuestionnaireItem";
export { Status as NumberedStatus } from "./NumberedScaleQuestionnaireItem";

// Combined Status enum for backward compatibility
export enum Status {
  BAD = "bad",
  AVERAGE = "average",
  GOOD = "good",
  ONE = "one",
  TWO = "two",
  THREE = "three",
  FOUR = "four",
  FIVE = "five",
}

// Props for the original QuestionnaireItem component (for backward compatibility)
export type QuestionnaireItemProps = {
  useNumberedScale?: boolean;
  badEventValue?: FEEDBACK_RESULT;
  averageEventValue?: FEEDBACK_RESULT;
  goodEventValue?: FEEDBACK_RESULT;
  badText?: string;
  averageText?: string;
  goodText?: string;
  title?: string;
  displayError?: boolean;
  onChange: (status: FEEDBACK_RESULT) => void;
  dataTestId?: string;
  values?: [
    FEEDBACK_RESULT,
    FEEDBACK_RESULT,
    FEEDBACK_RESULT,
    FEEDBACK_RESULT,
    FEEDBACK_RESULT,
  ];
  labels?: [string, string, string, string, string];
};

// Original component for backward compatibility
export const QuestionnaireItem = ({
  useNumberedScale = false,
  badEventValue,
  averageEventValue,
  goodEventValue,
  badText,
  averageText,
  goodText,
  title,
  displayError,
  onChange,
  dataTestId,
  values,
  labels,
}: QuestionnaireItemProps): JSX.Element => {
  // Render numbered scale buttons (1-5)
  if (useNumberedScale && values && labels) {
    return (
      <NumberedScaleQuestionnaireItem
        values={values}
        labels={labels}
        title={title}
        displayError={displayError}
        onChange={onChange}
        dataTestId={dataTestId}
      />
    );
  }

  // Original 3-button smiley version
  return (
    <SmileyQuestionnaireItem
      badEventValue={badEventValue!}
      averageEventValue={averageEventValue!}
      goodEventValue={goodEventValue!}
      badText={badText}
      averageText={averageText}
      goodText={goodText}
      title={title}
      displayError={displayError}
      onChange={onChange}
      dataTestId={dataTestId}
    />
  );
};

// Re-export the component types
export type { SmileyQuestionnaireItemProps } from "./SmileyQuestionnaireItem";
export type { NumberedScaleQuestionnaireItemProps } from "./NumberedScaleQuestionnaireItem";

// Re-export the components
export { SmileyQuestionnaireItem } from "./SmileyQuestionnaireItem";
export { NumberedScaleQuestionnaireItem } from "./NumberedScaleQuestionnaireItem";
