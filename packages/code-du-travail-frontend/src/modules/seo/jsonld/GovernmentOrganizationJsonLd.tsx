"use client";

import React from "react";
import { JsonLd } from "./JsonLd";
import { buildGovernmentOrganizationJsonLd, JSON_LD_IDS } from "./builders";

export function GovernmentOrganizationJsonLd() {
  return (
    <JsonLd
      id={JSON_LD_IDS.organization}
      data={buildGovernmentOrganizationJsonLd()}
    />
  );
}
