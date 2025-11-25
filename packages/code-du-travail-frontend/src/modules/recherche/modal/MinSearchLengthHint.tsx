import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";

interface MinSearchLengthHintProps {
  isVisible: boolean;
  minSearchLength: number;
  variant?: "mobile" | "desktop";
}

export const MinSearchLengthHint = ({
  isVisible,
  minSearchLength,
  variant = "desktop",
}: MinSearchLengthHintProps) => {
  if (!isVisible) return null;

  return (
    <div
      className={
        variant === "mobile"
          ? fr.cx("fr-unhidden", "fr-hidden-md", "fr-my-1w")
          : fr.cx("fr-hidden", "fr-unhidden-md")
      }
    >
      <p className={hintTextStyle}>
        Tapez {minSearchLength} caractères ou plus pour lancer une recherche
      </p>
    </div>
  );
};

const hintTextStyle = css({
  color: "var(--text-mention-grey)",
  fontSize: "0.875rem",
  margin: 0,
  textAlign: "center",
  width: "100%",
});
