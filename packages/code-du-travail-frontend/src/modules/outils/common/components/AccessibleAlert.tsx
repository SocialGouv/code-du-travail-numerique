import { fr } from "@codegouvfr/react-dsfr";
import { ReactNode, useEffect, useRef } from "react";

type Props = {
  title?: string;
  description: string | ReactNode;
  severity: "error" | "warning" | "info";
  autoFocus?: boolean;
  ["data-testid"]?: string;
  id?: string;
};

export const AccessibleAlert = ({
  title,
  description,
  severity,
  autoFocus,
  ["data-testid"]: dataTestId,
  id,
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
      id={id}
      className={fr.cx("fr-alert", `fr-alert--${severity}`)}
      tabIndex={autoFocus ? -1 : undefined}
      aria-live="assertive"
      aria-atomic="true"
      // role="alert" pas utile si le aria-live="assertive" et aria-atomic="true" est présent
      data-testid={dataTestId}
    >
      <h3 className={fr.cx("fr-alert__title")}>{title}</h3>
      {typeof description === "string" ? <p>{description}</p> : description}
    </div>
  );
};
