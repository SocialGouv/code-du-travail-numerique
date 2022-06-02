import { Alert, icons, Input, Paragraph, Text } from "@socialgouv/cdtn-ui";
import React from "react";
import { Field } from "react-final-form";

import { Error } from "../../../common/ErrorField";
import { Question } from "../../../common/Question";
import { SmallText } from "../../../common/stepStyles";
import { isNumber } from "../../../common/validators";
import { YesNoQuestion } from "../../../common/YesNoQuestion";
import SalaireTempsPlein from "../../components/SalaireTempsPlein";

export type Props = {
  salaryPeriods: any[] | undefined;
  onHasSameSalaryChange: (hasSameSalary: boolean) => void;
  onSalariesChange: (value: string, index: number) => void;
};

function SalariesStep({
  salaryPeriods,
  onHasSameSalaryChange,
  onSalariesChange,
}: Props): JSX.Element {
  return (
    <>
      <YesNoQuestion
        name="hasTempsPartiel"
        label="Y a-t-il eu des périodes d'alternance à temps plein et à temps partiel durant le contrat de travail&nbsp;?"
      />

      <Field name="hasTempsPartiel">
        {({ input }) => (
          <>
            {input.value === true && (
              <Alert variant="primary">
                <Text variant="primary" fontSize="hsmall" fontWeight="700">
                  À noter
                </Text>

                <Paragraph noMargin>
                  Le calcul de l’indemnité de licenciement dans le cas d’une
                  alternance de temps plein et de temps partiel est actuellement
                  en cours de développement.
                </Paragraph>
                <Paragraph noMargin>
                  Les périodes à temps partiel ne sont actuellement pas prises
                  en compte dans le calcul.
                </Paragraph>
              </Alert>
            )}
            {input.value === false && (
              <>
                <YesNoQuestion
                  name="hasSameSalaire"
                  label="Le salaire mensuel brut a-t-il été le même durant les 12 derniers mois précédant la notification du licenciement&nbsp;?"
                  onChange={onHasSameSalaryChange}
                />
                <Field name="hasSameSalaire">
                  {({ input }) => (
                    <>
                      {input.value && (
                        <Field
                          name="salaire"
                          validate={isNumber}
                          subscription={{
                            error: true,
                            invalid: true,
                            touched: true,
                            value: true,
                          }}
                        >
                          {({ input, meta: { touched, error, invalid } }) => (
                            <>
                              <Question required htmlFor="salaire">
                                Quel a été le montant du salaire mensuel
                                brut&nbsp;?
                              </Question>
                              <SmallText>
                                Prendre en compte les primes et avantages en
                                nature.
                              </SmallText>
                              <Input
                                {...input}
                                type="number"
                                invalid={touched && invalid}
                                icon={icons.Euro}
                                updateOnScrollDisabled
                              />
                              {error && touched && invalid && (
                                <Error>{error}</Error>
                              )}
                            </>
                          )}
                        </Field>
                      )}
                      {/* {salaryPeriods?.length && (
                        <SalaireTempsPlein
                          onSalariesChange={onSalariesChange}
                          salaryPeriods={salaryPeriods}
                        />
                      )} */}
                    </>
                  )}
                </Field>
              </>
            )}
          </>
        )}
      </Field>
    </>
  );
}

export default SalariesStep;
