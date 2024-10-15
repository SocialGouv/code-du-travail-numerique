"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Html from "../../common/Html";
import { css } from "../../../../styled-system/css";
import { getDisclaimer } from "../helpers";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { DownloadTile } from "./DownloadTile";
import { CopyButton } from "./CopyButton";

export interface LetterModelProps {
  date: string;
  intro: string;
  title: string;
  filesize: any;
  filename: string;
  slug: string;
  html: any;
}

export const LetterModelContent = ({
  filename,
  filesize,
  html,
  slug,
  title,
  intro,
  date,
}: LetterModelProps) => {
  return (
    <div className={maxWidth}>
      <h1 className={fr.cx("fr-mb-6w")}>{title}</h1>
      <p className={fr.cx("fr-mb-6w")}>Mise à jour le&nbsp;: {date}</p>
      {intro && (
        <div className={`${fr.cx("fr-highlight", "fr-mb-6w")}`}>
          <Html>{intro}</Html>
        </div>
      )}
      <div className={fr.cx("fr-hidden-md")}>
        <div className={fr.cx("fr-mb-6w")}>
          <DownloadTile
            filename={filename}
            filesize={filesize}
            title={title}
          ></DownloadTile>
        </div>
        <CopyButton />
      </div>
      <div
        className={`${fr.cx("fr-p-2w")} ${fr.cx("fr-mb-6w")} ${border}`}
        id="content-to-copy"
      >
        <Html>{html}</Html>
      </div>
      <div className={fr.cx("fr-col-12", "fr-col-md-10")}>
        <Alert
          className={fr.cx("fr-mb-6w")}
          description={getDisclaimer(slug)}
          closable={false}
          severity="info"
          small
        />
      </div>

      <CopyButton />
      <div className={fr.cx("fr-mb-6w")}>
        <DownloadTile
          filename={filename}
          filesize={filesize}
          title={title}
        ></DownloadTile>
      </div>
    </div>
  );
};

const border = css({
  border: `1px solid`,
  borderRadius: "8px",
  borderColor: "var(--artwork-minor-blue-cumulus)",
});
const maxWidth = css({
  maxWidth: "720px",
  m: "auto"
});
