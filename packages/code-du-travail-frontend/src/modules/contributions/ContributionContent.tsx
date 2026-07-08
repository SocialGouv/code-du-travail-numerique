"use client";
import React from "react";

import { Contribution } from "./type";
import DisplayContent, { numberLevel } from "../common/DisplayContent";
import { ContentSP } from "./ContentSP";
import { useContributionTracking } from "./tracking";

type Props = {
  contribution: Contribution;
  titleLevel: numberLevel;
};

export const ContributionContent = ({ contribution, titleLevel }: Props) => {
  const { emitClickTableFullscreen } = useContributionTracking();
  return (
    <section>
      {contribution.isFicheSP ? (
        <ContentSP raw={contribution.raw} titleLevel={titleLevel - 2} />
      ) : (
        <DisplayContent
          content={contribution.content}
          titleLevel={titleLevel}
          extra={{
            infographics: contribution.infographics ?? [],
            smicHourly: contribution.smicValue,
            onTableFullscreen: () =>
              emitClickTableFullscreen(contribution.slug),
          }}
        />
      )}
    </section>
  );
};
