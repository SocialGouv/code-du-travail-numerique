import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb, BreadcrumbProps } from "@codegouvfr/react-dsfr/Breadcrumb";
import { RelatedItems } from "../common/RelatedItems";
import { Share } from "../common/Share";
import { RelatedItem } from "../documents";

type Props = {
  relatedItems: { items: RelatedItem[]; title: string }[];
  title: string;
  description: string;
  children: React.ReactNode;
} & Pick<BreadcrumbProps, "segments">;

export const ContainerMiddle = ({
  children,
  relatedItems,
  title,
  description,
  segments = [],
}: Props) => {
  return (
    <div className={fr.cx("fr-grid-row")}>
      <Breadcrumb
        currentPageLabel={title}
        homeLinkProps={{
          href: "/",
        }}
        segments={segments}
        className={fr.cx("fr-mb-2v")}
      />
      <div>
        {children}
        {/*<Feedback url={router.asPath} />*/}
      </div>

      <RelatedItems relatedItems={relatedItems} className={fr.cx("fr-col-8")} />
      <Share
        title={title}
        metaDescription={description}
        className={fr.cx("fr-col-4")}
      />
    </div>
  );
};
