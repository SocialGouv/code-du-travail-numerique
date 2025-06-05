import { PreviousResponse } from "src/questionnaire/type";

type Props = {
  responses: PreviousResponse[];
};

export const Responses = ({ responses }: Props) => {
  if (responses.length === 1) {
    return <>{responses[0].text}</>;
  }
  return (
    <ul>
      {responses.map(({ text }, index) => {
        return text && <li key={index}>{text}</li>;
      })}
    </ul>
  );
};
