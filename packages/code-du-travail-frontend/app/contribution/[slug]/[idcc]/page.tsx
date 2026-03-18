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
  const contribution = await fetchContribution(params.slug, params.idcc);

  return generateDefaultMetadata({
    title: contribution.metas.title,
    description: contribution.metas.description,
    path: `/contribution/${params.slug}/${params.idcc}`,
    overrideCanonical: `/contribution/${params.slug}`,
  });
}

async function ContributionByAgreement(props) {
  const params = await props.params;
  const contribution = await fetchContribution(params.slug, params.idcc);

  return (
    <DsfrLayout>
      <ContributionLayout contribution={contribution} />
    </DsfrLayout>
  );
}

const fetchContribution = async (slug: string, idccOrCcnSlug: string) => {
  const idcc = idccOrCcnSlug.split("-")[0];
  const contribution = await fetchContributionBySlug(`${idcc}-${slug}`);

  if (!contribution) {
    return notFound();
  }
  return contribution;
};

export default ContributionByAgreement;
