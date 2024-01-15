import {
  ElasticSearchContribution,
  getLabelBySource,
} from "@socialgouv/cdtn-utils";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  linkedContent: ElasticSearchContribution["linkedContent"];
};

export const LinkedContent = ({ linkedContent }: Props) => {
  return (
    <>
      {linkedContent.length > 0 && (
        <section>
          <h2>Pour aller plus loin</h2>
          <div className="fr-grid-row">
            {linkedContent.map(
              ({ slug, title, breadcrumbs, source, description }) => {
                let subtitle: string | undefined = undefined;
                if (breadcrumbs.length > 0) {
                  subtitle = breadcrumbs[breadcrumbs.length - 1].label;
                } else {
                  subtitle = getLabelBySource(source);
                }
                return (
                  <div key={slug} className="fr-col-6 fr-pl-1w">
                    <div className="fr-card fr-enlarge-link">
                      <div className="fr-card__body">
                        <div className="fr-card__content">
                          <p
                            className={"fr-text--sm"}
                            style={{
                              textTransform: "uppercase",
                              margin: "1rem 0 0 0",
                              fontWeight: "bold",
                              color:
                                fr.colors.decisions.text.actionHigh.blueCumulus
                                  .default,
                            }}
                          >
                            {subtitle}
                          </p>
                          <h3 className="fr-card__title">
                            <a href="#">{title}</a>
                          </h3>
                          <p className="fr-card__desc">{description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>
      )}
    </>
  );
};
