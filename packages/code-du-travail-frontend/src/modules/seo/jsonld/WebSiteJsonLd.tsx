"use client";

import React from "react";
import { JsonLd } from "./JsonLd";
import { buildWebSiteWithSearchActionJsonLd, JSON_LD_IDS } from "./builders";

export function WebSiteJsonLd() {
  return (
    <JsonLd
      id={JSON_LD_IDS.website}
      data={buildWebSiteWithSearchActionJsonLd()}
    />
  );
}
