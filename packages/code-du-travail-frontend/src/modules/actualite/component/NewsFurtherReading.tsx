import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import React from "react";
import Link from "../../common/Link";
import { NewsFurtherReadingLink } from "../type";

type Props = {
  links: NewsFurtherReadingLink[];
};

export const NewsFurtherReading = ({ links }: Props) => {
  if (links.length === 0) return null;
  return (
    <section className={fr.cx("fr-mt-6w")}>
      <h2 className={`${fr.cx("fr-h3")} ${headingStyle}`}>
        <span
          className={`${fr.cx("fr-icon-question-fill", "fr-icon--lg")} ${iconStyle}`}
          aria-hidden="true"
        />
        Pour aller plus loin
      </h2>
      <ul>
        {links.map(({ title, url, intro, external }, index) => (
          <li key={`${index}-${url}`}>
            {intro && <>{intro}&nbsp;: </>}
            <Link
              href={url}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

const headingStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
});

const iconStyle = css({
  color: "var(--artwork-minor-blue-cumulus)",
});
