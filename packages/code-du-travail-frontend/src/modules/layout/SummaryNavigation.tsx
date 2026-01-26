import { fr } from "@codegouvfr/react-dsfr";
import Link from "../common/Link";

type SummarySection = {
  id: string;
  label: string;
};

type Props = {
  sections: SummarySection[];
  title?: string;
};

export const SummaryNavigation = ({ sections }: Props) => {
  return (
    <nav
      className={fr.cx("fr-summary")}
      aria-labelledby={`fr-summary-title-main`}
      role="navigation"
    >
      <h2 className={fr.cx("fr-summary__title")} id={`fr-summary-title-main`}>
        Sommaire
      </h2>
      <ol>
        {sections.map((section) => (
          <li key={section.id}>
            <Link href={`#${section.id}`} className={fr.cx("fr-summary__link")}>
              {section.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};
