import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { DsfrLayout } from "../../../src/modules/layout";
import {
  fetchFicheSP,
  fetchAllFichesSP,
  ElasticFicheServicePublicWithData,
} from "../../../src/modules/fiche-service-public/queries";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { FicheServicePublicContainer } from "../../../src/modules/fiche-service-public/FicheServicePublicContainer";
import { RelatedItem } from "../../../src/modules/documents/type";
import { FicheSPData } from "../../../src/modules/fiche-service-public/builder/type";

interface PageParams {
  slug: string;
}

interface PageProps {
  params: PageParams;
}

interface FicheData {
  _id: string;
  breadcrumbs: any[];
  date: string;
  description: string;
  raw: { children: FicheSPData[] };
  referencedTexts: any[];
  title: string;
  url: string;
}

interface FichePageData {
  ficheData: FicheData;
  relatedItems: { items: RelatedItem[]; title: string }[];
}

export async function generateStaticParams(): Promise<PageParams[]> {
  try {
    const slugs = await fetchAllFichesSP();

    console.log(
      `Generated ${slugs.length} static params for fiche-service-public`
    );

    return slugs;
  } catch (error) {
    console.error(
      "Error generating static params for fiche-service-public:",
      error
    );

    // Return empty array to enable ISR fallback
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const ficheData = await getFiche(params.slug);

    return generateDefaultMetadata({
      title: ficheData.title,
      description: ficheData.description,
      path: `/${getRouteBySource(SOURCES.SHEET_SP)}/${params.slug}`,
      overrideCanonical: ficheData.url,
    });
  } catch (error) {
    console.error("Error generating metadata for fiche-service-public:", error);
    return generateDefaultMetadata({
      title: "Fiche Service Public",
      description: "Fiche Service Public non trouvée",
      path: `/${getRouteBySource(SOURCES.SHEET_SP)}/${params.slug}`,
    });
  }
}

async function Fiche({ params }: PageProps): Promise<React.JSX.Element> {
  try {
    const fichePageData = await getFichePageData(params.slug);

    return (
      <DsfrLayout>
        <FicheServicePublicContainer
          title={fichePageData.ficheData.title}
          relatedItems={fichePageData.relatedItems}
          date={fichePageData.ficheData.date}
          url={fichePageData.ficheData.url}
          metaDescription={fichePageData.ficheData.description}
          raw={fichePageData.ficheData.raw}
          breadcrumbs={fichePageData.ficheData.breadcrumbs}
          referencedTexts={fichePageData.ficheData.referencedTexts}
        />
      </DsfrLayout>
    );
  } catch (error) {
    console.error("Error rendering fiche-service-public page:", error);
    notFound();
  }
}

const getFiche = async (slug: string): Promise<FicheData> => {
  try {
    const fiche = await fetchFicheSP(slug);

    if (!fiche) {
      notFound();
    }

    return {
      _id: fiche._id,
      breadcrumbs: fiche.breadcrumbs,
      date: fiche.date,
      description: fiche.description,
      raw: fiche.raw,
      referencedTexts: fiche.referencedTexts,
      title: fiche.title,
      url: fiche.url,
    };
  } catch (error) {
    console.error("Error fetching fiche-service-public:", error);
    notFound();
  }
};

const getFichePageData = async (slug: string): Promise<FichePageData> => {
  try {
    const ficheData = await getFiche(slug);
    const relatedItems = await fetchRelatedItems({ _id: ficheData._id }, slug);

    return {
      ficheData,
      relatedItems,
    };
  } catch (error) {
    console.error("Error fetching fiche page data:", error);
    throw error;
  }
};

export default Fiche;
