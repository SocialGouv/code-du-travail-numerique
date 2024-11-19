import { fr } from "@codegouvfr/react-dsfr";
import Html from "../../common/Html";
import { css } from "../../../styled-system/css";
import { getDisclaimer } from "../helpers";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { DownloadTile } from "./DownloadTile";
import { CopyButton } from "./CopyButton";
import "../../../../public/static/modeles.css";
import { MailElasticDocument } from "@socialgouv/cdtn-types";

export type LetterModelContentProps = Pick<
  MailElasticDocument,
  "date" | "intro" | "title" | "filesize" | "filename" | "html" | "slug"
> & {
  extension: string;
};

export const LetterModelContent = ({
  filename,
  filesize,
  extension,
  html,
  slug,
  title,
  intro,
  date,
}: LetterModelContentProps) => {
  return (
    <>
      <p className={fr.cx("fr-mb-6w")}>Mis à jour le&nbsp;: {date}</p>
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
            extension={extension}
            title={title}
          />
        </div>
        <CopyButton slug={slug} />
      </div>
      <div
        className={`${fr.cx("fr-p-2w", "fr-pt-4w", "fr-mb-6w")} ${border}`}
        id="content-to-copy"
      >
        <Html>{html}</Html>
      </div>
      <Alert
        className={fr.cx("fr-mb-6w")}
        description={getDisclaimer(slug)}
        closable={false}
        severity="info"
        small
      />
      <div className={button}>
        <CopyButton slug={slug} />
      </div>
      <div className={fr.cx("fr-mb-6w")}>
        <DownloadTile
          filename={filename}
          filesize={filesize}
          title={title}
          extension={extension}
        />
      </div>
    </>
  );
};

const border = css({
  border: `1px solid`,
  borderRadius: "8px",
  borderColor: "var(--artwork-minor-blue-cumulus)",
});

const button = css({
  "& > button": {
    md: { w: "auto!" },
  },
});
