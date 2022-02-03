import { formatIdcc } from "@cdt/data";
import {
  InputRadio,
  Paragraph,
  Section,
  Text,
  theme,
  Toast,
} from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import styled from "styled-components";

import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import { SearchParams } from "../../ConventionCollective/common/NavContext";
import { EnterpriseSearchStep } from "../../ConventionCollective/steps/EnterpriseSearch";
import { ErrorField } from "../ErrorField";
import { RadioContainer, SectionTitle } from "../stepStyles";
import { required } from "../validators";
import { AGREEMENT_ID_NAME, ENTERPRISE_NAME } from "./form-constants";
import { OnSelectAgreementFn } from "./types";

export type Props = {
  selectedEnterprise?: Enterprise;
  onSelectAgreement: OnSelectAgreementFn;
};

const EnterpriseSearch = ({
  selectedEnterprise,
  onSelectAgreement,
}: Props): JSX.Element => {
  const [enterprise, setEnterprise] = useState<Enterprise | undefined>(
    selectedEnterprise
  );
  const [searchParams, setSearchParams] = useState<SearchParams>({
    address: "",
    query: "",
  });

  if (enterprise) {
    if (enterprise.conventions.length == 1) {
      return (
        <Section>
          <SectionTitle>
            Vous avez sélectionné l&apos;entreprise&nbsp;:&nbsp;
          </SectionTitle>
          <SelectedEnterprise
            variant="secondary"
            onRemove={(event) => {
              event.preventDefault();
              setEnterprise(undefined);
              onSelectAgreement(null);
            }}
          >
            {enterprise.simpleLabel}
          </SelectedEnterprise>
          <SectionTitle>
            Une convention collective a été trouvée pour cette
            entreprise&nbsp;:&nbsp;
          </SectionTitle>
          <SelectedAgreement>
            {enterprise.conventions[0].shortTitle} (IDCC{" "}
            {formatIdcc(enterprise.conventions[0].num)})
          </SelectedAgreement>
          <Paragraph>
            Cliquez sur Suivant pour poursuivre la simulation.
          </Paragraph>
        </Section>
      );
    }

    return (
      <Section>
        <SectionTitle>
          Vous avez sélectionné l&apos;entreprise&nbsp;:&nbsp;
        </SectionTitle>
        <SelectedEnterprise
          variant="secondary"
          onRemove={(event) => {
            event.preventDefault();
            setEnterprise(undefined);
            onSelectAgreement(null);
          }}
        >
          {enterprise.simpleLabel}
        </SelectedEnterprise>
        <SectionTitle>
          {enterprise.conventions.length} conventions collectives ont été
          trouvées pour cette entreprise, sélectionnez la vôtre&nbsp;:&nbsp;
        </SectionTitle>
        <RadioContainer>
          {enterprise.conventions.map((agreement) => {
            return (
              <Field
                key={agreement.id}
                type="radio"
                name={AGREEMENT_ID_NAME}
                value={`${agreement.id}`}
                validate={required}
              >
                {(props) => (
                  <InputRadio
                    label={
                      <Text>
                        {agreement.shortTitle} (IDCC {formatIdcc(agreement.num)}
                        )
                      </Text>
                    }
                    id={`agreement-${agreement.id}`}
                    {...props.input}
                  />
                )}
              </Field>
            );
          })}
          <OnChange name={AGREEMENT_ID_NAME}>
            {(values) => {
              onSelectAgreement(
                enterprise?.conventions?.find(
                  (agreement) => agreement.id === values
                ) ?? null,
                enterprise
              );
            }}
          </OnChange>
          <ErrorField name={AGREEMENT_ID_NAME} />
        </RadioContainer>
        <Paragraph>
          Cliquez sur Suivant pour poursuivre la simulation.
        </Paragraph>
      </Section>
    );
  }

  return (
    <>
      <EnterpriseSearchStep
        handleEnterpriseSelection={(enterprise) => {
          if (enterprise.conventions.length === 1) {
            onSelectAgreement(enterprise.conventions[0], enterprise);
          }
          setEnterprise(enterprise);
        }}
        searchParams={searchParams}
        onSearchParamsChange={(params) => {
          setSearchParams(params);
        }}
      />
      <ErrorField name={ENTERPRISE_NAME} />
      <Field
        type="input"
        name={ENTERPRISE_NAME}
        validate={required}
        hidden
        render={({ input, ...props }) => {
          return <input {...input} {...props} />;
        }}
      />
    </>
  );
};

const { spacings, fonts } = theme;

const SelectedEnterprise = styled(Toast)`
  width: 100%;
  margin-bottom: ${spacings.medium};
`;

const SelectedAgreement = styled(Paragraph)`
  margin-bottom: ${spacings.small};
  font-weight: bold;
  font-size: ${fonts.sizes.headings.small};
`;

export default EnterpriseSearch;
