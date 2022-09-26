import styled from "styled-components";
import { SummaryItem } from "./SummaryItem";
import { useStore } from "../../store";
import { useRouter } from "next/router";
import { PreviousResponse } from "../../type";
import { Button } from "@socialgouv/cdtn-ui";
import Link from "next/link";

export const Summary = ({
  responses,
  withLink,
}: {
  responses: PreviousResponse[];
  withLink: boolean;
}) => {
  // const previousResponses = useStore((state) => state.previousResponses);
  const toolSlug = useStore((state) => state.toolSlug);
  const router = useRouter();
  const goTo = useStore((state) => state.goTo);
  return (
    <SummaryWrapper>
      {responses.map(({ text }, index) => {
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
            ></SummaryItem>
          )
        );
      })}
      {withLink && (
        <LinkWrapper>
          <div>Ce cas ne correspond pas à votre situation ?</div>
          <Button
            variant="link"
            onClick={async () => {
              await router.push(`/outils/${toolSlug}`);
            }}
          >
            Changer de procédure
          </Button>
        </LinkWrapper>
      )}
    </SummaryWrapper>
  );
};

const SummaryWrapper = styled.ul`
  margin: 0;
`;

const LinkWrapper = styled.div`
  margin-left: 32px;
`;
