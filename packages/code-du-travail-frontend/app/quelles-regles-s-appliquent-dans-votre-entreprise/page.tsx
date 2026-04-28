import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { SITE_URL } from "src/config";
import { ReglesEntreprise } from "../../src/modules/quelles-regles-s-appliquent-dans-votre-entreprise";

export const metadata = generateDefaultMetadata({
  title:
    "Code du travail, convention, accord: quelles règles s'appliquent dans votre entreprise ?",
  description: "Qu'est-ce que le droit du travail ?",
  path: "/quelles-regles-s-appliquent-dans-votre-entreprise",
  overrideCanonical: `${SITE_URL}/quelles-regles-s-appliquent-dans-votre-entreprise`,
});

export default function ReglesEntreprisePage() {
  return (
    <DsfrLayout>
      <ReglesEntreprise />
    </DsfrLayout>
  );
}
