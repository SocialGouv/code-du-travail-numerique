import { Absence, SeniorityFactory } from "@socialgouv/modeles-social";
import { SupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social/bin";
import React from "react";
import styled from "styled-components";

import { AddButton } from "../../../../common/Buttons";
import { Error } from "../../../../common/ErrorField";
import { Question } from "../../../../common/Question";
import { SmallText } from "../../../../common/stepStyles";
import AbsencePeriod from "./AbsencePeriod";
import type { AncienneteAbsenceStoreError } from "../store";

type Props = {
  onChange: (absences: Absence[]) => void;
  absences: Absence[];
  informationData: Record<string, string | undefined>;
  error?: {
    global?: string;
    absences?: AncienneteAbsenceStoreError[];
  };
  idcc?: SupportedCcIndemniteLicenciement;
};

const AbsencePeriods = ({
  onChange,
  absences,
  error,
  idcc,
  informationData,
}: Props) => {
  const motifs = new SeniorityFactory()
    .create(idcc ?? SupportedCcIndemniteLicenciement.default)
    .getMotifs();
  const [localAbsences, setLocalAbsences] = React.useState<Absence[]>(
    absences.length > 0
      ? absences
      : [
          {
            motif: motifs[0],
            durationInMonth: undefined,
          },
        ]
  );

  const [errorsInput, setErrorsInput] = React.useState({});

  const onAddButtonClick = () => {
    const newAbsences = [
      ...localAbsences,
      {
        motif: motifs[0],
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

  const onSetAbsenceDate = (index: number, value: string) => {
    const newAbsences = localAbsences.map((absence, i) =>
      i === index ? { ...absence, startedAt: value } : absence
    );
    setLocalAbsences(newAbsences);
    onChange(newAbsences);
  };

  const onSelectMotif = (index: number, value: string) => {
    const motif = motifs.find((motif) => motif.label === value)!;
    const newAbsences = localAbsences.map((absence, i) =>
      i === index ? { ...absence, motif: motif } : absence
    );
    setLocalAbsences(newAbsences);
    onChange(newAbsences);
  };

  return (
    <>
      <p>
        Les congés payés, le congé de maternité ou d&apos;adoption, le congé de
        présence parentale, l&apos;arrêt de travail lié à un accident du travail
        ou une maladie professionnelle, le congé lié à la formation
        professionnelle (CIF, projet de transition professionnelle), le congé de
        solidarité internationale, le congé de solidarité familiale et le stage
        de fin d&apos;étude de plus de 2 mois sont déjà pris en compte dans
        l&apos;ancienneté et ne sont pas des périodes à renseigner ci-après :
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
        <AbsencePeriod
          key={index}
          index={index}
          onSelectMotif={onSelectMotif}
          onSetDurationDate={onSetDurationDate}
          onSetAbsenceDate={onSetAbsenceDate}
          motifs={motifs}
          showDeleteButton={localAbsences.length > 1}
          onDeleteAbsence={onDeleteButtonClick}
          errors={{
            duration:
              errorsInput[`${index}`] ??
              (error?.absences
                ? error.absences[index].errorDuration
                : undefined),
            absenceDate: error?.absences
              ? error.absences[index].errorDate
              : undefined,
          }}
          absence={value}
          informationData={informationData}
        />
      ))}
      {error?.global && <StyledError>{error.global}</StyledError>}
      <AddButton onClick={onAddButtonClick}>Ajouter une absence</AddButton>
    </>
  );
};

const StyledError = styled(Error)`
  margin-bottom: 0;
`;

export default AbsencePeriods;
