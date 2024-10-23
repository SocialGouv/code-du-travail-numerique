import { DsfrLayout } from "../../src/modules/layout";
import { fetchSitemapData, SiteMap } from "../../src/modules/plan-du-site";
import { generateDefaultMetadata } from "../../src/modules/common/metas";

export const metadata = generateDefaultMetadata({
  title: "Plan du site",
  description: "Plan du site du Code du travail numérique",
  path: "/plan-du-site",
});

const getSiteMap = async () => {
  return fetchSitemapData();
};

async function Index() {
  const data = await getSiteMap();

  return (
    <DsfrLayout>
      <SiteMap {...data} />
    </DsfrLayout>
  );
}

export default Index;
