"use client";

import { useIframeResizer } from "../../common/hooks";

export function WidgetWithIframeResizer({
  children,
}: {
  children: React.ReactNode;
}) {
  useIframeResizer();

  return <>{children}</>;
}
