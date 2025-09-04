import { notFound } from "next/navigation";
import { headers } from "next/headers";

import { getAllModeles } from "../../../src/api";
import { integrationData } from "src/modules/integration/data";
import { DsfrLayout } from "../../../src/modules/layout";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { IntegrationDetailPageContent } from "src/modules/integration/IntegrationDetailPageContent";

const keys = Object.keys(integrationData);

const getModelesList = async () => {
  const modeles = await getAllModeles();
  return modeles
    .map((item) => {
      return {
        label: item?.title ?? "",
        value: item?.cdtnId ?? "",
      };
    })
    ?.sort((a, b) => a.label.localeCompare(b.label));
};

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const widget = integrationData[params.slug];
  if (!widget) {
    return {};
  }
  return generateDefaultMetadata({
    title: widget.metaTitle,
    description: widget.metaDescription,
    path: `/integration/${params.slug}`,
  });
}

export default async function IntegrationDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  if (!keys.includes(params.slug)) {
    notFound();
  }

  const widget = integrationData[params.slug];
  const { isModele } = widget;
  const selectOptions = isModele ? await getModelesList() : null;

  const headersList = await headers();
  const host = headersList.get("host") || "";
  const protocol =
    headersList.get("x-forwarded-proto")?.split(",")[0] || "https";
  const fullHost = `${protocol}://${host}`;

  return (
    <DsfrLayout>
      <IntegrationDetailPageContent
        widget={widget}
        host={fullHost}
        selectOptions={selectOptions}
      />
    </DsfrLayout>
  );
}
