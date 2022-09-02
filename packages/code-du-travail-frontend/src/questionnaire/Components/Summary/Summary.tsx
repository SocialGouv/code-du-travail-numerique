import styled from "styled-components";
import { SummaryItem } from "./SummaryItem";
import { useStore } from "../../store";
import { useRouter } from "next/router";

export const Summary = () => {
  const previousResponses = useStore((state) => state.previousResponses);
  const toolSlug = useStore((state) => state.toolSlug);
  const router = useRouter();
  const goTo = useStore((state) => state.goTo);
  return (
    <SummaryWrapper>
      {previousResponses.map(({ text }, index) => {
        return (
          <SummaryItem
            key={index}
            data={text}
            onClick={async () => {
              if (router.basePath !== toolSlug) {
                await router.push(`/outils/${toolSlug}`);
              }
              goTo(index);
            }}
          ></SummaryItem>
        );
      })}
    </SummaryWrapper>
  );
};

const SummaryWrapper = styled.ul`
  margin: 0;
`;
