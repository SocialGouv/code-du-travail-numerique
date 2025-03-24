import React from "react";

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
        <sup>
          {isUniq ? (
            <>*</>
          ) : (
            <>
              {Array.from(Array(props.numberOfElements).keys()).map((i) => (
                <span key={i}>({i + 1}) </span>
              ))}
            </>
          )}
        </sup>
      ) : (
        <sup>{isUniq ? <>*</> : <>({props.currentElement}) </>}</sup>
      )}
    </>
  );
};
