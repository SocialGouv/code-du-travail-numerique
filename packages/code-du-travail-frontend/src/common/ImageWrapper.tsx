import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import styled from "styled-components";

import { useScrollBlock } from "./hooks";

type Props = {
  altText: string;
  src: string;
};

const ImageWrapper = ({ altText, src }: Props): JSX.Element => {
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
      <StyledImage
        src={src}
        alt={altText}
        onClick={onOpen}
        aria-hidden="true"
      />
      {isOpen && <Lightbox mainSrc={src} onCloseRequest={onClose} />}
    </>
  );
};

const StyledImage = styled.img`
  cursor: zoom-in;
`;

export default ImageWrapper;
