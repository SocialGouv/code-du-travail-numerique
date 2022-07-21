import React from "react";
import { Paragraph } from "@socialgouv/cdtn-ui";
import { matopush } from "../../../../piwik";
import {
  MatomoActionEvent,
  MatomoAgreementEvent,
  MatomoBaseEvent,
} from "../../../../lib";

type Props = {
  agreementUrl?: string;
};

const NotSupportedAgreementDisclaimer: React.FC<Props> = ({ agreementUrl }) => {
  React.useEffect(() => {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.OUTIL,
      MatomoActionEvent.HEURE_RECHERCHE_EMPLOI,
      MatomoAgreementEvent.CC_BLOCK_USER,
    ]);
  }, []);
  return (
    <>
      <Paragraph>
        La convention collective sélectionnée n’est pas traitée par nos
        services. Nous vous invitons à consulter votre convention collective qui
        peut prévoir un nombre d’heures d’absence autorisée pour rechercher un
        emploi pendant un préavis.{" "}
        {agreementUrl && (
          <>
            Vous pouvez consulter votre convention collective{" "}
            <a href={agreementUrl} target="_blank" rel="noreferrer">
              ici
            </a>
            .
          </>
        )}
      </Paragraph>
      <Paragraph>
        Un accord d’entreprise ou à défaut un usage dans la profession ou
        l’entreprise peut également prévoir que le salarié bénéficie d’heures
        d’absence autorisée pour rechercher un emploi pendant le préavis.
      </Paragraph>
    </>
  );
};

export default NotSupportedAgreementDisclaimer;
