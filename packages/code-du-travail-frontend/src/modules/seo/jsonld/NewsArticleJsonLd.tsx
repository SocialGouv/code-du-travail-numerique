"use client";

import React from "react";
import { JsonLd } from "./JsonLd";
import { buildNewsArticleJsonLd, JSON_LD_IDS } from "./builders";

export function NewsArticleJsonLd(props: {
  headline: string;
  url: string;
  datePublished: string;
  description?: string;
}) {
  return (
    <JsonLd id={JSON_LD_IDS.newsArticle} data={buildNewsArticleJsonLd(props)} />
  );
}
