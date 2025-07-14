import React from "react";

export type NoticeNoteProps = {
  isList?: boolean;
  numberOfElements: number;
  currentElement?: number;
  displayUnique?: boolean;
};

export const NoticeNote = (props: NoticeNoteProps) => {
  const isUnique = React.useMemo(
    () => props.numberOfElements === 1,
    [props.numberOfElements]
  );
  return (
    <>
      {props.isList ? (
        <sup>
          {isUnique ? (
            <>{props.displayUnique ? <>(1)</> : <></>}</>
          ) : (
            <>
              {Array.from(Array(props.numberOfElements).keys()).map((i) => (
                <span key={i}>({i + 1}) </span>
              ))}
            </>
          )}
        </sup>
      ) : (
        <sup>
          {isUnique ? (
            <>{props.displayUnique ? <>(1)</> : <></>}</>
          ) : (
            <>({props.currentElement}) </>
          )}
        </sup>
      )}
    </>
  );
};
