import { fr } from "@codegouvfr/react-dsfr";
import { ContainerSimulator } from "../layout/ContainerSimulator";
import { ElasticAgreement } from "@socialgouv/cdtn-types";
import { AgreementsSection } from "./AgreementsSection";
import { AgreementsGlossaire } from "./AgreementsGlossaire";
import { AgreementsIntro } from "./AgreementsIntro";

type Agreement = Pick<ElasticAgreement, "shortTitle" | "slug">;

type Props = {
  agreements: Agreement[];
};

type AgreementsPerLetter = {
  [letter: string]: Agreement[];
};

const removeAccents = (text: string) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const Agreements = ({ agreements }: Props) => {
  const firstLettersAgreements = agreements.reduce<AgreementsPerLetter>(
    (agreementPerletter, agreement) => {
      const { shortTitle } = agreement;
      const firstLetter = removeAccents(shortTitle[0]);
      if (!agreementPerletter[firstLetter]) {
        return {
          ...agreementPerletter,
          [firstLetter]: [agreement],
        };
      }
      return {
        ...agreementPerletter,
        [firstLetter]: [...agreementPerletter[firstLetter], agreement],
      };
    },
    {}
  );
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
      <div id="content">
        {Object.entries(firstLettersAgreements).map(([letter, agreements]) => (
          <AgreementsSection
            key={letter}
            agreements={agreements}
            letter={letter}
          ></AgreementsSection>
        ))}
      </div>
    </ContainerSimulator>
  );
};
