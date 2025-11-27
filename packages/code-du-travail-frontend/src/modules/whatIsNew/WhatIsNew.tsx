import { fr } from "@codegouvfr/react-dsfr";
import { WhatIsNewMonth } from "./queries";
import { MonthNavigation } from "./MonthNavigation";
import { MonthContent } from "./MonthContent";
import { ContainerList } from "../layout/ContainerList";
import { Feedback } from "../layout/feedback";

type Props = {
  month: WhatIsNewMonth;
};

export const WhatIsNew = ({ month }: Props) => {
  return (
    <ContainerList title="Quoi de neuf sur le code du travail ?">
      <div className={fr.cx("fr-mb-5w")}>
        <div className={fr.cx("fr-mb-5w", "fr-mt-3w")}>
          <h1 id="quoi-de-neuf-title" className={fr.cx("fr-h2", "fr-mb-3w")}>
            Quoi de neuf sur le code du travail&nbsp;?
          </h1>
          <p className={fr.cx("fr-text--md")}>
            Sont listés ici les principaux changements du Code du travail
            numérique : nouvelles pages, modifications dans les simulateurs et
            mises à jour importantes du contenu liées aux évolutions
            législatives.
          </p>
        </div>

        <MonthNavigation currentPeriod={month.period} position="top" />

        <MonthContent month={month} />

        <MonthNavigation currentPeriod={month.period} position="bottom" />
      </div>
      <Feedback />
    </ContainerList>
  );
};
