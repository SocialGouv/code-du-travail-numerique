import React from "react";
import styled from "styled-components";
import { theme } from "@socialgouv/cdtn-ui";

import { MatomoActionEvent, trackQuestion } from "../../../../lib";
import { TextQuestion } from "../../../common/TextQuestion";
import { isPositiveNumber } from "../../../common/validators";
import { YesNoQuestion } from "../../../common/YesNoQuestion";
import { SeniorityMoreThanXYear, SeniorityValue } from "../../form";

export type SeniorityProps = {
  minYearCount: number;
  showAccurateSeniority: boolean;
  onChange: () => void;
};

const SeniorityStep = ({
  minYearCount,
  showAccurateSeniority,
  onChange,
}: SeniorityProps): JSX.Element => {
  return (
    <>
      <YesNoQuestion
        label={
          <>
            Le salarié a-t-il plus de {minYearCount} ans d&apos;ancienneté dans
            l&apos;entreprise <Small>({minYearCount} ans + 1 jour)</Small>
            &nbsp;?
          </>
        }
        name={SeniorityMoreThanXYear}
        tooltip={{
          content: (
            <p>
              L&apos;ancienneté du salarié est habituellement mentionnée sur
              le&nbsp;<strong>bulletin de salaire</strong>.
            </p>
          ),
          trackableFn: (visibility: boolean) => {
            if (visibility) {
              trackQuestion("Ancienneté", MatomoActionEvent.PREAVIS_RETRAITE);
            }
          },
        }}
        onChange={onChange}
      />
      {showAccurateSeniority && (
        <TextQuestion
          name={SeniorityValue}
          label="Quelle est l'ancienneté du salarié dans l’entreprise en mois ?"
          inputType="number"
          validate={isPositiveNumber}
          validateOnChange
          placeholder="0"
        />
      )}
    </>
  );
};

const Small = styled.small`
  font-size: ${theme.fonts.sizes.large};
`;

export default SeniorityStep;
