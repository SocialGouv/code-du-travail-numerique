"use client";

import React from "react";
import { JsonLd } from "./JsonLd";
import {
  buildNewsArticleJsonLd,
  JSON_LD_IDS,
  type NewsArticleImage,
} from "./builders";

export function NewsArticleJsonLd(props: {
  headline: string;
  url: string;
  datePublished?: string;
  publishedTime?: string;
  dateModified?: string;
  description?: string;
  image?: NewsArticleImage;
  citations?: string[];
}) {
  return (
    <JsonLd id={JSON_LD_IDS.newsArticle} data={buildNewsArticleJsonLd(props)} />
  );
}
