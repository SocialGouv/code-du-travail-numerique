import { fr } from "@codegouvfr/react-dsfr";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { RelatedItem } from "../../documents";
import { ContainerSimulatorLight } from "../../layout/ContainerSimulatorLight";
import { listingSegment } from "../../layout/breadcrumb";
import { AccessibleAlert } from "../common/components/AccessibleAlert";
import { BrutNetSimulator } from "./components/BrutNetSimulator";
import type { SmicReference } from "./domain/types";

type Props = {
  relatedItems: {
    items: RelatedItem[];
    title: string;
  }[];
  title: string;
  breadcrumbTitle: string;
  description: string;
  smicReference: SmicReference | null;
};

/**
 * Coque serveur du simulateur : fil d'Ariane, `<h1>` et alerte statique. Tout
 * l'état vit dans `BrutNetSimulator`, plus bas.
 */
export const HiringSimulatorPage = ({
  relatedItems,
  description,
  title,
  breadcrumbTitle,
  smicReference,
}: Props) => (
  <ContainerSimulatorLight
    relatedItems={relatedItems}
    title={breadcrumbTitle}
    description={description}
    breadcrumbSegments={[listingSegment(SOURCES.TOOLS)]}
  >
    <h1 id="simulateur-embauche">{title}</h1>

    <AccessibleAlert
      className={["fr-mb-6w"]}
      severity="info"
      small
      description="Les données de simulation se mettront automatiquement à jour après la modification d'un champ."
    />

    <div className={fr.cx("fr-col-12")}>
      <BrutNetSimulator smicReference={smicReference} />
    </div>
  </ContainerSimulatorLight>
);

export default HiringSimulatorPage;
