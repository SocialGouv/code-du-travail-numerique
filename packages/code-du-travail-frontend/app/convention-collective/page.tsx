import { DsfrLayout } from "../../src/modules/layout";
import {
  Agreements,
  AgreementsPerLetter,
} from "../../src/modules/convention-collective/Agreements";
import { fetchAgreements } from "../../src/modules/convention-collective";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { notFound } from "next/navigation";

export const metadata = generateDefaultMetadata({
  title: "Votre convention collective",
  description:
    "Retrouvez les questions/réponses fréquentes organisées par thème pour votre convention collective",
  path: "/convention-collective",
});

const removeAccents = (text: string) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

async function AgreementPage() {
  const agreements = await fetchAgreements({
    fields: ["slug", "shortTitle"],
    sortBy: "shortTitle",
  });
  if (!agreements.length) {
    return notFound();
  }
  const firstLettersAgreements = agreements.reduce<AgreementsPerLetter>(
    (agreementPerletter, agreement) => {
      const { shortTitle } = agreement;
      const firstLetter = removeAccents(shortTitle[0]);
      if (!agreementPerletter[firstLetter]) {
        return {
          ...agreementPerletter,
          [firstLetter]: [agreement],
        };
      }
      return {
        ...agreementPerletter,
        [firstLetter]: [...agreementPerletter[firstLetter], agreement],
      };
    },
    {}
  );
  return (
    <DsfrLayout>
      <Agreements firstLettersAgreements={firstLettersAgreements} />
    </DsfrLayout>
  );
}

export default AgreementPage;
