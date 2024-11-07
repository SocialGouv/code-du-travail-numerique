"use client";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";

export const TrackApproval = () => {
  const { isDark } = useIsDark();
  const iframeParams = isDark
    ? "module=CoreAdminHome&action=optOut&language=fr&backgroundColor=161616&fontColor=cecece&fontSize=16px&fontFamily=sans-serif"
    : "module=CoreAdminHome&action=optOut&language=fr&backgroundColor=&fontColor=3a3a3a&fontSize=16px&fontFamily=sans-serif";
  return (
    <iframe
      title="matomo optout"
      style={{ border: 0, width: "100%" }}
      src={`https://matomo.fabrique.social.gouv.fr/index.php?${iframeParams}`}
    />
  );
};
