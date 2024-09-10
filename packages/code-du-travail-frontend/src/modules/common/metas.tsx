import { Metadata } from "next/types";

type Props = {
  title: string;
  description: string;
  path: string;
  overrideCanonical?: string;
  noTitleAdd?: boolean;
};

export function generateDefaultMetadata({
  title,
  description,
  overrideCanonical,
  path,
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
  };
}
