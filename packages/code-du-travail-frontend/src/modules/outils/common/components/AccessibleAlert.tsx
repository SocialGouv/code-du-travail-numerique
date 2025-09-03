import { fr } from "@codegouvfr/react-dsfr";
import { ReactNode, useEffect, useRef } from "react";

type Props = {
  title?: string;
  description: string | ReactNode;
  severity: "error" | "warning" | "info";
  autoFocus?: boolean;
  ["data-testid"]?: string;
};

export const AccessibleAlert = ({
  title,
  description,
  severity,
  autoFocus,
  ["data-testid"]: dataTestId,
}: Props) => {
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus && alertRef.current) {
      alertRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div
      ref={alertRef}
      className={fr.cx("fr-alert", `fr-alert--${severity}`)}
      tabIndex={autoFocus ? -1 : undefined}
      aria-live="polite"
      aria-atomic="true"
      data-testid={dataTestId}
    >
      <h3 className={fr.cx("fr-alert__title")}>{title}</h3>
      {typeof description === "string" ? <p>{description}</p> : description}
    </div>
  );
};
