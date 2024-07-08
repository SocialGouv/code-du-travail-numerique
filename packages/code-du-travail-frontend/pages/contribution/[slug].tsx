import React from "react";

import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import {
  Breadcrumb,
  ElasticSearchContribution,
  ElasticSearchContributionConventionnelle,
  ElasticSearchContributionGeneric,
} from "@socialgouv/cdtn-types";
import { handleError } from "../../src/lib/fetch-error";
import { SITE_URL } from "../../src/config";
import ContributionGeneric from "../../src/contributions/ContributionGeneric";
import ContributionCC from "../../src/contributions/ContributionCC";
import { ThemeProvider } from "@socialgouv/cdtn-ui";
import { fr } from "@codegouvfr/react-dsfr";
import { Accordion } from "@codegouvfr/react-dsfr/Accordion";
import { withDsfrWrapper } from "../../src/dsfr/AppDsfr";

const fetchQuestion = ({ slug }) =>
  fetch(`${SITE_URL}/api/items/contributions/${slug}`);

type Props = {
  contribution: ElasticSearchContribution;
};

const buildTitleAndDescription = (
  breadcrumbs: Breadcrumb[],
  conventionName: string | undefined,
  title: string,
  description: string
) => {
  if (breadcrumbs && breadcrumbs.length > 0 && conventionName) {
    const titleWithThemeAndCC =
      breadcrumbs[breadcrumbs.length - 1].label + " - " + conventionName;
    return {
      description: title + " " + description,
      title: titleWithThemeAndCC,
    };
  }
  return {
    description,
    title,
  };
};
const getTitleFromNewContrib = (contribution) => {
  if (
    !contribution.ccnShortTitle ||
    contribution.ccnShortTitle.length > 14 ||
    contribution.title.length > 50
  ) {
    return contribution.title;
  }

  return `${contribution.title} - ${contribution.ccnShortTitle}`;
};

function PageContribution(props: Props): React.ReactElement {
  let metas: any = {};

  metas = buildTitleAndDescription(
    props.contribution.breadcrumbs,
    "ccnShortTitle" in props.contribution
      ? props.contribution.ccnShortTitle
      : undefined,
    props.contribution.title,
    props.contribution.description
  );

  return (
    <ThemeProvider>
      <Metas title={metas.title} description={metas.description} />

      <div className={fr.cx("fr-accordions-group")}>
        <Accordion label="Name of the Accordion 1">
          Content of the Accordion 1
        </Accordion>
        <Accordion label="Name of the Accordion 2">
          Content of the Accordion 2
        </Accordion>
      </div>
      <Answer
        title={getTitleFromNewContrib(props.contribution)}
        breadcrumbs={props.contribution.breadcrumbs}
      >
        {props.contribution.idcc === "0000" ? (
          <ContributionGeneric
            contribution={
              props.contribution as ElasticSearchContributionGeneric
            }
          />
        ) : (
          <ContributionCC
            contribution={
              props.contribution as ElasticSearchContributionConventionnelle
            }
          />
        )}
      </Answer>
    </ThemeProvider>
  );
}

export const getServerSideProps = async ({ query }) => {
  const response = await fetchQuestion(query);
  if (!response.ok) {
    return handleError(response);
  }
  const data = await response.json();

  return {
    props: {
      contribution: data._source,
    },
  };
};

export default withDsfrWrapper(PageContribution);
