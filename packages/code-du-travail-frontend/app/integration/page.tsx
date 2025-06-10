import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { IntegrationPageContent } from "src/modules/integration/IntegrationPageContent";

export const metadata = generateDefaultMetadata({
  title: "Widgets pour intégrer le Code du travail numérique à votre site",
  description:
    "L'équipe du Code du travail numérique vous propose d'intégrer son moteur de recherche, ses modèles de courriers ainsi que certains de ses simulateurs et outils sur votre site grâce à un module (widget).",
  path: "/integration",
});

export default function IntegrationPage() {
  return (
    <DsfrLayout>
      <IntegrationPageContent />
    </DsfrLayout>
  );
}
