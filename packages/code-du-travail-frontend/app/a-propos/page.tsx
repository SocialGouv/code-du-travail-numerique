import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { About } from "../../src/modules/a-propos";

export const metadata = generateDefaultMetadata({
  title: "À propos",
  description:
    "Service public gratuit pour faciliter l'accès au droit du travail. Obtenez une réponse détaillée à vos questions.",
  path: "/a-propos",
});

function Index() {
  return (
    <DsfrLayout>
      <About />
    </DsfrLayout>
  );
}

export default Index;
