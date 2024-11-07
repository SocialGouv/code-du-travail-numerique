"use client";

import { NotFound } from "../src/modules/error/NotFound";
import { DsfrLayout } from "../src/modules/layout";
import * as Sentry from "@sentry/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page non trouvée",
  description: "La page que vous cherchez n'existe pas",
};

export default function Index() {
  Sentry.captureMessage("Page non trouvée");

  return (
    <DsfrLayout>
      <NotFound />
    </DsfrLayout>
  );
}
