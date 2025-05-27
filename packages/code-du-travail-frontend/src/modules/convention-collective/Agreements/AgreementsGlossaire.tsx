import { fr } from "@codegouvfr/react-dsfr";
import { AlphabeticList } from "../../glossaire/AlphabeticList";

type Props = {
  letters: string[];
};

export const AgreementsGlossaire = ({ letters }: Props) => {
  return (
    <>
      <h2>Les conventions collectives traitées</h2>
      <p className={fr.cx("fr-mb-6w")}>
        Les conventions collectives présentées sont les plus représentatives en
        termes de nombre de salariés.
      </p>
      <div>
        <AlphabeticList letters={letters} />
      </div>
    </>
  );
};
