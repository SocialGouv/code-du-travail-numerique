import { DsfrLayout } from "../../src/modules/layout";
import { PrivacyPolicy } from "../../src/modules/privacy-policy";
import { generateDefaultMetadata } from "../../src/modules/common/metas";

export const metadata = generateDefaultMetadata({
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du Code du travail numérique",
  path: "/politique-confidentialite",
});

function Index() {
  return (
    <DsfrLayout>
      <PrivacyPolicy />
    </DsfrLayout>
  );
}

export default Index;
