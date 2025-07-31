"use client";
import { SummaryItem } from "./SummaryItem";
import { PreviousResponse } from "../type";
import Button from "@codegouvfr/react-dsfr/Button";
import { usePathname, useRouter } from "next/navigation";
import { DossierLicenciementContext, useStore } from "../store";
import { useContext } from "react";

export const Summary = ({
  responses,
  withLink,
}: {
  responses: PreviousResponse[];
  withLink: boolean;
}) => {
  const store = useContext(DossierLicenciementContext);
  const toolSlug = useStore(store, (state) => state.toolSlug);
  const router = useRouter();
  const pathname = usePathname();
  const currentSlug = pathname?.split("/").pop();
  const goTo = useStore(store, (state) => state.goTo);
  const displayableResponses = responses.filter(({ text }) => !!text);
  return (
    <div>
      <ul>
        {displayableResponses.map(({ text, info }, index) => {
          return (
            text && (
              <SummaryItem
                key={index}
                data={text}
                info={info}
                onClick={async () => {
                  if (currentSlug !== toolSlug) {
                    await router.push(`/outils/${toolSlug}`);
                  }
                  goTo(index);
                }}
                noButton={withLink}
                noCheck={withLink && displayableResponses.length === 1}
              />
            )
          );
        })}
      </ul>
      {withLink && (
        <Button
          onClick={() => {
            router.push(`/outils/${toolSlug}`);
          }}
        >
          Changer de procédure
        </Button>
      )}
    </div>
  );
};
