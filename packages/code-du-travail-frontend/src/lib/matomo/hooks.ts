import { push } from "@socialgouv/matomo-next";

export const onRouteChangeStart = (path: string) => {
  const url = new URL(!path.startsWith("https://") ? "https://" + path : path);
  const srcUrl = url.searchParams.get("src_url");
  const srcUrlBasePath = srcUrl ? new URL(srcUrl).origin : null;
  if (srcUrlBasePath) {
    push(["setReferrerUrl", srcUrlBasePath]);
  }
};
