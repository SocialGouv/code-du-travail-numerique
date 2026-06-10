import { AccordsEnterpriseAppController } from "../../../../../src/api/modules/accords/controller";

export const dynamic = "force-dynamic";

export async function GET(
  _: Request,
  context: { params: Promise<{ siret: string }> }
) {
  const { siret } = await context.params;
  const controller = new AccordsEnterpriseAppController(siret);
  return controller.get();
}
