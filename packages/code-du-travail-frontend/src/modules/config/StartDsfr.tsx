"use client";

import { startReactDsfr } from "@codegouvfr/react-dsfr/next-appdir";
import { defaultColorScheme } from "./defaultColorScheme";
import Link from "next/link";
import React from "react";

declare module "@codegouvfr/react-dsfr/next-appdir" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

startReactDsfr({ defaultColorScheme, Link, doCheckNonce: true });

const link : typeof Link = {
  href: "",
  onClick: () => {}
}

export function StartDsfr() {
  return null;
}
