import React from "react";
import { DsfrLayout } from "../../../src/modules/layout";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import {
  fetchFicheMT,
  fetchAllFichesMT,
  FicheMT,
} from "../../../src/modules/fiche-ministere-travail/queries";
import { FicheMinistereTravail } from "../../../src/modules/fiche-ministere-travail/ficheMinistereTravail";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { RelatedItem } from "../../../src/modules/documents/type";
import { ElasticFicheTravailEmploiSection } from "@socialgouv/cdtn-types";
import { REVALIDATE_TIME } from "src/config";

interface PageParams {
  slug: string;
}

interface PageProps {
  params: PageParams;
}

interface FicheData {
  _id: string;
  title: string;
  description: string;
  date: string;
  intro: string;
  url: string;
  sections: ElasticFicheTravailEmploiSection[];
  breadcrumbs: any[];
  highlight?: ElasticFicheTravailEmploiSection;
}

interface FichePageData {
  ficheData: FicheData;
  relatedItems: { items: RelatedItem[]; title: string }[];
}

export const dynamic = "force-static";
export const revalidate = REVALIDATE_TIME;

export async function generateStaticParams(): Promise<PageParams[]> {
  try {
    const slugs = await fetchAllFichesMT();

    console.log(
      `Generated ${slugs.length} static params for fiche-ministere-travail`
    );

    return slugs;
  } catch (error) {
    console.error(
      "Error generating static params for fiche-ministere-travail:",
      error
    );

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
      overrideCanonical: ficheData.url,
    });
  } catch (error) {
    console.error(
      "Error generating metadata for fiche-ministere-travail:",
      error
    );
    return generateDefaultMetadata({
      title: "Fiche Ministère du Travail",
      description: "Fiche Ministère du Travail non trouvée",
    });
  }
}

async function Fiche({ params }: PageProps): Promise<React.JSX.Element> {
  try {
    const fichePageData = await getFichePageData(params.slug);

    return (
      <DsfrLayout>
        <FicheMinistereTravail
          title={fichePageData.ficheData.title}
          relatedItems={fichePageData.relatedItems}
          date={fichePageData.ficheData.date}
          url={fichePageData.ficheData.url}
          metaDescription={fichePageData.ficheData.description}
          sections={fichePageData.ficheData.sections}
          intro={fichePageData.ficheData.intro}
          breadcrumbs={fichePageData.ficheData.breadcrumbs}
          highlight={fichePageData.ficheData.highlight}
        />
      </DsfrLayout>
    );
  } catch (error) {
    console.error("Error rendering fiche-ministere-travail page:", error);
    notFound();
  }
}

const getFiche = async (slug: string): Promise<FicheData> => {
  try {
    const fiche = await fetchFicheMT(slug);

    if (!fiche) {
      notFound();
    }

    return {
      _id: fiche._id,
      title: fiche.title,
      description: fiche.description,
      date: fiche.date,
      intro: fiche.intro,
      url: fiche.url,
      sections: fiche.sections,
      breadcrumbs: fiche.breadcrumbs,
      highlight: fiche.highlight,
    };
  } catch (error) {
    console.error("Error fetching fiche-ministere-travail:", error);
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
