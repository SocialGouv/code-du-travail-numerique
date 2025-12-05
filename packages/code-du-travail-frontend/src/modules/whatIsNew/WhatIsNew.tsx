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
    <ContainerList title="Quoi de neuf sur le code du travail numérique ?">
      <div className={fr.cx("fr-mb-5w")}>
        <div className={fr.cx("fr-mb-5w", "fr-mt-3w")}>
          <h1 id="quoi-de-neuf-title" className={fr.cx("fr-h2", "fr-mb-3w")}>
            Quoi de neuf sur le code du travail numérique&nbsp;?
          </h1>
          <p className={fr.cx("fr-text--md")}>
            Sont listé ici les principaux changements sur le code du travail
            numérique. Ces changements concernent les modifications importantes
            du site avec par exemple la création de nouvelles pages, des
            modifications dans les simulateurs et les modifications
            significatives du contenu en fonction évolutions législatives.
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
