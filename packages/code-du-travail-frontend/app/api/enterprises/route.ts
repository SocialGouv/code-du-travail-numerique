import { EnterprisesAppController } from "../../../src/api/modules/enterprises/controller";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const controller = new EnterprisesAppController(request);
  return controller.get();
}
