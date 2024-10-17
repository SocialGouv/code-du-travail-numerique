import { DsfrLayout } from "../src/modules/layout";
import { Home } from "../src/modules/home";
import { fetchHomeData } from "../src/modules/home/queries";
import { generateDefaultMetadata } from "../src/modules/common/metas";

export const dynamic = "force-static";

export const revalidate = 86400;

export const metadata = generateDefaultMetadata({
  title: "Code du travail numérique",
  description:
    "Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (contrat de travail, congés payés, formation, démission, indemnités).",
  path: "/",
});

async function Index() {
  const data = await fetchHomeData();

  return (
    <DsfrLayout doNotWrapInContainer>
      <Home
        agreements={data.agreements}
        contributions={data.contributions}
        highlights={data.highlights}
        modeles={data.modeles}
        themes={data.themes}
        tools={data.tools}
      />
    </DsfrLayout>
  );
}

export default Index;
