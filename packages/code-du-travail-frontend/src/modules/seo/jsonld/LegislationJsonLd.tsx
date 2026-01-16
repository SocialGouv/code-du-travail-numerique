"use client";

import React from "react";
import { JsonLd } from "./JsonLd";
import { buildLegislationJsonLd, JSON_LD_IDS } from "./builders";

export function LegislationJsonLd(props: {
  name: string;
  url: string;
  identifier?: string;
  datePublished?: string;
  isBasedOn?: string;
}) {
  return (
    <JsonLd id={JSON_LD_IDS.legislation} data={buildLegislationJsonLd(props)} />
  );
}
