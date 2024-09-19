import { Metadata } from "next";
import { DsfrLayout } from "../../src/modules/layout";
import { PrivacyPolicy } from "../../src/modules/privacy-policy";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
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
