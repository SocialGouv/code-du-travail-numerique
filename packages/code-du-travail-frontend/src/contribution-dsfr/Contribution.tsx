import { ElasticSearchContribution } from "@socialgouv/cdtn-utils";
import { AgreementContribution } from "./agreement/AgreementContribution";
import { Box } from "../design-system/base/Box";
import { Container } from "../design-system/layout/Container";
import { Grid, GridCol } from "../design-system/base/Grid";

type Props = {
  contribution: ElasticSearchContribution;
};
export const Contribution = ({ contribution }: Props) => {
  if (contribution.idcc === "0000") {
    return <>Pas implémenté</>;
  } else {
    return <AgreementContribution contribution={contribution} />;
  }
};
