import { useTracking } from "../analytics/events/useTracking";
import { toEventName } from "../analytics/eventName";

type SocialNetwork =
  | "facebook"
  | "twitter"
  | "linkedin"
  | "email"
  | "whatsapp"
  | "copier";

// Events communs à tous les types de page : partage, contenus liés, tags de
// thème. La catégorie (type de page) et le chemin sont injectés par
// `useTracking` — ces émetteurs n'ont donc plus besoin de `usePathname` ni de
// reconstruire une URL.
export const useCommonTracking = () => {
  const { track } = useTracking();

  const emitSelectRelated = (selection: string | undefined) => {
    track("click_related_content", { target: selection });
  };

  const emitClickShare = (socialNetwork: SocialNetwork) => {
    track("click_share", { network: socialNetwork });
  };

  // `themeSlug` est optionnel : un tag peut être rendu avant que son thème soit
  // résolu, et on préfère un event sans la clé `theme` à pas d'event du tout.
  const emitClickThemeTag = (themeSlug?: string) => {
    track("click_theme_tag", {
      theme: themeSlug ? toEventName(themeSlug) : undefined,
    });
  };

  return {
    emitSelectRelated,
    emitClickShare,
    emitClickThemeTag,
  };
};
