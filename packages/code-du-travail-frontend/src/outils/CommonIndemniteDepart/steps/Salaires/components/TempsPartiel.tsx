import { Alert, Paragraph, Text } from "@socialgouv/cdtn-ui";
import React from "react";
import { IndemniteDepartType } from "../../../../types";

type Props = {
  type: IndemniteDepartType;
};
const TempsPartiel = ({ type }: Props): JSX.Element => {
  return (
    <Alert variant="primary">
      <Text variant="primary" fontSize="hsmall" fontWeight="700">
        À noter
      </Text>

      <Paragraph noMargin>
        Le calcul de l’indemnité de {type} dans le cas d’une alternance de temps
        plein et de temps partiel est actuellement en cours de développement.
      </Paragraph>
      <Paragraph noMargin>
        Les périodes à temps partiel ne sont actuellement pas prises en compte
        dans le calcul.
      </Paragraph>
    </Alert>
  );
};

export default TempsPartiel;
