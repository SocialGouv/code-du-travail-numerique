import { notFound } from "next/navigation";
import { DsfrLayout } from "src/modules/layout";

import { generateDefaultMetadata } from "src/modules/common/metas";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import {
  fetchInfographic,
  format,
  Infographic,
  Infographie,
} from "src/modules/infographie";
import { Metadata } from "next";

export async function generateMetadata(props): Promise<Metadata> {
  const params = await props.params;
  const information = await fetchInfographic(params.slug, [
    "title",
    "metaDescription",
  ]);

  if (!information) {
    return notFound();
  }

  return generateDefaultMetadata({
    title: information?.title,
    description: information?.metaDescription,
    path: `/${getRouteBySource(SOURCES.INFOGRAPHICS)}/${params.slug}`,
  });
}

async function InfographiePage(props) {
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
