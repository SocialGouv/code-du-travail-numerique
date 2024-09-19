import { NotFound } from "../src/modules/error/NotFound";
import { DsfrLayout } from "../src/modules/layout";

export default function Index() {
  return (
    <DsfrLayout>
      <NotFound />
    </DsfrLayout>
  );
}
