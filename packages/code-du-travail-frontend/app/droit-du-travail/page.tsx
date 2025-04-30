import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import {
  Introduction,
  Origins,
  Hierarchy,
} from "../../src/modules/droit-du-travail";
import { SITE_URL } from "src/config";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { fr } from "@codegouvfr/react-dsfr";

export const metadata = generateDefaultMetadata({
  title: "Le droit du travail",
  description: "Qu'est-ce que le droit du travail ?",
  path: "/droit-du-travail",
  overrideCanonical: `${SITE_URL}/droit-du-travail`,
});

export default function DroitDuTravail() {
  return (
    <DsfrLayout container="fr-container--fluid">
      <div className={fr.cx("fr-container")}>
        <Breadcrumb
          currentPageLabel={"Le droit du travail"}
          homeLinkProps={{
            href: "/",
          }}
          segments={[]}
          className={fr.cx("fr-mb-2w", "fr-mt-2w")}
        />
        <div
          className={fr.cx(
            "fr-grid-row",
            "fr-grid-row--gutters",
            "fr-grid-row--center",
            "fr-mb-12w",
            "fr-mt-4w"
          )}
        >
          <div className={fr.cx("fr-col-12")}>
            <Introduction />
          </div>
        </div>
      </div>

      <Origins />
      <div className={fr.cx("fr-container")}>
        <div
          className={fr.cx(
            "fr-grid-row",
            "fr-grid-row--gutters",
            "fr-grid-row--center",
            "fr-mb-12w",
            "fr-mt-4w"
          )}
        >
          <div className={fr.cx("fr-col-12")}>
            <Hierarchy />
          </div>
        </div>
      </div>
    </DsfrLayout>
  );
}
