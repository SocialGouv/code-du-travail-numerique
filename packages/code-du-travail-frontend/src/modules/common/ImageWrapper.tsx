"use client";

import React, { useState } from "react";
import Lightbox from "react-image-lightbox";

import { css } from "@styled-system/css";
import useScrollBlock from "../utils/useScrollBlock";

type Props = {
  altText: string;
  src: string;
};

const InfographicWrapper = ({ altText, src }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  const onOpen = () => {
    setIsOpen(true);
    blockScroll();
  };

  const onClose = () => {
    setIsOpen(false);
    allowScroll();
  };

  return (
    <>
      <img
        src={src}
        alt={altText}
        onClick={onOpen}
        aria-hidden="true"
        className={`${ImageZoom}`}
      />
      {isOpen && <Lightbox mainSrc={src} onCloseRequest={onClose} />}
    </>
  );
};

const ImageZoom = css({
  cursor: "zoom-in",
});

export default InfographicWrapper;
