import { Input, Label, Select, Text, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { AddButton, DelButton } from "../../../../common/Buttons";
import { Error } from "../../../../common/ErrorField";
import { MultiFieldRow } from "../../../../common/MultiFieldRow";
import { Question } from "../../../../common/Question";

export type Absence = {
  motif: string;
  durationInMonth: number | null;
  error?: string;
};

type Props = {
  onChange: (absences: Absence[]) => void;
  absences: Absence[];
};

export const MOTIFS = [
  { label: "Absence pour maladie non professionnelle", value: 1.0 },
  { label: "Arrêt maladie lié à un accident de trajet", value: 1.0 },
  { label: "Congé sabbatique", value: 1.0 },
  { label: "Congé pour création d'entreprise", value: 1.0 },
  { label: "Congé parental d'éducation", value: 0.5 },
  { label: "Congés sans solde", value: 1.0 },
  { label: "Grève", value: 1.0 },
  { label: "Mise à pied", value: 1.0 },
  { label: "Maladie d'origine non professionnelle", value: 1.0 },
  { label: "Congé de paternité", value: 1.0 },
];

const AbsencePeriods = ({ onChange, absences }: Props) => {
  const onAddButtonClick = () => {
    const newAbsences = [
      ...absences,
      {
        motif: MOTIFS[0].label,
        durationInMonth: null,
      },
    ];
    onChange(newAbsences);
  };

  const onDeleteButtonClick = (index: number) => {
    const newAbsences = absences.filter((_, i) => i !== index);
    onChange(newAbsences);
  };

  const onSetDurationDate = (index: number, value: string) => {
    const duration = parseFloat(value);
    const newAbsences = absences.map((absence, i) =>
      i === index ? { ...absence, durationInMonth: duration } : absence
    );
    onChange(newAbsences);
  };

  const onSelectMotif = (index: number, value: string) => {
    const newAbsences = absences.map((motif, i) =>
      i === index ? { ...motif, motif: value } : motif
    );
    onChange(newAbsences);
  };

  return (
    <>
      <p>
        Les congés payés, le congé de maternité ou d&apos;adoption, le congé de
        présence parental ,l&apos;arrêt de travail lié à un accident du travail
        ou une maladie professionnelle, le congé individuel de formation (CIF),
        le congé de solidarité internationale, le congé de solidarité familiale
        et le stage de fin d&apos;étude de plus de 2 mois sont déjà prises en
        compte dans l&apos;ancienneté et ne sont pas des périodes à renseigner
        ci-après :
      </p>
      <Question>
        Quels sont le motif et la durée de ces absences prolongées&nbsp;?
      </Question>
      {absences.map((value, index) => (
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
            gridColumns={["2fr", "1fr", "13rem"]}
            emptyCells={[5]}
          >
            <Label htmlFor={`${index}.type`}>Motif</Label>
            <FieldWrapper>
              <StyledSelect
                id={`${index}.type`}
                onChange={(e) => onSelectMotif(index, e.target.value)}
              >
                {MOTIFS.map(({ label }) => (
                  <option
                    key={label}
                    selected={value.motif === label}
                    value={label}
                  >
                    {label}
                  </option>
                ))}
              </StyledSelect>
            </FieldWrapper>
            <Label htmlFor={`${index}.duration`}>Durée (en mois)</Label>
            <div>
              <Input
                id={`${index}.duration`}
                onChange={(e) => onSetDurationDate(index, e.target.value)}
                invalid={value.error}
                value={value.durationInMonth}
                type="number"
                updateOnScrollDisabled
              />
              {value.error && <StyledError>{value.error}</StyledError>}
            </div>
            {absences.length > 1 && (
              <StyledDelButton onClick={() => onDeleteButtonClick(index)}>
                Supprimer
              </StyledDelButton>
            )}
          </MultiFieldRow>
        </RelativeDiv>
      ))}
      <AddButton onClick={onAddButtonClick}>Ajouter une absence</AddButton>
    </>
  );
};

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

export default AbsencePeriods;
