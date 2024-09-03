import { Metadata } from "next";
import { DsfrLayout } from "../../src/modules/layout";
import { PrivacyPolicy } from "../../src/modules/privacyPolicy";

export const metadata: Metadata = {
  title: "Politique de confidentialité - Code du travail numérique",
  description: "Politique de confidentialité du Code du travail numérique",
};

function Index() {
  return (
    <DsfrLayout>
      <PrivacyPolicy />
    </DsfrLayout>
  );
}

export default Index;
