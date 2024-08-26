import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { colors } from "../config/colors";

export const NeedMoreInfo = () => {
  return (
    <div style={styles.mainContainer}>
      <div className={fr.cx("fr-container")}>
        <div className={fr.cx("fr-grid-row")}>
          <div className={fr.cx("fr-col-3")} />
          <div className={fr.cx("fr-btns-group--center", "fr-col-6")}>
            <h2 style={styles.title}>Besoin de plus d&apos;informations ?</h2>
            <p style={{ ...styles.paragraph, textAlign: "left" }}>
              Les services du ministère du Travail en région informent,
              conseillent et orientent les salariés et les employeurs du secteur
              privé sur leurs questions en droit du travail.
            </p>
            <Button
              iconId="fr-icon-discuss-line"
              iconPosition="right"
              priority="tertiary"
            >
              Trouver les services près de chez moi
            </Button>
          </div>
          <div className={fr.cx("fr-col-3")} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    backgroundColor: `${colors.background.lightBlue}`,
    padding: `${fr.spacing("10v")} 0`,
  },
  paragraph: {
    color: `${colors.text.tint}`,
  },
  title: {
    color: `${colors.text.tint}`,
  },
};
