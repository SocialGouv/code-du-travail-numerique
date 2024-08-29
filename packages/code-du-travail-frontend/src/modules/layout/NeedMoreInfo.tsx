import variables from "./NeedMoreInfo.module.scss";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";

export const NeedMoreInfo = () => {
  return (
    <div className={variables["main-container"]}>
      <div
        className={`${fr.cx("fr-container", "fr-py-6w")} ${
          variables["center-container"]
        }`}
      >
        <h2 className={`${variables.title}`}>
          Besoin de plus d&apos;informations ?
        </h2>
        <p className={`${variables.paragraph}`}>
          Les services du ministère du Travail en région informent, conseillent
          et orientent les salariés et les employeurs du secteur privé sur leurs
          questions en droit du travail.
        </p>
        <Button
          iconId="fr-icon-chat-3-fill"
          iconPosition="right"
          priority="tertiary"
        >
          Trouver les services près de chez moi
        </Button>
      </div>
    </div>
  );
};
