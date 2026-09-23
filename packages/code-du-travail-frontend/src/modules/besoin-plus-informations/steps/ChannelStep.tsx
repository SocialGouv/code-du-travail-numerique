import { fr } from "@codegouvfr/react-dsfr";
import { RadioQuestion } from "src/modules/outils/common/components/RadioQuestion";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import { ContactStepper } from "../ContactStepper";
import {
  CHANNEL_HELP_FOOTER,
  CHANNEL_HELP_ITEMS,
  CHANNEL_HELP_TITLE,
  ChannelKey,
  CONTACT_CHANNELS,
  formatRegionList,
  getOpenRdvRegions,
  MISSING_CHANNEL_ERROR,
} from "../contactChannels";

type Props = {
  selectedChannel: ChannelKey | undefined;
  onSelectChannel: (channel: ChannelKey) => void;
  error: boolean;
};

// Titre de l'étape 3 tel qu'annoncé par « Étape suivante » : il dépend du
// canal choisi. Avant tout choix, on annonce le téléphone (canal par défaut du
// parcours, et seul canal pour les régions sans rendez-vous).
export const nextStepTitleForChannel = (channel: ChannelKey | undefined) =>
  channel === "rdv" ? "Prendre rendez-vous" : "Par téléphone";

// Écran 2 : choix du moyen de contact. Le message des régions ouvertes
// n'apparaît qu'à la sélection de « Rendez-vous sur place » : la liste des
// départements de l'écran suivant se limite à ces régions, l'usager doit le
// savoir avant de s'y engager.
export const ChannelStep = ({
  selectedChannel,
  onSelectChannel,
  error,
}: Props) => (
  <>
    <ContactStepper
      current={2}
      title="Choisir votre moyen de contact"
      nextStepTitle={nextStepTitleForChannel(selectedChannel)}
    />
    <RadioQuestion
      name="contact-channel"
      label="Par quel moyen souhaitez-vous nous contacter ?"
      questions={CONTACT_CHANNELS.map((channel) => ({
        id: `contact-channel-${channel.key}`,
        value: channel.key,
        label: channel.label,
        testId: `contact-channel-${channel.key}`,
      }))}
      selectedOption={selectedChannel}
      onChangeSelectedOption={(value) => onSelectChannel(value as ChannelKey)}
      error={error ? MISSING_CHANNEL_ERROR : undefined}
    />
    {/* Message de formulaire DSFR (« fr-message--info ») sous le groupe de
        radios. La zone `role="status"` est rendue en permanence : une région
        vivante créée en même temps que son contenu n'est pas annoncée par les
        lecteurs d'écran (RGAA 7.5). Le groupe de messages du fieldset DSFR ne
        porte pas d'`aria-live` hors erreur, d'où ce conteneur dédié. */}
    <div role="status" className={fr.cx("fr-mb-3w")}>
      {selectedChannel === "rdv" && (
        <p
          className={fr.cx("fr-message", "fr-message--info", "fr-mt-n2w")}
          data-testid="contact-rdv-regions"
        >
          {`La prise de rendez-vous est disponible dans les régions suivantes : ${formatRegionList(getOpenRdvRegions())}. Si vous n'êtes pas dans l'une de ces régions, contactez nos services par téléphone.`}
        </p>
      )}
    </div>
    <AccessibleAlert
      severity="info"
      title={CHANNEL_HELP_TITLE}
      description={
        <>
          <ul className={fr.cx("fr-mb-1w")}>
            {CHANNEL_HELP_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={fr.cx("fr-mb-0", "fr-text--bold")}>
            {CHANNEL_HELP_FOOTER}
          </p>
        </>
      }
    />
  </>
);
