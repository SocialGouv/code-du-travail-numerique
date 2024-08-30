import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "../../../styled-system/css";

export const NeedMoreInfo = () => {
  return (
    <div className={mainContainer}>
      <div className={fr.cx("fr-container")}>
        <div className={fr.cx("fr-grid-row")}>
          <div
            className={`${fr.cx(
              "fr-col-md-6",
              "fr-col-offset-md-3",
              "fr-py-6w"
            )}`}
          >
            <h2 className={title}>Besoin de plus d&apos;informations ?</h2>
            <p className={paragraph}>
              Les services du ministère du Travail en région informent,
              conseillent et orientent les salariés et les employeurs du secteur
              privé sur leurs questions en droit du travail.
            </p>
            <div className={buttonContainer}>
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

const mainContainer = css({
  background: "var(--background-alt-blue-france)",
});

const title = css({
  color: "var(--text-action-high-blue-france)",
  fontWeight: 700,
  textAlign: "center",
});

const paragraph = css({
  color: "var(--text-action-high-blue-france)",
});

const buttonContainer = css({
  display: "flex",
  justifyContent: "center",
});
