import { SuggestAppController } from "../../../src/api/modules/suggest/controller";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const controller = new SuggestAppController(request);
  return controller.get();
}
