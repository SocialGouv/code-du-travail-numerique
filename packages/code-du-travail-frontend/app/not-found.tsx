"use client";

import { NotFound } from "../src/modules/errors/NotFound";
import { DsfrLayout } from "../src/modules/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page non trouvée",
  description: "La page que vous cherchez n'existe pas",
};

export default function Index() {
  return (
    <DsfrLayout>
      <NotFound />
    </DsfrLayout>
  );
}
