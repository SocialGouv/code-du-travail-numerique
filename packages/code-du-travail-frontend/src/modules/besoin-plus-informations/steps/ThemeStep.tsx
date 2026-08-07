import { fr } from "@codegouvfr/react-dsfr";
import { SelectQuestion } from "src/modules/outils/common/components/SelectQuestion";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import { wideSelectStyle } from "src/modules/outils/common/styles/select";
import { ContactStepper } from "../ContactStepper";
import {
  CONTACT_THEMES,
  MISSING_THEME_ERROR,
  OFF_SCOPE_ERROR_TITLE,
  OFF_SCOPE_THEME_MESSAGES,
  OffScopeThemeKey,
  ThemeKey,
} from "../contactThemes";

// Les deux façons d'échouer à la validation de l'écran : aucun thème choisi, ou
// un thème qui ne relève pas des SRDT. Dans les deux cas le parcours reste ici.
export type ThemeStepError =
  | { kind: "missing-theme" }
  | { kind: "off-scope"; theme: OffScopeThemeKey };

type Props = {
  selectedTheme: ThemeKey | undefined;
  onSelectTheme: (theme: ThemeKey) => void;
  error: ThemeStepError | undefined;
};

// Écran 1 : choix du thème de la question, précédé du rappel de périmètre. Le
// bouton de validation et les questions les plus fréquentes sont rendus après,
// par le parcours.
export const ThemeStep = ({ selectedTheme, onSelectTheme, error }: Props) => (
  <>
    <ContactStepper current={1} title="Précisez votre question" />
    {error?.kind === "off-scope" ? (
      <AccessibleAlert
        severity="error"
        data-testid="contact-error-result"
        title={OFF_SCOPE_ERROR_TITLE}
        description={
          <p className={fr.cx("fr-mb-0")}>
            {OFF_SCOPE_THEME_MESSAGES[error.theme]}
          </p>
        }
      />
    ) : (
      <AccessibleAlert
        severity="info"
        small
        description="Nous répondons uniquement aux questions portant sur le droit du travail."
      />
    )}
    <div className={fr.cx("fr-mt-3w")}>
      <SelectQuestion
        name="contact-theme"
        label="Sur quel thème porte votre question ?"
        placeholder="Sélectionner un thème"
        subLabel="Si vous souhaitez aborder plusieurs sujets, sélectionnez le plus important pour vous."
        // « Question de droit du travail dans le secteur privé » dépasse le
        // plafond de 282px des simulateurs et serait tronqué.
        selectStyle={wideSelectStyle}
        error={
          error?.kind === "off-scope"
            ? `${OFF_SCOPE_ERROR_TITLE}.`
            : error?.kind === "missing-theme"
              ? MISSING_THEME_ERROR
              : undefined
        }
        options={CONTACT_THEMES.map(
          (theme) => [theme.key, theme.label] as [string, string]
        )}
        selectedOption={selectedTheme}
        onChangeSelectedOption={(value) => onSelectTheme(value as ThemeKey)}
      />
    </div>
  </>
);
