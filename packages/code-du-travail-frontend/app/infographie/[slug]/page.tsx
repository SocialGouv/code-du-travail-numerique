import { notFound } from "next/navigation";
import { DsfrLayout } from "src/modules/layout";

import {
  generateDefaultMetadata,
  getContentArticle,
} from "src/modules/common/metas";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import {
  fetchInfographic,
  format,
  Infographic,
  Infographie,
} from "src/modules/infographie";
import { Metadata } from "next";

export async function generateMetadata(
  props: PageProps<"/infographie/[slug]">
): Promise<Metadata> {
  const params = await props.params;
  const information = await fetchInfographic(params.slug, [
    "title",
    "metaDescription",
    "date",
    "breadcrumbs",
  ]);

  if (!information) {
    return notFound();
  }

  return generateDefaultMetadata({
    title: information?.title,
    description: information?.metaDescription,
    path: `/${getRouteBySource(SOURCES.INFOGRAPHICS)}/${params.slug}`,
    article: getContentArticle(information.date, information.breadcrumbs),
  });
}

async function InfographiePage(props: PageProps<"/infographie/[slug]">) {
  const params = await props.params;
  const infographic = await getInfographic(params.slug);

  if (!infographic) {
    return notFound();
  }

  return (
    <DsfrLayout>
      <Infographie infographic={infographic} />
    </DsfrLayout>
  );
}

const getInfographic = async (slug: string): Promise<Infographic> => {
  const infographic = await fetchInfographic(slug, [
    "title",
    "meta_title",
    "date",
    "description",
    "meta_description",
    "svgFilename",
    "pdfFilename",
    "pdfFilesizeOctet",
    "transcription",
    "breadcrumbs",
    "references",
    "linkedContent",
  ]);

  if (!infographic) {
    return notFound();
  }
  return format(infographic);
};

export default InfographiePage;
