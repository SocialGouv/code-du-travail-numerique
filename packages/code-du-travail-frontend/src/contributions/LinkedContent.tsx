import { Grid, theme, Section, Title } from "@socialgouv/cdtn-ui";
import { ListLink } from "../search/SearchResults/Results";
import { ElasticSearchContribution } from "@socialgouv/cdtn-types";

type Props = {
  linkedContent: ElasticSearchContribution["linkedContent"];
};

export const LinkedContent = ({ linkedContent }: Props) => {
  return (
    <>
      {linkedContent.length > 0 && (
        <Section>
          <Title shift={spacings.xmedium} variant="secondary">
            Pour aller plus loin
          </Title>
          <Grid columns={2}>
            {linkedContent.map((item) => {
              return (
                <ListLink
                  item={item}
                  key={item.slug}
                  titleTagType="h3"
                  hideAction
                />
              );
            })}
          </Grid>
        </Section>
      )}
    </>
  );
};

const { spacings } = theme;
