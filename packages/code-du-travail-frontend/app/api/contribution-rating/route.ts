import { ContributionRatingController } from "../../../src/api/modules/contribution-rating/controller";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const controller = new ContributionRatingController(request);
  return controller.post();
}
