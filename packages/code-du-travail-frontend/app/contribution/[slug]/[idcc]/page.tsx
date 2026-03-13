import React from "react";
import { DsfrLayout } from "../../../../src/modules/layout";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../../src/modules/common/metas";
import {
  ContributionLayout,
  fetchContributionBySlug,
} from "../../../../src/modules/contributions";

export async function generateMetadata(props) {
  const params = await props.params;
  const { metas } = await getContribution(params.slug, params.idcc);

  return generateDefaultMetadata({
    title: metas.title,
    description: metas.description,
    path: `/contribution/${params.slug}/${params.idcc}`,
  });
}

async function ContributionByAgreement(props) {
  const params = await props.params;
  const contribution = await getContribution(params.slug, params.idcc);
  return (
    <DsfrLayout>
      <ContributionLayout contribution={contribution} />
    </DsfrLayout>
  );
}

const getContribution = async (slug: string, idcc: string) => {
  const contribution = await fetchContributionBySlug(`${idcc}-${slug}`);

  if (!contribution) {
    return notFound();
  }
  return contribution;
};

export default ContributionByAgreement;
