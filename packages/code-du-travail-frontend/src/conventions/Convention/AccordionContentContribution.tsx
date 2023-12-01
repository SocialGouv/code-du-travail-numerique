import {
  ElasticSearchContributionGeneric,
  ElasticSearchContributionConventionnelle,
} from "@socialgouv/cdtn-utils";
import { ContributionContent } from "../../contributions/ContributionContent";
import { ReferencesJuridiques } from "../../contributions/References";
import { ContributionMessageBlock } from "../../contributions/ContributionMessageBlock";

export function AccordionContentContribution(
  contribution:
    | ElasticSearchContributionGeneric
    | ElasticSearchContributionConventionnelle
) {
  return (
    <>
      <ContributionContent contribution={contribution} />
      <ReferencesJuridiques references={contribution.references} />
      <ContributionMessageBlock message={contribution.messageBlock} />
    </>
  );
}
