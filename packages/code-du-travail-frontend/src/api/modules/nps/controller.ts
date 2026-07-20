import { NextResponse } from "next/server";
import { captureException } from "@sentry/nextjs";
import { z } from "zod";
import { NPS_MAX, NPS_MIN } from "../../../modules/nps/constants";
import { sendNpsEvent } from "./service";

// Corps attendu : uniquement la note, le déclencheur et le slug. L'identité de
// l'event (catégorie Matomo) appartient au serveur (mise en dur, cf. service).
// `strictObject` : tout champ inattendu est rejeté.
const npsBodySchema = z.strictObject({
  score: z.number().int().min(NPS_MIN).max(NPS_MAX),
  slug: z.string(),
});

const jsonError = (status: number, message: string): NextResponse =>
  NextResponse.json(
    { message },
    { status, headers: { "Content-Type": "application/json" } }
  );

export class NpsController {
  private request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  public async post(): Promise<NextResponse> {
    try {
      const body: unknown = await this.request.json().catch(() => undefined);

      const parsed = npsBodySchema.safeParse(body);
      if (!parsed.success) {
        return jsonError(400, "Invalid NPS payload");
      }

      // Relai best-effort vers Matomo (serveur->serveur, invisible des
      // adblockers). Un échec (Matomo lent/down) ne doit ni renvoyer 500 au
      // client fire-and-forget, ni inonder Sentry : on loggue simplement.
      // On transmet le User-Agent du visiteur pour que Matomo voie un vrai
      // navigateur (l'UA par défaut de Node serait classé « bot » → event ignoré).
      const userAgent = this.request.headers.get("user-agent") ?? undefined;
      try {
        await sendNpsEvent({ ...parsed.data, userAgent });
      } catch (relayError) {
        console.warn("[nps] relai Matomo échoué:", relayError);
      }

      return new NextResponse(null, { status: 204 });
    } catch (error) {
      // Erreur inattendue (bug interne) : on capture pour investigation.
      console.error(error);
      captureException(error);
      return jsonError(500, "Internal server error");
    }
  }
}
