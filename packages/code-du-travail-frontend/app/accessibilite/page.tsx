import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { About } from "../../src/modules/a-propos";
import { Accessibilite } from "../../src/modules/accessibilite";

export const metadata = generateDefaultMetadata({
  title: "Déclaration d'accessibilité",
  description: "Accessibilité du site du Code du travail numérique",
  path: "/accessibilite",
});

function Index() {
  return (
    <DsfrLayout>
      <Accessibilite />
    </DsfrLayout>
  );
}

export default Index;
