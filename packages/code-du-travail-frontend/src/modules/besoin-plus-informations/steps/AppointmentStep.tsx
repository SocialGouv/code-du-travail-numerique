import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { SelectQuestion } from "src/modules/outils/common/components/SelectQuestion";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import { wideSelectStyle } from "src/modules/outils/common/styles/select";
import { ContactStepper } from "../ContactStepper";
import { SrdtCaveats } from "../SrdtCaveats";
import {
  formatDepartement,
  getOpenDepartements,
  getOpenRdvRegionByDepartement,
  RDV_REDIRECT_MESSAGE,
} from "../contactChannels";
import { useNeedMoreInfoEvents } from "../tracking";

type Props = {
  selectedDepartement: string | undefined;
  onSelectDepartement: (code: string) => void;
};

const RDV_LINK_LABEL = "Prendre rendez-vous";

// Écran 3 (branche rendez-vous) : choix du département parmi ceux des régions
// ouvertes. Le lien de sortie (AppointmentLink) est rendu par le parcours, dans
// la barre de navigation, à la place de « Suivant ».
export const AppointmentStep = ({
  selectedDepartement,
  onSelectDepartement,
}: Props) => {
  const region =
    selectedDepartement !== undefined
      ? getOpenRdvRegionByDepartement(selectedDepartement)
      : undefined;

  return (
    <div data-testid="contact-rdv-result">
      <ContactStepper current={3} title="Prendre rendez-vous" />
      <SelectQuestion
        name="contact-departement"
        label="Quel est votre département ?"
        placeholder="Sélectionnez votre département"
        selectStyle={wideSelectStyle}
        options={getOpenDepartements().map(
          (departement) =>
            [departement.code, formatDepartement(departement)] as [
              string,
              string,
            ]
        )}
        selectedOption={selectedDepartement}
        onChangeSelectedOption={onSelectDepartement}
      />
      {/* Le rappel des limites de compétence est visible dès l'arrivée sur
          l'écran, avant même le choix du département. */}
      <div className={fr.cx("fr-mt-3w")}>
        <SrdtCaveats />
      </div>
      {/* Même raison qu'à l'écran 2 : la zone vivante existe avant son contenu. */}
      <div aria-live="polite">
        {region && (
          <div className={fr.cx("fr-mt-2w")}>
            <AccessibleAlert
              severity="info"
              small
              description={RDV_REDIRECT_MESSAGE}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Lien sortant vers la page de prise de rendez-vous de la région, au style de
// bouton : la suite du parcours se passe sur un site externe, un bouton
// « Suivant » le dirait moins honnêtement. Rien tant qu'aucun département
// ouvert n'est choisi.
export const AppointmentLink = ({
  selectedDepartement,
  className,
}: {
  selectedDepartement: string | undefined;
  className?: string;
}) => {
  const { emitClickRdv } = useNeedMoreInfoEvents();
  const region =
    selectedDepartement !== undefined
      ? getOpenRdvRegionByDepartement(selectedDepartement)
      : undefined;

  if (!region || selectedDepartement === undefined) return null;

  return (
    <Button
      className={className}
      priority="primary"
      iconId="fr-icon-external-link-line"
      iconPosition="right"
      linkProps={{
        href: region.url,
        target: "_blank",
        rel: "noopener noreferrer",
        title: `${RDV_LINK_LABEL} - nouvelle fenêtre`,
        onClick: () => emitClickRdv(selectedDepartement),
      }}
    >
      {RDV_LINK_LABEL}
    </Button>
  );
};
