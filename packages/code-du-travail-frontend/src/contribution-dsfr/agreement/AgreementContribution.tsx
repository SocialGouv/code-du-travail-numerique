import { ElasticSearchContribution } from "@socialgouv/cdtn-utils";
import { ContributionContent } from "../common/ContributionContent";
import { LawReferences } from "../common/LawReferences";
import React from "react";
import { ContributionMessageBlock } from "../common/ContributionMessageBlock";
import { LinkedContent } from "../common/LinkedContent";
import { MySituation } from "../common/MySituation";

type Props = {
  contribution: ElasticSearchContribution;
};

export const AgreementContribution = ({ contribution }: Props) => {
  return (
    <>
      <section>
        <MySituation contribution={contribution} />
        <h2 className={"fr-h5"}>
          Votre réponse pour la convention collective{" "}
          {contribution.ccnShortTitle}
        </h2>
        <ContributionContent contribution={contribution} />
        <LawReferences references={contribution.references} />
        <p>
          Consultez les questions-réponses fréquentes pour{" "}
          <a href={`/convention-collective/${contribution.ccnSlug}`}>
            la convention collective {contribution.ccnShortTitle}
          </a>
        </p>
      </section>
      <ContributionMessageBlock message={contribution.messageBlock} />
      <LinkedContent linkedContent={contribution.linkedContent} />
    </>
  );
};
