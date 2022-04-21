import React from "react";
import { Paragraph } from "@socialgouv/cdtn-ui";

type Props = {
  ccUrl?: string;
};

const UnsupportedCCDisclaimer: React.FC<Props> = ({ ccUrl }) => {
  return (
    <>
      <Paragraph>
        La convention collective sélectionnée n’est pas traitée par nos
        services. Nous vous invitons à consulter votre convention collective qui
        peut prévoir un nombre d’heures d’absence autorisée pour rechercher un
        emploi pendant un préavis.{" "}
        {ccUrl && (
          <>
            Vous pouvez consulter votre convention collective{" "}
            <a href={ccUrl} target="_blank" rel="noreferrer">
              ici
            </a>
          </>
        )}
      </Paragraph>
      <Paragraph>
        Un accord d’entreprise ou à défaut un usage dans la profession ou
        l’entreprise peut également prévoir que le salarié bénéficie d’heures
        d’absence autorisée pour rechercher un emploi pendant le préavis.
      </Paragraph>
    </>
  );
};

export default UnsupportedCCDisclaimer;
