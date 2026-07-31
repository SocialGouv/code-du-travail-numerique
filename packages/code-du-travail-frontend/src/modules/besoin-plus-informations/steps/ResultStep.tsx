import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import Link from "src/modules/common/Link";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import { ContactStepper } from "../ContactStepper";
import { SRDT_PHONE, SRDT_PHONE_CAVEATS } from "../contactThemes";
import { useNeedMoreInfoEvents } from "../tracking";

// Écran 2 : le canal de contact. Seul le secteur privé relève des services de
// renseignement en droit du travail (SRDT) et atteint cet écran ; les thèmes
// hors périmètre sont arrêtés dès l'écran 1 par un message d'erreur.
export const ResultStep = () => {
  const { emitTrackNumber } = useNeedMoreInfoEvents();

  return (
    <div data-testid="contact-phone-result">
      <ContactStepper current={2} title="Par téléphone" />
      <p className={fr.cx("fr-mb-2w")}>
        {"Contactez les services de renseignement en droit du travail\u00A0:"}
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
        <AccessibleAlert
          severity="info"
          small
          description={
            <>
              <p className={fr.cx("fr-mb-1w")}>
                {
                  "Attention, ces services délivrent une information juridique, ils ne sont pas compétents pour\u00A0:"
                }
              </p>
              <ul className={fr.cx("fr-mb-0")}>
                {SRDT_PHONE_CAVEATS.map((caveat) => (
                  <li key={caveat}>{caveat}</li>
                ))}
              </ul>
            </>
          }
        />
      </div>
    </div>
  );
};
