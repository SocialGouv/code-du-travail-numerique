"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useState } from "react";
import { FeedbackDefault } from "./FeedbackDefault";
import { FeedbackContent, FeedbackDataSent } from "./FeedbackContent";
import { FeedbackAnswered } from "./FeedbackAnswered";
import { useFeedbackEvents } from "./tracking";
import { FeedbackAdblock } from "./FeedbackAdblock";
import { detectAdBlockCall } from "./AdBlockDetector";

export const Feedback = () => {
  const [viewFeedback, setViewFeedback] = useState<
    "yes" | "no" | "default" | "answered" | "adBlockDetected"
  >("default");
  const {
    emitNegativeFeedback,
    emitPositiveFeedback,
    emitFeedbackCategory,
    emitFeedbackSuggestion,
  } = useFeedbackEvents();

  const onClickNo = async () => {
    const detectAddBlock = await detectAdBlockCall();
    setViewFeedback(detectAddBlock ? "adBlockDetected" : "no");
    emitNegativeFeedback();
  };

  const onClickYes = async () => {
    const detectAddBlock = await detectAdBlockCall();
    setViewFeedback(detectAddBlock ? "adBlockDetected" : "yes");
    emitPositiveFeedback();
  };

  const onSubmit = (data: FeedbackDataSent) => {
    if (data.suggestion) emitFeedbackSuggestion(data.suggestion);
    if (data.categories) {
      data.categories.forEach((category) => emitFeedbackCategory(category));
    }
    setViewFeedback("answered");
  };

  return (
    <div className={fr.cx("fr-highlight", "fr-p-2w", "fr-m-0")}>
      {viewFeedback === "default" && (
        <FeedbackDefault onClickNo={onClickNo} onClickYes={onClickYes} />
      )}
      {viewFeedback === "no" && (
        <FeedbackContent onSubmit={onSubmit} type="negative" />
      )}
      {viewFeedback === "yes" && (
        <FeedbackContent onSubmit={onSubmit} type="positive" />
      )}
      {viewFeedback === "answered" && <FeedbackAnswered />}
      {viewFeedback === "adBlockDetected" && <FeedbackAdblock />}
    </div>
  );
};
