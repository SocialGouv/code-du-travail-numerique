import React from "react";
import { DsfrLayout } from "../../../src/modules/layout";
import { notFound, permanentRedirect } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { searchAgreement } from "src/modules/convention-collective";
import { getBySlugAgreements } from "src/api";
import { AgreementContainer } from "src/modules/convention-collective/AgreementContainer";
import { fetchRelatedItems } from "src/modules/documents";

export async function generateMetadata({ params }) {
  const agreement = await getBySlugAgreements(params.slug);

  return generateDefaultMetadata({
    title: agreement?.title ?? "",
    description: agreement?.metaDescription ?? "",
    path: `/convention-collective/${params.slug}`,
    robots: agreement?.url ? undefined : "noindex, nofollow",
  });
}

async function Page({ params }) {
  const agreement = await getAgreement(params.slug);
  const relatedItems = await fetchRelatedItems(
    { _id: agreement._id },
    params.slug
  );

  return (
    <DsfrLayout>
      <AgreementContainer agreement={agreement} relatedItems={relatedItems} />
    </DsfrLayout>
  );
}

const getAgreement = async (slug: string) => {
  const IDCC_ONLY = /^\d{2,4}$/;
  if (IDCC_ONLY.test(slug)) {
    const agreements = await searchAgreement(slug.padStart(4, "0"), true);
    if (!agreements.length) {
      return notFound();
    }
    return permanentRedirect(`/convention-collective/${agreements[0].slug}`);
  }
  const agreement = await getBySlugAgreements(slug);
  if (!agreement) {
    return notFound();
  }
  return agreement;
};

export default Page;
