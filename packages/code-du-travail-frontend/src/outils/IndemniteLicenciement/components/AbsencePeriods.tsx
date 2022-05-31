import { Input, Label, Select, Text, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { AddButton, DelButton } from "../../common/Buttons";
import { Error } from "../../common/ErrorField";
import { MultiFieldRow } from "../../common/MultiFieldRow";
import { Question } from "../../common/Question";
import { isNumber } from "../../common/validators";

type Absence = {
  motif: string;
  durationInMonth: number | null;
};

type Props = {
  onChange: (absences: Absence[]) => void;
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

const AbsencePeriods = ({ onChange }: Props) => {
  const [absencePeriods, setAbsencePeriods] = React.useState<Absence[]>([
    {
      motif: MOTIFS[0].label,
      durationInMonth: null,
    },
  ]);
  const [errorsAbsencePeriods, setErrorsAbsencePeriods] = React.useState({});

  const onAddButtonClick = () => {
    setAbsencePeriods([
      ...absencePeriods,
      {
        motif: MOTIFS[0].label,
        durationInMonth: null,
      },
    ]);
  };

  const onDeleteButtonClick = (index: number) => {
    setAbsencePeriods(absencePeriods.filter((_, i) => i !== index));
  };

  const onSetDurationDate = (index: number, value: string) => {
    const duration = parseFloat(value);
    if (!isNumber(duration)) {
      setErrorsAbsencePeriods({
        ...errorsAbsencePeriods,
        [`${index}`]: "Veuillez entrer un nombre",
      });
      return;
    }
    setAbsencePeriods(
      absencePeriods.map((absence, i) =>
        i === index ? { ...absence, durationInMonth: duration } : absence
      )
    );
    onChange(absencePeriods);
  };

  const onSelectMotif = (index: number, value: string) => {
    setAbsencePeriods(
      absencePeriods.map((motif, i) =>
        i === index ? { ...motif, motif: value } : motif
      )
    );
    onChange(absencePeriods);
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
      {absencePeriods.map((value, index) => (
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
                    selected={absencePeriods[index].motif === label}
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
                type="number"
                onChange={(e) => onSetDurationDate(index, e.target.value)}
                invalid={errorsAbsencePeriods[index]}
              />
              {errorsAbsencePeriods[index] && (
                <StyledError>{errorsAbsencePeriods[index]}</StyledError>
              )}
            </div>
            {absencePeriods.length > 1 && (
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
