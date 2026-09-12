import { css } from "@styled-system/css";

/**
 * Grille des deux colonnes.
 *
 * Le bloc « Période de calcul » n'existe qu'**une seule fois** dans le DOM ; il
 * change de place entre mobile et desktop par `gridTemplateAreas`. Le dupliquer
 * derrière `fr-hidden` / `fr-unhidden-md` produirait deux `<fieldset>` portant le
 * même `name` : les radios se répondraient entre elles et les lecteurs d'écran
 * annonceraient deux fois les mêmes libellés.
 *
 * En desktop la période est en tête de la colonne de **gauche**, au-dessus des
 * montants, et non en tête de celle de droite comme dans la maquette. C'est ce
 * qui met l'ordre de tabulation d'accord avec l'ordre de lecture : période,
 * montants, puis paramètres. Logée à droite, elle était atteinte au clavier
 * avant des montants que l'œil lit pourtant en premier, et le focus repartait de
 * la droite vers la gauche.
 *
 * Elle partage le fond de la colonne des résultats, dont elle devient le
 * chapeau : les deux ne forment qu'un bloc bleu, et la colonne grise des
 * paramètres garde toute sa hauteur en face.
 */
export const simulatorGrid = css({
  display: "grid",
  gridTemplateAreas: `"periode" "resultats" "parametres"`,
  gridTemplateColumns: "1fr",
  rowGap: 0,
  md: {
    gridTemplateAreas: `"periode parametres" "resultats parametres"`,
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto 1fr",
    columnGap: "1.5rem",
  },
});

/*
 * Espacements repris de la maquette : 16 px de marge intérieure dans les deux
 * colonnes, 24 px entre deux groupes de champs, 48 px entre deux blocs de la
 * page. C'est ce rythme-là qui était faux — on avait 24 px de marge intérieure,
 * ce qui creusait le vide au-dessus de « Période de calcul ».
 */
export const periodArea = css({
  gridArea: "periode",
  // La période coiffe le simulateur et partage le fond de la colonne résultats,
  // aux deux tailles d'écran : elle vaut pour les quatre montants.
  backgroundColor: "var(--background-alt-blue-france)",
  padding: "1rem",
  // 24 px avant le groupe suivant : les montants en desktop comme en mobile.
  paddingBottom: "1.5rem",
});

/**
 * La période étant juste au-dessus et sur le même fond, pas de marge haute ici :
 * les 24 px de son `paddingBottom` font la séparation.
 */
export const resultsArea = css({
  gridArea: "resultats",
  backgroundColor: "var(--background-alt-blue-france)",
  paddingX: "1rem",
  paddingBottom: "1rem",
});

export const parametersArea = css({
  gridArea: "parametres",
  backgroundColor: "var(--background-contrast-grey)",
  padding: "1rem",
  marginTop: "1rem",
  // Desktop : la colonne démarre à la même hauteur que celle des résultats,
  // sous la bande de période, donc plus de décalage à rattraper.
  md: {
    marginTop: 0,
  },
});

/**
 * Champ montant : l'`<input>` occupe la place disponible, aligné à droite, et le
 * suffixe « € par mois » se colle à sa suite pour que les deux ne forment
 * qu'un seul rectangle.
 */
export const amountInputWrap = css({
  display: "flex",
  alignItems: "stretch",
});

export const amountInput = css({
  flex: "1 1 auto",
  minWidth: 0,
  textAlign: "right",
  paddingRight: "0.25rem!",
  // `fr-input-wrap--addon` repeint l'input en bleu ; on rétablit le trait DSFR
  // standard, que l'état `success` remplacera par le vert.
  boxShadow: "inset 0 -2px 0 0 var(--border-plain-grey)!",
  ".fr-input-group--valid &": {
    boxShadow: "inset 0 -2px 0 0 var(--border-plain-success)!",
  },
});

export const amountSuffix = css({
  display: "flex",
  alignItems: "center",
  flex: "0 0 auto",
  paddingRight: "1rem",
  paddingLeft: 0,
  color: "var(--text-default-grey)",
  backgroundColor: "var(--background-contrast-grey)",
  borderRadius: "0 0.25rem 0 0",
  boxShadow: "inset 0 -2px 0 0 var(--border-plain-grey)",
  ".fr-input-group--valid &": {
    boxShadow: "inset 0 -2px 0 0 var(--border-plain-success)",
  },
});

/**
 * Le message d'état DSFR affiche une coche verte ; la maquette veut un point
 * d'interrogation, porté par l'icône du lien lui-même.
 */
export const contextualMessage = css({
  "&::before": {
    display: "none!",
  },
});

export const contextualMessageLink = css({
  color: "var(--text-default-success)!",
  backgroundImage: "none!",
  textDecoration: "underline",
});

/**
 * Mention de situation sous les quatre montants.
 *
 * Bleu et non gris : la maquette la traite comme un message d'information DSFR,
 * icône et texte compris, avec le jeton `--text-default-info` (#0063CB en thème
 * clair). Le jeton, plutôt que la valeur, pour que le thème sombre suive.
 *
 * Contraste calculé sur `--background-alt-blue-france` : 5,31:1, au-dessus du
 * seuil AA de 4,5 pour du texte normal.
 */
export const inlineNote = css({
  display: "flex",
  alignItems: "flex-start",
  gap: "0.5rem",
  color: "var(--text-default-info)",
});

export const autofillButtons = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
});

/**
 * Liste des cartes de contenus à approfondir.
 *
 * Le média de la première carte est une infographie, pas une photo : le `cover`
 * du DSFR la recadre et n'en montre qu'un coin. La maquette la donne entière,
 * posée sur le même bleu pâle que la colonne des résultats — d'où le `contain`
 * et le fond. Les deux autres cartes n'ont pas de média, la règle ne les touche
 * donc pas.
 */
export const cardList = css({
  listStyle: "none!",
  margin: 0,
  padding: 0,
  /*
   * Le DSFR réserve 3,5 rem sous le contenu d'une carte `sm` à lien élargi, pour
   * y loger la flèche. Nos cartes portent en plus un pied qui tient déjà le
   * libellé du lien, sur la même ligne que cette flèche : la réserve ne sert à
   * rien et laisse un grand vide entre la description et le lien. On la ramène
   * à la marge normale.
   */
  "& .fr-card__content": {
    paddingBottom: "1.5rem!",
  },
  // La flèche du lien élargi est posée en bas à droite du contenu ; sans cette
  // réserve, le libellé passe dessous dès que la colonne de texte est étroite,
  // ce qui arrive en mobile. Le `!` est nécessaire, le DSFR pose déjà une marge
  // intérieure sur ce sélecteur.
  "& .fr-card__footer": {
    paddingRight: "2.5rem!",
  },
  /*
   * La carte reste horizontale à toutes les largeurs, image à gauche et texte à
   * droite, comme la maquette la dessine en mobile comme en desktop. Le DSFR,
   * lui, la fait basculer en colonne sous 48 em.
   */
  "& .fr-card": {
    flexDirection: "row!",
  },
  /*
   * La maquette coupe la carte en deux parts égales ; le DSFR donne 40 % au
   * média. À 50 %, l'illustration retrouve la largeur du Figma.
   *
   * `align-self: flex-start` pour que la colonne du média s'arrête à la hauteur
   * du dessin au lieu de s'étirer sur celle de la carte. Étirée, elle produisait
   * une colonne bleue démesurée dès que les cartes se resserrent : à 768 px de
   * fenêtre, un dessin de 116 × 120 dans un aplat de 116 × 332.
   */
  "& .fr-card__header": {
    flex: "0 0 50%!",
    maxWidth: "50%!",
    alignSelf: "flex-start",
  },
  /*
   * Le média de la première carte est une infographie, posée sur le même bleu
   * pâle que la colonne des résultats, comme dans la maquette.
   *
   * `contain` et non le `cover` du DSFR : l'infographie porte du texte, le
   * rogner la rendrait illisible.
   */
  "& .fr-card__img": {
    backgroundColor: "var(--background-alt-blue-france)",
  },
  /*
   * L'illustration est rendue à son propre rapport, sur toute la largeur du
   * cadre, et rien de plus.
   *
   * Le DSFR impose au média un rapport 16/9 puis rattrape la déformation avec
   * `object-fit: cover`. Sur une infographie presque carrée, ça la rogne : en
   * desktop les bulles latérales étaient coupées, en mobile le dessin se
   * réduisait à un timbre au milieu d'une bande. En rendant les deux
   * contraintes à `auto`, l'image occupe la largeur disponible et déduit sa
   * hauteur — entière aux deux tailles d'écran.
   *
   * C'est aussi pourquoi les textes de `DEEP_DIVE_CARDS` sont courts : en
   * desktop le cadre s'étire sur la hauteur de la plus haute des trois cartes,
   * et tout ce qui dépasse du dessin devient du fond.
   */
  "& .fr-card__img img": {
    aspectRatio: "auto!",
    height: "auto!",
  },
});
