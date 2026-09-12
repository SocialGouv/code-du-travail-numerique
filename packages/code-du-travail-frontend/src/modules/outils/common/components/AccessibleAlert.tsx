import { fr, FrCxArg } from "@codegouvfr/react-dsfr";
import { ReactNode } from "react";

type Props = {
  title?: string;
  description: string | ReactNode;
  severity: "error" | "warning" | "info";
  ["data-testid"]?: string;
  id?: string;
  className?: FrCxArg[];
  titleAs?: "h2" | "h3" | "h4" | "h5" | "h6";
  small?: boolean;
  /**
   * Passer `false` quand l'apparition de l'alerte est déjà annoncée ailleurs,
   * par une région live qui, elle, préexiste dans le DOM.
   *
   * Une région live montée en même temps que son contenu n'est pas annoncée de
   * façon fiable : plusieurs couples lecteur d'écran / navigateur ne voient que
   * les changements d'une région déjà présente. En `assertive`, quand elle passe,
   * elle coupe en plus la parole à l'usager en pleine saisie.
   */
  live?: boolean;
};

export const AccessibleAlert = ({
  title,
  description,
  severity,
  ["data-testid"]: dataTestId,
  id,
  className,
  titleAs: TitleTag = "h3",
  small = false,
  live = true,
}: Props) => {
  return (
    <div
      id={id}
      className={fr.cx("fr-alert", `fr-alert--${severity}`, className, {
        "fr-alert--sm": small,
      })}
      aria-live={
        !live
          ? "off"
          : severity === "warning"
            ? "polite"
            : severity === "error"
              ? "assertive"
              : "off"
      }
      aria-atomic="true"
      data-testid={dataTestId}
    >
      {title && (
        <TitleTag className={fr.cx("fr-alert__title")}>{title}</TitleTag>
      )}
      {typeof description === "string" ? <p>{description}</p> : description}
    </div>
  );
};
