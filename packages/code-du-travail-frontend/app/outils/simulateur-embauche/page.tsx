import { cache } from "react";
import { DsfrLayout } from "../../../src/modules/layout";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import {
  fetchSmicReference,
  HiringSimulatorPage as HiringSimulatorView,
} from "../../../src/modules/outils/simulateur-embauche";

export async function generateMetadata() {
  const { metaTitle, metaDescription } = await getTool();

  return generateDefaultMetadata({
    title: metaTitle,
    description: metaDescription,
    path: `/outils/simulateur-embauche`,
  });
}

async function HiringSimulatorPage() {
  // Le SMIC ne dépend d'aucune des deux autres requêtes : on le lance en premier
  // et on ne l'attend qu'en dernier, pour qu'il se déroule pendant les allers-
  // retours Elasticsearch au lieu de s'ajouter au TTFB. Préchargé côté serveur
  // et mis en cache 24 h, il rend le bouton « SMIC » disponible dès le premier
  // rendu sans qu'un appel parte au chargement de la page la plus consultée du
  // site. `null` en cas d'échec ou de lenteur — la page se rend quand même.
  //
  // `fetchSmicReference` ne rejette jamais : la promesse peut flotter sans
  // risque d'`unhandledRejection` le temps des deux requêtes qui suivent.
  const smicPromise = fetchSmicReference();

  const tool = await getTool();
  const relatedItems = await fetchRelatedItems(
    { _id: tool._id },
    "simulateur-embauche"
  );
  const smicReference = await smicPromise;

  return (
    <DsfrLayout>
      <HiringSimulatorView
        title={tool.displayTitle}
        breadcrumbTitle={tool.title}
        relatedItems={relatedItems}
        description={tool.description}
        smicReference={smicReference}
      />
    </DsfrLayout>
  );
}

/**
 * Mémoïsé sur la durée d'une requête : `generateMetadata` et le composant de
 * page en ont tous les deux besoin, et sans `cache` la même recherche
 * Elasticsearch partait deux fois par affichage de page.
 */
const getTool = cache(async () => {
  const tool = await fetchTool("simulateur-embauche");

  if (!tool) {
    return notFound();
  }
  return tool;
});

export default HiringSimulatorPage;
