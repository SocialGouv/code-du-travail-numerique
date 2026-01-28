"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { JsonLd } from "./JsonLd";
import {
  buildBreadcrumbListJsonLd,
  BreadcrumbItem,
  JSON_LD_IDS,
} from "./builders";

export function BreadcrumbListJsonLd({
  items,
  currentPageLabel,
}: {
  items: BreadcrumbItem[];
  currentPageLabel: string;
}) {
  const pathname = usePathname() || "/";
  return (
    <JsonLd
      id={JSON_LD_IDS.breadcrumbs}
      data={buildBreadcrumbListJsonLd({
        items,
        currentPageLabel,
        currentPageHref: pathname,
      })}
    />
  );
}
