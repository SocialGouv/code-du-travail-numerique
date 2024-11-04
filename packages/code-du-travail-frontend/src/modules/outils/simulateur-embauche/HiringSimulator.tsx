import { Highlight } from "@codegouvfr/react-dsfr/Highlight";
import { fr } from "@codegouvfr/react-dsfr";
import { ContainerSimulator } from "../../layout/ContainerSimulator";
import { RelatedItem } from "../../documents";
import { SimulateurEmbauche } from "./SimulateurEmbauche";

type Props = {
  relatedItems: {
    items: RelatedItem[];
    title: string;
  }[];
  title: string;
  description: string;
};

export const HiringSimulator = ({
  relatedItems,
  description,
  title,
}: Props) => {
  return (
    <ContainerSimulator
      relatedItems={relatedItems}
      title={title}
      description={description}
      segments={[{ label: "Simulateurs", linkProps: { href: "/outils" } }]}
    >
      <h1 id="simulateur-embauche">{title}</h1>
      <Highlight size="lg" className={fr.cx("fr-mb-12v")}>
        Pour information, l&apos;estimation du salaire net après impôt est basée
        sur la situation d&apos;une personne célibataire sans enfants ni
        patrimoine.
      </Highlight>
      <div className={fr.cx("fr-col-12")}>
        <SimulateurEmbauche></SimulateurEmbauche>
      </div>
    </ContainerSimulator>
  );
};
