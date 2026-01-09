"use client";

import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { QuestionAnswers, QuestionBubble } from "./Components";
import { useHomeTracking } from "./tracking";
import { css } from "@styled-system/css";
import Image from "next/image";
import Link from "../common/Link";

export const LaQuestionAction = () => {
  const { emitQuestionActionEvent } = useHomeTracking();

  const ruptureConventionnelleAnswers = [
    {
      icon: "/static/assets/icons/home/step.svg",
      content: (
        <p className={fr.cx("fr-mb-0")}>
          Découvrez{" "}
          <Link
            href="/information/rupture-conventionnelle-individuelle-la-procedure-en-details"
            onClick={() =>
              emitQuestionActionEvent(
                "/information/rupture-conventionnelle-individuelle-la-procedure-en-details"
              )
            }
          >
            les étapes de la procédure
          </Link>
        </p>
      ),
    },
    {
      icon: "/static/assets/icons/home/infographie.svg",
      content: (
        <p className={fr.cx("fr-mb-0")}>
          La synthèse dans{" "}
          <Link
            href="/infographie/rupture-conventionnelle-les-etapes-de-la-procedure-et-les-delais"
            onClick={() =>
              emitQuestionActionEvent(
                "/infographie/rupture-conventionnelle-les-etapes-de-la-procedure-et-les-delais"
              )
            }
          >
            cette infographie
          </Link>
        </p>
      ),
    },
    {
      icon: "/static/assets/icons/home/simulator.svg",
      content: (
        <p className={fr.cx("fr-mb-0")}>
          Simulez votre{" "}
          <Link
            href="outils/indemnite-rupture-conventionnelle"
            onClick={() =>
              emitQuestionActionEvent(
                "/outils/indemnite-rupture-conventionnelle"
              )
            }
          >
            indemnité de rupture conventionnelle
          </Link>
        </p>
      ),
    },
    {
      icon: "/static/assets/icons/home/letter.svg",
      content: (
        <p className={fr.cx("fr-mb-0")}>
          Retrouvez{" "}
          <Link
            href="/modeles-de-courriers/demande-de-rendez-vous-en-vue-dune-rupture-conventionnelle"
            onClick={() =>
              emitQuestionActionEvent(
                "/modeles-de-courriers/demande-de-rendez-vous-en-vue-dune-rupture-conventionnelle"
              )
            }
          >
            le modèle de courrier
          </Link>
        </p>
      ),
    },
  ];

  const heureSupAnswers = [
    {
      icon: "/static/assets/icons/home/step.svg",
      content: (
        <p className={fr.cx("fr-mb-0")}>
          Découvrez{" "}
          <Link
            href="/fiche-service-public/heures-supplementaires-dun-salarie-du-secteur-prive"
            onClick={() =>
              emitQuestionActionEvent(
                "/fiche-service-public/heures-supplementaires-dun-salarie-du-secteur-prive"
              )
            }
          >
            la fiche synthèse sur les heures supplémentaires
          </Link>
        </p>
      ),
    },
    {
      icon: "/static/assets/icons/home/step.svg",
      content: (
        <p className={fr.cx("fr-mb-0")}>
          Découvrez{" "}
          <Link
            href="/contribution/heures-supplementaires"
            onClick={() =>
              emitQuestionActionEvent("/contribution/heures-supplementaires")
            }
          >
            les contreparties des heures supplémentaires en fonction de votre
            convention collective
          </Link>
        </p>
      ),
    },
    {
      icon: "/static/assets/icons/home/letter.svg",
      content: (
        <p className={fr.cx("fr-mb-0")}>
          Utilisez{" "}
          <Link
            href="/modeles-de-courriers/releve-dheures-supplementaires"
            onClick={() =>
              emitQuestionActionEvent(
                "/modeles-de-courriers/releve-dheures-supplementaires"
              )
            }
          >
            le modèle de relevé d’heures supplémentaires
          </Link>
        </p>
      ),
    },
    {
      icon: "/static/assets/icons/home/letter.svg",
      content: (
        <p className={fr.cx("fr-mb-0")}>
          Retrouvez{" "}
          <Link
            href="/modeles-de-courriers/lettre-de-reclamation-des-heures-supplementaires"
            onClick={() =>
              emitQuestionActionEvent(
                "/modeles-de-courriers/lettre-de-reclamation-des-heures-supplementaires"
              )
            }
          >
            le modèle de courrier pour réclamer vos heures supplémentaires
          </Link>
        </p>
      ),
    },
  ];

  return (
    <div
      id="home-de-la-question-a-laction"
      className={`${container} ${fr.cx("fr-py-8w")}`}
    >
      <div className={`${fr.cx("fr-container")} ${contentWrapper}`}>
        <h2>De la question à l&apos;action</h2>

        <div className={sectionsWrapper}>
          <div
            className={fr.cx(
              "fr-grid-row",
              "fr-grid-row-md--gutters",
              "fr-mb-3w"
            )}
          >
            <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
              <QuestionBubble>
                Je souhaite demander une rupture conventionnelle. Qu&apos;est ce
                que je dois savoir ? Comment je dois procéder ?
              </QuestionBubble>
            </div>
            <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
              <QuestionAnswers items={ruptureConventionnelleAnswers} />
            </div>
          </div>
          <div
            className={`${illustrationWrapper} ${fr.cx(
              "fr-mb-3w",
              "fr-hidden",
              "fr-unhidden-md"
            )}`}
          >
            <Image
              src={"/static/assets/icons/home/illustration-questions.svg"}
              alt=""
              width={350}
              height={250}
              className={illustrationStyle}
            />
          </div>
          <div
            className={fr.cx(
              "fr-grid-row",
              "fr-grid-row-md--gutters",
              "fr-mb-3w"
            )}
          >
            <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
              <QuestionBubble>
                Mon entreprise me demande de faire des heures supplémentaires.
                Suis-je obligé(e)&nbsp;? Si, oui comment sont-elles compensées
                ou payées&nbsp;?
              </QuestionBubble>
            </div>
            <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
              <QuestionAnswers items={heureSupAnswers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const container = css({
  background: "var(--background-alt-blue-cumulus)",
});

const contentWrapper = css({
  position: "relative",
});

const sectionsWrapper = css({
  position: "relative",
  display: "flex",
  flexDirection: "column",
});

const illustrationWrapper = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  md: {
    position: "absolute",
    left: "22%",
    top: "32%",
    transform: "translate(-50%, -50%)",
    margin: 0,
    zIndex: 1,
  },
});

const illustrationStyle = css({
  width: "100%",
  height: "auto",
  md: {
    width: "280px",
  },
  lg: {
    width: "320px",
  },
});
