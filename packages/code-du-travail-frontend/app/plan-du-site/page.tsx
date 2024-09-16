import { Metadata } from "next";
import { DsfrLayout } from "../../src/modules/layout";
import { getSitemapData } from "../../src/api";
import { SiteMap } from "../../src/modules/plan-du-site";

export const metadata: Metadata = {
  title: "Plan du site",
  description: "Plan du site du Code du travail numérique",
};

const getSiteMap = async () => {
  return getSitemapData();
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
