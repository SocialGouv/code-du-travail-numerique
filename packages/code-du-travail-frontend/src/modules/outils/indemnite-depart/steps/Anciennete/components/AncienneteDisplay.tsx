import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";

export const AncienneteDisplay = ({ anciennete }: { anciennete?: number }) => {
  const parts: string[] = [];
  if (!anciennete) {
    parts.push("0 mois");
  } else {
    const annees = Math.floor(anciennete);
    const mois = Math.round((anciennete - annees) * 12);
    if (annees > 0) {
      parts.push(`${annees} an${annees > 1 ? "s" : ""}`);
    }
    if (mois > 0) {
      parts.push(`${mois} mois`);
    }
  }

  return (
    <p
      className={fr.cx("fr-text--lead", "fr-text--bold", "fr-mt-3w")}
      data-testid="anciennete-estimee"
    >
      <span
        className={`${fr.cx("fr-icon-arrow-right-line", "fr-mr-2v")} ${iconBlueFrance}`}
        aria-hidden="true"
      />
      Ancienneté estimée : {parts.join(" et ")}
    </p>
  );
};

const iconBlueFrance = css({
  color: "var(--text-title-blue-france)",
});
