import { DsfrLayout } from "../../src/modules/layout";
import { Agreements } from "../../src/modules/convention-collective/Agreements";
import { fetchAllAgreements } from "../../src/modules/convention-collective";
import { generateDefaultMetadata } from "../../src/modules/common/metas";

export const metadata = generateDefaultMetadata({
  title: "Votre convention collective",
  description:
    "Retrouvez les questions/réponses fréquentes organisées par thème pour votre convention collective",
  path: "/convention-collective",
});

async function AgreementPage() {
  const agreements = await fetchAllAgreements(
    ["slug", "shortTitle"],
    "shortTitle"
  );
  return (
    <DsfrLayout>
      <Agreements agreements={agreements} />
    </DsfrLayout>
  );
}

export default AgreementPage;
