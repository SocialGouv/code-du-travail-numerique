import { fr } from "@codegouvfr/react-dsfr";
import { ContainerSimulator } from "../layout/ContainerSimulator";
import { ElasticAgreement } from "@socialgouv/cdtn-types";
import { AgreementsSection } from "./AgreementsSection";
import { AgreementsGlossaire } from "./AgreementsGlossaire";
import { AgreementsIntro } from "./AgreementsIntro";

type Agreement = Pick<ElasticAgreement, "shortTitle" | "slug">;

export type AgreementsPerLetter = {
  [letter: string]: Agreement[];
};

type Props = {
  firstLettersAgreements: AgreementsPerLetter;
};

export const Agreements = ({ firstLettersAgreements }: Props) => {
  return (
    <ContainerSimulator
      title="Votre convention collective"
      description="Retrouvez les questions/réponses fréquentes organisées par thème pour votre convention collective"
      relatedItems={[]}
      segments={[]}
    >
      <h1 id="convention-collective" className={fr.cx("fr-mt-0", "fr-mb-6w")}>
        Votre convention collective
      </h1>
      <AgreementsIntro />
      <div className={fr.cx("fr-mb-6w")}>
        <AgreementsGlossaire letters={Object.keys(firstLettersAgreements)} />
      </div>
      <div id="content" className={fr.cx("fr-col-12", "fr-col-md-7")}>
        {Object.entries(firstLettersAgreements).map(([letter, agreements]) => (
          <AgreementsSection
            key={letter}
            agreements={agreements}
            letter={letter}
          />
        ))}
      </div>
    </ContainerSimulator>
  );
};
