import React, { useEffect } from "react";
import { Field } from "react-final-form";
import styled from "styled-components";
import createPersistedState from "use-persisted-state";
import { Button, Toast, theme } from "@socialgouv/react-ui";

import { QuestionLabel } from "../../common/stepStyles";
import Search from "../../../conventions/Search/Form";
import { isNotYetProcessed } from "./situation";

// store selected convention in localStorage
const useConventionState = createPersistedState("convention");

function StepInfoCCn({ form }) {
  const [ccInfo, setCcInfo] = useConventionState({});
  useEffect(() => {
    form.batch(() => {
      [
        "contract",
        "criteria",
        "missionFormation",
        "ruptureContratFauteGrave",
        "propositionCDIFinContrat",
        "refusSouplesse",
        "finContratPeriodeDessai",
        "propositionCDIFindeContrat",
        "refusCDIFindeContrat",
        "interruptionFauteGrave",
        "refusRenouvellementAuto",
        "typeRemuneration",
        "salaire",
        "salaires"
      ].forEach(key => form.change(key, undefined));
      form.change("ccn", ccInfo.convention);
    });
  }, [ccInfo, form]);
  return (
    <>
      <Field
        name="ccn"
        render={({ input }) => {
          if (input.value) {
            return (
              <>
                <QuestionLabel>Votre convention collective</QuestionLabel>
                <p>
                  {input.value.title}
                  <br />
                  {ccInfo.label && `(${ccInfo.label})`}
                </p>

                <Button
                  variant="link"
                  type="button"
                  onClick={() => setCcInfo({})}
                >
                  Changer de convention collective
                </Button>
                {isNotYetProcessed(input.value.num) && (
                  <StyledToast>
                    Nous n’avons pas encore traité votre convention collective
                    mais nous vous invitons à poursuivre la simulation afin
                    d’obtenir le montant défini par le Code du travail.
                  </StyledToast>
                )}
              </>
            );
          }
          return (
            <>
              <QuestionLabel>
                Quelle est votre convention collective ?
              </QuestionLabel>
              <P>
                <strong>* optionnel</strong>, si vous ne connaissez pas votre
                convention collective, vous pouvez passer à l’étape suivante en
                cliquant sur le bouton Suivant.
              </P>
              <SearchStyled title="" onSelectConvention={setCcInfo} />
            </>
          );
        }}
      />
    </>
  );
}

export { StepInfoCCn };

const SearchStyled = styled(Search)`
  padding-left: 0;
  padding-right: 0;
`;

const { spacing } = theme;
const P = styled.p`
  font-style: italic;
`;
const StyledToast = styled(Toast)`
  width: 100%;
  margin-top: ${spacing.interComponent};
`;
