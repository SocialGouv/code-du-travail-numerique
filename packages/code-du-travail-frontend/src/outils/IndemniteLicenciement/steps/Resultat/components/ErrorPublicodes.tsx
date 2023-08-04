import React from "react";
import { Paragraph } from "@socialgouv/cdtn-ui";

import { SectionTitle } from "../../../../common/stepStyles";

export default function ErrorPublicodes() {
  return (
    <div>
      <SectionTitle hasSmallMarginTop>Indemnité</SectionTitle>
      <Paragraph noMargin>
        Nous n&apos;avons pas pu calculer votre indemnité de licenciement, en
        raison d&apos;une erreur liée à notre moteur de calcul. Veuillez
        vérifier les informations saisies.
      </Paragraph>
    </div>
  );
}
