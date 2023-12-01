import { ElasticSearchConventionCollective } from "@socialgouv/cdtn-utils";
import { ContributionContent } from "../../contributions/ContributionContent";
import { ReferencesJuridiques } from "../../contributions/References";
import { ContributionMessageBlock } from "../../contributions/ContributionMessageBlock";

export function AccordionContentContribution(
  contribution: ElasticSearchConventionCollective
) {
  return (
    <>
      <p>{contribution.infoMessage}</p>
      <ContributionContent contribution={contribution} />
      <ReferencesJuridiques references={contribution.references} />
      <ContributionMessageBlock message={contribution.messageBlock} />
    </>
  );
}
