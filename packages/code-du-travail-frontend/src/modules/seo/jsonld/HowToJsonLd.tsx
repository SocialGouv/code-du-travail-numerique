"use client";

import React from "react";
import { JsonLd } from "./JsonLd";
import { buildHowToJsonLd, JSON_LD_IDS } from "./builders";

export function HowToJsonLd(props: {
  name: string;
  description?: string;
  url: string;
  steps: string[];
}) {
  return <JsonLd id={JSON_LD_IDS.howTo} data={buildHowToJsonLd(props)} />;
}
