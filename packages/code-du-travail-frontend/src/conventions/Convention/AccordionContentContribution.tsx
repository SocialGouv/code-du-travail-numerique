import { ElasticSearchConventionCollective } from "@socialgouv/cdtn-utils";
import { ContributionContent } from "../../contributions/ContributionContent";
import { ReferencesJuridiques } from "../../contributions/References";
import { ContributionMessageBlock } from "../../contributions/ContributionMessageBlock";
import { Paragraph } from "@socialgouv/cdtn-ui";

export function AccordionContentContribution(
  contribution: ElasticSearchConventionCollective
) {
  return (
    <>
      <Paragraph italic noMargin>
        {contribution.infoMessage}
      </Paragraph>
      <ContributionContent contribution={contribution}  titleLevel={5}/>
      <ReferencesJuridiques references={contribution.references} />
      <ContributionMessageBlock message={contribution.messageBlock} />
    </>
  );
}
