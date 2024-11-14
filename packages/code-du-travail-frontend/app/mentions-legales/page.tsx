import { DsfrLayout } from "../../src/modules/layout";
import { MentionsLegales } from "../../src/modules/mentions-legales";
import { generateDefaultMetadata } from "../../src/modules/common/metas";

export const metadata = generateDefaultMetadata({
  title: "Mentions légales",
  description: "Mentions légales du Code du travail numérique",
  path: "/mentions-legales",
});

function Index() {
  return (
    <DsfrLayout>
      <MentionsLegales />
    </DsfrLayout>
  );
}

export default Index;
