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
}: Props) => {
  return (
    <div
      id={id}
      className={fr.cx("fr-alert", `fr-alert--${severity}`, className, {
        "fr-alert--sm": small,
      })}
      aria-live={
        severity === "warning"
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
