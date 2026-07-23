"use client";
import React, { useRef } from "react";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  children: React.ReactNode;
  // Callback optionnel déclenché à l'ouverture du plein écran. Le composant est
  // générique : il ne connaît pas le contexte (contribution, etc.). L'appelant
  // fournit ce callback pour gérer l'event de son côté ; s'il est absent, la
  // fonctionnalité est désactivée (comportement par défaut).
  onOpenFullscreen?: () => void;
};

export const TableFullscreenWrapper = ({
  children,
  onOpenFullscreen,
}: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openFullscreen = () => {
    onOpenFullscreen?.();
    dialogRef.current?.showModal();
  };

  return (
    <>
      <div className={fr.cx("fr-mb-1w", "fr-hidden-md")}>
        <button
          type="button"
          className={fr.cx(
            "fr-btn",
            "fr-btn--tertiary",
            "fr-btn--sm",
            "fr-icon-fullscreen-line",
            "fr-btn--icon-left"
          )}
          onClick={openFullscreen}
        >
          Voir le tableau en plein écran
        </button>
      </div>
      {children}

      <style>{`
        .table-fullscreen-dialog {
          position: fixed;
          inset: 0;
          width: 100dvw;
          height: 100dvh;
          max-width: 100dvw;
          max-height: 100dvh;
          margin: 0;
          padding: 0;
          border: none;
          background: white;
          z-index: 10000;
          overflow: hidden;
        }
        .table-fullscreen-dialog::backdrop {
          background: rgba(0, 0, 0, 0.5);
        }
        .table-fullscreen-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .table-fullscreen-header {
          display: flex;
          justify-content: flex-end;
          padding: 1rem;
          flex-shrink: 0;
        }
        .table-fullscreen-content {
          flex: 1;
          overflow: auto;
          padding: 0 1rem 1rem;
        }
        @media screen and (max-width: 767px) and (orientation: portrait) {
          .table-fullscreen-header {
            position: fixed;
            top: 0;
            right: 0;
            z-index: 10001;
          }
          .table-fullscreen-content {
            position: fixed;
            width: 100dvh;
            height: calc(100dvw - 3.5rem);
            top: calc((100dvh - 100dvw) / 2 + 1.75rem);
            left: calc((100dvw - 100dvh) / 2);
            transform: rotate(90deg);
            overflow: auto;
            padding: 0.5rem;
          }
        }
      `}</style>

      <dialog ref={dialogRef} className="table-fullscreen-dialog">
        <div className="table-fullscreen-inner">
          <div className="table-fullscreen-header">
            <button
              type="button"
              className={fr.cx("fr-btn", "fr-btn--close")}
              onClick={() => dialogRef.current?.close()}
            >
              Fermer
            </button>
          </div>
          <div className="table-fullscreen-content">{children}</div>
        </div>
      </dialog>
    </>
  );
};
