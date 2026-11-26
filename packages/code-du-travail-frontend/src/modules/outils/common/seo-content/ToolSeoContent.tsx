import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";

import { References } from "../../../common/References";
import { stickySidebarStyles } from "../../../layout/ContainerWithNav";
import { SummaryNavigation } from "../../../layout/SummaryNavigation";
import { JsonLd } from "../../../seo/jsonld/JsonLd";
import { JSON_LD_IDS } from "../../../seo/jsonld/builders";
import { getArticleHref } from "./articles";
import { getToolSeoContent } from "./content";
import { buildToolFaqJsonLd } from "./faq";
import { ToolSeoSlug } from "./types";

type Props = {
  slug: ToolSeoSlug;
};

// Server-rendered editorial text displayed under a simulator (outside the
// widgets) so that the tool pages carry indexable content. Each section is an
// anchored h2 listed in the side summary, which lets search engines show
// "jump to" links to the sections.
export const ToolSeoContent = ({ slug }: Props) => {
  const { sections, references } = getToolSeoContent(slug);

  return (
    <section
      aria-label="En savoir plus"
      className={fr.cx(
        "fr-grid-row",
        "fr-grid-row--gutters",
        "fr-mt-12v",
        "fr-mb-6v"
      )}
    >
      <JsonLd
        id={JSON_LD_IDS.toolFaq}
        data={buildToolFaqJsonLd(sections, `/outils/${slug}`)}
      />
      {/* Same sticky side summary as the other content pages. */}
      <div className={fr.cx("fr-col-12", "fr-col-xl-3")}>
        <div className={stickySidebarStyles}>
          <SummaryNavigation
            sections={sections.map(({ id, title }) => ({ id, label: title }))}
          />
        </div>
      </div>
      <div className={fr.cx("fr-col-12", "fr-col-xl-9")}>
        {sections.map(({ id, title, paragraphs = [], items }) => (
          <div key={id}>
            <h2
              id={id}
              className={`${fr.cx("fr-h3", "fr-mb-3v")} ${headingStyle}`}
            >
              {title}
            </h2>
            {paragraphs.map((text, index) => {
              const isLast = index === paragraphs.length - 1;
              return (
                <p
                  key={index}
                  className={fr.cx(
                    !isLast ? "fr-mb-3v" : items ? "fr-mb-2v" : "fr-mb-6v"
                  )}
                >
                  {text}
                </p>
              );
            })}
            {items && (
              <ul className={fr.cx("fr-mb-6v")}>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {/* Same accordion as on the contribution pages. */}
        <References
          label="Références"
          titleAs="h3"
          links={references.map((article) => ({
            title: `Article ${article}`,
            url: getArticleHref(article),
          }))}
        />
      </div>
    </section>
  );
};

// DSFR headings are sized for article pages: on mobile they dwarf the
// simulator, so step them down. `scroll-margin-top` keeps an anchored heading
// clear of the viewport edge when reached from the summary.
const headingStyle = css({
  scrollMarginTop: "1.5rem",
  mdDown: { fontSize: "1.25rem!", lineHeight: "1.75rem!" },
});
