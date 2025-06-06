import ImageWrapper from "../../../common/ImageWrapper";
import { toUrl } from "../../../../lib";
import { AccordionWithAnchor } from "src/modules/common/AccordionWithAnchor";
import { fr } from "@codegouvfr/react-dsfr";
import { DownloadTile } from "../../components/DownloadTile";
import DisplayContent, { numberLevel } from "../../../common/DisplayContent";

export type Props = {
  titleLevel: numberLevel;
  imgUrl: string;
  altText: string;
  pdfUrl: string;
  pdfSize: string;
  descriptionHtml: string;
};

export const Infographic = ({
  imgUrl,
  titleLevel,
  pdfSize,
  pdfUrl,
  descriptionHtml,
}: Props) => {
  return (
    <div>
      <ImageWrapper
        altText={""}
        src={toUrl(imgUrl)}
        className={fr.cx("fr-mb-3w")}
      />
      <AccordionWithAnchor
        className={fr.cx("fr-mb-3w")}
        titleAs={`h${titleLevel}`}
        items={[
          {
            id: `infographic-description-${Math.random().toString(36).substring(2, 15)}`,
            title: "Lire la description",
            content: (
              <DisplayContent
                titleLevel={
                  (titleLevel >= 6 ? 6 : titleLevel + 1) as numberLevel
                }
                content={descriptionHtml}
              />
            ),
          },
        ]}
      />
      <DownloadTile filename={pdfUrl} filesize={pdfSize} />
    </div>
  );
};
