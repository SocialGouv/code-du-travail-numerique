import { Metadata } from "next";
import { DsfrLayout } from "../../src/modules/layout";
import { MentionsLegales } from "../../src/modules/mentions-legales";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du Code du travail numérique",
};

function Index() {
  return (
    <DsfrLayout>
      <MentionsLegales />
    </DsfrLayout>
  );
}

export default Index;
