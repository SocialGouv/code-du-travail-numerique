import React from "react";
import { Text } from "@socialgouv/cdtn-ui";

const IntroAnnotation = (): JSX.Element => {
  return (
    <Text italic>
      Attention&nbsp;: Le résultat affiché correspond à la durée légale ou
      conventionnelle, en fonction des informations renseignées.
    </Text>
  );
};

export default IntroAnnotation;
