import { Metadata } from "next";
import { DsfrLayout } from "../../../src/modules/layout";
import { HiringSimulator } from "../../../src/modules/simulateur-embauche";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { fetchToolId } from "../../../src/modules/outils";

export const metadata: Metadata = {
  title: "Simulateur - Calculer le salaire brut/net",
  description:
    "Réalisez vos conversions et calculs de salaire (brut en net, net en brut, net après impôt, heures supplémentaires et coût total employeur) avec notre simulateur.",
};

async function HiringSimulatorPage() {
  const _id = await fetchToolId("simulateur-embauche");
  const relatedItems = await fetchRelatedItems({ _id }, "simulateur-embauche");
  return (
    <DsfrLayout>
      <HiringSimulator relatedItems={relatedItems}></HiringSimulator>
    </DsfrLayout>
  );
}

export default HiringSimulatorPage;
