import { Metadata } from "next";
import { DsfrLayout } from "../../src/modules/layout";
import { Agreements } from "../../src/modules/convention-collective/Agreements";
import { fetchAllAgreements } from "../../src/modules/convention-collective";

export const metadata: Metadata = {
  title: "Votre convention collective",
  description:
    "Retrouvez les questions/réponses fréquentes organisées par thème pour votre convention collective",
};

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
