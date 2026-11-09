import { SITE_URL } from "../../src/config";
import { generateWidgetScript } from "../../src/modules/integration/widgetTemplate";

// Généré à la requête : l'URL du site dépend de l'environnement.
export const dynamic = "force-dynamic";

export function GET() {
  return new Response(generateWidgetScript(SITE_URL), {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
