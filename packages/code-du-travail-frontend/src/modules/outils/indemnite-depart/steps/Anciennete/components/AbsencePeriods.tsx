import { Absence, Motif } from "@socialgouv/modeles-social";
import React, { useEffect, useRef } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";

import AbsencePeriod from "./AbsencePeriod";
import type { AncienneteAbsenceStoreError } from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import Html from "src/modules/common/Html";

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
  const errorMessageId = "absence-total-error";
  const statusMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (absences.length != localAbsences.length) {
      const newAbsence = mapAbsences(absences, motifs[0]);
      setLocalAbsences(newAbsence);
    }
  }, [absences]);

  // Update the status message when there's a global error
  useEffect(() => {
    if (error?.global && statusMessageRef.current) {
      statusMessageRef.current.textContent = error.global;
    } else if (statusMessageRef.current) {
      statusMessageRef.current.textContent = "";
    }
  }, [error?.global]);

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
    <div>
      <div aria-live="polite" className="sr-only" ref={statusMessageRef} />
      <label className={fr.cx("fr-text--bold", "fr-text--lg")}>
        Quels sont le motif et la durée de ces absences prolongées&nbsp;?
      </label>
      <p className={fr.cx("fr-mt-2w")}>
        Veuillez créer une ligne différente pour chaque période d&apos;absence
        de plus d&apos;un mois même si vous avez été absent plusieurs fois pour
        le même motif. Les absences de moins d&apos;un mois ne sont pas
        comptabilisées dans ce simulateur, cela peut impacter l&apos;ancienneté
        et donner un montant inférieur.
      </p>

      {messageMotifExample && (
        <Html className={fr.cx("fr-highlight")}>{messageMotifExample}</Html>
      )}

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
          durationError={
            errorsInput[`${index}`] ??
            (error?.absences ? error.absences[index].errorDuration : undefined)
          }
          absenceDateError={
            error?.absences ? error.absences[index].errorDate : undefined
          }
          absence={value}
          informationData={informationData}
          autoFocus={index === 0 && !!error?.global}
          ariaDescribedby={error?.global ? errorMessageId : undefined}
        />
      ))}

      <Button
        onClick={onAddButtonClick}
        priority="secondary"
        className="fr-mt-2w"
        iconId="ri-add-fill"
        iconPosition="right"
      >
        Ajouter une absence
      </Button>

      {error?.global && (
        <div id={errorMessageId}>
          <div className={fr.cx("fr-card", "fr-mt-2w", "fr-alert--error")}>
            <p>{error.global}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbsencePeriods;
