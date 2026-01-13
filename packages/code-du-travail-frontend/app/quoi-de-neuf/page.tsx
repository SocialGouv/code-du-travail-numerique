import { notFound, redirect } from "next/navigation";
import { getMostRecentPeriod } from "../../src/modules/whatIsNew";
import { generateDefaultMetadata } from "../../src/modules/common/metas";

export const dynamic = "force-dynamic";

export const metadata = generateDefaultMetadata({
  title: "Quoi de neuf",
  description:
    "Consultez les dernières évolutions et mises à jour du Code du travail numérique.",
  path: "/quoi-de-neuf",
});

export default async function Index() {
  const period = await getMostRecentPeriod();

  if (!period) {
    notFound();
  }

  redirect(`/quoi-de-neuf/${period}`);
}
