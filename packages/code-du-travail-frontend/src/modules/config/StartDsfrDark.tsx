"use client";

import { startReactDsfr } from "@codegouvfr/react-dsfr/next-appdir";
import Link from "next/link";

declare module "@codegouvfr/react-dsfr/next-appdir" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

startReactDsfr({ defaultColorScheme: "dark", Link, doCheckNonce: true });

export function StartDsfrDark() {
  return null;
}
