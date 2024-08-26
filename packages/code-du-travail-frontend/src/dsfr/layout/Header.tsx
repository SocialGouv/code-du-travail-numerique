"use client";

import { Header as HeaderDsfr } from "@codegouvfr/react-dsfr/Header";
import { usePathname, useRouter } from "next/navigation";
import { SearchInput } from "./SearchInput";
import { Suspense } from "react";
import { BrandTop } from "./BrandTop";
import { homeLinksProps } from "./common";

export const Header = () => {
  const currentPath = usePathname();
  const router = useRouter();

  const onSearchSubmit = (text: string) => {
    router.push(`/recherche?q=${encodeURIComponent(text)}`);
  };

  return (
    <Suspense>
      <HeaderDsfr
        serviceTitle="Code du travail numérique"
        serviceTagline="Toutes les réponses à vos questions sur le droit du travail"
        brandTop={<BrandTop />}
        homeLinkProps={homeLinksProps}
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
        renderSearchInput={({ className, id, placeholder, type }) => (
          <SearchInput
            className={className}
            id={id}
            placeholder={placeholder}
            type={type}
            onSearchSubmit={onSearchSubmit}
          />
        )}
        onSearchButtonClick={onSearchSubmit}
      />
    </Suspense>
  );
};
