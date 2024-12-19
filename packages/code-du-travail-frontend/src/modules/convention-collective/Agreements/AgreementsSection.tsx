import { fr } from "@codegouvfr/react-dsfr";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { ListWithArrow } from "../../common/ListWithArrow";
import Link from "../../common/Link";
import { ElasticAgreement } from "@socialgouv/cdtn-types";

type Agreement = Pick<ElasticAgreement, "shortTitle" | "slug">;
type Props = {
  letter: string;
  agreements: Agreement[];
};

export const AgreementsSection = ({ letter, agreements }: Props) => {
  return (
    <>
      <div id={letter} className={fr.cx("fr-h3")}>
        {letter}
      </div>
      <ListWithArrow
        items={agreements.map(({ shortTitle, slug }) => {
          return (
            <Link key={slug} href={`/${getRouteBySource(SOURCES.CCN)}/${slug}`}>
              {shortTitle}
            </Link>
          );
        })}
      />
    </>
  );
};
