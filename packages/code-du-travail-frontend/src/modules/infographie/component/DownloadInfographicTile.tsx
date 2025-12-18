import { formatFileSize, toUrl } from "../../utils";
import Image from "next/image";

export const DownloadInfographicTile = ({
  pdfFilename,
  pdfSizeOctet,
  titleAs = "h2",
}: {
  pdfFilename: string;
  pdfSizeOctet: string;
  titleAs?: "h2" | "h3" | "h4" | "h5" | "h6";
}) => {
  const Title = titleAs;
  return (
    <div className="fr-tile fr-tile--download fr-enlarge-link fr-p-3w">
      <div className="fr-tile__body">
        <div className="fr-tile__content">
          <Title className="fr-tile__title fr-text--xl fr-mb-0">
            <a download href={toUrl(pdfFilename)}>
              Télécharger l&apos;infographie
            </a>
          </Title>
          <p className="fr-tile__detail fr-mt-3v">
            Format PDF - {formatFileSize(pdfSizeOctet)}
          </p>
        </div>
      </div>
      <div className="fr-tile__header">
        <div className="">
          <Image
            className="fr-responsive-img"
            src="/static/assets/img/infographies-download.svg"
            alt=""
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
};
