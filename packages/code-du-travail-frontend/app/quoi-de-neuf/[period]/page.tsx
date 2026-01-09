import { notFound } from "next/navigation";
import { DsfrLayout } from "../../../src/modules/layout";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import {
  WhatIsNew,
  fetchWhatIsNewMonth,
  getPeriods,
} from "../../../src/modules/whatIsNew";
import * as Sentry from "@sentry/nextjs";

type PageProps = {
  params: Promise<{ period: string }>;
};

export const metadata = generateDefaultMetadata({
  title: "Quoi de neuf",
  description:
    "Consultez les dernières évolutions et mises à jour du Code du travail numérique.",
  path: "/quoi-de-neuf",
});

export async function generateStaticParams() {
  try {
    const periods = await getPeriods();
    return periods.map((period) => ({ period }));
  } catch (error) {
    Sentry.captureException(error);
    return [];
  }
}

export default async function Index({ params }: PageProps) {
  const { period } = await params;

  const month = await fetchWhatIsNewMonth(period);

  if (!month) {
    notFound();
  }

  const periods = await getPeriods().catch(() => []);
  const periodsForNav = periods.length > 0 ? periods : [month.period];

  return (
    <DsfrLayout>
      <WhatIsNew month={month} periods={periodsForNav} />
    </DsfrLayout>
  );
}
