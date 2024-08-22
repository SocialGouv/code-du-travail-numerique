"use client";

import { HTMLInputTypeAttribute, useState } from "react";

type Props = {
  search: string;
  onSearchChange: (search: string) => void;
  id: string;
  className: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  onSearchSubmit: () => void;
};

export const SearchInput = (props: Props) => {
  const [_inputElement, setInputElement] = useState<HTMLInputElement | null>(
    null
  );

  return (
    <input
      ref={setInputElement}
      className={props.className}
      id={props.id}
      placeholder={props.placeholder}
      type={props.type}
      value={props.search}
      onChange={(event) => props.onSearchChange(event.currentTarget.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          props.onSearchSubmit();
        }
      }}
    />
  );
};
