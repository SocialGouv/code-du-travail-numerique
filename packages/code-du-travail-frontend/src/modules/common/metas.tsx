import { SITE_URL } from "../../config";

type Props = {
  title: string;
  description: string;
  path: string;
  overrideCanonical?: string;
  noTitleAdd?: boolean;
};

export async function generateDefaultMetadata({
  title,
  description,
  overrideCanonical,
  path,
  noTitleAdd,
}: Props) {
  return {
    siteName: "Code du travail numérique",
    title: `${title}${noTitleAdd ? "" : " - Code du travail numérique"}`,
    description: description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: overrideCanonical ?? path,
    },
    locale: "fr_FR",
    openGraph: {
      title: title,
      description: description,
      type: "article",
      images: `${SITE_URL}/static/assets/img/social-preview.png`,
    },
    twitter: {
      card: "summary",
    },
  };
}
