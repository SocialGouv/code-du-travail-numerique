"use client";
import { Highlight } from "@codegouvfr/react-dsfr/Highlight";
import { fr } from "@codegouvfr/react-dsfr";
import { useEffect, createRef, useState } from "react";
import { ContainerSimulator } from "../../layout/ContainerSimulator";
import { RelatedItem } from "../../documents";

type Props = {
  relatedItems: {
    items: RelatedItem[];
    title: string;
  }[];
};

export const HiringSimulator = ({ relatedItems }: Props) => {
  const simRef = createRef<HTMLDivElement>();
  const [state, setState] = useState({
    error: "",
    simulator: "loading",
  });
  const onError = (error) => {
    setState({ error, simulator: "error" });
  };

  const onLoad = () => {
    setState({ simulator: "success", error: "" });
    if (
      !simRef.current ||
      !simRef.current.querySelector("#simulateurEmbauche")
    ) {
      setState({ error: "empty child", simulator: "error" });
    }
  };
  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://mon-entreprise.urssaf.fr/simulateur-iframe-integration.js";
    script.async = true;
    script.dataset.couleur = "#2975D1";
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
      title="Calculer le salaire brut/net"
      description="description"
      segments={[{ label: "Simulateurs", linkProps: { href: "/outils" } }]}
    >
      <h1 id="simulateur-embauche">Calculer le salaire brut/net</h1>
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
};
