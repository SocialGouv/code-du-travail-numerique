import { ElasticSearchContributionWithInfoMessage } from "@socialgouv/cdtn-types";
import { ContributionContent } from "../../contributions/ContributionContent";
import { ReferencesJuridiques } from "../../contributions/References";
import { ContributionMessageBlock } from "../../contributions/ContributionMessageBlock";
import { Paragraph } from "@socialgouv/cdtn-ui";

export function AccordionContentContribution(
  contribution: ElasticSearchContributionWithInfoMessage
) {
  const unextendedCC = ["0029", "0413", "2420"];
  const isUnextendedCC = unextendedCC.includes(contribution.idcc);
  return (
    <>
      <Paragraph italic noMargin>
        {!isUnextendedCC
          ? contribution.infoMessage
          : "Les informations ci-dessous sont issues du code du travail car les dispositions de la convention collective ne sont pas étendues"}
      </Paragraph>
      <ContributionContent contribution={contribution} titleLevel={5} />
      <ReferencesJuridiques references={contribution.references} />
      <ContributionMessageBlock message={contribution.messageBlock} />
    </>
  );
}
