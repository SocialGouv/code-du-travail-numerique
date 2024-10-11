"use client";
import { Highlight } from "@codegouvfr/react-dsfr/Highlight";
import { fr } from "@codegouvfr/react-dsfr";
import { useEffect, createRef, useState } from "react";
import { ContainerMiddle } from "../layout/ContainerMiddle";
import { RelatedItem } from "../documents";
import { Feedback } from "../layout/feedback";

type Props = {
  relatedItems: {
    items: RelatedItem[];
    title: string;
  }[];
};

export const HiringSimulator = ({ relatedItems }: Props) => {
  const simRef = createRef();
  const [, setState] = useState({
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
      // @ts-ignore
      !simRef.current.querySelector("#simulateurEmbauche")
    ) {
      setState({ error: "empty child", simulator: "error" });
    }
  };
  const useScript = () => {
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
        // @ts-ignore
        simRef.current.appendChild(script);
      }

      return () => {
        if (simRef.current) {
          // @ts-ignore
          simRef.current.removeChild(script);
        }
      };
    }, []);
  };
  useScript();
  return (
    <ContainerMiddle
      relatedItems={relatedItems}
      title="Calculer le salaire brut/net"
      description="description"
      segments={[{ label: "Simulateurs", linkProps: { href: "/outils" } }]}
    >
      <h1
        id="simulateur-embauche"
        className={fr.cx("fr-mb-0", "fr-display--sm")}
      >
        Calculer le salaire brut/net
      </h1>
      <Highlight size="lg" className={fr.cx("fr-my-12v")}>
        Pour information, l&apos;estimation du salaire net après impôt est basée
        sur la situation d&apos;une personne célibataire sans enfants ni
        patrimoine.
      </Highlight>
      {/* @ts-ignore */}
      <div ref={simRef} className={fr.cx("fr-col-12")} />
      <Feedback className={fr.cx("fr-col-7", "fr-my-12v")} />
    </ContainerMiddle>
  );
};
