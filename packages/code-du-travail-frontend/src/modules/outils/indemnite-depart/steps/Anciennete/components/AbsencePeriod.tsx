import { Select } from "@codegouvfr/react-dsfr/Select";
import { Input } from "@codegouvfr/react-dsfr/Input";
import React, { JSX, useState, useEffect, useRef } from "react";
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
import { css } from "@styled-system/css";

interface DataTestIdProps {
  "data-testid"?: string;
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> &
  DataTestIdProps;
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & DataTestIdProps;

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
  absenceRef?: React.RefObject<HTMLElement | null>;
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
}: Props): JSX.Element => {
  const [shouldAskAbsenceDate, askAbsenceDate] = useState(
    absence
      ? absence.motif?.startAt && absence.motif?.startAt(informationData)
      : motifs.length > 0 &&
          motifs[0].startAt &&
          motifs[0].startAt(informationData)
  );

  const durationInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const hasFocusedRef = useRef(false);

  useEffect(() => {
    if (!hasFocusedRef.current) {
      // Priorité: erreur de durée d'abord, puis erreur de date
      if (durationError && durationInputRef.current) {
        durationInputRef.current.focus();
        durationInputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        hasFocusedRef.current = true;
      } else if (absenceDateError && dateInputRef.current) {
        dateInputRef.current.focus();
        dateInputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        hasFocusedRef.current = true;
      }
    }
  }, [durationError, absenceDateError]);

  const selectMotif = (key: string, value: string) => {
    const motif = motifs.find((motif) => motif.label === value);
    askAbsenceDate(motif?.startAt && motif.startAt(informationData));
    onSelectMotif(key, value);
  };

  return (
    <div className="fr-mt-4w" key={absence?.key}>
      <fieldset className={fr.cx("fr-fieldset")}>
        <legend
          className={fr.cx("fr-fieldset__legend", "fr-text--bold", "fr-mb-1w")}
          ref={absenceRef as React.RefObject<HTMLLegendElement>}
          tabIndex={-1}
          id={"absence-period-" + index}
        >
          Absence {index + 1}
        </legend>
        <div className={fr.cx("fr-fieldset__content")}>
          <div className={containerStyle}>
            <div className={itemStyle}>
              <Select
                label="Motif"
                nativeSelectProps={
                  {
                    id: `${index}.type`,
                    onChange: (e) => selectMotif(absence.key, e.target.value),
                    value: absence?.motif?.label,
                    "data-testid": `absence-motif-${index}`,
                  } as SelectProps
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
            <div className={itemStyle}>
              <Input
                label="Durée (en mois)"
                state={durationError ? "error" : "default"}
                stateRelatedMessage={durationError}
                nativeInputProps={
                  {
                    id: `${index}.duration`,
                    type: "number",
                    step: "1",
                    min: "1",
                    pattern: "[0-9]*",
                    inputMode: "numeric",
                    onChange: (e) =>
                      onSetDurationDate(absence.key, handleNumberInput(e)),
                    onWheel: preventScroll,
                    value: absence?.durationInMonth ?? "",
                    "data-testid": `absence-duree-${index}`,
                    "aria-live": "off",
                    ref: durationInputRef,
                  } as InputProps
                }
                classes={{
                  nativeInputOrTextArea: defaultInputStyle,
                }}
              />
            </div>
            {shouldAskAbsenceDate && (
              <div className={itemStyle}>
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
              <div className={itemStyle}>
                <Button
                  onClick={() => onDeleteAbsence(absence.key)}
                  priority="secondary"
                  size="small"
                  iconPosition="right"
                  iconId="ri-delete-bin-line"
                  nativeButtonProps={{
                    title: `Supprimer la période d'absence ${index + 1}`,
                    "aria-label": `Supprimer la période d'absence ${index + 1}`,
                    "aria-describedby": `absence-period-${index}`,
                  }}
                >
                  Supprimer
                </Button>
              </div>
            )}
          </div>
        </div>
      </fieldset>
    </div>
  );
};

const containerStyle = css({
  display: "flex",
  alignItems: "flex-end",
  flexWrap: "wrap",
  gap: "1rem",
});

const itemStyle = css({
  flex: "0 1 auto",
  minWidth: "200px",
});

export default AbsencePeriod;
