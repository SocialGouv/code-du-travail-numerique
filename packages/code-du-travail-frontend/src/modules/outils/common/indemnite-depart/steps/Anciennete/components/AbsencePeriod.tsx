import { Select } from "@codegouvfr/react-dsfr/Select";
import { Input } from "@codegouvfr/react-dsfr/Input";
import React, { useState } from "react";
import { Motif } from "@socialgouv/modeles-social";
import { AbsenceWithKey } from "./AbsencePeriods";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";

type Errors = {
  duration?: string;
  absenceDate?: string;
};

type Props = {
  index: number;
  onSelectMotif: (key: string, motif: string) => void;
  onSetDurationDate: (key: string, value: string) => void;
  onSetAbsenceDate: (key: string, value: string) => void;
  onDeleteAbsence: (key: string) => void;
  motifs: Motif[];
  absence: AbsenceWithKey;
  errors?: Errors;
  showDeleteButton: boolean;
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

  const selectMotif = (key: string, value: string) => {
    const motif = motifs.find((motif) => motif.label === value);
    askAbsenceDate(motif?.startAt && motif.startAt(informationData));
    onSelectMotif(key, value);
  };

  return (
    <div className="fr-mt-4w" key={absence?.key}>
      <p className={fr.cx("fr-text--bold", "fr-mb-1w")}>Absence {index + 1}</p>
      <div
        className="fr-grid-row fr-grid-row--gutters"
        style={{ display: "flex", alignItems: "flex-end" }}
      >
        <div
          className={`fr-col-12 ${shouldAskAbsenceDate ? "fr-col-md-4" : "fr-col-md-6"}`}
        >
          <Select
            label="Motif"
            nativeSelectProps={{
              id: `${index}.type`,
              onChange: (e) => selectMotif(absence.key, e.target.value),
              value: absence?.motif?.label,
            }}
            data-testid={`absence-motif-${index}`}
          >
            {motifs.map(({ label }) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </Select>
        </div>
        <div
          className={`fr-col-12 ${shouldAskAbsenceDate ? "fr-col-md-3" : "fr-col-md-4"}`}
        >
          <Input
            label="Durée (en mois)"
            state={errors?.duration ? "error" : "default"}
            stateRelatedMessage={errors?.duration}
            nativeInputProps={{
              id: `${index}.duration`,
              type: "number",
              onChange: (e) => onSetDurationDate(absence.key, e.target.value),
              value: absence?.durationInMonth ?? "",
            }}
            data-testid={`absence-duree-${index}`}
          />
        </div>
        {shouldAskAbsenceDate && (
          <div className="fr-col-12 fr-col-md-3">
            <Input
              label="Date de début de l'absence"
              state={errors?.absenceDate ? "error" : "default"}
              stateRelatedMessage={errors?.absenceDate}
              nativeInputProps={{
                id: `${index}.dateAbsence`,
                type: "date",
                onChange: (e) => onSetAbsenceDate(absence.key, e.target.value),
                value: absence?.startedAt ?? "",
              }}
              data-testid={`absence-date-${index}`}
            />
          </div>
        )}
        {showDeleteButton && (
          <div className="fr-col-12 fr-col-md-2">
            <Button
              onClick={() => onDeleteAbsence(absence.key)}
              priority="secondary"
              size="small"
              iconPosition="right"
              iconId="ri-delete-bin-line"
            >
              Supprimer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AbsencePeriod;
