import Link from "next/link";
import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { css } from "@styled-system/css";
import { WhatIsNewMonth, WhatIsNewCategory } from "./queries";

type Props = {
  month: WhatIsNewMonth;
};

const weekCard = css({
  backgroundColor: "#f6f6f6",
  borderRadius: "0.5rem",
  padding: "1.5rem",
  marginBottom: "2rem",
});

const badgesGroup = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  marginBottom: "1rem",
});

const weekTitle = css({
  marginBottom: "0.5rem",
});

const itemList = css({
  margin: 0,
  paddingLeft: "1.25rem",
});

const noUpdateText = css({
  margin: 0,
});

const getBadgeSeverity = (kind: string) => {
  switch (kind) {
    case "mise-a-jour-fonctionnelle":
      return "new";
    case "evolution-juridique":
    default:
      return "info";
  }
};

const CategoryBlock = ({ category }: { category: WhatIsNewCategory }) => (
  <article className={weekCard}>
    <div className={badgesGroup}>
      <Badge severity={getBadgeSeverity(category.kind)} small as="span">
        {category.label}
      </Badge>
    </div>

    <ul className={itemList}>
      {category.items.map((item) => (
        <li key={item.title}>
          {item.href ? (
            <Link href={item.href} className={fr.cx("fr-link")}>
              <strong>{item.title}</strong>
            </Link>
          ) : (
            <strong>{item.title}</strong>
          )}
          {item.description && <div>{item.description}</div>}
        </li>
      ))}
    </ul>
  </article>
);

export const MonthContent = ({ month }: Props) => (
  <section aria-labelledby="quoi-de-neuf-month-title">
    <h2 id="quoi-de-neuf-month-title" className={fr.cx("fr-h3", "fr-mb-4w")}>
      {month.label}
    </h2>

    {month.weeks.map((week) => {
      const categories = week.categories || [];

      const functional = categories.find(
        (c) => c.kind === "mise-a-jour-fonctionnelle"
      );
      const legal = categories.find((c) => c.kind === "evolution-juridique");

      return (
        <div key={week.id}>
          <h3 className={`${fr.cx("fr-h5")} ${weekTitle}`}>{week.label}</h3>

          {!week.hasUpdates ? (
            <p className={noUpdateText}>Aucune nouveauté cette semaine.</p>
          ) : (
            <>
              {functional && <CategoryBlock category={functional} />}
              {legal && <CategoryBlock category={legal} />}
            </>
          )}
        </div>
      );
    })}
  </section>
);
