import { Metadata } from "next/types";

type Props = {
  title: string;
  description: string;
  path?: string;
  overrideCanonical?: string;
  noTitleAdd?: boolean;
  robots?: string;
};

export function generateDefaultMetadata({
  title,
  description,
  overrideCanonical,
  path,
  robots,
}: Props): Metadata {
  return {
    title: title,
    description: description,
    alternates: {
      canonical: overrideCanonical ?? path,
    },
    openGraph: {
      siteName: "Code du travail numérique",
      title: title,
      description: description,
      type: "website",
      images: `/static/assets/img/social-preview.png`,
      locale: "fr_FR",
    },
    ...(robots && {
      robots,
    }),
  };
}
