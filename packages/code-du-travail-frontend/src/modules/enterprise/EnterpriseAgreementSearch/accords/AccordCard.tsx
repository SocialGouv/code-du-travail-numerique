import { fr } from "@codegouvfr/react-dsfr";
import { AccordResponse } from "../../../../api/modules/accords/types";
import Card from "@codegouvfr/react-dsfr/Card";

type Props = AccordResponse;

export const AccordCard = ({
  id,
  title,
  themes,
  dateSignature,
  dateDebut,
  dateFin,
  texteIntegral,
  signataires,
}: Props) => (
  <Card
    className={fr.cx("fr-mt-2w")}
    border
    size="large"
    title={title}
    linkProps={{
      href: `https://www.legifrance.gouv.fr/acco/id/${id}`,
      target: "_blank",
    }}
    desc={
      <>
        <p className={fr.cx("fr-card__desc", "fr-mb-2w", "fr-mt-2w")}>
          Signé le {dateSignature}
          {dateDebut ? ` - Débute le ${dateDebut}` : ""}
          {dateFin ? ` - Fini le ${dateFin}` : ""}
          {texteIntegral ? " - Texte intégral" : ""}
          {signataires && signataires.length > 0
            ? ` - Signataire${signataires.length > 1 ? "s" : ""} :
                        ${signataires.join(", ")}`
            : ""}
        </p>
        {themes && (
          <p className={fr.cx("fr-card__desc", "fr-m-0")}>
            Thème{themes.length > 1 ? "s" : ""}&nbsp;: {themes.join(", ")}
          </p>
        )}
      </>
    }
    classes={{
      title: fr.cx("fr-h6"),
      content: fr.cx("fr-px-2w", "fr-pt-1w", "fr-pb-7v"),
      desc: fr.cx("fr-mt-1w", "fr-mr-6w"),
      end: fr.cx("fr-hidden"),
    }}
  />
);
