"use client";

import { StartDsfrOnHydration } from "@codegouvfr/react-dsfr/next-app-router";
import Link from "../common/Link";

declare module "@codegouvfr/react-dsfr/next-app-router" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

export function StartDsfrLight() {
  return <StartDsfrOnHydration />;
}
