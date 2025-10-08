import React from "react";
import { DsfrLayout } from "../../../src/modules/layout";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { notFound } from "next/navigation";
import { fetchTheme } from "../../../src/modules/themes";
import { ThemeModel } from "../../../src/modules/themes/ThemeModel";

export async function generateMetadata(props) {
  const params = await props.params;
  const { title, metaDescription } = await getTheme(params.slug, [
    "title",
    "metaDescription",
  ]);

  return generateDefaultMetadata({
    title: title,
    description: metaDescription,
    path: `/themes/${params.slug}`,
  });
}

async function Theme(props) {
  const params = await props.params;
  const theme = await getTheme(params.slug, [
    "breadcrumbs",
    "title",
    "description",
    "children",
    "refs",
  ]);

  return (
    <DsfrLayout>
      <ThemeModel theme={theme} />
    </DsfrLayout>
  );
}

const getTheme = async (slug: string, fields) => {
  const theme = await fetchTheme(slug, fields);

  if (!theme) {
    return notFound();
  }
  return theme;
};

export default Theme;
