import { fr } from "@codegouvfr/react-dsfr";
import { AccordResponse } from "../../../../api/modules/accords/types";
import Card from "@codegouvfr/react-dsfr/Card";
import { css } from "@styled-system/css";

type Props = AccordResponse & { onClick: (id: string) => void };

export const AccordCard = ({
  id,
  title,
  themes,
  dateSignature,
  dateDebut,
  dateFin,
  texteIntegral,
  signataires,
  onClick,
}: Props) => (
  <Card
    className={fr.cx("fr-mt-2w")}
    border
    size="large"
    title={title}
    linkProps={{
      href: `https://www.legifrance.gouv.fr/acco/id/${id}`,
      onClick: () => onClick(id),
      target: "_self",
    }}
    desc={
      <>
        <>
          Signé le {dateSignature}
          {dateDebut ? ` - Débute le ${dateDebut}` : ""}
          {dateFin ? ` - Fini le ${dateFin}` : ""}
          {texteIntegral ? " - Texte intégral" : ""}
          {signataires && signataires.length > 0
            ? ` - Signataire${signataires.length > 1 ? "s" : ""} :
                        ${signataires.join(", ")}`
            : ""}
        </>
        {themes && (
          <span className={`${fr.cx("fr-mt-2w")} ${ligne}`}>
            Thème{themes.length > 1 ? "s" : ""}&nbsp;: {themes.join(", ")}
          </span>
        )}
      </>
    }
    classes={{
      title: fr.cx("fr-h6"),
      content: fr.cx("fr-px-2w", "fr-pt-1w", "fr-pb-7v"),
      desc: fr.cx("fr-mt-2w", "fr-mb-2w"),
      end: fr.cx("fr-hidden"),
    }}
  />
);

const ligne = css({
  display: "block",
});
