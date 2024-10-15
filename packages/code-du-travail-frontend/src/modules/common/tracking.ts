import { usePathname } from "next/navigation";
import { sendEvent } from "../utils/events";
import { SITE_URL } from "../../config";

enum CommonCategory {
  SELECTED_RELATED = "selectRelated",
  CLICK_SHARE = "clic_share",
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

  return {
    emitSelectRelated,
    emitClickShare,
  };
};
