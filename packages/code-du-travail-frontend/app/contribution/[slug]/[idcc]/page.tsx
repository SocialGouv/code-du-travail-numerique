import React from "react";
import { DsfrLayout } from "../../../../src/modules/layout";
import { notFound, permanentRedirect } from "next/navigation";
import { generateDefaultMetadata } from "../../../../src/modules/common/metas";
import {
  ContributionLayout,
  fetchContributionBySlug,
  fetchGenericContributionInfos,
} from "../../../../src/modules/contributions";

export async function generateMetadata(props) {
  const params = await props.params;
  const contribution = await fetchContribution(params.slug, params.idcc);

  return generateDefaultMetadata({
    title: contribution.metas.title,
    description: contribution.metas.description,
    path: `/contribution/${params.slug}/${params.idcc}`,
  });
}

async function ContributionByAgreement(props) {
  const params = await props.params;
  // Infos du document générique frère (cf. page /contribution/[slug]) : ici le
  // slug générique est directement le segment de route.
  const [contribution, genericInfos] = await Promise.all([
    fetchContribution(params.slug, params.idcc),
    fetchGenericContributionInfos(params.slug),
  ]);

  if (/^\d+$/.test(params.idcc) && contribution.ccnSlug) {
    permanentRedirect(`/contribution/${params.slug}/${contribution.ccnSlug}`);
  }

  return (
    <DsfrLayout>
      <ContributionLayout
        contribution={contribution}
        genericInfos={genericInfos}
      />
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
