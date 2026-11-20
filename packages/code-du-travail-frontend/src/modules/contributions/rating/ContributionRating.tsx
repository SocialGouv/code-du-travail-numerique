"use client";

import { ElementType, useId, useRef, useState } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { RatingIcon } from "./RatingIcon";
import { RatingStars } from "./RatingStars";
import { RatingConfirmation } from "./RatingConfirmation";
import { RatingPanel, RatingPanelData } from "./RatingPanel";
import {
  trackRatingReasons,
  trackRatingRemark,
  trackRatingScore,
  trackRatingSuggestion,
} from "./tracking";
import {
  isLowRating,
  RATING_REMARK_BUTTON,
  RATING_WIDGET_INTRO,
  RATING_WIDGET_TITLE,
} from "./constants";

type Props = {
  contributionSlug: string;
  // Widget heading level. 2 by default; 3 when nested under a section title
  // (contribution pages). The visual size lives on the child <span>s, so it
  // does not depend on the level. Panels use the next level.
  level?: 2 | 3;
};

type Panel = "none" | "reasons" | "remark";

export const ContributionRating = ({ contributionSlug, level = 2 }: Props) => {
  const headingId = useId();
  const questionId = useId();
  const Heading = `h${level}` as ElementType;
  const panelHeadingLevel = (level + 1) as 3 | 4;

  const [score, setScore] = useState<number | null>(null);
  const [panel, setPanel] = useState<Panel>("none");
  const [thanked, setThanked] = useState(false);
  const [remarkSent, setRemarkSent] = useState(false);
  const messageRef = useRef<HTMLParagraphElement>(null);
  // Synchronous guard: prevents a fast double click from emitting two score
  // events before the re-render locks the stars (`score` state is async).
  // No persistence (localStorage): reloading the page or coming back shows a
  // ratable widget again (GDPR-friendly, no trace client side).
  const scoredRef = useRef(false);

  // Focus the thank-you message (timing aligned on CopyButton).
  const focusConfirmation = () => {
    setTimeout(() => messageRef.current?.focus(), 100);
  };

  const thank = () => {
    setThanked(true);
    focusConfirmation();
  };

  const onSelectScore = (value: number) => {
    if (scoredRef.current) return;
    scoredRef.current = true;
    setScore(value);
    void trackRatingScore({ contributionSlug, value }); // fire-and-forget
    if (isLowRating(value)) {
      // Replaces an open remark panel: same component position, so the text
      // already typed is kept and the reasons are added.
      setPanel("reasons");
    } else {
      thank();
    }
  };

  const onOpenRemark = () => {
    setPanel("remark");
    void trackRatingRemark({ contributionSlug });
  };

  const onSubmitPanel = ({ reasons, suggestion }: RatingPanelData) => {
    if (reasons.length > 0) {
      void trackRatingReasons({ contributionSlug, reasons });
    }
    if (suggestion) {
      void trackRatingSuggestion({ contributionSlug, text: suggestion });
    }
    if (panel === "remark") setRemarkSent(true);
    setPanel("none");
    thank();
  };

  const showRemarkButton = panel === "none" && !remarkSent;

  return (
    <section
      className={`${fr.cx("fr-mb-6w")} ${widget}`}
      aria-labelledby={headingId}
    >
      <RatingIcon className={icon} />
      {/* Font size is carried by the child <span>s: DSFR defines
          `h2 { font-size: 1.75rem }` OUTSIDE any cascade layer, so a Panda rule
          (`@layer utilities`) set on the heading itself would always be
          overridden. DSFR does not target <span>s, they get our style.
          The bottom margin uses `fr-mb-1v` (DSFR `!important` utility). */}
      <Heading id={headingId} className={`${fr.cx("fr-mb-1v")} ${heading}`}>
        <span className={titleIntro}>{RATING_WIDGET_INTRO}</span>
        <span id={questionId} className={titleQuestion}>
          {RATING_WIDGET_TITLE}
        </span>
      </Heading>
      <RatingStars
        value={score}
        onSelect={onSelectScore}
        locked={score !== null}
        labelledBy={questionId}
      />
      {/* Persistent live region (present from mount) so that inserting the
          thank-you message is reliably announced by screen readers. */}
      <div aria-live="polite">
        {thanked && <RatingConfirmation messageRef={messageRef} />}
      </div>
      {panel !== "none" && (
        <RatingPanel
          variant={panel}
          headingLevel={panelHeadingLevel}
          onSubmit={onSubmitPanel}
        />
      )}
      {showRemarkButton && (
        <div className={remark}>
          {/* A button, not a link: it opens content in place, no navigation. */}
          <button
            type="button"
            className={fr.cx(
              "fr-link",
              "fr-icon-arrow-right-line",
              "fr-link--icon-left"
            )}
            onClick={onOpenRemark}
          >
            {RATING_REMARK_BUTTON}
          </button>
        </div>
      )}
    </section>
  );
};

const widget = css({
  // Blue box: 16px top/bottom, 8px left/right (mock-up).
  padding: "1rem 0.5rem",
  backgroundColor: "var(--background-alt-blue-france)",
  // Interactive widget: useless (and unsightly) when printed / in PDF.
  "@media print": { display: "none" },
});

const icon = css({
  display: "block",
  margin: "0 auto 1rem",
});

const heading = css({
  textAlign: "center",
});

// 14px/20px. The size MUST live on the <span> (not the heading): cf. the JSX
// comment about the DSFR cascade.
const titleIntro = css({
  display: "block",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: "normal",
});

const titleQuestion = css({
  display: "block",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: "bold",
});

const remark = css({
  marginTop: "1rem",
  // DSFR only underlines `a[href]` links: underline the button too so it
  // reads as a link, as in the mock-up.
  "& button": {
    textDecoration: "underline",
    textUnderlineOffset: "0.25em",
  },
});
