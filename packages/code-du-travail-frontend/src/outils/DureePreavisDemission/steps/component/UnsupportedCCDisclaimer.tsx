import React from "react";
import { Paragraph } from "@socialgouv/cdtn-ui";

type Props = {
  ccNumber?: number;
};

const UnsupportedCCDisclaimer: React.FC<Props> = ({ ccNumber }) => {
  return (
    <>
      <Paragraph>
        La convention collective sélectionnée n’est pas traitée par nos
        services. Nous vous invitons à consulter votre convention collective
        pour obtenir votre durée de préavis.{" "}
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
        L’existence ou la durée du préavis de démission peut également être
        prévue par un accord d’entreprise ou à défaut, par un usage dans
        l’entreprise.
      </Paragraph>
    </>
  );
};

export default UnsupportedCCDisclaimer;
