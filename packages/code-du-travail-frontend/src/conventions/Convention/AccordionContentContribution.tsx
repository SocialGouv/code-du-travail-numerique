import {
  ElasticSearchContributionGeneric,
  ElasticSearchContributionConventionnelle,
} from "@socialgouv/cdtn-utils";
import { ContributionContent } from "../../contributions/ContributionContent";
import { ReferencesJuridiques } from "../../contributions/References";
import { AgreementsNotes } from "./AgreementsNotes";
import { removeCCNumberFromSlug } from "../../contributions/utils";

export function AccordionContentContribution(
  contrib:
    | ElasticSearchContributionGeneric
    | ElasticSearchContributionConventionnelle
) {
  return (
    <>
      <ContributionContent contribution={contrib} />
      <ReferencesJuridiques references={contrib.references} />
      <AgreementsNotes
        link={`/contribution/${removeCCNumberFromSlug(contrib.slug)}`}
        containerStyle={{ marginTop: "15px" }}
      />
    </>
  );
}
