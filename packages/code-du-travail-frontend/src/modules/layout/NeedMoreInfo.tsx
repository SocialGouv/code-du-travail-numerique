import variables from "./NeedMoreInfo.module.scss";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";

export const NeedMoreInfo = () => {
  return (
    <div className={`${variables["main-container"]}`}>
      <div className={fr.cx("fr-container")}>
        <div className={fr.cx("fr-grid-row")}>
          <div
            className={`${fr.cx(
              "fr-col-md-6",
              "fr-col-offset-md-3",
              "fr-py-6w"
            )}`}
          >
            <h2 className={variables.title}>
              Besoin de plus d&apos;informations ?
            </h2>
            <p className={variables.paragraph}>
              Les services du ministère du Travail en région informent,
              conseillent et orientent les salariés et les employeurs du secteur
              privé sur leurs questions en droit du travail.
            </p>
            <div className={variables["button-container"]}>
              <Button
                iconId="fr-icon-chat-3-line"
                iconPosition="right"
                priority="tertiary"
              >
                Trouver les services près de chez moi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
