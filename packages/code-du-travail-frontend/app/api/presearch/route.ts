import { SearchController } from "src/api";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const controller = new SearchController(request);
  return controller.presearch();
}
