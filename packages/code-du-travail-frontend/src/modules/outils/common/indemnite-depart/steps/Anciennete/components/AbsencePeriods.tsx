import { Absence, Motif } from "@socialgouv/modeles-social";
import React, { useEffect } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Alert } from "@codegouvfr/react-dsfr/Alert";

import AbsencePeriod from "./AbsencePeriod";
import type { AncienneteAbsenceStoreError } from "../store";

type Props = {
  onChange: (absences: Absence[]) => void;
  motifs: Motif[];
  absences: Absence[];
  informationData: Record<string, string | undefined>;
  error?: {
    global?: string;
    absences?: AncienneteAbsenceStoreError[];
  };
  messageMotifExample?: string;
};

export type AbsenceWithKey = Absence & {
  key: string;
};

const generateUniqueKey = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

const mapAbsences = (
  absences: Absence[],
  defaultMotif: Motif
): AbsenceWithKey[] => {
  return absences.length > 0
    ? absences.map((absence) => ({ ...absence, key: generateUniqueKey() }))
    : [
        {
          motif: defaultMotif,
          durationInMonth: undefined,
          key: generateUniqueKey(),
        },
      ];
};

const AbsencePeriods = ({
  onChange,
  motifs,
  absences,
  error,
  informationData,
  messageMotifExample,
}: Props) => {
  const [localAbsences, setLocalAbsences] = React.useState<AbsenceWithKey[]>(
    mapAbsences(absences, motifs[0])
  );

  useEffect(() => {
    if (absences.length != localAbsences.length) {
      const newAbsence = mapAbsences(absences, motifs[0]);
      setLocalAbsences(newAbsence);
    }
  }, [absences]);

  const [errorsInput, setErrorsInput] = React.useState({});

  const onAddButtonClick = () => {
    const newAbsences: AbsenceWithKey[] = [
      ...localAbsences,
      {
        key: generateUniqueKey(),
        motif: motifs[0],
        durationInMonth: undefined,
      },
    ];
    setLocalAbsences(newAbsences);
    onChange(newAbsences);
  };

  const onDeleteButtonClick = (key: string) => {
    const newAbsences = localAbsences.filter((absence) => absence.key !== key);
    setLocalAbsences(newAbsences);
    onChange(newAbsences);
  };

  const onSetDurationDate = (key: string, value: string) => {
    const duration = parseFloat(value);
    if (isNaN(duration) && value.length > 0) {
      setErrorsInput({
        ...errorsInput,
        [`${key}`]: "Veuillez entrer un nombre",
      });
      return;
    } else {
      setErrorsInput({
        ...errorsInput,
        [`${key}`]: undefined,
      });
    }
    const newAbsences = localAbsences.map((absence) =>
      key === absence.key ? { ...absence, durationInMonth: duration } : absence
    );
    setLocalAbsences(newAbsences);
    onChange(newAbsences);
  };

  const onSetAbsenceDate = (key: string, value: string) => {
    const newAbsences = localAbsences.map((absence) =>
      key === absence.key ? { ...absence, startedAt: value } : absence
    );
    setLocalAbsences(newAbsences);
    onChange(newAbsences);
  };

  const onSelectMotif = (key: string, value: string) => {
    const motif = motifs.find((motif) => motif.label === value)!;
    const newAbsences = localAbsences.map((absence) =>
      key === absence.key ? { ...absence, motif: motif } : absence
    );
    setLocalAbsences(newAbsences);
    onChange(newAbsences);
  };

  return (
    <div className="fr-container">
      {messageMotifExample && <p className="fr-text">{messageMotifExample}</p>}
      <p>Quels sont le motif et la durée de ces absences prolongées&nbsp;?</p>
      <p className="fr-text--sm fr-mb-2w">
        Veuillez créer une ligne différente pour chaque période d&apos;absence
        (de plus d&apos;un mois) même si vous avez été absent plusieurs fois
        pour le même motif.
      </p>

      {localAbsences.map((value, index) => (
        <AbsencePeriod
          key={value.key}
          index={index}
          onSelectMotif={onSelectMotif}
          onSetDurationDate={onSetDurationDate}
          onSetAbsenceDate={onSetAbsenceDate}
          onDeleteAbsence={onDeleteButtonClick}
          motifs={motifs}
          showDeleteButton={localAbsences.length > 1}
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

      {error?.global && (
        <Alert
          title="Erreur"
          severity="error"
          description={error.global}
          className="fr-mb-2w"
        />
      )}

      <Button
        onClick={onAddButtonClick}
        priority="secondary"
        className="fr-mt-2w"
      >
        Ajouter une absence
      </Button>
    </div>
  );
};

export default AbsencePeriods;
