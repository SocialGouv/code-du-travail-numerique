import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";

export const NeedMoreInfo = () => {
  return (
    <div style={styles.mainContainer}>
      <div className={fr.cx("fr-container")}>
        <div className={fr.cx("fr-grid-row")}>
          <div className={fr.cx("fr-grid-row--center")}>
            <h2 style={styles.title}>Besoin de plus d&apos;informations ?</h2>
            <p style={{ ...styles.paragraph, textAlign: "left" }}>
              Les services du ministère du Travail en région informent,
              conseillent et orientent les salariés et les employeurs du secteur
              privé sur leurs questions en droit du travail.
            </p>
            <Button
              iconId="fr-icon-discuss-fill"
              iconPosition="right"
              priority="tertiary"
            >
              Trouver les services près de chez moi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    // backgroundColor: `${colors.background.lightBlue}`,
    padding: `${fr.spacing("10v")} 0`,
  },
  paragraph: {
    // color: `${colors.text.tint}`,
  },
  title: {
    // color: `${colors.text.tint}`,
  },
};
