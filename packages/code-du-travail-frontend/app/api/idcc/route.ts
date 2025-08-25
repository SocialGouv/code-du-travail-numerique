import { IdccAppController } from "../../../src/api/modules/idcc/controller";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const controller = new IdccAppController(request);
  return controller.get();
}
