"use client";
import { Highlight } from "@codegouvfr/react-dsfr/Highlight";
import { fr } from "@codegouvfr/react-dsfr";
import { ContainerSimulator } from "../../layout/ContainerSimulator";
import { RelatedItem } from "../../documents";

type Props = {
  relatedItems: {
    items: RelatedItem[];
    title: string;
  }[];
  description: string;
};

export const HiringSimulator = ({ relatedItems, description }: Props) => {
  return (
    <ContainerSimulator
      relatedItems={relatedItems}
      title="Calculer le salaire brut/net"
      description={description}
      segments={[{ label: "Simulateurs", linkProps: { href: "/outils" } }]}
    >
      <h1 id="simulateur-embauche">Calculer le salaire brut/net</h1>
      <Highlight size="lg" className={fr.cx("fr-mb-12v")}>
        Pour information, l&apos;estimation du salaire net après impôt est basée
        sur la situation d&apos;une personne célibataire sans enfants ni
        patrimoine.
      </Highlight>
      <div className={fr.cx("fr-col-12")} suppressHydrationWarning>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          src="https://mon-entreprise.urssaf.fr/simulateur-iframe-integration.js"
          data-couleur="#417DC4"
          id="script-simulateur-embauche"
        />
      </div>
    </ContainerSimulator>
  );
};
