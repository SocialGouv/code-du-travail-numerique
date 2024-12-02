import { DsfrLayout } from "../../src/modules/layout";
import { Stats } from "../../src/modules/stats";
import { getStatsService } from "../../src/api";
import { generateDefaultMetadata } from "../../src/modules/common/metas";

export const dynamic = "force-static";

export const revalidate = 86400;

export const metadata = generateDefaultMetadata({
  title: "Statistiques",
  description: "Statistiques d’utilisation du Code du travail numérique",
  path: "/stats",
});

async function Index() {
  const data = await getStatsService();

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
