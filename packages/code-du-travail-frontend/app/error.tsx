"use client";

import { UnexpectedError } from "../src/modules/error/UnexpectedError";
import { DsfrLayout } from "../src/modules/layout";

export default function Error() {
  return (
    <DsfrLayout>
      <UnexpectedError />
    </DsfrLayout>
  );
}
