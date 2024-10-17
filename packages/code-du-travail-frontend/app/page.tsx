import { Metadata } from "next";
import { DsfrLayout } from "../src/modules/layout";
import { Home } from "../src/modules/home";
import { fetchHomeData } from "../src/modules/home/queries";

export const dynamic = "force-static";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Code du travail numérique",
  description:
    "Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (contrat de travail, congés payés, formation, démission, indemnités).",
  alternates: {
    canonical: "/",
  },
};

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
