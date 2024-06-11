import {
  Alert,
  Heading,
  icons,
  IconStripe,
  Section,
  theme,
} from "@socialgouv/cdtn-ui";
import { ElasticSearchContribution } from "@socialgouv/cdtn-types";
import styled from "styled-components";
import Html from "../common/Html";

type Props = {
  message: ElasticSearchContribution["messageBlock"];
};

export const ContributionMessageBlock = ({ message }: Props) => {
  if (!message) {
    return <></>;
  }
  return (
    <StyledSection>
      <Alert>
        <Heading as="div" variant="primary">
          <IconStripe icon={icons.Warning}>Attention</IconStripe>
        </Heading>
        <Html>{message}</Html>
      </Alert>
    </StyledSection>
  );
};

const { spacings } = theme;

const StyledSection = styled(Section)`
  margin-top: ${spacings.base};
  padding-bottom: 0;

  > div {
    margin-bottom: 0;
  }
`;
