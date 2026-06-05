// Connaissance du vocabulaire Matomo : quelles commandes `_paq.push([...])`
// produisent un event, et quels callees correspondent à un push Matomo.

// Commandes Matomo qui PRODUISENT un event. Les autres pushes sont de la
// configuration (setReferrerUrl, opt-out, AbTesting...) → liste à part.
export const EVENT_COMMANDS = new Set([
  "trackEvent",
  "trackSiteSearch",
  "trackPageView",
  "trackGoal",
  "trackLink",
  "trackContentImpression",
  "trackContentInteraction",
]);

const MATOMO_PUSH_CALLEES = new Set([
  "push",
  "_paq.push",
  "window._paq.push",
  "paq.push",
]);

// Vrai si l'expression appelée correspond à un push Matomo (`push`, `_paq.push`,
// `window._paq.push`, ou tout `xxx._paq.push`).
export function isMatomoPushCallee(exprText: string): boolean {
  if (MATOMO_PUSH_CALLEES.has(exprText)) return true;
  return exprText.endsWith("._paq.push");
}
