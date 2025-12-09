import { fr } from "@codegouvfr/react-dsfr";
import { hintTextStyle } from "./SearchFeedback";

interface MinSearchLengthHintProps {
  isVisible: boolean;
  minSearchLength: number;
  variant?: "mobile" | "desktop";
  paragraphId: string;
}

export const MinSearchLengthHint = ({
  isVisible,
  minSearchLength,
  variant = "desktop",
  paragraphId,
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
      <p id={paragraphId} className={hintTextStyle}>
        Tapez {minSearchLength} caractères ou plus pour lancer une recherche
      </p>
    </div>
  );
};
