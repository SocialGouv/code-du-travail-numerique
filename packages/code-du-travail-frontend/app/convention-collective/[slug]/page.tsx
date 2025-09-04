import React from "react";
import { DsfrLayout } from "../../../src/modules/layout";
import { notFound, permanentRedirect } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { searchAgreement } from "src/modules/convention-collective";
import { getBySlugAgreements } from "src/api";
import { AgreementContainer } from "src/modules/convention-collective/AgreementContainer";
import { fetchRelatedItems } from "src/modules/documents";
import { SOURCES } from "@socialgouv/cdtn-utils";

export async function generateMetadata(props) {
  const params = await props.params;
  const agreement = await getBySlugAgreements(params.slug);

  return generateDefaultMetadata({
    title: `Convention collective : ${agreement?.shortTitle ?? agreement?.title}`,
    description: agreement?.metaDescription ?? "",
    path: `/convention-collective/${params.slug}`,
    robots: agreement?.url ? undefined : "noindex, nofollow",
  });
}

async function Page(props) {
  const params = await props.params;
  const agreement = await getAgreement(params.slug);
  const relatedItems = await fetchRelatedItems(
    { _id: agreement._id },
    params.slug
  );

  const articlesIndex = relatedItems.findIndex(
    (item) => item.title === "Articles liés"
  );

  const staticArticles = [
    {
      source: SOURCES.SHEET_SP,
      title: "Convention collective",
      url: "/fiche-service-public/convention-collective",
    },
    {
      source: SOURCES.SHEET_SP,
      title: "Comment consulter un accord d'entreprise ?",
      url: "/fiche-service-public/comment-consulter-un-accord-dentreprise",
    },
    {
      source: SOURCES.LABOUR_LAW,
      title: "Droit du travail: Existe-t-il une hiérarchie entre les textes ?",
      url: "/droit-du-travail#hierarchie",
    },
  ];

  const augmentedRelatedItems = [...relatedItems];

  if (articlesIndex !== -1) {
    augmentedRelatedItems[articlesIndex] = {
      ...augmentedRelatedItems[articlesIndex],
      items: [...staticArticles, ...augmentedRelatedItems[articlesIndex].items],
    };
  } else {
    augmentedRelatedItems.push({
      title: "Articles liés",
      items: staticArticles,
    });
  }

  return (
    <DsfrLayout>
      <AgreementContainer
        agreement={agreement}
        relatedItems={augmentedRelatedItems}
      />
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
