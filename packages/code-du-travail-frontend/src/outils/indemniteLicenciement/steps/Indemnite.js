import React from "react";
import { Field } from "react-final-form";
import { Button, Container, theme } from "@cdt/ui";
import styled from "styled-components";
import MathJax from "react-mathjax-preview";
import { ErrorBoundary } from "../../../common/ErrorBoundary";

import { getIndemnite, getSalaireRef } from "../indemnite";
import { branches } from "../branches";

function validateCCn(idcc) {
  const selectedBranche = branches.find(branche => branche.value === idcc);
  if (!selectedBranche) {
    return "Cette branche n'est pas encore intégrée.";
  }
}

function StepIndemnite({ form }) {
  const state = form.getState();
  const {
    hasTempsPartiel = false,
    hasSameSalaire = false,
    inaptitude = false,
    salairesPeriods = [],
    salaires = [],
    primes = [],
    salaire,
    anciennete,
    dateNotification
  } = state.values;

  const salaireRef = getSalaireRef({
    hasTempsPartiel,
    hasSameSalaire,
    salaire,
    salairesPeriods,
    salaires,
    anciennete,
    primes
  });
  const { indemnite, formula } = getIndemnite({
    salaireRef,
    anciennete,
    inaptitude,
    dateNotification
  });

  return (
    <Container narrow>
      <h2>Indemnité légale</h2>
      <p>
        Le code du travail prévoit un montant minimum de{" "}
        <strong>{indemnite} €</strong>
        pour votre indemnité de licenciement.
      </p>
      <br />
      <details>
        <summary>Voir le detail du calcul</summary>
        <ErrorBoundary>
          <MathJax math={"`" + formula + "`"} />
        </ErrorBoundary>
      </details>
      <br />
      <br />
      <h2>
        Votre convention collective peut prévoir un montant plus important
      </h2>
      <p>
        Selon la convention collective dont vous dépendez, le montant minimum de
        votre indemnité de licenciement peut être supérieur au montant de
        l’indemnité légale.
        <br /> Renseignez votre convention collective pour en savoir plus.
      </p>
      <Field
        name="branche"
        subscribe={{ error: true, dirty: true }}
        validate={validateCCn}
      >
        {({ input, meta: { error, dirty } }) => (
          <>
            <SelectWrapper>
              Selectionnez votre convention collective&nbsp;:
              <Select {...input}>
                <option disabled value="">
                  Selectionner une branche
                </option>
                {branches.map(branche => (
                  <option value={branche.value} key={branche.value}>
                    {branche.label}
                  </option>
                ))}
              </Select>
              {input.value && input.value.length > 0 && (
                <CancelButton variant="link" onClick={() => input.onChange("")}>
                  annuler
                </CancelButton>
              )}
            </SelectWrapper>
            {error && dirty && <span>{error}</span>}
          </>
        )}
      </Field>
    </Container>
  );
}

export { StepIndemnite };
const { spacing } = theme;
const SelectWrapper = styled.label`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
const Select = styled.select`
  margin-right: ${spacing.interComponent};
  flex: 1 1 70%;
  min-width: 400px;
`;
const CancelButton = styled(Button)`
  margin: ${spacing.interComponent} 0;
`;
