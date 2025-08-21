import {
  EditorialContentPart,
  EditorialContentType,
} from "@socialgouv/cdtn-types/build/hasura/editorial-content";
import { Infographic } from "./components/Infographic";
import DisplayContent from "../../common/DisplayContent";

type Props = {
  parts: EditorialContentPart[];
};

export const ContentPart = ({ parts }: Props) => {
  return parts.map((part) => {
    switch (part.type) {
      case EditorialContentType.markdown:
        return <DisplayContent titleLevel={3} content={part.html} />;
      case EditorialContentType.graphic:
        return (
          <Infographic
            imgUrl={part.imgUrl}
            titleLevel={3}
            pdfUrl={part.fileUrl}
            pdfSize={part.size}
            altText={part.altText}
            descriptionHtml={part.html}
          />
        );
      case EditorialContentType.content:
        return <></>;
    }
  });
};
