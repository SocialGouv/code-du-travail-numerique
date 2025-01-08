import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { BesoinPlusInformations } from "../../src/modules/besoin-plus-informations";

export const metadata = generateDefaultMetadata({
  title: "Besoin de plus d'informations",
  description:
    "Les services du ministère du Travail en région informent, conseillent et orientent les salariés et les employeurs du secteur privé sur leurs questions en droit du travail.",
  path: "/besoin-plus-informations",
});

function Index() {
  return (
    <DsfrLayout>
      <BesoinPlusInformations />
    </DsfrLayout>
  );
}

export default Index;
