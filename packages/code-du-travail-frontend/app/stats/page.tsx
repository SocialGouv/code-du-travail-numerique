import { Metadata } from "next";
import { DsfrLayout } from "../../src/modules/layout";
import { Stats } from "../../src/modules/stats";
import { getStatsService } from "../../src/api";
import { cache } from "react";
import { REVALIDATE_TIME_DAY } from "../../src/config";

export const dynamic = "force-static";

export const revalidate = REVALIDATE_TIME_DAY;

export const metadata: Metadata = {
  title: "Statistiques - Code du travail numérique",
  description: "Statistiques d’utilisation du Code du travail numérique",
};

const getStats = cache(async () => {
  return getStatsService();
});

async function Index() {
  const data = await getStats();

  return (
    <DsfrLayout>
      <Stats
        nbDocuments={data.nbDocuments}
        nbVisits={data.nbVisits}
        nbSearches={data.nbSearches}
        nbPageViews={data.nbPageViews}
      />
    </DsfrLayout>
  );
}

export default Index;
