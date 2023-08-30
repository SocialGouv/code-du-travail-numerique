import styled from "styled-components";
import { SummaryItem } from "./SummaryItem";
import { DossierLicenciementContext, useStore } from "../../store";
import { useRouter } from "next/router";
import { PreviousResponse } from "../../type";
import { Button } from "@socialgouv/cdtn-ui";
import { useContext } from "react";

export const Summary = ({
  responses,
  withLink,
  tabIndex,
}: {
  responses: PreviousResponse[];
  withLink: boolean;
  tabIndex?: string;
}) => {
  const store = useContext(DossierLicenciementContext);
  const toolSlug = useStore(store, (state) => state.toolSlug);
  const router = useRouter();
  const goTo = useStore(store, (state) => state.goTo);
  const displayableResponses = responses.filter(({ text }) => !!text);
  return (
    <SummaryWrapper>
      {displayableResponses.map(({ text, info }, index) => {
        return (
          text && (
            <SummaryItem
              key={index}
              data={text}
              info={info}
              onClick={async () => {
                if (router.query.slug !== toolSlug) {
                  await router.push(`/outils/${toolSlug}`);
                }
                goTo(index);
              }}
              noButton={withLink}
              noCheck={withLink && displayableResponses.length === 1}
              tabIndex={tabIndex}
            ></SummaryItem>
          )
        );
      })}
      {withLink && (
        <LinkWrapper>
          <Button
            variant="link"
            hasText
            onClick={async () => {
              await router.push(`/outils/${toolSlug}`);
            }}
            tabIndex={tabIndex}
          >
            Changer de procédure
          </Button>
        </LinkWrapper>
      )}
    </SummaryWrapper>
  );
};

const SummaryWrapper = styled.div`
  padding: 12px 0;
`;

const LinkWrapper = styled.div`
  margin-top: 12px;
`;
