import React from "react";
import { DsfrLayout } from "../../../src/modules/layout";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { fetchRelatedItems } from "../../../src/modules/documents";
import {
  ContributionLayout,
  fetchContributionBySlug,
} from "../../../src/modules/contributions";

export async function generateMetadata({ params }) {
  const { title, description } = await getContribution(params.slug);

  return generateDefaultMetadata({
    title: title,
    description: description,
    path: `/contribution/${params.slug}`,
  });
}

async function Contribution({ params }) {
  const { _id, ...source } = await getContribution(params.slug);
  return (
    <DsfrLayout>
      <ContributionLayout contribution={source} />
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
