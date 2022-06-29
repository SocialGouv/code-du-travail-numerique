import { HighlightResult, SmallText } from "../../../../common/stepStyles";
import { NoticeNote } from "../../../../common/NoticeNote";
import { calculateNumberOfElements } from "../../../../utils";
import { NoticeExample, Simulator } from "../../../../common/NoticeExample";
import { LicenciementSituation } from "../utils";

type Props = {
  duration: string;
  agreementSituation?: LicenciementSituation;
  legalSituation?: LicenciementSituation;
  note?: string;
};

const DurationResult = ({
  duration,
  agreementSituation,
  legalSituation,
}: Props): JSX.Element => {
  if (legalSituation && legalSituation.duration === 0) {
    if (!agreementSituation) {
      return (
        <>
          <HighlightResult>{duration}</HighlightResult>
          <p>
            Le code du travail ne prévoit pas de durée de préavis de
            licenciement sauf, cas particuliers.
          </p>
        </>
      );
    } else if (agreementSituation.duration === 0) {
      return (
        <>
          <HighlightResult>{duration}</HighlightResult>
          <p>
            Le code du travail et la convention collective ne prévoient pas de
            préavis.
          </p>
        </>
      );
    }
  }
  const note = agreementSituation?.note;
  return (
    <>
      <p>
        À partir des éléments que vous avez saisis, la durée du préavis de
        licenciement est estimée à :{" "}
        <HighlightResult>{duration}</HighlightResult>
        <NoticeNote
          isList
          numberOfElements={calculateNumberOfElements(1, note)}
        />
        .
      </p>
      <NoticeExample
        simulator={Simulator.PREAVIS_LICENCIEMENT}
        period={duration}
        note={
          <NoticeNote
            numberOfElements={calculateNumberOfElements(1, note)}
            currentElement={1}
          />
        }
      />
      {note && (
        <SmallText>
          <NoticeNote
            numberOfElements={calculateNumberOfElements(1, note)}
            currentElement={1 + calculateNumberOfElements(note)}
          />
          {note}
        </SmallText>
      )}
    </>
  );
};

export default DurationResult;
