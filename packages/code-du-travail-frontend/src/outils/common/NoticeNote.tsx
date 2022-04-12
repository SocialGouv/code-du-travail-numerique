import React from "react";
import styled from "styled-components";

export type NoticeNoteProps = {
  isList?: boolean;
  numberOfElements: number;
  currentElement?: number;
};

export const NoticeNote = (props: NoticeNoteProps) => {
  const isUniq = React.useMemo(
    () => props.numberOfElements === 1,
    [props.numberOfElements]
  );
  return (
    <>
      {props.isList ? (
        <StyledSup>
          {isUniq ? (
            <>*</>
          ) : (
            <>
              {Array.from(Array(props.numberOfElements).keys()).map((i) => (
                <>({i + 1}) </>
              ))}
            </>
          )}
        </StyledSup>
      ) : (
        <>
          {isUniq ? (
            <StyledSup>* </StyledSup>
          ) : (
            <StyledSup>({props.currentElement}) </StyledSup>
          )}
        </>
      )}
    </>
  );
};

const StyledSup = styled.sup`
  font-size: 0.8em;
  margin-right: 0.2em;
`;
