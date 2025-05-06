import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { DroitDuTravailWrapper } from "../../src/modules/droit-du-travail";
import { SITE_URL } from "src/config";

export const metadata = generateDefaultMetadata({
  title: "Le droit du travail",
  description: "Qu'est-ce que le droit du travail ?",
  path: "/droit-du-travail",
  overrideCanonical: `${SITE_URL}/droit-du-travail`,
});

export default function DroitDuTravail() {
  return (
    <DsfrLayout container="fr-container--fluid">
      <DroitDuTravailWrapper />
    </DsfrLayout>
  );
}
