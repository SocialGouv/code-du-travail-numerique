import { NpsController } from "../../../src/api/modules/nps/controller";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const controller = new NpsController(request);
  return controller.post();
}
