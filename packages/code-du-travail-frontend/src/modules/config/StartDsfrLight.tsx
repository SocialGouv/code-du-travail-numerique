"use client";

import React from "react"; // Ajout si pas déjà présent
import { StartDsfrOnHydration } from "@codegouvfr/react-dsfr/next-app-router";
import Link from "../common/Link";

declare module "@codegouvfr/react-dsfr/next-app-router" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

// ErrorBoundary pour capturer les erreurs dans le rendu
class DsfrErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: React.ErrorInfo) {
    if (error.message.includes("localStorage")) {
      console.error("LocalStorage access denied, falling back to light theme.");
      document.documentElement.setAttribute("data-fr-scheme", "light");
      document.documentElement.setAttribute("data-fr-theme", "light");
    } else {
      console.error("Unexpected error in DSFR init:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export function StartDsfrLight() {
  return (
    <DsfrErrorBoundary>
      <StartDsfrOnHydration />
    </DsfrErrorBoundary>
  );
}
