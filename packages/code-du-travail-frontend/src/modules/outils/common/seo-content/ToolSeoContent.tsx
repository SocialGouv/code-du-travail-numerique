import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";

import Link from "../../../common/Link";
import { JsonLd } from "../../../seo/jsonld/JsonLd";
import { JSON_LD_IDS } from "../../../seo/jsonld/builders";
import { splitReferences } from "./articles";
import { getToolSeoContent } from "./content";
import { buildToolFaqJsonLd } from "./faq";
import { ToolSeoSlug } from "./types";

const TITLE_ID = "tool-seo-content-title";

type Props = {
  slug: ToolSeoSlug;
};

// Server-rendered editorial text displayed under a simulator (outside the
// widgets) so that the tool pages carry indexable content.
export const ToolSeoContent = ({ slug }: Props) => {
  const content = getToolSeoContent(slug);

  return (
    <section
      aria-labelledby={TITLE_ID}
      className={fr.cx("fr-grid-row", "fr-mt-12v", "fr-mb-6v")}
    >
      <JsonLd
        id={JSON_LD_IDS.toolFaq}
        data={buildToolFaqJsonLd(content, `/outils/${slug}`)}
      />
      <div className={fr.cx("fr-col-12", "fr-col-md-8")}>
        <h2 id={TITLE_ID} className={`${fr.cx("fr-mb-6v")} ${titleStyle}`}>
          {content.title}
        </h2>
        {content.blocks.map(({ lead, text, items }, index) => (
          <div key={index}>
            {lead && (
              <h2 className={`${fr.cx("fr-h5", "fr-mb-2v")} ${leadStyle}`}>
                {lead}
              </h2>
            )}
            {text && (
              <p className={fr.cx(items ? "fr-mb-2v" : "fr-mb-3w")}>{text}</p>
            )}
            {items && (
              <ul className={fr.cx("fr-mb-3w")}>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <p className={fr.cx("fr-text--sm", "fr-mb-0")}>
          Références :{" "}
          {splitReferences(content.references).map((part, index) =>
            part.type === "article" ? (
              <Link key={index} href={part.href}>
                {part.value}
              </Link>
            ) : (
              <span key={index}>{part.value}</span>
            )
          )}
        </p>
      </div>
    </section>
  );
};

// DSFR headings are sized for article pages: on mobile they dwarf the
// simulator, so step them down one level.
const titleStyle = css({
  mdDown: { fontSize: "1.375rem!", lineHeight: "1.75rem!" },
});

const leadStyle = css({
  mdDown: { fontSize: "1.125rem!", lineHeight: "1.5rem!" },
});
