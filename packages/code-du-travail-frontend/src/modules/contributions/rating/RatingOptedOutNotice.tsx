"use client";

import { Ref } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import Link from "../../common/Link";
import {
  RATING_OPTED_OUT_HREF,
  RATING_OPTED_OUT_LINK,
  RATING_OPTED_OUT_TEXT,
} from "./constants";

type Props = {
  messageRef: Ref<HTMLParagraphElement>;
};

// Small DSFR info alert shown instead of the thank-you message when the user
// opted out of Matomo: nothing was sent. The parent moves focus to the <p>;
// the persistent `aria-live` region around it announces it.
export const RatingOptedOutNotice = ({ messageRef }: Props) => (
  <div
    className={`${fr.cx("fr-alert", "fr-alert--info", "fr-alert--sm")} ${wrap}`}
  >
    <p ref={messageRef} tabIndex={-1}>
      {RATING_OPTED_OUT_TEXT}{" "}
      <Link href={RATING_OPTED_OUT_HREF}>{RATING_OPTED_OUT_LINK}</Link>
    </p>
  </div>
);

const wrap = css({
  marginTop: "1rem",
  textAlign: "left",
  backgroundColor: "var(--background-default-grey)",
});
