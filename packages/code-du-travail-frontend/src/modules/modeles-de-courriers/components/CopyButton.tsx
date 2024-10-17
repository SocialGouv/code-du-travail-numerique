import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { useState } from "react";
import { css } from "../../../../styled-system/css";

export const CopyButton = () => {
  const [isCopied, setCopied] = useState(false);

  const copyContent = () => {
    const elementsByClassName = document?.getElementById("content-to-copy");
    if (elementsByClassName) {
      navigator?.clipboard?.writeText(elementsByClassName.innerText);
      setCopied(true);
    }
  };

  return (
    <>
      <Button
        className={w100}
        iconId="fr-icon-clipboard-line"
        onClick={copyContent}
        priority="secondary"
      >
        Copier le modèle
      </Button>
      <div className={`${fr.cx("fr-py-2v")} ${fixHeight}`}>
        {isCopied && (
          <div>
            <p>
              <span
                className={`${fr.cx("ri-check-line")} ${css({
                  color: "var(--text-default-success)",
                })}`}
                aria-hidden="true"
              />
              Modèle copié
            </p>
          </div>
        )}
      </div>
    </>
  );
};

const w100 = css({
  w: "100%!",
  justifyContent: "center",
});

const fixHeight = css({
  h: "48px",
});
