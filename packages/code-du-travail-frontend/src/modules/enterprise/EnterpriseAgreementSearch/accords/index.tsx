"use client";

import { useEffect, useState } from "react";
import { EntrepriseAccordsResponse } from "../../../../api/modules/accords/types";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { AccordCard } from "./AccordCard";
import { AccessibleAlert } from "../../../outils/common/components/AccessibleAlert";
import { css } from "@styled-system/css";
import Spinner from "../../../common/Spinner.svg";
import Image from "next/image";
import { useAccordEnterpriseTracking } from "./tracking";

type Props = {
  siret: string;
  onLoaded: (accordCount: number) => void;
};

type AccordsState =
  | { status: "loading"; accords: null }
  | { status: "success"; accords: EntrepriseAccordsResponse }
  | { status: "error"; accords: null };

export const AccordsEntreprise = ({ siret, onLoaded }: Props) => {
  const [accordsState, setAccordsState] = useState<AccordsState>({
    status: "loading",
    accords: null,
  });

  const {
    emitLoadAccordsFailed,
    emitShowAccords,
    emitClickSeeAll,
    emitClickAccord,
  } = useAccordEnterpriseTracking();

  useEffect(() => {
    let ignore = false;

    fetch(`/api/enterprises/accords/${siret}`)
      .then((res) => {
        // `fetch` ne rejette pas sur un statut HTTP d'erreur : sans ce contrôle,
        // une réponse 500 (ex. API DILA/PISTE indisponible) serait parsée comme
        // un succès et planterait le rendu. On bascule explicitement vers l'état
        // d'erreur pour que la recherche d'entreprise (conventions collectives)
        // reste affichée même si les accords sont indisponibles.
        if (!res.ok) {
          throw new Error(
            `Échec du chargement des accords (HTTP ${res.status})`
          );
        }
        return res.json() as Promise<EntrepriseAccordsResponse>;
      })
      .then((data) => {
        if (!ignore) {
          emitShowAccords(data.total);
          setAccordsState({ status: "success", accords: data });
          onLoaded(data.total);
        }
      })
      .catch(() => {
        if (!ignore) {
          emitLoadAccordsFailed(siret);
          setAccordsState({ status: "error", accords: null });
          onLoaded(0);
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
      {accordsState.accords.accords.map((accord) => (
        <AccordCard key={accord.id} onClick={emitClickAccord} {...accord} />
      ))}
      <div className={fr.cx("fr-grid-row", "fr-grid-row--center", "fr-mt-2w")}>
        <Button
          linkProps={{
            href: `https://www.legifrance.gouv.fr/search?typeRecherche=date&fonds=ACCO&searchField=ALL&searchType=ALL&typePagination=DEFAUT&siret=${siret}&sortValue=PERTINENCE&pageSize=25&page=1`,
            target: "_blank",
            onClick: () => {
              emitClickSeeAll(siret);
            },
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
