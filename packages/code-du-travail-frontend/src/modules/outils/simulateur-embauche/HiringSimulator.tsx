"use client";
import { Highlight } from "@codegouvfr/react-dsfr/Highlight";
import { fr } from "@codegouvfr/react-dsfr";
import { createRef, memo, useEffect, useState } from "react";
import { ContainerSimulator } from "../../layout/ContainerSimulator";
import { RelatedItem } from "../../documents";
import * as Sentry from "@sentry/nextjs";

type Props = {
  relatedItems: {
    items: RelatedItem[];
    title: string;
  }[];
  title: string;
  breadcrumbTitle: string;
  description: string;
};

const HiringSimulator = memo(function HiringSimulator({
  relatedItems,
  description,
  title,
  breadcrumbTitle,
}: Props) {
  const simRef = createRef<HTMLDivElement>();
  const [state, setState] = useState({
    simulator: "loading",
  });
  const onError = (
    event: Event | string,
    source?: string,
    lineno?: number,
    colno?: number,
    error?: Error
  ) => {
    console.log(
      "Erreur durant le chargement de l'iframe brut/net",
      error,
      source,
      lineno,
      colno
    );
    console.log("Event : ", event);
    setState({ simulator: "error" });
    Sentry.captureMessage(`Erreur durant le chargement de l'iframe brut/net`);
  };

  const onLoad = () => {
    setState({ simulator: "success" });
    if (!simRef.current?.querySelector("#simulateurEmbauche")) {
      console.log(
        `Erreur durant le chargement de l'iframe brut/net, "empty child"`
      );
      setState({ simulator: "error" });
      Sentry.captureMessage(
        `Erreur durant le chargement de l'iframe brut/net "empty child"`
      );
    }
  };
  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://mon-entreprise.urssaf.fr/simulateur-iframe-integration.js";
    script.id = "script-simulateur-embauche";
    script.onload = onLoad;
    script.onerror = onError;

    if (simRef.current) {
      simRef.current.appendChild(script);
    }

    return () => {
      if (simRef.current) {
        simRef.current.removeChild(script);
      }
    };
  }, []);
  const { simulator } = state;
  return (
    <ContainerSimulator
      relatedItems={relatedItems}
      title={breadcrumbTitle}
      description={description}
      segments={[{ label: "Simulateurs", linkProps: { href: "/outils" } }]}
    >
      <h1 id="simulateur-embauche">{title}</h1>
      <Highlight size="lg" className={fr.cx("fr-mb-12v")}>
        Pour information, l&apos;estimation du salaire net après impôt est basée
        sur la situation d&apos;une personne célibataire sans enfants ni
        patrimoine.
      </Highlight>
      {simulator === "loading" && <p>Chargement de l’outil</p>}
      {simulator === "error" ? (
        <p>
          Le simulateur d’embauche n’est pas disponible actuellement.
          <br />
          Retrouvez les autres simulateurs autour du thème de l’entreprise, sur
          le site:{" "}
          <a
            title="Voir les simulateurs"
            href="https://mon-entreprise.urssaf.fr/"
          >
            https://mon-entreprise.urssaf.fr/
          </a>
        </p>
      ) : (
        <div ref={simRef} className={fr.cx("fr-col-12")} />
      )}
    </ContainerSimulator>
  );
});

export default HiringSimulator;
