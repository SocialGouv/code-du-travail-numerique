import { Input, Label, Select, Text, theme } from "@socialgouv/cdtn-ui";
import { Absence, getMotifs } from "@socialgouv/modeles-social";
import { SupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social/bin";
import React from "react";
import styled from "styled-components";

import { AddButton, DelButton } from "../../../../common/Buttons";
import { Error } from "../../../../common/ErrorField";
import { MultiFieldRow } from "../../../../common/MultiFieldRow";
import { Question } from "../../../../common/Question";
import { SmallText } from "../../../../common/stepStyles";

type Props = {
  onChange: (absences: Absence[]) => void;
  absences: Absence[];
  error?: string;
  idcc?: SupportedCcIndemniteLicenciement;
};

const AbsencePeriods = ({ onChange, absences, error, idcc }: Props) => {
  const motifs = getMotifs(idcc ?? SupportedCcIndemniteLicenciement.default);
  const [localAbsences, setLocalAbsences] = React.useState(
    absences.length > 0
      ? absences
      : [
          {
            motif: motifs[0].label,
            durationInMonth: undefined,
          },
        ]
  );

  const [errorsInput, setErrorsInput] = React.useState({});

  const onAddButtonClick = () => {
    const newAbsences = [
      ...localAbsences,
      {
        motif: motifs[0].label,
        durationInMonth: undefined,
      },
    ];
    setLocalAbsences(newAbsences);
    onChange(newAbsences);
  };

  const onDeleteButtonClick = (index: number) => {
    const newAbsences = localAbsences.filter((_, i) => i !== index);
    setLocalAbsences(newAbsences);
    onChange(newAbsences);
  };

  const onSetDurationDate = (index: number, value: string) => {
    const duration = parseFloat(value);
    if (isNaN(duration) && value.length > 0) {
      setErrorsInput({
        ...errorsInput,
        [`${index}`]: "Veuillez entrer un nombre",
      });
      return;
    } else {
      setErrorsInput({
        ...errorsInput,
        [`${index}`]: undefined,
      });
    }
    const newAbsences = localAbsences.map((absence, i) =>
      i === index ? { ...absence, durationInMonth: duration } : absence
    );
    setLocalAbsences(newAbsences);
    onChange(newAbsences);
  };

  const onSelectMotif = (index: number, value: string) => {
    const newAbsences = localAbsences.map((motif, i) =>
      i === index ? { ...motif, motif: value } : motif
    );
    setLocalAbsences(newAbsences);
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
      <SmallText>
        Veuillez créer une ligne différente pour chaque période d’absence (de
        plus d’un mois) même si vous avez été absent plusieurs fois pour le même
        motif.
      </SmallText>
      {localAbsences.map((value, index) => (
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
                value={value.motif}
              >
                {motifs.map(({ label }) => (
                  <option key={label} value={label}>
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
                invalid={errorsInput[`${index}`] !== undefined}
                value={value.durationInMonth}
                type="number"
                name={`${index}.duration`}
                aria-label={`${index}.duration`}
                updateOnScrollDisabled
              />
              {errorsInput[`${index}`] && (
                <StyledError>{errorsInput[`${index}`]}</StyledError>
              )}
            </div>
            {localAbsences.length > 1 && (
              <StyledDelButton onClick={() => onDeleteButtonClick(index)}>
                Supprimer
              </StyledDelButton>
            )}
          </MultiFieldRow>
        </RelativeDiv>
      ))}
      {error && <StyledError>{error}</StyledError>}
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
