import { Text } from "@socialgouv/cdtn-ui";
import React from "react";

import { SectionTitle } from "../../../common/stepStyles";
import { FormContent } from "../../../common/type/WizardType";
import {
  PublicodesContextInterface,
  PublicodesResult,
} from "../../../publicodes";

type Props = {
  data: FormContent;
  publicodesContext: PublicodesContextInterface;
};

const ShowResult: React.FC<{ result: PublicodesResult }> = ({ result }) => {
  if (result.value > 0) {
    return (
      <b>
        {result.value} {result.unit.numerators[0]}
      </b>
    );
  }
  return <b>pas de préavis</b>;
};

const Description: React.FC<{
  isVolountary: boolean;
  result: PublicodesResult;
  legaleResult: PublicodesResult;
  agreementResult: PublicodesResult | null;
  seniority: number;
}> = ({ isVolountary, legaleResult, agreementResult, seniority }) => {
  if (agreementResult === null && legaleResult.value === 0 && seniority < 6) {
    return (
      <Text variant="primary">
        Le salarié ayant une ancienneté inférieure à 6 mois, il n’y a pas de
        préavis à respecter.
      </Text>
    );
  }
  if (
    agreementResult !== null &&
    agreementResult.value === 0 &&
    legaleResult.value === 0 &&
    seniority < 6
  ) {
    return (
      <Text variant="primary">
        Pour un salarié ayant une ancienneté inférieure à 6 mois, ni le code du
        travail ni la convention collective sélectionnée ne prévoit de préavis à
        respecter.
      </Text>
    );
  }

  if (
    agreementResult !== null &&
    agreementResult.value > 0 &&
    legaleResult.value === 0 &&
    seniority < 6
  ) {
    return (
      <Text variant="primary">
        Le code du travail ne prévoit pas de durée de préavis pour une
        ancienneté inférieure à 6 mois mais il renvoie à la convention ou
        l’accord collectif de travail ou, à défaut, aux usages pratiqués dans la
        localité et la profession. La durée à appliquer pour le salarié est donc
        la durée prévue par la convention collective.
      </Text>
    );
  }

  if (
    isVolountary &&
    agreementResult !== null &&
    legaleResult.value < agreementResult.value
  ) {
    return (
      <Text variant="primary">
        La durée à appliquer pour le salarié est donc la durée légale, celle-ci
        étant plus courte que la durée prévue par la convention collective.
      </Text>
    );
  }

  if (
    isVolountary &&
    agreementResult !== null &&
    legaleResult.value === agreementResult.value
  ) {
    return (
      <Text variant="primary">
        Le résultat correspond à la fois à la durée prévue par le code du
        travail et à la fois à la durée prévue par la convention collective,
        celles-ci étant identiques dans cette situation.
      </Text>
    );
  }

  if (
    isVolountary &&
    agreementResult !== null &&
    legaleResult.value > agreementResult.value
  ) {
    return (
      <Text variant="primary">
        La durée à appliquer pour le salarié est donc à la durée
        conventionnelle, celle-ci étant plus courte que la durée prévue par le
        code du travail.
      </Text>
    );
  }

  if (isVolountary && agreementResult === null) {
    return (
      <Text variant="primary">
        La durée à appliquer pour le salarié est donc la durée prévue par le
        code du travail pour son ancienneté.
      </Text>
    );
  }

  if (
    !isVolountary &&
    agreementResult !== null &&
    legaleResult.value < agreementResult.value
  ) {
    return (
      <Text variant="primary">
        La durée à appliquer pour le salarié est donc à la durée prévue par la
        convention collective, celle-ci étant plus longue que la durée légale.
      </Text>
    );
  }

  if (
    !isVolountary &&
    agreementResult !== null &&
    legaleResult.value === agreementResult.value
  ) {
    return (
      <Text variant="primary">
        Le résultat correspond à la fois à la durée prévue par le code du
        travail et à la fois à la durée prévue par la convention collective,
        celles-ci étant identiques dans cette situation.
      </Text>
    );
  }

  if (
    !isVolountary &&
    agreementResult !== null &&
    legaleResult.value > agreementResult.value
  ) {
    return (
      <Text variant="primary">
        La durée à appliquer pour le salarié est donc la durée légale, celle-ci
        étant plus longue que la durée prévue par la convention collective.
      </Text>
    );
  }

  if (!isVolountary && agreementResult === null) {
    return (
      <Text variant="primary">
        La durée à respecter pour l’employeur est donc la durée prévue par le
        code du travail pour son ancienneté.
      </Text>
    );
  }
  return <></>;
};

const DecryptedResult: React.FC<Props> = ({ data, publicodesContext }) => {
  const type =
    data["contrat salarié - mise à la retraite"] === "oui" ? "mise" : "depart";

  const legaleResult = publicodesContext.execute(
    "contrat salarié . préavis de retraite . tranches"
  );
  let agreementResult = null;
  if (data.ccn) {
    agreementResult = publicodesContext.execute(
      "contrat salarié . préavis de retraite collective"
    );
  }
  return (
    <>
      <SectionTitle>Le résultat décrypté</SectionTitle>
      <Text>
        Durée prévue par le code du travail (durée légale)&nbsp;:&nbsp;
        <ShowResult result={legaleResult} />
      </Text>
      {data.ccn && (
        <>
          <br />
          <Text>
            Durée prévue par la convention collective (durée
            conventionnelle)&nbsp;:&nbsp;
            <ShowResult result={agreementResult} />
          </Text>
        </>
      )}
      <br />
      <Description
        isVolountary={type === "depart"}
        result={publicodesContext.result}
        legaleResult={legaleResult}
        agreementResult={agreementResult}
        seniority={Number(data["contrat salarié - ancienneté"])}
      />
    </>
  );
};
export default DecryptedResult;
