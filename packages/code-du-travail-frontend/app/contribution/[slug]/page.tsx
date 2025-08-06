import React from "react";
import { DsfrLayout } from "../../../src/modules/layout";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import {
  ContributionLayout,
  fetchContributionBySlug,
} from "../../../src/modules/contributions";

export async function generateMetadata({ params }) {
  const { metas } = await getContribution(params.slug);

  return generateDefaultMetadata({
    title: metas.title,
    description: metas.description,
    path: `/contribution/${params.slug}`,
  });
}

async function Contribution({ params }) {
  const contribution = await getContribution(params.slug);
  return (
    <DsfrLayout>
      <ContributionLayout contribution={contribution} />
    </DsfrLayout>
  );
}

const getContribution = async (slug: string) => {
  try {
    const contribution = await fetchContributionBySlug(slug);

    if (!contribution) {
      return notFound();
    }
    return contribution;
  } catch (error) {
    console.error("Error fetching contribution:", error);
    throw new Error(`Failed to fetch contribution: ${error.message}`);
  }
};

export default Contribution;
