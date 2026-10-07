import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import Link from "src/modules/common/Link";
import { ContactStepper } from "../ContactStepper";
import { SrdtCaveats } from "../SrdtCaveats";
import { SRDT_PHONE } from "../contactThemes";
import { useNeedMoreInfoEvents } from "../tracking";

// Écran 3 (branche téléphone). Seul le secteur privé relève des services de
// renseignement en droit du travail (SRDT) et atteint cet écran ; les thèmes
// hors périmètre sont arrêtés dès l'écran 1 par un message d'erreur.
export const ResultStep = () => {
  const { emitTrackNumber } = useNeedMoreInfoEvents();

  return (
    <div data-testid="contact-phone-result">
      <ContactStepper current={3} title="Par téléphone" />
      <p className={fr.cx("fr-mb-2w")}>
        {"Contactez les services de renseignement en droit du travail :"}
      </p>
      <Link
        className={fr.cx("fr-raw-link")}
        href={SRDT_PHONE.href}
        onClick={emitTrackNumber}
      >
        <Image
          src="/static/assets/img/srdt-numero.svg"
          alt={`${SRDT_PHONE.display} — ${SRDT_PHONE.tarification.join(" ")}`}
          width={353}
          height={43}
        />
      </Link>
      <div className={fr.cx("fr-mt-3w")}>
        <SrdtCaveats />
      </div>
    </div>
  );
};
