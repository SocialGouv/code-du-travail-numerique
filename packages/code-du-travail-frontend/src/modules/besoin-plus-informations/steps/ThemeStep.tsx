import { fr } from "@codegouvfr/react-dsfr";
import Link from "src/modules/common/Link";
import { ListWithArrow } from "src/modules/common/ListWithArrow";
import { SelectQuestion } from "src/modules/outils/common/components/SelectQuestion";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import { ContactStepper } from "../ContactStepper";
import {
  CONTACT_THEMES,
  FREQUENT_QUESTIONS,
  MISSING_THEME_ERROR,
  OFF_SCOPE_ERROR_TITLE,
  OFF_SCOPE_INTRO,
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

// Écran 1 : choix du thème de la question, précédé du rappel de périmètre et
// suivi des questions les plus fréquentes, pour permettre à l'usager de trouver
// sa réponse avant de contacter les services.
export const ThemeStep = ({ selectedTheme, onSelectTheme, error }: Props) => (
  <>
    <ContactStepper current={1} title="Précisez votre question" />
    {error?.kind === "off-scope" ? (
      <AccessibleAlert
        severity="error"
        data-testid="contact-error-result"
        title={OFF_SCOPE_ERROR_TITLE}
        description={
          <>
            <p className={fr.cx("fr-mb-2w")}>{OFF_SCOPE_INTRO}</p>
            <p className={fr.cx("fr-mb-0")}>
              {OFF_SCOPE_THEME_MESSAGES[error.theme]}
            </p>
          </>
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
        label="Quel thème concerne votre question ?"
        placeholder="Sélectionner un thème"
        subLabel="Si vous souhaitez aborder plusieurs sujets, sélectionnez le plus important pour vous."
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
    <div className={fr.cx("fr-mt-4w")}>
      <p className={fr.cx("fr-text--lead", "fr-text--bold", "fr-mb-2w")}>
        {"Questions les plus fréquentes"}
      </p>
      <ListWithArrow
        withSeparators
        items={FREQUENT_QUESTIONS.map((question) => (
          // « fr-raw-link » retire le soulignement que le DSFR applique à tout
          // [href] : dans cette liste, la flèche porte déjà l'affordance.
          <Link
            key={question.href}
            className={fr.cx("fr-raw-link")}
            href={question.href}
          >
            {question.label}
          </Link>
        ))}
      />
    </div>
  </>
);
