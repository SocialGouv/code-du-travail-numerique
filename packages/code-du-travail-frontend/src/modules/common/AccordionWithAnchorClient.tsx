"use client";

import React, { useEffect } from "react";
import {
  AccordionWithAnchor,
  Props as AccordionProps,
} from "./AccordionWithAnchor";
import { handleAccordionAnchoring } from "./accordion-anchoring";

export const AccordionWithAnchorClient = (props: AccordionProps) => {
  useEffect(() => {
    const cleanup = handleAccordionAnchoring();
    return cleanup;
  }, []);

  return <AccordionWithAnchor {...props} />;
};
