import { useEffect, useState } from "react";
import { EntrepriseAccordsResponse } from "../../../../api/modules/accords/types";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { AccordCard } from "./AccordCard";
import { AccessibleAlert } from "../../../outils/common/components/AccessibleAlert";
import { css } from "@styled-system/css";
import Spinner from "../../../common/Spinner.svg";
import Image from "next/image";

type Props = {
  siret: string;
};

type AccordsState =
  | { status: "loading"; accords: null }
  | { status: "success"; accords: EntrepriseAccordsResponse }
  | { status: "error"; accords: null };

export const AccordsEntreprise = ({ siret }: Props) => {
  const [accordsState, setAccordsState] = useState<AccordsState>({
    status: "loading",
    accords: null,
  });

  useEffect(() => {
    let ignore = false;

    fetch(`/api/enterprises/accords/${siret}`)
      .then((res) => res.json() as Promise<EntrepriseAccordsResponse>)
      .then((data) => {
        if (!ignore) {
          setAccordsState({ status: "success", accords: data });
        }
      })
      .catch(() => {
        if (!ignore) {
          setAccordsState({ status: "error", accords: null });
        }
      });

    return () => {
      ignore = true;
    };
  }, [siret]);

  if (accordsState.status === "error") {
    return (
      <AccessibleAlert
        title="Erreur lors du chargement des accords d'entreprise"
        severity="error"
        className={["fr-mt-2w"]}
        description="Les accords d’entreprise ne sont pas disponibles pour le moment. Veuillez réessayer plus tard."
      />
    );
  }
  if (accordsState.status === "loading") {
    return (
      <div className={fr.cx("fr-grid-row", "fr-mt-2w")}>
        <p className={fr.cx("fr-h5", "fr-mb-0")}>
          Chargement des accords en cours
        </p>
        <div className={`${fr.cx("fr-ml-1w", "fr-mt-1w")} ${SpinnerBlock}`}>
          <Image priority src={Spinner} alt="Chargement en cours" />
        </div>
      </div>
    );
  }
  if (accordsState.accords.total === 0) {
    return (
      <AccessibleAlert
        title="Aucun accord d'entreprise trouvé"
        description="Nous n’avons pas trouvé d’accord d’entreprise. Cela ne signifie pas nécessairement qu’il n’en existe pas. Pour le vérifier, vous pouvez vous rapprocher de votre entreprise."
        severity="info"
        className={["fr-mt-2w"]}
      />
    );
  }
  return (
    <>
      <p className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}>
        {accordsState.accords.total} accord
        {accordsState.accords.total > 1 ? "s" : ""} d&apos;entreprise trouvé
        {accordsState.accords.total > 1 ? "s" : ""}&nbsp;:
      </p>
      {accordsState.accords.accords.map((accord) => (
        <AccordCard key={accord.id} {...accord} />
      ))}
      <div className={fr.cx("fr-grid-row", "fr-grid-row--center", "fr-mt-2w")}>
        <Button
          linkProps={{
            href: `https://www.legifrance.gouv.fr/search?typeRecherche=date&fonds=ACCO&searchField=ALL&searchType=ALL&typePagination=DEFAUT&siret=${siret}&sortValue=PERTINENCE&pageSize=25&page=1`,
            target: "_blank",
          }}
          priority="secondary"
        >
          Voir tous les accords sur Légifrance
        </Button>
      </div>
    </>
  );
};

const SpinnerBlock = css({
  height: "100%",
  alignContent: "center",
});
