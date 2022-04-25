import React from "react";
import { Paragraph } from "@socialgouv/cdtn-ui";

type Props = {
  agreementUrl?: string;
};

const UnsupportedCCDisclaimer: React.FC<Props> = ({ agreementUrl }) => {
  return (
    <>
      <Paragraph>
        La convention collective sélectionnée n’est pas traitée par nos
        services. Nous vous invitons à consulter votre convention collective qui
        peut prévoir un nombre d’heures d’absence autorisée pour rechercher un
        emploi pendant un préavis.{" "}
        {agreementUrl && (
          <>
            Vous pouvez consulter votre convention collective{" "}
            <a href={agreementUrl} target="_blank" rel="noreferrer">
              ici
            </a>
            .
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
