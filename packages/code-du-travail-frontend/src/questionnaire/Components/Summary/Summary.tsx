import styled from "styled-components";
import { SummaryItem } from "./SummaryItem";
import { useStore } from "../../store";
import { useRouter } from "next/router";
import { PreviousResponse } from "../../type";
import { Button } from "@socialgouv/cdtn-ui";

export const Summary = ({
  responses,
  withLink,
}: {
  responses: PreviousResponse[];
  withLink: boolean;
}) => {
  const toolSlug = useStore((state) => state.toolSlug);
  const router = useRouter();
  const goTo = useStore((state) => state.goTo);
  const displayableResponses = responses.filter(({ text }) => !!text);
  return (
    <SummaryWrapper>
      {displayableResponses.map(({ text }, index) => {
        return (
          text && (
            <SummaryItem
              key={index}
              data={text}
              onClick={async () => {
                if (router.basePath !== toolSlug) {
                  await router.push(`/outils/${toolSlug}`);
                }
                goTo(index);
              }}
              noButton={withLink}
              noCheck={withLink && displayableResponses.length === 1}
            ></SummaryItem>
          )
        );
      })}
      {withLink && (
        <div>
          <Button
            variant="link"
            hasText
            onClick={async () => {
              await router.push(`/outils/${toolSlug}`);
            }}
          >
            Changer de procédure
          </Button>
        </div>
      )}
    </SummaryWrapper>
  );
};

const SummaryWrapper = styled.ul`
  margin: 0;
  padding: 12px 0;
`;

const LinkWrapper = styled.div``;
