"use client";

// The widget events go through a first-party API route
// (`/api/contribution-rating`) that relays them server side to Matomo. We do
// NOT call @socialgouv/matomo-next's `sendEvent`: it would hit `matomo.php`
// from the browser, which adblockers block. A same-origin POST goes through,
// then the server performs the server -> server fetch, invisible to adblockers.

import { SOURCES } from "@socialgouv/cdtn-utils";
import { isMatomoOptedOut } from "../../utils/consent";
import {
  RatingMatomoAction,
  RatingMatomoCategory,
  RatingReason,
} from "./constants";

export const RATING_TRACKING_ENDPOINT = "/api/contribution-rating";

// What actually travels on the network, besides `source` and `slug`: one
// request per user action, discriminated by `type` (cf. the controller schema).
export type RatingRequest =
  | { type: "note"; value: number }
  | { type: "raison"; reasons: RatingReason[] }
  | { type: "remarque" }
  | { type: "suggestion"; text: string };

// First-party relay exposing a `sendEvent` method shaped like
// @socialgouv/matomo-next's: the static event extraction (`cdtn-stats`) thus
// catalogues it through its existing `.sendEvent` rule — WITHOUT a dedicated
// rule — while it actually POSTs to our internal API (adblock bypass).
// `category`/`action` (enums -> statically resolved) only feed the catalogue;
// only `source`, `slug` (= `name`) and `request` go on the network, the server
// being the sole owner of category/action and of the canonical URL.
const firstPartyMatomo = {
  sendEvent: async (event: {
    category: RatingMatomoCategory;
    action: string;
    name: string;
    request: RatingRequest;
  }): Promise<void> => {
    await fetch(RATING_TRACKING_ENDPOINT, {
      method: "POST",
      // keepalive: lets the request complete even if the component unmounts
      // right after the click (immediate navigation).
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      // Minimal payload: content source, slug and the user action. The server
      // adds category/action, maps the source to its route and rebuilds the
      // canonical URL (anti-injection: source validated against the allowlist).
      body: JSON.stringify({
        source: SOURCES.CONTRIBUTIONS,
        slug: event.name,
        ...event.request,
      }),
    });
  },
};

// Consistent with Matomo tracking: the relay sets no cookie, so events are sent
// even if the user declined cookies, except on explicit opt-out ("never be
// tracked"). We also bail out server side (no `window`) — `||` short-circuits
// before isMatomoOptedOut (which reads cookies, absent during SSR). The UX
// (confirmation) stays active either way. Fire-and-forget: a tracking failure
// must never break the UI.
const relay = async (send: () => Promise<void>): Promise<void> => {
  if (typeof window === "undefined" || isMatomoOptedOut()) return;
  try {
    await send();
  } catch {
    // Swallowed on purpose (fire-and-forget).
  }
};

type SlugPayload = { contributionSlug: string };

// Star click. The action carries the score as a string ("note_<value>"); the
// server rebuilds it through `ratingActionForValue`.
export const trackRatingScore = ({
  contributionSlug,
  value,
}: SlugPayload & { value: number }): Promise<void> =>
  relay(() =>
    firstPartyMatomo.sendEvent({
      category: RatingMatomoCategory.CLARITY,
      action: `${RatingMatomoAction.NOTE_PREFIX}${value}`,
      name: contributionSlug,
      request: { type: "note", value },
    })
  );

// "Envoyer" in the reasons panel: ONE request carrying every checked reason;
// the server emits one Matomo event per reason ("raison_<reason>", built by
// `ratingActionForReason`). `action` only documents the catalogue (it never
// goes on the network): the extraction resolves it to "raison_<reasons>".
export const trackRatingReasons = ({
  contributionSlug,
  reasons,
}: SlugPayload & { reasons: RatingReason[] }): Promise<void> =>
  relay(() =>
    firstPartyMatomo.sendEvent({
      category: RatingMatomoCategory.CLARITY,
      action: `${RatingMatomoAction.REASON_PREFIX}${reasons}`,
      name: contributionSlug,
      request: { type: "raison", reasons },
    })
  );

// Click on "Une remarque ?".
export const trackRatingRemark = ({
  contributionSlug,
}: SlugPayload): Promise<void> =>
  relay(() =>
    firstPartyMatomo.sendEvent({
      category: RatingMatomoCategory.CLARITY,
      action: RatingMatomoAction.REMARK,
      name: contributionSlug,
      request: { type: "remarque" },
    })
  );

// "Envoyer" with a filled free text (either panel). Mirrors the site-wide
// `feedback_suggestion` pattern: the verbatim travels in the action.
export const trackRatingSuggestion = ({
  contributionSlug,
  text,
}: SlugPayload & { text: string }): Promise<void> =>
  relay(() =>
    firstPartyMatomo.sendEvent({
      category: RatingMatomoCategory.SUGGESTION,
      action: text,
      name: contributionSlug,
      request: { type: "suggestion", text },
    })
  );
