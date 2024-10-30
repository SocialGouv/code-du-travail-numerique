"use client";

import { NotFound } from "../src/modules/error/NotFound";
import { DsfrLayout } from "../src/modules/layout";
import * as Sentry from "@sentry/nextjs";
import { Metadata } from "next";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Page non trouvée",
  description: "La page que vous cherchez n'existe pas",
};

export default function Index() {
  useEffect(() => {
    try {
      Sentry.captureMessage(`Page non trouvée ${window?.location?.href}`);
    } catch (e) {
      Sentry.captureMessage("Page non trouvée");
    }
  }, []);

  return (
    <DsfrLayout>
      <NotFound />
    </DsfrLayout>
  );
}
