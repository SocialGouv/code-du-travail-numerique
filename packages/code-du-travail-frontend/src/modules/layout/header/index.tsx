"use client";

import { usePathname, useRouter } from "next/navigation";
import { HeaderDsfr } from "./HeaderDsfr";

export const Header = () => {
  const currentPath = usePathname();
  const router = useRouter();

  const onSearchSubmit = (text: string) => {
    if (text !== "") {
      router.push(`/recherche?q=${encodeURIComponent(text)}`);
    }
  };

  return (
    <HeaderDsfr
      onSearchSubmit={onSearchSubmit}
      navigation={[
        {
          text: "Boîte à outils",
          linkProps: {
            href: "/outils",
          },
          isActive: currentPath === "/outils",
        },
        {
          text: "Modèles de documents",
          linkProps: {
            href: "/modeles-de-courriers",
          },
          isActive: currentPath === "/modeles-de-courriers",
        },
        {
          text: "Vos fiches pratiques",
          linkProps: {
            href: "/contribution",
          },
          isActive: currentPath === "/contribution",
        },
        {
          text: "Votre convention collective",
          linkProps: {
            href: "/convention-collective",
          },
          isActive: currentPath === "/convention-collective",
        },
        {
          text: "Thèmes",
          linkProps: {
            href: "/themes",
          },
          isActive: currentPath === "/themes",
        },
      ]}
    />
  );
};
