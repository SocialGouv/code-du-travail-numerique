"use client";

import { startReactDsfr } from "@codegouvfr/react-dsfr/next-appdir";
import Link from "../common/Link";

declare module "@codegouvfr/react-dsfr/next-appdir" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

startReactDsfr({ defaultColorScheme: "light", Link, doCheckNonce: true });

export function StartDsfrLight() {
  return null;
}
