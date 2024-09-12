"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { css } from "../../../../styled-system/css";
import { useState } from "react";
import { FeedbackDefault } from "./FeedbackDefault";
import { FeedbackContent, FeedbackDataSent } from "./FeedbackContent";
import { FeedbackAnswered } from "./FeedbackAnswered";
import { useFeedbackEvents } from "./tracking";
import { usePathname } from "next/navigation";
import { getBaseUrl } from "../../utils";

export const Feedback = () => {
  const [viewFeedback, setViewFeedback] = useState<
    "yes" | "no" | "default" | "answered"
  >("default");
  const currentPath = usePathname();
  const { emitFeedback, emitFeedbackCategory, emitFeedbackSuggestion } =
    useFeedbackEvents();

  const onClickNo = () => {
    setViewFeedback("no");
    if (currentPath) emitFeedback(false, getBaseUrl(currentPath));
  };

  const onClickYes = () => {
    setViewFeedback("yes");
    if (currentPath) emitFeedback(true, getBaseUrl(currentPath));
  };

  const onSubmit = (data: FeedbackDataSent) => {
    if (currentPath && data.suggestion)
      emitFeedbackSuggestion(data.suggestion, getBaseUrl(currentPath));
    if (data.categories && currentPath) {
      data.categories.forEach((category) =>
        emitFeedbackCategory(category, getBaseUrl(currentPath))
      );
    }
    setViewFeedback("answered");
  };

  return (
    <div
      className={`${fr.cx(
        "fr-highlight",
        "fr-p-2w",
        "fr-m-3w"
      )} ${highlightContainer}`}
    >
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
    </div>
  );
};

const highlightContainer = css({
  display: "flex",
  alignItems: "center",
});
