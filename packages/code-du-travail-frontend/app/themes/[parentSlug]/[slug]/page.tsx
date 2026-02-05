import React from "react";
import { DsfrLayout, ListLayout } from "../../../../src/modules/layout";
import { generateDefaultMetadata } from "../../../../src/modules/common/metas";
import { notFound } from "next/navigation";
import { fetchSubThemes, fetchTheme } from "../../../../src/modules/themes";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { groupByThemes } from "../../../../src/modules/utils";

export async function generateMetadata(props) {
  const params = await props.params;
  const { title, metaDescription } = await getTheme(params.slug);

  return generateDefaultMetadata({
    title,
    description: metaDescription,
    path: `/themes/${params.parentSlug}/${params.slug}`,
  });
}

async function Theme(props) {
  const params = await props.params;
  const { title, metaDescription } = await getTheme(params.slug);
  const parentThemeTitle = await getParentThemeTitle(params.parentSlug);
  const subThemes = await getSubThemesDocs(params.slug);

  return (
    <DsfrLayout>
      <ListLayout
        title={title}
        description={metaDescription}
        source={SOURCES.THEMES}
        data={subThemes}
        popularSlugs={[]}
        breadcrumbSegments={[
          {
            label: "Thèmes",
            linkProps: {
              href: "/themes",
            },
          },
          ...(parentThemeTitle
            ? [
                {
                  label: parentThemeTitle,
                  linkProps: {
                    href: `/themes/${params.parentSlug}`,
                  },
                },
              ]
            : []),
        ]}
      />
    </DsfrLayout>
  );
}

const getTheme = async (slug: string) => {
  const theme = await fetchTheme(slug, ["title", "metaDescription"]);
  if (!theme) {
    return notFound();
  }
  return theme;
};

const getParentThemeTitle = async (parentSlug: string) => {
  const parentTheme = await fetchTheme(parentSlug, ["title"]);
  return (parentTheme as any)?.title as string | undefined;
};

const getSubThemesDocs = async (slug: string) => {
  const subThemes = await fetchSubThemes(slug, [
    "title",
    "refs",
    "slug",
    "position",
  ]);
  if (!subThemes) {
    return notFound();
  }
  return groupByThemes(
    subThemes
      .map((item) => ({
        ...item,
        refs: item.refs.map((ref) => ({
          ...ref,
          breadcrumbs: [
            { slug: item.slug, position: item.position, label: item.title },
          ],
        })),
      }))
      .flatMap((item) => item.refs)
  );
};

export default Theme;
