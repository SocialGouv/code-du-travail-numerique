import {
  Input,
  InputDate,
  Label,
  Select,
  Text,
  theme,
} from "@socialgouv/cdtn-ui";
import { MultiFieldRow } from "../../../../common/MultiFieldRow";
import React, { useState } from "react";
import styled from "styled-components";
import { Error } from "../../../../common/ErrorField";
import { DelButton } from "../../../../common/Buttons";
import { Absence, Motif } from "@socialgouv/modeles-social";

type Errors = {
  duration?: string;
  absenceDate?: string;
};

type Props = {
  index: number;
  onSelectMotif: (index: number, motif: string) => void;
  onSetDurationDate: (index: number, value: string) => void;
  onSetAbsenceDate: (index: number, value: string) => void;
  motifs: Motif[];
  absence?: Absence;
  errors?: Errors;
  showDeleteButton: boolean;
  onDeleteAbsence: (index: number) => void;
  informationData: Record<string, string | undefined>;
};

const AbsencePeriod = ({
  index,
  onSelectMotif,
  onSetDurationDate,
  onSetAbsenceDate,
  absence,
  motifs,
  errors,
  showDeleteButton,
  onDeleteAbsence,
  informationData,
}: Props): JSX.Element => {
  const [shouldAskAbsenceDate, askAbsenceDate] = useState(
    absence
      ? absence.motif?.startAt && absence.motif?.startAt(informationData)
      : motifs.length > 0 &&
          motifs[0].startAt &&
          motifs[0].startAt(informationData)
  );

  const selectMotif = (index: number, value: string) => {
    const motif = motifs.find((motif) => motif.label === value);
    askAbsenceDate(motif?.startAt && motif.startAt(informationData));
    onSelectMotif(index, value);
  };

  const DurationWrapper = shouldAskAbsenceDate
    ? FieldWrapper
    : FieldWrapperNoMargin;

  return (
    <RelativeDiv key={index}>
      <RowTitle>
        <Text
          variant="secondary"
          fontSize="hsmall"
          role="heading"
          aria-level="2"
        >
          Absence {index + 1}
        </Text>
      </RowTitle>
      <MultiFieldRow
        gridRows={["auto", "auto"]}
        gridColumns={
          shouldAskAbsenceDate
            ? ["2fr", "1fr", "1fr", "13rem"]
            : ["2fr", "1fr", "13rem"]
        }
        emptyCells={shouldAskAbsenceDate ? [7] : [5]}
      >
        <Label htmlFor={`${index}.type`}>Motif</Label>
        <FieldWrapper>
          <StyledSelect
            id={`${index}.type`}
            onChange={(e) => selectMotif(index, e.target.value)}
            value={absence?.motif?.label}
          >
            {motifs.map(({ label, startAt }) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </StyledSelect>
        </FieldWrapper>
        <Label htmlFor={`${index}.duration`}>Durée (en mois)</Label>
        <DurationWrapper>
          <Input
            id={`${index}.duration`}
            onChange={(e) => onSetDurationDate(index, e.target.value)}
            invalid={errors?.duration !== undefined}
            value={absence?.durationInMonth}
            type="number"
            name={`${index}.duration`}
            aria-label={`${index}.duration`}
            updateOnScrollDisabled
          />
          {errors?.duration && <StyledError>{errors.duration}</StyledError>}
        </DurationWrapper>
        {shouldAskAbsenceDate && (
          <>
            <Label htmlFor={`${index}.duration`}>
              Date de début de l&apos;absence
            </Label>
            <div>
              <InputDate
                id={`${index}.dateAbsence`}
                onChange={(e) => onSetAbsenceDate(index, e)}
                placeholder={"jj/mm/aaaa"}
                invalid={errors?.absenceDate !== undefined}
                value={absence?.startedAt}
                type="text"
                name={`${index}.dateAbsence`}
                aria-label={`${index}.dateAbsence`}
                updateOnScrollDisabled
              />
              {errors?.absenceDate && (
                <StyledError>{errors.absenceDate}</StyledError>
              )}
            </div>
          </>
        )}
        {showDeleteButton && (
          <StyledDelButton onClick={() => onDeleteAbsence(index)}>
            Supprimer
          </StyledDelButton>
        )}
      </MultiFieldRow>
    </RelativeDiv>
  );
};

export default AbsencePeriod;

const { breakpoints, spacings } = theme;

const RelativeDiv = styled.div`
  position: relative;
`;

const RowTitle = styled.div`
  margin-bottom: ${spacings.base};
  padding-top: ${spacings.small};
`;

const StyledSelect = styled(Select)`
  display: flex;
`;

const FieldWrapper = styled.div`
  margin-right: ${spacings.base};
  @media (max-width: ${breakpoints.mobile}) {
    margin-right: 0;
    margin-bottom: ${spacings.base};
  }
`;

const FieldWrapperNoMargin = styled.div``;

const StyledError = styled(Error)`
  margin-bottom: 0;
`;

const StyledDelButton = styled(DelButton)`
  margin-top: ${spacings.xsmall};
  @media (max-width: ${breakpoints.mobile}) {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 0;
  }
`;
