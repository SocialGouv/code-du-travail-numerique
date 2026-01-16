"use client";

import React from "react";
import { useNonce } from "../../config/NonceContext";
import { safeJsonStringify } from "./safeJsonStringify";

type Props = {
  id: string;
  data: Record<string, unknown>;
  nonce?: string;
};

export function JsonLd({ id, data, nonce: nonceProp }: Props) {
  const nonceFromContext = useNonce();
  const nonce = nonceProp ?? nonceFromContext;

  return (
    <script
      id={id}
      type="application/ld+json"
      nonce={nonce}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: safeJsonStringify(data) }}
    />
  );
}
