"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useState } from "react";
import { FeedbackDefault } from "./FeedbackDefault";
import { FeedbackContent, FeedbackDataSent } from "./FeedbackContent";
import { FeedbackAnswered } from "./FeedbackAnswered";
import { useFeedbackEvents } from "./tracking";
import { useDetectAdBlock } from "adblock-detect-react";
import { FeedbackAdblock } from "./FeedbackAdblock";

export const Feedback = () => {
  const adBlockDetected = useDetectAdBlock();
  const [viewFeedback, setViewFeedback] = useState<
    "yes" | "no" | "default" | "answered" | "adBlockDetected"
  >("default");
  const {
    emitNegativeFeedback,
    emitPositiveFeedback,
    emitFeedbackCategory,
    emitFeedbackSuggestion,
  } = useFeedbackEvents();

  const onClickNo = () => {
    setViewFeedback(adBlockDetected ? "adBlockDetected" : "no");
    emitNegativeFeedback();
  };

  const onClickYes = () => {
    setViewFeedback(adBlockDetected ? "adBlockDetected" : "yes");
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
