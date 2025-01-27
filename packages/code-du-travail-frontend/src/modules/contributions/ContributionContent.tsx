import React from "react";

import DisplayContentContribution, {
  ContentSP,
  numberLevel,
} from "./DisplayContentContribution";
import { Contribution } from "./type";

type Props = {
  contribution: Contribution;
  titleLevel: numberLevel;
};

export const ContributionContent = ({ contribution, titleLevel }: Props) => {
  if (contribution.type === "generic-no-cdt") return <></>;

  return (
    <section>
      {contribution.isFicheSP ? (
        <>
          <div>
            <ContentSP raw={contribution.raw} titleLevel={titleLevel - 2} />
          </div>
        </>
      ) : (
        <DisplayContentContribution
          content={contribution.content}
          titleLevel={titleLevel}
        />
      )}
    </section>
  );
};
