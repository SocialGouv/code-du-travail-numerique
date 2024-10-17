import { fr } from "@codegouvfr/react-dsfr";

export const Container = ({ children }) => {
  return (
    <div
      className={fr.cx(
        "fr-grid-row",
        "fr-grid-row--gutters",
        "fr-grid-row--center",
        "fr-my-4w",
        "fr-my-md-12w"
      )}
    >
      <div className={fr.cx("fr-col-12", "fr-col-md-6")}>{children}</div>
    </div>
  );
};
