import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { css } from "@styled-system/css";
import { WIDGET_LOADER_INTEGRITY } from "./widgetIntegrity";

interface IntegrationInstructionsProps {
  parsedUrl: string;
  shortTitle: string;
}

export const IntegrationInstructions = ({
  parsedUrl,
  shortTitle,
}: IntegrationInstructionsProps) => {
  const widgetScriptTag = WIDGET_LOADER_INTEGRITY
    ? `<script src="https://code.travail.gouv.fr/widget-loader.js" integrity="${WIDGET_LOADER_INTEGRITY}" crossorigin="anonymous" defer></script>`
    : `<script src="https://code.travail.gouv.fr/widget.js" defer></script>`;

  return (
    <div className={fr.cx("fr-mb-6w")} data-testid="integration-instructions">
      <h2 className={fr.cx("fr-h3", "fr-mb-3w")}>
        Intégrez ce module à votre site
      </h2>
      <p className={fr.cx("fr-mb-2w")}>
        L&apos;installation se passe en deux temps :
      </p>

      <ol className={fr.cx("fr-mb-4w")}>
        <li className={fr.cx("fr-mb-3w")}>
          <p className={fr.cx("fr-mb-1w")}>
            Ajoutez le code suivant dans la balise <code>&lt;body&gt;</code> de
            votre page&nbsp;:
          </p>
          <pre className={`${fr.cx("fr-alert")} ${preWrap}`}>
            {widgetScriptTag}
          </pre>
        </li>
        <li>
          <p className={fr.cx("fr-mb-1w")}>
            Intégrez le code suivant à l&apos;endroit où vous souhaitez voir le
            module s&apos;afficher&nbsp;:
          </p>
          <pre className={`${fr.cx("fr-alert")} ${preWrap}`}>
            {`<a href="https://code.travail.gouv.fr${parsedUrl}">${shortTitle}</a>`}
          </pre>
        </li>
      </ol>
    </div>
  );
};

const preWrap = css({
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
});
