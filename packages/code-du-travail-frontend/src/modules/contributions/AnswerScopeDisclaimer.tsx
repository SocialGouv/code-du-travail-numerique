import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import Link from "../common/Link";
import type { AnswerScopeDisclaimer as AnswerScopeDisclaimerContent } from "./answerScopePilot";

// Portée de la réponse (#7493), rendue en texte dans un paragraphe pour rester
// lisible par les robots et les moteurs de réponse IA.
export const AnswerScopeDisclaimer = ({
  before,
  linkLabel,
  linkHref,
  after,
}: AnswerScopeDisclaimerContent) => (
  <p className={fr.cx("fr-mb-2w")} data-testid="answer-scope-disclaimer">
    {before}
    {linkLabel && <Link href={linkHref}>{linkLabel}</Link>}
    {after}
  </p>
);
