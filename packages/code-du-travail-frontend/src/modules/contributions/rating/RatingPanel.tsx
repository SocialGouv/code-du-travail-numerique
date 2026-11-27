"use client";

import { ElementType, useEffect, useId, useRef } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { css } from "@styled-system/css";
import {
  RATING_REASON_LABELS,
  RATING_REASONS,
  RATING_REASONS_HINT,
  RATING_REASONS_TITLE,
  RATING_REMARK_HINT,
  RATING_REMARK_TITLE,
  RATING_SEND_BUTTON,
  RATING_SUGGESTION_LABEL,
  RATING_SUGGESTION_MAX_LENGTH,
  RatingReason,
} from "./constants";

export type RatingPanelData = {
  reasons: RatingReason[];
  // Trimmed free text, undefined when empty.
  suggestion?: string;
};

// What the user has checked / typed so far, owned by the parent so that it
// survives the panel closing: raising the score to 3 closes the reasons panel,
// lowering it again reopens it with the same checks and text.
export type RatingPanelDraft = {
  reasons: RatingReason[];
  suggestion: string;
};

export const EMPTY_RATING_DRAFT: RatingPanelDraft = {
  reasons: [],
  suggestion: "",
};

type Props = {
  // "reasons": after a low score, reasons checkboxes + suggestion.
  // "remark": opened from "Une remarque ?", suggestion only.
  // Rendered at the same tree position for both variants, so switching from
  // "remark" to "reasons" (a low score given while the remark panel is open)
  // keeps the text already typed.
  variant: "reasons" | "remark";
  headingLevel: 3 | 4;
  draft: RatingPanelDraft;
  onDraftChange: (draft: RatingPanelDraft) => void;
  onSubmit: (data: RatingPanelData) => void;
};

// Same thresholds as the site-wide feedback form: the remaining characters
// counter is only announced at these values, not on every keystroke.
const CHARACTERS_COUNT_THRESHOLDS = [
  400, 300, 200, 100, 50, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
];

// Follow-up panel of the clarity widget, built on the pattern of
// `layout/feedback/FeedbackContent` (DSFR Checkbox + textarea, 500 characters,
// polite counter). No validation: an empty send just thanks the user.
export const RatingPanel = ({
  variant,
  headingLevel,
  draft,
  onDraftChange,
  onSubmit,
}: Props) => {
  const Heading = `h${headingLevel}` as ElementType;
  const withReasons = variant === "reasons";
  const hintId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { reasons, suggestion } = draft;

  // Move focus to the panel heading when it opens (or switches variant), as
  // the feedback form does.
  useEffect(() => {
    headingRef.current?.focus();
  }, [variant]);

  const remainingCharacters = RATING_SUGGESTION_MAX_LENGTH - suggestion.length;

  const onChangeSuggestion = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    if (value.length > RATING_SUGGESTION_MAX_LENGTH) return;
    onDraftChange({ ...draft, suggestion: value });
  };

  const onChangeReason = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reason = event.target.value as RatingReason;
    const { checked } = event.target;
    onDraftChange({
      ...draft,
      reasons: checked
        ? [...reasons, reason]
        : reasons.filter((item) => item !== reason),
    });
  };

  const onSend = () => {
    const text = suggestion.trim();
    const selectedReasons = withReasons ? reasons : [];
    // No validation (PO decision): an empty send just thanks the user, the
    // parent only tracks what was actually filled.
    onSubmit({ reasons: selectedReasons, suggestion: text || undefined });
  };

  const heading = (
    <Heading ref={headingRef} tabIndex={-1} className={fr.cx("fr-mb-1v")}>
      <span className={title}>
        {withReasons ? RATING_REASONS_TITLE : RATING_REMARK_TITLE}
      </span>
    </Heading>
  );

  return (
    <div className={panel}>
      {withReasons ? (
        // The heading lives inside the legend (allowed by HTML: legend accepts
        // heading content), so the checkbox group is named by the question.
        <Checkbox
          legend={heading}
          hintText={RATING_REASONS_HINT}
          options={RATING_REASONS.map((reason) => ({
            label: RATING_REASON_LABELS[reason],
            nativeInputProps: {
              name: reason,
              value: reason,
              checked: reasons.includes(reason),
              onChange: onChangeReason,
            },
          }))}
        />
      ) : (
        <>
          {heading}
          <p id={hintId} className={fr.cx("fr-hint-text", "fr-mb-2w")}>
            {RATING_REMARK_HINT}
          </p>
        </>
      )}
      <Input
        // In the remark panel the visible heading + hint already say it all:
        // the label stays for the accessible name, visually hidden, and the
        // hint is wired as the description.
        label={withReasons ? RATING_SUGGESTION_LABEL : RATING_REMARK_TITLE}
        hideLabel={!withReasons}
        textArea
        nativeTextAreaProps={{
          value: suggestion,
          onChange: onChangeSuggestion,
          "aria-describedby": withReasons ? undefined : hintId,
        }}
      />
      <p
        className={fr.cx(
          remainingCharacters === 0 ? "fr-error-text" : "fr-info-text",
          "fr-mt-0",
          "fr-mb-2w"
        )}
        aria-live={
          CHARACTERS_COUNT_THRESHOLDS.includes(remainingCharacters)
            ? "polite"
            : "off"
        }
        aria-atomic="true"
        data-testid="ratingCharacterInfo"
      >
        {`${remainingCharacters} caractère${
          remainingCharacters > 1 ? "s" : ""
        } restant${remainingCharacters > 1 ? "s" : ""}`}
      </p>
      <Button type="button" priority="secondary" onClick={onSend}>
        {RATING_SEND_BUTTON}
      </Button>
    </div>
  );
};

const panel = css({
  marginTop: "1rem",
  padding: "1rem",
  textAlign: "left",
  backgroundColor: "var(--background-default-grey)",
  borderLeft: "4px solid var(--border-default-blue-france)",
});

// Size on the <span>, not the heading: DSFR heading font sizes live outside
// any cascade layer and would override a Panda rule set on the heading itself.
const title = css({
  display: "block",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: "bold",
});
