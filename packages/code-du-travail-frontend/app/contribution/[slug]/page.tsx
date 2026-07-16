import React from "react";
import { DsfrLayout } from "../../../src/modules/layout";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import {
  ContributionLayout,
  fetchContributionBySlug,
  fetchGenericContributionInfos,
} from "../../../src/modules/contributions";
import { removeCCNumberFromSlug } from "../../../src/modules/utils/removeCCNumberFromSlug";

export async function generateMetadata(props) {
  const params = await props.params;
  const { metas } = await getContribution(params.slug);

  return generateDefaultMetadata({
    title: metas.title,
    description: metas.description,
    path: `/contribution/${params.slug}`,
  });
}

async function Contribution(props) {
  const params = await props.params;
  const contribution = await getContribution(params.slug);
  // Page personnalisée à une CC : les infos du document générique frère
  // alimentent le bloc de sélection de CC (réinitialisation à l'arrivée
  // externe), le document conventionnel ne portant pas ccSupported/ccUnextended.
  const genericInfos = !contribution.isGeneric
    ? await fetchGenericContributionInfos(removeCCNumberFromSlug(params.slug))
    : undefined;
  return (
    <DsfrLayout>
      <ContributionLayout
        contribution={contribution}
        genericInfos={genericInfos}
      />
    </DsfrLayout>
  );
}

const getContribution = async (slug: string) => {
  const contribution = await fetchContributionBySlug(slug);

  if (!contribution) {
    return notFound();
  }
  return contribution;
};

export default Contribution;
