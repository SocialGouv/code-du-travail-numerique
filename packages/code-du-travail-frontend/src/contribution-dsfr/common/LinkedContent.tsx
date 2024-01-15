import { ElasticSearchContribution } from "@socialgouv/cdtn-utils";

type Props = {
  linkedContent: ElasticSearchContribution["linkedContent"];
};

export const LinkedContent = ({ linkedContent }: Props) => {
  return (
    <>
      {linkedContent.length > 0 && (
        <section>
          <h2>Pour aller plus loin</h2>A finaliser...
        </section>
      )}
    </>
  );
};
