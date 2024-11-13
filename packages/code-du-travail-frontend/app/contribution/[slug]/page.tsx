import React from "react";
import { DsfrLayout } from "../../../src/modules/layout";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { fetchRelatedItems } from "../../../src/modules/documents";
import {
  ContributionLayout,
  fetchContributionDocument,
} from "../../../src/modules/contributions";

export async function generateMetadata({ params }) {
  const { title, description } = await getContribution(params.slug);

  return generateDefaultMetadata({
    title: title,
    description: description,
    path: `/contribution/${params.slug}`,
  });
}

async function Fiche({ params }) {
  const { _id, title, metaDescription, date } = await getContribution(
    params.slug
  );
  const relatedItems = await fetchRelatedItems({ _id }, params.slug);
  return (
    <DsfrLayout>
      <ContributionLayout
        title={title}
        metaDescription={metaDescription}
        relatedItems={relatedItems}
        date={date}
      ></ContributionLayout>
    </DsfrLayout>
  );
}

const getContribution = async (slug: string) => {
  const contribution = await fetchContributionDocument(slug);

  if (!contribution) {
    return notFound();
  }
  return contribution;
};

export default Fiche;
