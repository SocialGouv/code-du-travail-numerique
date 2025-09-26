import { notFound } from "next/navigation";
import { DsfrLayout } from "src/modules/layout";

import { generateDefaultMetadata } from "src/modules/common/metas";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import {
  fetchInformation,
  format,
  Information,
} from "src/modules/informations";
import { fetchRelatedItems } from "src/modules/documents";

export async function generateMetadata(props) {
  const params = await props.params;
  const information = await fetchInformation(params.slug, [
    "title",
    "metaDescription",
  ]);

  if (!information) {
    return notFound();
  }

  return generateDefaultMetadata({
    title: information?.title,
    description: information?.metaDescription,
    path: `/${getRouteBySource(SOURCES.EDITORIAL_CONTENT)}/${params.slug}`,
  });
}

async function InformationPage(props) {
  const params = await props.params;
  const data = await getInformation(params.slug);

  if (!data) {
    return notFound();
  }

  const information = data.information;

  if (data.relatedItems.length === 0) {
    data.relatedItems = await fetchRelatedItems(
      { _id: information._id },
      params.slug
    );
  }

  return (
    <DsfrLayout>
      <Information
        slug={params.slug}
        dismissalProcess={information.dismissalProcess}
        date={information.date}
        title={information.title}
        breadcrumbs={information.breadcrumbs}
        description={information.description}
        intro={information.intro}
        contents={information.contents}
        references={information.references}
        relatedItems={data.relatedItems}
        infography={information.infography}
      />
    </DsfrLayout>
  );
}

const getInformation = async (slug: string) => {
  const information = await fetchInformation(slug, [
    "dismissalProcess",
    "date",
    "breadcrumbs",
    "title",
    "description",
    "intro",
    "contents",
    "references",
  ]);

  if (!information) {
    return notFound();
  }
  return format(information);
};

export default InformationPage;
