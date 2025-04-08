import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  children: React.ReactNode;
};

export const Container = ({ children }: Props) => {
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
