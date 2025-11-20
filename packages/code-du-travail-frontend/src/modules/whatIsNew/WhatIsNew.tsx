import { fr } from "@codegouvfr/react-dsfr";
import { WhatIsNewMonth } from "./queries";
import { MonthNavigation } from "./MonthNavigation";
import { MonthContent } from "./MonthContent";

type Props = {
    month: WhatIsNewMonth;
};

export const WhatIsNew = ({ month }: Props) => {
    return (
        <section
            aria-labelledby="quoi-de-neuf-title"
            className={fr.cx("fr-container", "fr-pt-6w", "fr-pb-10w")}
        >
            <header className={fr.cx("fr-mb-6w")}>
                <h1
                    id="quoi-de-neuf-title"
                    className={fr.cx("fr-h2", "fr-mb-2w")}
                >
                    Quoi de neuf sur le code du travail&nbsp;?
                </h1>
                <p className={fr.cx("fr-text--md")}>
                    Sont listés ici les principaux changements du Code du travail
                    numérique : nouvelles pages, modifications dans les simulateurs
                    et mises à jour importantes du contenu liées aux évolutions
                    législatives.
                </p>
            </header>

            <MonthNavigation currentPeriod={month.period} position="top" />

            <MonthContent month={month} />

            <MonthNavigation currentPeriod={month.period} position="bottom" />
        </section>
    );
};
