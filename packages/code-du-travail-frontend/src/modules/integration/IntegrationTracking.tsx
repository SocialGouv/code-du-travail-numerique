import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { Widget } from "./types";
import { css } from "@styled-system/css";

interface IntegrationTrackingProps {
  messages: NonNullable<Widget["messages"]>;
  id: string;
}

export const IntegrationTracking = ({
  messages,
  id,
}: IntegrationTrackingProps) => {
  return (
    <div className={fr.cx("fr-mb-6w")} data-testid="integration-tracking">
      <h3 className={fr.cx("fr-h4", "fr-mb-3w")}>Messages</h3>
      <p className={fr.cx("fr-mb-2w")}>
        Il est possible d&apos;effectuer du tracking sur nos liens et boutons en
        interceptant les messages envoyés par le widget avec le code qui suit :
      </p>
      <pre className={`${fr.cx("fr-alert")} ${preWrap}`}>
        {`window.addEventListener(
          "message",
          ({ data, source }) => {
            const iframe = document.getElementById('cdtn-iframe-${id}');
            if (
              source === iframe.contentWindow
              ${Object.keys(messages)
                .map((key) => `&& data.kind === "${key}"`)
                .join("\n      ")}
            ) {
              ${Object.keys(messages)
                .map((key) =>
                  messages[key]
                    .map(({ name, description, extra }) => {
                      let extraString = "";
                      if (extra) {
                        extraString = Object.entries(extra)
                          .map(
                            ([key, value]) =>
                              `\n      data.extra.${key} // ${value}`
                          )
                          .join("");
                      }
                      return `data.name === '${name}' // ${description}${extraString}`;
                    })
                    .join("\n      ")
                )
                .join("\n      ")}
            }
          }
        );`}
      </pre>
    </div>
  );
};

const preWrap = css({
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
});
