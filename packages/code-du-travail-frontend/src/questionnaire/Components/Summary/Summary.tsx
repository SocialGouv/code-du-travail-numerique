import styled from "styled-components";
import { SummaryItem } from "./SummaryItem";
import { useStore } from "../../store";

export const Summary = () => {
  const previousResponses = useStore((state) => state.previousResponses);
  const goTo = useStore((state) => state.goTo);
  return (
    <SummaryWrapper>
      {previousResponses.map(({ text }, index) => {
        return (
          <SummaryItem
            key={index}
            data={text}
            onClick={() => goTo(index)}
          ></SummaryItem>
        );
      })}
    </SummaryWrapper>
  );
};

const SummaryWrapper = styled.ul`
  margin: 0;
`;
