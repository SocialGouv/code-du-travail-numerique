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

export const useCommonTracking = () => {
  const currentPageUrl = (SITE_URL + usePathname()) as string;

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
    sendEvent({
      category: CommonCategory.CLICK_THEME_TAG,
      action: currentPageUrl,
      name: themeSlug,
    });
  };

  return {
    emitSelectRelated,
    emitClickShare,
    emitClickThemeTag,
  };
};
