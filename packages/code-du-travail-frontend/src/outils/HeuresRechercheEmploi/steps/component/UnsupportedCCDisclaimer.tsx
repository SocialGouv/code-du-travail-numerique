import React from "react";
import { Paragraph } from "@socialgouv/cdtn-ui";

type Props = {
  ccNumber?: number;
};

const UnsupportedCCDisclaimer: React.FC<Props> = ({ ccNumber }) => {
  return (
    <>
      <Paragraph>
        Nous vous invitons à consulter votre convention collective pour voir si
        elle prévoit un nombre d’heures d’absence autorisée pour rechercher un
        emploi pendant un préavis. En effet, pour votre information, la
        convention collective peut définir ce nombre d’heures, le code du
        travail ne prévoit rien sur ce sujet.{" "}
        {ccNumber && (
          <>
            Vous pouvez consulter votre convention collective{" "}
            <a
              href={`https://www.legifrance.gouv.fr/conv_coll/id/${ccNumber}`}
              target="_blank"
              rel="noreferrer"
            >
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
