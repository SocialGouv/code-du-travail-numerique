import { usePathname } from "next/navigation";
import { SITE_URL } from "../../config";
import { sendEvent } from "@socialgouv/matomo-next";

enum CommonCategory {
  SELECTED_RELATED = "selectRelated",
  CLICK_SHARE = "clic_share",
  CLICK_THEME_TAG = "clic_tag_theme",
}

type SocialNetwork =
  | "facebook"
  | "twitter"
  | "linkedin"
  | "email"
  | "whatsapp"
  | "copier";

// Slug d'event Matomo = chemin sans le slash initial (`themes/mon-slug`,
// `contribution/mon-slug`) : type de page + slug, sans l'URL complète.
// Harmonisé avec les autres events récents (cf. nps/tracking.ts).
const toEventName = (path: string): string => path.replace(/^\/+/, "");

export const useCommonTracking = () => {
  const pathname = usePathname() ?? "";
  const currentPageUrl = (SITE_URL + pathname) as string;

  const emitSelectRelated = (selection: string | undefined) => {
    sendEvent({
      category: CommonCategory.SELECTED_RELATED,
      action: JSON.stringify({ selection }),
    });
  };

  const emitClickShare = (socialNetwork: SocialNetwork) => {
    sendEvent({
      category: CommonCategory.CLICK_SHARE,
      action: currentPageUrl,
      name: socialNetwork,
    });
  };

  const emitClickThemeTag = (themeSlug: string) => {
    // pathname "/contribution/mon-slug" → source (type de page) + slug du contenu.
    const [, source = "", ...rest] = pathname.split("/");
    sendEvent({
      // category = source de la page (contribution, information, …) ;
      // action = clic_tag_theme ; name = { slug de la page, thème cliqué }.
      category: source,
      action: CommonCategory.CLICK_THEME_TAG,
      name: JSON.stringify({
        slug: rest.join("/"),
        theme: toEventName(themeSlug),
      }),
    });
  };

  return {
    emitSelectRelated,
    emitClickShare,
    emitClickThemeTag,
  };
};
