// Types purs, sans dépendance Elasticsearch : les composants `"use client"` les
// importent, et `queries.ts` embarque le client ES (serveur) qui ne doit jamais
// entrer dans le bundle client.
export type ExploreTheme = {
  // Slug du sous-thème : clé de rendu et valeur envoyée au tracking.
  slug: string;
  title: string;
  // `/themes/<theme-racine>#<slugify(titre)>` : `/themes/<sous-theme>` répond
  // 200 mais rend une page vide (elle liste les enfants du thème, or un
  // sous-thème feuille n'en a pas).
  href: string;
  // Icône du sous-thème, ou celle du thème racine à défaut : `icon` n'est pas
  // garanti sur un niveau 2.
  iconName?: string;
  // Nombre de contenus rattachés au sous-thème (`refs.length`).
  documentCount: number;
  // Réservé à la future description éditoriale (~100 caractères) ; à défaut la
  // carte affiche « N fiches à consulter ».
  description?: string;
};
