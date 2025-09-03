import { Select } from "@codegouvfr/react-dsfr/Select";
import { Input } from "@codegouvfr/react-dsfr/Input";
import React, { useState, useRef, useEffect } from "react";
import { Motif } from "@socialgouv/modeles-social";
import { AbsenceWithKey } from "./AbsencePeriods";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";
import {
  preventScroll,
  handleNumberInput,
} from "src/modules/outils/common/utils/input";
import { defaultSelectStyle } from "src/modules/outils/common/styles/select";
import { defaultInputStyle } from "src/modules/outils/common/styles/input";
import { TextQuestion } from "src/modules/outils/common/components";

type Props = {
  index: number;
  onSelectMotif: (key: string, motif: string) => void;
  onSetDurationDate: (key: string, value: string) => void;
  onSetAbsenceDate: (key: string, value: string) => void;
  onDeleteAbsence: (key: string) => void;
  motifs: Motif[];
  absence: AbsenceWithKey;
  durationError?: string;
  absenceDateError?: string;
  showDeleteButton: boolean;
  informationData: Record<string, string | undefined>;
  absenceRef?: React.RefObject<HTMLParagraphElement | null>;
};

const AbsencePeriod = ({
  index,
  onSelectMotif,
  onSetDurationDate,
  onSetAbsenceDate,
  absence,
  motifs,
  durationError,
  absenceDateError,
  showDeleteButton,
  onDeleteAbsence,
  informationData,
  absenceRef,
}: Props) => {
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
      <p
        className={fr.cx("fr-text--bold", "fr-mb-1w")}
        ref={absenceRef}
        tabIndex={-1}
      >
        Absence {index + 1}
      </p>
      <div
        className="fr-grid-row fr-grid-row--gutters"
        style={{ display: "flex", alignItems: "flex-end" }}
      >
        <div className={`fr-col-12 fr-col-md-3`}>
          <Select
            label="Motif"
            nativeSelectProps={
              {
                id: `${index}.type`,
                onChange: (e) => selectMotif(absence.key, e.target.value),
                value: absence?.motif?.label,
                "data-testid": `absence-motif-${index}`,
              } as any
            }
            className={defaultSelectStyle}
          >
            {motifs.map(({ label }) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </Select>
        </div>
        <div className={`fr-col-12 fr-col-md-3`}>
          <Input
            label="Durée (en mois)"
            state={durationError ? "error" : "default"}
            stateRelatedMessage={durationError}
            nativeInputProps={
              {
                id: `${index}.duration`,
                type: "number",
                step: "1",
                pattern: "[0-9]*",
                inputMode: "numeric",
                onChange: (e) =>
                  onSetDurationDate(absence.key, handleNumberInput(e)),
                onWheel: preventScroll,
                value: absence?.durationInMonth ?? "",
                "data-testid": `absence-duree-${index}`,
                "aria-live": "off",
              } as any
            }
            classes={{
              nativeInputOrTextArea: defaultInputStyle,
            }}
          />
        </div>
        {shouldAskAbsenceDate && (
          <div className="fr-col-12 fr-col-md-3">
            <TextQuestion
              label="Date de début de l'absence"
              inputType="date"
              value={absence?.startedAt ?? ""}
              onChange={(value) => {
                onSetAbsenceDate(absence.key, value);
              }}
              error={absenceDateError}
              id={`${index}.dateAbsence`}
              dataTestId={`absence-date-${index}`}
              ariaLive="off"
            />
          </div>
        )}
        {showDeleteButton && (
          <div className="fr-col-12 fr-col-md-3">
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
