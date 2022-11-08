import { processToHtml } from "../htmlProcess.service";
import React from "react";

export const BlockMarkdown = ({ block }) => {
  const { html: htmlMarkdown } = block;
  return <React.Fragment>{processToHtml(htmlMarkdown) as any}</React.Fragment>;
};
