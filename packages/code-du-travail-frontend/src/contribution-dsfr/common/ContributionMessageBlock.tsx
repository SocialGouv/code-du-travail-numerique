import { ElasticSearchContribution } from "@socialgouv/cdtn-utils";
import Html from "../../common/Html";
import CallOut from "@codegouvfr/react-dsfr/CallOut";

type Props = {
  message: ElasticSearchContribution["messageBlock"];
};

export const ContributionMessageBlock = ({ message }: Props) => {
  if (!message) {
    return <></>;
  }
  return (
    <section>
      <CallOut iconId="ri-information-line" title="Attention">
        <Html>{message}</Html>
      </CallOut>
    </section>
  );
};
