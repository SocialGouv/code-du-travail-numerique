"use client";

import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import Link from "../common/Link";

declare module "@codegouvfr/react-dsfr/spa" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

startReactDsfr({
  defaultColorScheme: "light",
  Link,
  nonce: "true",
  trustedTypesPolicyName: "react-dsfr",
});

export function StartDsfrLight() {
  return null;
}
