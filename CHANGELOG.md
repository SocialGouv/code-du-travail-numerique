# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.212.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.212.1...v4.212.2) (2026-02-11)


### Bug Fixes

* **agreement:** suppression de la redirection pour les CCs 1031 et 3203 ([#7109](https://github.com/SocialGouv/code-du-travail-numerique/issues/7109)) ([d31b9a3](https://github.com/SocialGouv/code-du-travail-numerique/commit/d31b9a3032825b4dd03945aa4cb149e0f8bd0a8f))





## [4.212.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.212.0...v4.212.1) (2026-02-05)


### Bug Fixes

* **themes:** gestion du `parentTheme` sur la recherche + `external` dans la liste des thèmes ([#7097](https://github.com/SocialGouv/code-du-travail-numerique/issues/7097)) ([4131abc](https://github.com/SocialGouv/code-du-travail-numerique/commit/4131abc9b75cf380b53caa88d04ef2249db8e687))





# [4.212.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.211.0...v4.212.0) (2026-02-04)


### Bug Fixes

* **accessibilité:** amélioration de la popup recherche ([#7089](https://github.com/SocialGouv/code-du-travail-numerique/issues/7089)) ([f1da88e](https://github.com/SocialGouv/code-du-travail-numerique/commit/f1da88ed42bc31b855cc3e513d71c0d3d7e0499e))
* **home:** zone de click sur `La hiérarchie des textes` ([#7090](https://github.com/SocialGouv/code-du-travail-numerique/issues/7090)) ([efd0336](https://github.com/SocialGouv/code-du-travail-numerique/commit/efd033684e13d8ac31450587a55bd4368fa06d1e))


### Features

* **home:** ajout de nouvelles icones pour les thèmes + correctif rgaa ([#7094](https://github.com/SocialGouv/code-du-travail-numerique/issues/7094)) ([bb6cd8f](https://github.com/SocialGouv/code-du-travail-numerique/commit/bb6cd8f653fb8cf3b1d5716d861d0b3fb3222720))
* **home:** changement UI dans la section modèle ([#7093](https://github.com/SocialGouv/code-du-travail-numerique/issues/7093)) ([9713624](https://github.com/SocialGouv/code-du-travail-numerique/commit/97136249d5f9d5ee6c02db8e1232d5980d079fb5))
* **outils:** déplacer la question sur l'arrêt de travail à l'étape ancienneté ([#7092](https://github.com/SocialGouv/code-du-travail-numerique/issues/7092)) ([c927a7e](https://github.com/SocialGouv/code-du-travail-numerique/commit/c927a7eddf176516070b8da16bea5a3a9aee459d))
* **widget:** ajout d'un integrity hash pour l'intégration du `script` ([#7076](https://github.com/SocialGouv/code-du-travail-numerique/issues/7076)) ([ae4160b](https://github.com/SocialGouv/code-du-travail-numerique/commit/ae4160b398bea1d5de6e093142c788e78cb9d7f2))





# [4.211.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.210.0...v4.211.0) (2026-01-29)


### Bug Fixes

* **recherche:** ferme la popup quand on change de lien ([#7083](https://github.com/SocialGouv/code-du-travail-numerique/issues/7083)) ([6bb7615](https://github.com/SocialGouv/code-du-travail-numerique/commit/6bb76158c6f5c199a7552e7c7b1bfd8d4df4964b))


### Features

* **json-ld:** ajout du support `GovernmentOrganization` + `Website` + `Breadcrumbs` + `Legislation` JSON-LD ([#7071](https://github.com/SocialGouv/code-du-travail-numerique/issues/7071)) ([7e71476](https://github.com/SocialGouv/code-du-travail-numerique/commit/7e714763b1f956f914cbca8f171a6ad779ec58cb))
* **lighthouse:** ajout des `urls` qui sont présents dans l'audit + mise en place d'un CI se lançant manuellement ([#7074](https://github.com/SocialGouv/code-du-travail-numerique/issues/7074)) ([1fa6624](https://github.com/SocialGouv/code-du-travail-numerique/commit/1fa66248c0744ce32da420f8882afae9f0c19f9c))
* **outils:** retrait des questions cul de sac ([#7079](https://github.com/SocialGouv/code-du-travail-numerique/issues/7079)) ([90432de](https://github.com/SocialGouv/code-du-travail-numerique/commit/90432de1089bdb49bffb159a6e9ae420bd2d3bd7))





# [4.210.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.209.1...v4.210.0) (2026-01-28)


### Bug Fixes

* **csp:** ajout des domaines pour l'ouverture de liens externes dans l'outil brut/net ([#7070](https://github.com/SocialGouv/code-du-travail-numerique/issues/7070)) ([d35a47e](https://github.com/SocialGouv/code-du-travail-numerique/commit/d35a47e4a03ed541d4ef95358f36b26f66976b72))
* **e2e:** renommage d'un modèle de courrier ([#7078](https://github.com/SocialGouv/code-du-travail-numerique/issues/7078)) ([e383fe8](https://github.com/SocialGouv/code-du-travail-numerique/commit/e383fe8d32dbad7ddf0e0bb0e5337a0ce3923b23))
* **next:** correction de l'erreur empêchant next de fonctionner en v16.1 ([#7064](https://github.com/SocialGouv/code-du-travail-numerique/issues/7064)) ([6fe5d2e](https://github.com/SocialGouv/code-du-travail-numerique/commit/6fe5d2e2e690284fad3431b82757f46887eb98d1))
* **recherche:** utilisation de la recherche v2 par défaut en supprimant l'AB testing + accessibilité ([#7077](https://github.com/SocialGouv/code-du-travail-numerique/issues/7077)) ([7e54e6b](https://github.com/SocialGouv/code-du-travail-numerique/commit/7e54e6b9203b7b69d86b05b9ebe50814eeff0d86))


### Features

* **mattermost:** ajout d'un message après une release ([#7080](https://github.com/SocialGouv/code-du-travail-numerique/issues/7080)) ([9812f51](https://github.com/SocialGouv/code-du-travail-numerique/commit/9812f519b1e2ae67be4226efb22891afd6fac297))
* **modeles-de-courrier:** mise en place du nouveau layout ([#7072](https://github.com/SocialGouv/code-du-travail-numerique/issues/7072)) ([e4e2280](https://github.com/SocialGouv/code-du-travail-numerique/commit/e4e22802b342fcbbd03945e3c54a9118cbe453e7))
* **search:** use same results for presearch modal and actual search ([#7061](https://github.com/SocialGouv/code-du-travail-numerique/issues/7061)) ([03ba96f](https://github.com/SocialGouv/code-du-travail-numerique/commit/03ba96f9d935bee96d3f3d6721cb33aef7dae656))
* **theme:** nouveau design de pages thèmes ([#7073](https://github.com/SocialGouv/code-du-travail-numerique/issues/7073)) ([7cb63a5](https://github.com/SocialGouv/code-du-travail-numerique/commit/7cb63a5a36eb9e4711f466ee020da183b5efe390))
* **utils:** ajout du `naf` et des redirections `idcc` dans le package partagé ([#7075](https://github.com/SocialGouv/code-du-travail-numerique/issues/7075)) ([ac898bb](https://github.com/SocialGouv/code-du-travail-numerique/commit/ac898bb5363514ab1ef1c831f55f54d5ac6c4c2c))





## [4.209.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.209.0...v4.209.1) (2026-01-16)


### Bug Fixes

* **rgaa:** modification de la déclaration d'accessibilité suite aux modifications editoriales ([#7068](https://github.com/SocialGouv/code-du-travail-numerique/issues/7068)) ([1a84048](https://github.com/SocialGouv/code-du-travail-numerique/commit/1a84048736104073beaa1e953d9051242d985122))





# [4.209.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.208.2...v4.209.0) (2026-01-15)


### Bug Fixes

* **accessibility:** ajout d'un title si manquant sur les liens ([#7067](https://github.com/SocialGouv/code-du-travail-numerique/issues/7067)) ([14388fe](https://github.com/SocialGouv/code-du-travail-numerique/commit/14388fe1599bc0b31c76eebe8b4f7c2339de21f8))
* **rupture-co:** prendre en compte le minimum d'ancienneté conventionnel ([#7062](https://github.com/SocialGouv/code-du-travail-numerique/issues/7062)) ([a9559fd](https://github.com/SocialGouv/code-du-travail-numerique/commit/a9559fd875de5cf3076df1ed31ba2cf983927a0e))


### Features

* **quoi-de-neuf:** ajout de la page permettant d'ajouter les éléments par les admins ([#7048](https://github.com/SocialGouv/code-du-travail-numerique/issues/7048)) ([50c1547](https://github.com/SocialGouv/code-du-travail-numerique/commit/50c1547aa4be2c6b442bbcb7162ef189829f4818))


### Reverts

* Revert "fix(next): upgrade new version + react de `peerDep` à `devDep` (#7060)" ([ccf3d4f](https://github.com/SocialGouv/code-du-travail-numerique/commit/ccf3d4f8ed1c68acfaf1daed267f0f8953f6d5bb)), closes [#7060](https://github.com/SocialGouv/code-du-travail-numerique/issues/7060)





## [4.208.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.208.1...v4.208.2) (2026-01-13)


### Bug Fixes

* **next:** upgrade new version + react de `peerDep` à `devDep` ([#7060](https://github.com/SocialGouv/code-du-travail-numerique/issues/7060)) ([9a20e75](https://github.com/SocialGouv/code-du-travail-numerique/commit/9a20e75bbeadb00168b5aca60df26765d189cee4))





## [4.208.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.208.0...v4.208.1) (2026-01-12)


### Bug Fixes

* **accessibility:** correction d'un lien mort ([63b251d](https://github.com/SocialGouv/code-du-travail-numerique/commit/63b251db196aef12728563db90e559735df788df))





# [4.208.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.207.2...v4.208.0) (2026-01-09)


### Bug Fixes

* **accessibility:** changement de l'accessibilité suite à un retour utilisateur ([#7055](https://github.com/SocialGouv/code-du-travail-numerique/issues/7055)) ([71fbd14](https://github.com/SocialGouv/code-du-travail-numerique/commit/71fbd14bc48f600ed3ae63d8b6ceef98a0478000))
* corrections sur les tests e2e de service public et indemnité licenciement ([#7053](https://github.com/SocialGouv/code-du-travail-numerique/issues/7053)) ([e06ffdc](https://github.com/SocialGouv/code-du-travail-numerique/commit/e06ffdcf40cd3fc52d85afedb5bc83ef00868885))


### Features

* **home:** amélioration de la page d'accueil ([#7050](https://github.com/SocialGouv/code-du-travail-numerique/issues/7050)) ([d3120e3](https://github.com/SocialGouv/code-du-travail-numerique/commit/d3120e31dee0843421d3faf6e244654654333ace))
* **quoi-de-neuf:** ajout du contenu pour décembre 2025 ([#7052](https://github.com/SocialGouv/code-du-travail-numerique/issues/7052)) ([dcd7165](https://github.com/SocialGouv/code-du-travail-numerique/commit/dcd716565ab5db2df4a2cb63b9e69d1b2cfad3d0))
* **tools:** changement du wording sur les outils externes ([#7054](https://github.com/SocialGouv/code-du-travail-numerique/issues/7054)) ([f7e2e7b](https://github.com/SocialGouv/code-du-travail-numerique/commit/f7e2e7b31015a185d842573ca48e178259b99d71))





## [4.207.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.207.1...v4.207.2) (2026-01-07)


### Bug Fixes

* **source:** ajout de la source `what-is-new` pour la page `Quoi de Neuf ?` ([#7051](https://github.com/SocialGouv/code-du-travail-numerique/issues/7051)) ([a0810b3](https://github.com/SocialGouv/code-du-travail-numerique/commit/a0810b35e6ecdc172b01f08c4bf24c7e30aa1d05))





## [4.207.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.207.0...v4.207.1) (2025-12-29)


### Bug Fixes

* **events:** uniformisation des calls via la fonction `sendEvent` au lieu du `matopush` + correction sur la `value` ([#7042](https://github.com/SocialGouv/code-du-travail-numerique/issues/7042)) ([b451266](https://github.com/SocialGouv/code-du-travail-numerique/commit/b4512667d273ede849faaaab24ebcd233498974f))
* **recherche:** mise en place de 8 résultats de presearch au lieu des 4 initiaux ([#7047](https://github.com/SocialGouv/code-du-travail-numerique/issues/7047)) ([0e0048a](https://github.com/SocialGouv/code-du-travail-numerique/commit/0e0048a08586a4cd233862acd8153903147e5c78))





# [4.207.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.206.2...v4.207.0) (2025-12-18)


### Bug Fixes

* **dares:** ajout des redirections du mois de décembre ([#7021](https://github.com/SocialGouv/code-du-travail-numerique/issues/7021)) ([bd41793](https://github.com/SocialGouv/code-du-travail-numerique/commit/bd417938611053a94170b1f31abc5efe3e169b07))
* **h1:** suppression du `h1` sur les modal, pour avoir un `role: heading` à la place ([#6956](https://github.com/SocialGouv/code-du-travail-numerique/issues/6956)) ([4326e7e](https://github.com/SocialGouv/code-du-travail-numerique/commit/4326e7e3c7c0fe8da34ace38c5b52b53fc99f889))
* **infographie:** correctifs RGAA sur les pages infographies ([#7041](https://github.com/SocialGouv/code-du-travail-numerique/issues/7041)) ([08f7357](https://github.com/SocialGouv/code-du-travail-numerique/commit/08f7357395d91ddde63f7a6f095bea526dcbca53))
* **vuln:** upgrade yaml lib ([#7031](https://github.com/SocialGouv/code-du-travail-numerique/issues/7031)) ([c8cf1c0](https://github.com/SocialGouv/code-du-travail-numerique/commit/c8cf1c074e0080f07171e20ee03de94d3a66a48b))
* **widget:** possibilité de switch entre les modèles de courrier + permission pour copier un modèle ([#7040](https://github.com/SocialGouv/code-du-travail-numerique/issues/7040)) ([26059f6](https://github.com/SocialGouv/code-du-travail-numerique/commit/26059f690d27ad3db440e4c35da85f46e238e38e))


### Features

* **infographie:** ajout des infographie dans les contributions ([#7029](https://github.com/SocialGouv/code-du-travail-numerique/issues/7029)) ([bb84117](https://github.com/SocialGouv/code-du-travail-numerique/commit/bb8411797bbc22ade0f2462839f5ec26e999950c))





## [4.206.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.206.1...v4.206.2) (2025-12-16)


### Bug Fixes

* **ab-testing:** do not send event when we load a widget ([#7020](https://github.com/SocialGouv/code-du-travail-numerique/issues/7020)) ([aee9492](https://github.com/SocialGouv/code-du-travail-numerique/commit/aee9492617c66830013173c7379b72e70b9343ab))
* quoi de neuf design ([#7001](https://github.com/SocialGouv/code-du-travail-numerique/issues/7001)) ([a5f4149](https://github.com/SocialGouv/code-du-travail-numerique/commit/a5f41498914d10da5d250de3a3444284fc7e2b97))





## [4.206.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.206.0...v4.206.1) (2025-12-15)


### Bug Fixes

* **cookie:** utilisation du bandeau sur l'ensemble du site ([#7017](https://github.com/SocialGouv/code-du-travail-numerique/issues/7017)) ([fc58bee](https://github.com/SocialGouv/code-du-travail-numerique/commit/fc58bee7ac618f15642c74d8a649b88cdd084c75))
* **docker:** try to optimize build time and caching ([#7015](https://github.com/SocialGouv/code-du-travail-numerique/issues/7015)) ([9b8db9c](https://github.com/SocialGouv/code-du-travail-numerique/commit/9b8db9c9d236b4a5ff208f54830e2c2410422d89))





# [4.206.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.205.1...v4.206.0) (2025-12-15)


### Bug Fixes

* **search:** enable all presearch classes by default ([#7014](https://github.com/SocialGouv/code-du-travail-numerique/issues/7014)) ([f0f8edb](https://github.com/SocialGouv/code-du-travail-numerique/commit/f0f8edbe3499267abde6e1891972731657ee6088))


### Features

* **package-manager:** remplacement de `yarn` par `pnpm` ([#6955](https://github.com/SocialGouv/code-du-travail-numerique/issues/6955)) ([8c794f3](https://github.com/SocialGouv/code-du-travail-numerique/commit/8c794f3ecd36449c61eb5b06f8a2d256991711c5))





## [4.205.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.205.0...v4.205.1) (2025-12-12)


### Bug Fixes

* bug heatmap not loading immediately on consent approval ([#7003](https://github.com/SocialGouv/code-du-travail-numerique/issues/7003)) ([26b891a](https://github.com/SocialGouv/code-du-travail-numerique/commit/26b891a7a76df8127e08ca6508b2e7c87c64d82f))
* **tracking:** add data in name instead of value which is a Number ([fccf3f1](https://github.com/SocialGouv/code-du-travail-numerique/commit/fccf3f1b8679ec00b5658290713a05756948e267))





# [4.205.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.204.6...v4.205.0) (2025-12-11)


### Bug Fixes

* **presearch:** fix issue with rupture co ([#7002](https://github.com/SocialGouv/code-du-travail-numerique/issues/7002)) ([7c09d28](https://github.com/SocialGouv/code-du-travail-numerique/commit/7c09d28ac03a63b7475605d2a1764ab12e3d8186))


### Features

* **recherche:** ajout du nouveau parcours de recherche ([#6954](https://github.com/SocialGouv/code-du-travail-numerique/issues/6954)) ([73a2942](https://github.com/SocialGouv/code-du-travail-numerique/commit/73a2942a4b38f6d59048509cc90c1662fd546f80))





## [4.204.6](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.204.5...v4.204.6) (2025-12-10)


### Bug Fixes

* **actions:** set informations in package.json for publishing to npm ([6379b1c](https://github.com/SocialGouv/code-du-travail-numerique/commit/6379b1c58c4ccc685dec9fea3ed6d7ed8acfea81))





## [4.204.5](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.204.4...v4.204.5) (2025-12-10)


### Bug Fixes

* **ci:** publishing to npm ([86bde9b](https://github.com/SocialGouv/code-du-travail-numerique/commit/86bde9b6c416be9f1f6b48919d3605176dd4906a))





## [4.204.4](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.204.3...v4.204.4) (2025-12-10)


### Bug Fixes

* **ci:** use npx for running lerna ([fe4fdfa](https://github.com/SocialGouv/code-du-travail-numerique/commit/fe4fdfa259955bfe1ed065167b60a3436d49c5f7))
* **ci:** use npx for running lerna ([455590f](https://github.com/SocialGouv/code-du-travail-numerique/commit/455590f3163c249d36c9e482cec1251fb384dd4e))





## [4.204.3](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.204.2...v4.204.3) (2025-12-10)


### Bug Fixes

* **actions:** use latest npm for pushing oidc ([25ae944](https://github.com/SocialGouv/code-du-travail-numerique/commit/25ae944f70d65a518a394c73487f2d260eaae345))
* **yarn:** upgrade to v4 ([#6998](https://github.com/SocialGouv/code-du-travail-numerique/issues/6998)) ([93f19b7](https://github.com/SocialGouv/code-du-travail-numerique/commit/93f19b742008166d991b89dac57185c9433ab6ee))





## [4.204.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.204.1...v4.204.2) (2025-12-10)


### Bug Fixes

* **ci:** Update permissions in release.yml ([98d86c8](https://github.com/SocialGouv/code-du-travail-numerique/commit/98d86c8e6be1f945cb461177a435702aecd4de81))





## [4.204.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.204.0...v4.204.1) (2025-12-10)


### Bug Fixes

* **article-code-du-travail:** correction du test e2e ([#6994](https://github.com/SocialGouv/code-du-travail-numerique/issues/6994)) ([8452a50](https://github.com/SocialGouv/code-du-travail-numerique/commit/8452a5053142d14ca6d85854a72cadbafc9b6af1))
* **lerna:** upgrade to v9 for OIDC npm publishing ([#6996](https://github.com/SocialGouv/code-du-travail-numerique/issues/6996)) ([ac41db9](https://github.com/SocialGouv/code-du-travail-numerique/commit/ac41db95ceea500fa150709324f04bd5d4001554))





# [4.204.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.203.0...v4.204.0) (2025-12-09)


### Bug Fixes

* bug recherche CC vers legi ([#6952](https://github.com/SocialGouv/code-du-travail-numerique/issues/6952)) ([b49f313](https://github.com/SocialGouv/code-du-travail-numerique/commit/b49f313a7a6c91384fc215f464dc5ee52ec536fb))
* **infographie:** correction des tests e2e ([#6959](https://github.com/SocialGouv/code-du-travail-numerique/issues/6959)) ([13f301e](https://github.com/SocialGouv/code-du-travail-numerique/commit/13f301e3424e3d889cec195547a256290fc8f13e))
* **quoi-de-neuf:** correction d'un test e2e ([d346c0d](https://github.com/SocialGouv/code-du-travail-numerique/commit/d346c0d3bbb829d98945f943388772a1166cd036))
* **quoi-de-neuf:** correction d'un typo + manque une semaine ([#6992](https://github.com/SocialGouv/code-du-travail-numerique/issues/6992)) ([3d7b593](https://github.com/SocialGouv/code-du-travail-numerique/commit/3d7b59303a9daac52f48d07322fbb39783f2e090))
* **quoi-de-neuf:** correction de typo sur le Code du travail ([#6993](https://github.com/SocialGouv/code-du-travail-numerique/issues/6993)) ([0a3b626](https://github.com/SocialGouv/code-du-travail-numerique/commit/0a3b6269aa04e007462057fb52c76876a9767c52))
* **simulateurs:** modification des liens dans la page d'introduction ([#6951](https://github.com/SocialGouv/code-du-travail-numerique/issues/6951)) ([5632212](https://github.com/SocialGouv/code-du-travail-numerique/commit/56322123dd2078f77ccdb743d349a6b488c478da))
* **themes:** ajout des thèmes principaux éléments manquants ([#6984](https://github.com/SocialGouv/code-du-travail-numerique/issues/6984)) ([f683d94](https://github.com/SocialGouv/code-du-travail-numerique/commit/f683d94838250c7f4dce2858433e332b63515f1b))
* **themes:** changement des sous-liens du menu suite à la MAJ des themes ([#6990](https://github.com/SocialGouv/code-du-travail-numerique/issues/6990)) ([6bfa983](https://github.com/SocialGouv/code-du-travail-numerique/commit/6bfa98379bf75f28cfebf13c7db884e8180da1c7))


### Features

* 6914 quoi de neuf sur le cdtn ([#6946](https://github.com/SocialGouv/code-du-travail-numerique/issues/6946)) ([a40c2d4](https://github.com/SocialGouv/code-du-travail-numerique/commit/a40c2d4f6dda3376da6171e87bcfe1af419bc56e))
* 6960 modification bandeau cookies ([#6973](https://github.com/SocialGouv/code-du-travail-numerique/issues/6973)) ([c0d66b0](https://github.com/SocialGouv/code-du-travail-numerique/commit/c0d66b09d698983982eec956b2d1a8679ceb97ec))





# [4.203.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.202.0...v4.203.0) (2025-12-02)


### Bug Fixes

* **home:** correction du lien sur l'infographie ([#6950](https://github.com/SocialGouv/code-du-travail-numerique/issues/6950)) ([832b289](https://github.com/SocialGouv/code-du-travail-numerique/commit/832b289cb74a483147874b2a47847877f0af51b2))


### Features

* **accessibility:** ajout d'un outil dans les pages auditées ([#6945](https://github.com/SocialGouv/code-du-travail-numerique/issues/6945)) ([3c7e3d0](https://github.com/SocialGouv/code-du-travail-numerique/commit/3c7e3d0f87194d8748592ddb4ac1a845ba45b7ba))
* **heatmap:** ajout des pages d'infographie à la heatmap ([#6957](https://github.com/SocialGouv/code-du-travail-numerique/issues/6957)) ([deb80d7](https://github.com/SocialGouv/code-du-travail-numerique/commit/deb80d74496e861dadcd255bb819cf40dd7afa10))
* **theme:** partage des icones des thèmes avec l'admin ([#6953](https://github.com/SocialGouv/code-du-travail-numerique/issues/6953)) ([757f9cd](https://github.com/SocialGouv/code-du-travail-numerique/commit/757f9cdf76bd765f7cf7dfa8735d63009590222a))





# [4.202.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.201.0...v4.202.0) (2025-11-27)


### Bug Fixes

* **indemnite-licenciement:** gestion de l'inaptitude pour la CC particulier employeur ([#6940](https://github.com/SocialGouv/code-du-travail-numerique/issues/6940)) ([26ced5f](https://github.com/SocialGouv/code-du-travail-numerique/commit/26ced5f8ab15c7e2c0d37618473e47da7dc91eb9))


### Features

* **home:** ajout de la section `De la question à l'action` ([#6927](https://github.com/SocialGouv/code-du-travail-numerique/issues/6927)) ([d137fa3](https://github.com/SocialGouv/code-du-travail-numerique/commit/d137fa352dd977fc18110fcb6ec685b6762fc81b))
* **infographics:** ajout des infographies sur le front ([#6911](https://github.com/SocialGouv/code-du-travail-numerique/issues/6911)) ([10abd21](https://github.com/SocialGouv/code-du-travail-numerique/commit/10abd218351bc2aac34e6360831648893ee94870))





# [4.201.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.200.0...v4.201.0) (2025-11-20)


### Features

* **redirection:** ajout des redirections suite à la mise à jour de la DARES ([#6932](https://github.com/SocialGouv/code-du-travail-numerique/issues/6932)) ([88b3055](https://github.com/SocialGouv/code-du-travail-numerique/commit/88b3055cc5f414348be2551149516cea82b139e6))





# [4.200.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.199.0...v4.200.0) (2025-11-20)


### Bug Fixes

* sentry localstorage error not available ([#6923](https://github.com/SocialGouv/code-du-travail-numerique/issues/6923)) ([f4c6949](https://github.com/SocialGouv/code-du-travail-numerique/commit/f4c69492416ed2a2ce8f13dce7eefe0d1e2896ec))


### Features

* **analytics:** improve cookie banner configuration ([#6937](https://github.com/SocialGouv/code-du-travail-numerique/issues/6937)) ([54b8b0c](https://github.com/SocialGouv/code-du-travail-numerique/commit/54b8b0c788e3b68c591774943d157afd6355b63d))
* print error message ([#6928](https://github.com/SocialGouv/code-du-travail-numerique/issues/6928)) ([67b3d6c](https://github.com/SocialGouv/code-du-travail-numerique/commit/67b3d6c01cce8c0ec24629d36335e4c5130e670d))





# [4.199.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.198.0...v4.199.0) (2025-11-19)


### Features

* **heatmap:** activation de la carte de chaleur sur la page d'accueil ([01bb41c](https://github.com/SocialGouv/code-du-travail-numerique/commit/01bb41c0ffd7119be75f7169eeb247ee3f5761e7))





# [4.198.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.197.0...v4.198.0) (2025-11-17)


### Bug Fixes

* **information:** correction du `hn` au niveau des références ([#6918](https://github.com/SocialGouv/code-du-travail-numerique/issues/6918)) ([070f08a](https://github.com/SocialGouv/code-du-travail-numerique/commit/070f08aab3e62ab97e01ec72233f91689c795333))


### Features

* **contributions:** ajout de la nouvelle page avec le nouveau layout ([#6913](https://github.com/SocialGouv/code-du-travail-numerique/issues/6913)) ([7ad21d7](https://github.com/SocialGouv/code-du-travail-numerique/commit/7ad21d7b7c81c630b7f5d890d15ba51a4a670ceb))
* **home:** ajout de la section "Comprendre le droit du travail"  ([#6924](https://github.com/SocialGouv/code-du-travail-numerique/issues/6924)) ([37d6795](https://github.com/SocialGouv/code-du-travail-numerique/commit/37d6795425683c6e531441c4b0a09c33ce23e239))
* **next:** upgrade en version 16 + upgrade en version 19 de react ([#6921](https://github.com/SocialGouv/code-du-travail-numerique/issues/6921)) ([6710acd](https://github.com/SocialGouv/code-du-travail-numerique/commit/6710acdc3ca6b5812be87b3f7b5d143ce55f2b3b))





# [4.197.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.196.1...v4.197.0) (2025-10-30)


### Bug Fixes

* **accessibilite:** modification de la page suite à l'audit ([#6905](https://github.com/SocialGouv/code-du-travail-numerique/issues/6905)) ([fb7b869](https://github.com/SocialGouv/code-du-travail-numerique/commit/fb7b869cc0bdc4dfd4ea3cacc28753cd449b6952))
* **indemnite-licenciement:** mise à jour des références légales ([#6909](https://github.com/SocialGouv/code-du-travail-numerique/issues/6909)) ([2f87be6](https://github.com/SocialGouv/code-du-travail-numerique/commit/2f87be6d3f38ede3f3a1950bdb528f74be03b3cc))
* **outils:** Ajout de deux sections distinctes sur la page listant les outils ([#6907](https://github.com/SocialGouv/code-du-travail-numerique/issues/6907)) ([57e9a1b](https://github.com/SocialGouv/code-du-travail-numerique/commit/57e9a1bd04e8fa239e8057db5600213bbaebedcf))
* **références:** ne pas afficher le Convention collective : pour les références external ([#6904](https://github.com/SocialGouv/code-du-travail-numerique/issues/6904)) ([82d5849](https://github.com/SocialGouv/code-du-travail-numerique/commit/82d5849b28058c28953bb788a78236cba7b19b2d))
* **simulateurs:** corrections de références juridiques ([#6900](https://github.com/SocialGouv/code-du-travail-numerique/issues/6900)) ([8cd4218](https://github.com/SocialGouv/code-du-travail-numerique/commit/8cd4218d952326fbf2991d4e6fa78f767bd08351))


### Features

* **menu:** ajout des sous-sections sur le menu ([#6887](https://github.com/SocialGouv/code-du-travail-numerique/issues/6887)) ([1c93c3d](https://github.com/SocialGouv/code-du-travail-numerique/commit/1c93c3d4974e4eca257f3648bb64d2dbbf847241))





## [4.196.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.196.0...v4.196.1) (2025-10-24)


### Bug Fixes

* **rgaa:** correction du focus sur le modifier des pages contributions ([#6899](https://github.com/SocialGouv/code-du-travail-numerique/issues/6899)) ([0f1f666](https://github.com/SocialGouv/code-du-travail-numerique/commit/0f1f666099bb21d22757e4ed17698f7e7bf0d565))





# [4.196.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.195.1...v4.196.0) (2025-10-23)


### Features

* **infographics:** ajout de la source infographies sur le frontend ([#6898](https://github.com/SocialGouv/code-du-travail-numerique/issues/6898)) ([5c5abb3](https://github.com/SocialGouv/code-du-travail-numerique/commit/5c5abb388eb5852957d11d6b6d6649a117995cb5))





## [4.195.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.195.0...v4.195.1) (2025-10-21)


### Bug Fixes

* **actions:** versioning via le .node-version ([#6896](https://github.com/SocialGouv/code-du-travail-numerique/issues/6896)) ([3940837](https://github.com/SocialGouv/code-du-travail-numerique/commit/3940837af724b570c6739a5b5e4ea1bd6399be26))
* **autocomplete:** utilisation d'un `id` spécifique pour un champ ([#6897](https://github.com/SocialGouv/code-du-travail-numerique/issues/6897)) ([b979f15](https://github.com/SocialGouv/code-du-travail-numerique/commit/b979f1534ac8a343ea1d52a705bcbbf37aba9593))





# [4.195.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.194.0...v4.195.0) (2025-10-21)


### Bug Fixes

* **accessibilité:** dernier retours sur différentes pages ([#6893](https://github.com/SocialGouv/code-du-travail-numerique/issues/6893)) ([9468ad2](https://github.com/SocialGouv/code-du-travail-numerique/commit/9468ad2e4a817f4df190002ec275ba119078c023))
* **convention-collective:** ajout de clarté sur les messages en cas de conventions collectives non supportées ([#6886](https://github.com/SocialGouv/code-du-travail-numerique/issues/6886)) ([a476de1](https://github.com/SocialGouv/code-du-travail-numerique/commit/a476de16c5b36e009f988efd6852b951a7b04524))
* **matomo:** utilisation du mot query dans la recherche ([#6895](https://github.com/SocialGouv/code-du-travail-numerique/issues/6895)) ([fc0f856](https://github.com/SocialGouv/code-du-travail-numerique/commit/fc0f85619e1047bf3cf4f90db38f59cc7cfac88c))


### Features

* **node:** upgrade to version 24 ([#6888](https://github.com/SocialGouv/code-du-travail-numerique/issues/6888)) ([f99633b](https://github.com/SocialGouv/code-du-travail-numerique/commit/f99633b82f2f1dc1d333290931b7d85298f9f16d))





# [4.194.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.193.2...v4.194.0) (2025-10-15)


### Bug Fixes

* 6820 simu precarite   erreur dineligibilite ([#6834](https://github.com/SocialGouv/code-du-travail-numerique/issues/6834)) ([35dd5db](https://github.com/SocialGouv/code-du-travail-numerique/commit/35dd5db5f47a3bc12834c84e1c05b34a66f02160))
* **naming:** remplacement de `service-public.fr` par `service-public.gouv.fr` ([#6868](https://github.com/SocialGouv/code-du-travail-numerique/issues/6868)) ([f93c118](https://github.com/SocialGouv/code-du-travail-numerique/commit/f93c118b55731e771d42cbd63123e9a919648c86))
* **rupture-conventionnelle:** correction de retours rgaa (`hn` sur l'ensemble des pages ; responsive sur le composant `Absence` ; `aria-describedby` sur les radios buttons) ([#6875](https://github.com/SocialGouv/code-du-travail-numerique/issues/6875)) ([6cb8b20](https://github.com/SocialGouv/code-du-travail-numerique/commit/6cb8b20954a910671053ed9003e901a0764bd351))
* **tally:** suppression du bandeau de la campagne des retours utilisateurs ([#6885](https://github.com/SocialGouv/code-du-travail-numerique/issues/6885)) ([9c9060e](https://github.com/SocialGouv/code-du-travail-numerique/commit/9c9060ee4e3ba4ab73cd51db8b635adf714152c0))


### Features

* **matomo:** upgrade to the latest version which support `app` folder ([#6863](https://github.com/SocialGouv/code-du-travail-numerique/issues/6863)) ([70e16c6](https://github.com/SocialGouv/code-du-travail-numerique/commit/70e16c6876b266affef1f848e16a5d94f6683427))





## [4.193.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.193.1...v4.193.2) (2025-10-08)


### Bug Fixes

* **accessibilité:** amélioration du header ([#6776](https://github.com/SocialGouv/code-du-travail-numerique/issues/6776)) ([1bff375](https://github.com/SocialGouv/code-du-travail-numerique/commit/1bff37568e3c5d6314508374dd51dc145ccd4cdd))
* **analytics:** force en dynamic la page recherche ([#6877](https://github.com/SocialGouv/code-du-travail-numerique/issues/6877)) ([59cfefb](https://github.com/SocialGouv/code-du-travail-numerique/commit/59cfefb3d38c0a1bace181e2c6113bc3ca32ec7a))





## [4.193.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.193.0...v4.193.1) (2025-10-02)


### Bug Fixes

* **analytics:** utilisation du mot clé query pour les recherches ([a5eccf8](https://github.com/SocialGouv/code-du-travail-numerique/commit/a5eccf8c97f79f85029ddffe0047e01e1a045323))





# [4.193.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.192.0...v4.193.0) (2025-10-02)


### Bug Fixes

* **accessibilité:** ajout d'un role sur le footer ([#6847](https://github.com/SocialGouv/code-du-travail-numerique/issues/6847)) ([76695d8](https://github.com/SocialGouv/code-du-travail-numerique/commit/76695d809c28e1c54639cc480e1224f5faf8eeb6))
* **accessibilité:** ajout du correctif sur l'underline pour la page droit-du-travail pour le nom ([8642170](https://github.com/SocialGouv/code-du-travail-numerique/commit/8642170ce0f3c86b60a77897166e30c3e997d7bd))
* **accessibilité:** correction des retours sur la gestion des focus (règle 12.8) ([#6848](https://github.com/SocialGouv/code-du-travail-numerique/issues/6848)) ([e808113](https://github.com/SocialGouv/code-du-travail-numerique/commit/e80811382e8deea120615df9701524dfb4ffa904))
* **accessibilité:** fichiers PDF en téléchargement non accessible sur la page statistique (règle 13.3) ([#6852](https://github.com/SocialGouv/code-du-travail-numerique/issues/6852)) ([71f6f7d](https://github.com/SocialGouv/code-du-travail-numerique/commit/71f6f7d1ecfc29837459b5bfa5601b630621de2e))
* **accessibilité:** mauvais `hn` sur le titre des infographies ([#6853](https://github.com/SocialGouv/code-du-travail-numerique/issues/6853)) ([df463c1](https://github.com/SocialGouv/code-du-travail-numerique/commit/df463c1cb5db2d82a883c733abd661f24fbd46aa))


### Features

* **questionnaire:** retrait de la croix pour fermer le bandeau ([150dd01](https://github.com/SocialGouv/code-du-travail-numerique/commit/150dd018dd9f29279125c1f06368e6ded92dedba))





# [4.192.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.191.0...v4.192.0) (2025-09-26)


### Bug Fixes

* **accessibilité:** ajout d'un fieldset sur les champs complexes (règle 11.5) [#6845](https://github.com/SocialGouv/code-du-travail-numerique/issues/6845) ([28acfc3](https://github.com/SocialGouv/code-du-travail-numerique/commit/28acfc3d4f7beaec6aa373f37de621d41ff276f5))


### Features

* perte du referrer sur matomo ([#6843](https://github.com/SocialGouv/code-du-travail-numerique/issues/6843)) ([9c3373a](https://github.com/SocialGouv/code-du-travail-numerique/commit/9c3373ae52b1ceae9112c7f85e5ddfbc2558caa9))





# [4.191.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.190.0...v4.191.0) (2025-09-26)


### Bug Fixes

* **accessibilité:** correction des `id` générés par le modeles sur les simulateurs ([#6835](https://github.com/SocialGouv/code-du-travail-numerique/issues/6835)) ([43e3499](https://github.com/SocialGouv/code-du-travail-numerique/commit/43e3499e589e3185527dbeb79a84b25098b3c422))
* **accessibilité:** modification du contraste au niveau de la popup de cookies (règle 3.2) ([845a7fd](https://github.com/SocialGouv/code-du-travail-numerique/commit/845a7fdf3259079b20d9b0ed942accff3c11503b))
* **matomo:** utilisation de la heatmap uniquement si le `CookieBanner` est présent ([#6844](https://github.com/SocialGouv/code-du-travail-numerique/issues/6844)) ([f5cd34e](https://github.com/SocialGouv/code-du-travail-numerique/commit/f5cd34e81337832c70da2e15e36853fdaf9dccc0))
* onglet fiche sp impacter par autres onglets ([#6826](https://github.com/SocialGouv/code-du-travail-numerique/issues/6826)) ([4cde6dc](https://github.com/SocialGouv/code-du-travail-numerique/commit/4cde6dc943f09793f6981826787c86b2fe27bd45))
* perte des visites sur les pages glossaire, la page outil et stats ([#6839](https://github.com/SocialGouv/code-du-travail-numerique/issues/6839)) ([e329a64](https://github.com/SocialGouv/code-du-travail-numerique/commit/e329a648a7eac32ccbca8218b27346ac18a4749e))
* url renseignement en erreur ([#6828](https://github.com/SocialGouv/code-du-travail-numerique/issues/6828)) ([e993c71](https://github.com/SocialGouv/code-du-travail-numerique/commit/e993c7172655266c83dd4d2b4ac62aa1e75dd42b))
* **wording:** synchronisation orthographique ([#6827](https://github.com/SocialGouv/code-du-travail-numerique/issues/6827)) ([3195a36](https://github.com/SocialGouv/code-du-travail-numerique/commit/3195a36899ffd741591708e1f150e93c754aada0))


### Features

* retrait du code pour l'AB Testing ([#6842](https://github.com/SocialGouv/code-du-travail-numerique/issues/6842)) ([ec1dbe2](https://github.com/SocialGouv/code-du-travail-numerique/commit/ec1dbe2787f5fb931334350bbf7134ffc42b1ce5))





# [4.190.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.189.0...v4.190.0) (2025-09-18)


### Bug Fixes

* **accessibilite:** ajout d'un titre sur les liens qui redirige vers l'extérieur dans un nouvel onglet (règle 6.1) ([#6799](https://github.com/SocialGouv/code-du-travail-numerique/issues/6799)) ([d5a800a](https://github.com/SocialGouv/code-du-travail-numerique/commit/d5a800a6bfba3215ad49c0a5607f79c77d77e8fb))
* **accessibilite:** modification des labels des champs recherches pour l'ouverture de lien externe (règle 7.4) ([#6800](https://github.com/SocialGouv/code-du-travail-numerique/issues/6800)) ([815e634](https://github.com/SocialGouv/code-du-travail-numerique/commit/815e634e9756f3e7b789b1abd4eee70225d6a278))
* **accessibilite:** restitution des messages d'erreur à l'utilisateur (règle 7.5) ([#6790](https://github.com/SocialGouv/code-du-travail-numerique/issues/6790)) ([9ab5e26](https://github.com/SocialGouv/code-du-travail-numerique/commit/9ab5e2612d00ec02fd5c9874d4508934802d634d))
* **accessibilite:** utilisation de fieldset dans le formulaire "Votre avis nous intéresse" (règle 11.6) ([#6798](https://github.com/SocialGouv/code-du-travail-numerique/issues/6798)) ([728a1d1](https://github.com/SocialGouv/code-du-travail-numerique/commit/728a1d1cb6a6ebb37fd834b0f3cbde5d36944639))
* bug affichage onglet fiche sp ([#6817](https://github.com/SocialGouv/code-du-travail-numerique/issues/6817)) ([ae3c3d2](https://github.com/SocialGouv/code-du-travail-numerique/commit/ae3c3d2ba902a2e2f306921e59c6c1c8b878b020))


### Features

* ajout de l'a/b testing via matomo ([#6813](https://github.com/SocialGouv/code-du-travail-numerique/issues/6813)) ([093f874](https://github.com/SocialGouv/code-du-travail-numerique/commit/093f874266ab5d87c82d407e87b29d3508fd5d2f))
* ajout de log dans simu preca ([#6824](https://github.com/SocialGouv/code-du-travail-numerique/issues/6824)) ([45f2ace](https://github.com/SocialGouv/code-du-travail-numerique/commit/45f2ace9d4d274910e441ebe3480c895b518fc89))





# [4.189.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.188.0...v4.189.0) (2025-09-18)


### Bug Fixes

* 6703 correction règle 91 12 ([#6775](https://github.com/SocialGouv/code-du-travail-numerique/issues/6775)) ([d556ddc](https://github.com/SocialGouv/code-du-travail-numerique/commit/d556ddc11cd8d93e4ce835fdc06bd86f5e64c462))
* 6711 correction règle 1110 6 ([#6783](https://github.com/SocialGouv/code-du-travail-numerique/issues/6783)) ([161c971](https://github.com/SocialGouv/code-du-travail-numerique/commit/161c971eb2711e71e171b5ddbad87a788303f445))
* retirer le questionnaire des pages widgets ([#6806](https://github.com/SocialGouv/code-du-travail-numerique/issues/6806)) ([6b8aeb2](https://github.com/SocialGouv/code-du-travail-numerique/commit/6b8aeb290fa995ee14bc32756abd5fc561e81fcd))
* rgaa conversion lien a en bouton sur page droit du travail ([#6804](https://github.com/SocialGouv/code-du-travail-numerique/issues/6804)) ([7c7adf6](https://github.com/SocialGouv/code-du-travail-numerique/commit/7c7adf60c63eb4c4faf78e64c58a158ed7b84ed4))
* rgaa set button list in search page ([#6801](https://github.com/SocialGouv/code-du-travail-numerique/issues/6801)) ([e4d2240](https://github.com/SocialGouv/code-du-travail-numerique/commit/e4d224044c5a90b46f05fe004e0548da25f535f3))


### Features

* ajout du bandeau tally ([#6821](https://github.com/SocialGouv/code-du-travail-numerique/issues/6821)) ([6f8ce6d](https://github.com/SocialGouv/code-du-travail-numerique/commit/6f8ce6ddab17a93cb9aaae1b3106c2d95abf64b3))





# [4.188.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.187.2...v4.188.0) (2025-09-08)


### Bug Fixes

* **accessibilite:** amélioration de la gestion des `<Cards/>` dans la page contribution et des `aria-label` au seins des button (règle 7.1) ([#6788](https://github.com/SocialGouv/code-du-travail-numerique/issues/6788)) ([fff4440](https://github.com/SocialGouv/code-du-travail-numerique/commit/fff4440ca73686fbd63ff1ab5b17fa4eecd9eae8))


### Features

* disable cookie banner ([#6796](https://github.com/SocialGouv/code-du-travail-numerique/issues/6796)) ([65201ac](https://github.com/SocialGouv/code-du-travail-numerique/commit/65201ac8fbec6ddcbec9d722e18b02ed41865024))
* **tally:** ajout du formulaire de satisfaction suite au changement en DSFR ([#6797](https://github.com/SocialGouv/code-du-travail-numerique/issues/6797)) ([57f4930](https://github.com/SocialGouv/code-du-travail-numerique/commit/57f4930884f7926e6f328a350d5546ba2ab2f0da))





## [4.187.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.187.1...v4.187.2) (2025-09-04)


### Bug Fixes

* 6702 règle 89-7 ([#6741](https://github.com/SocialGouv/code-du-travail-numerique/issues/6741)) ([5d30e23](https://github.com/SocialGouv/code-du-travail-numerique/commit/5d30e23e8ac9f8d682a635e8be027c600fad6e5f))
* **accessibilite:** amélioration de la gestion des focus (règle 12.8) ([#6772](https://github.com/SocialGouv/code-du-travail-numerique/issues/6772)) ([5348578](https://github.com/SocialGouv/code-du-travail-numerique/commit/5348578bebc4bc0f88a4833610dd76a9eff5f0ed))
* **hydratation:** correction sur l'ensemble des simulateurs d'une date qui était généré côté client et serveur [#6789](https://github.com/SocialGouv/code-du-travail-numerique/issues/6789) ([a74e22f](https://github.com/SocialGouv/code-du-travail-numerique/commit/a74e22fb412c5373329dc2f20811f32ff52f2c3b))
* **outils:** ne pas focus le titre sur la première étape ([#6792](https://github.com/SocialGouv/code-du-travail-numerique/issues/6792)) ([7d375eb](https://github.com/SocialGouv/code-du-travail-numerique/commit/7d375ebe24ce26b49e7b8b47b9e62ff0a7ddc567))





## [4.187.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.187.0...v4.187.1) (2025-08-28)


### Bug Fixes

* **accessibilité:** ajout d'un texte alt sur les infographies ([#6722](https://github.com/SocialGouv/code-du-travail-numerique/issues/6722)) ([a606b33](https://github.com/SocialGouv/code-du-travail-numerique/commit/a606b335951259bca0bf81f8ec9417fd64c5636d))
* **actions:** remove storybook action ([dedd7e1](https://github.com/SocialGouv/code-du-travail-numerique/commit/dedd7e1eae1d97e3d699a36ca5c490688cf7b896))
* contenu non visible au techno d assistance sur gestion des cookies ([#6736](https://github.com/SocialGouv/code-du-travail-numerique/issues/6736)) ([f562249](https://github.com/SocialGouv/code-du-travail-numerique/commit/f56224942779c065f605287263bdd057b8a9869b))
* échec de tests suite au clean du projet ([a79fe2c](https://github.com/SocialGouv/code-du-travail-numerique/commit/a79fe2cfe5192df47c3f582ae8c50d4e47ff7107))
* rc result move table inside li ([#6737](https://github.com/SocialGouv/code-du-travail-numerique/issues/6737)) ([faffab2](https://github.com/SocialGouv/code-du-travail-numerique/commit/faffab253cb5cc1a794fe938197a0cd52dc0849f))
* service public tableau scope ([#6739](https://github.com/SocialGouv/code-du-travail-numerique/issues/6739)) ([59a5e2b](https://github.com/SocialGouv/code-du-travail-numerique/commit/59a5e2ba652e8fd2b30d214110fbf8ce12cccc81))





# [4.187.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.186.0...v4.187.0) (2025-08-21)


### Bug Fixes

* 6693 correction règle 87 6 Autocomplete ([#6733](https://github.com/SocialGouv/code-du-travail-numerique/issues/6733)) ([7100a83](https://github.com/SocialGouv/code-du-travail-numerique/commit/7100a8370c8969072ee24c90f1112f30e954da54))
* non latin characters in location search ([#6726](https://github.com/SocialGouv/code-du-travail-numerique/issues/6726)) ([18e0883](https://github.com/SocialGouv/code-du-travail-numerique/commit/18e0883688360e55052ad87ba36bcd89443ed9b3))
* sentry keydown undefined key ([#6724](https://github.com/SocialGouv/code-du-travail-numerique/issues/6724)) ([8966920](https://github.com/SocialGouv/code-du-travail-numerique/commit/8966920015f3c178f3182ca25f96bcf900dc8b7f))
* **simulateurs:** ordonnancement des catégories professionnelles [#6735](https://github.com/SocialGouv/code-du-travail-numerique/issues/6735) ([9a4cfb9](https://github.com/SocialGouv/code-du-travail-numerique/commit/9a4cfb9eda6bd38c29517c5c67a82dc2f2854c3f))
* tracking cc_select_p1 retirer les 00 devant les chiffres ([#6725](https://github.com/SocialGouv/code-du-travail-numerique/issues/6725)) ([a24496b](https://github.com/SocialGouv/code-du-travail-numerique/commit/a24496bdff15dd4f1d280a260fceecaebd9c20f5))


### Features

* **heures-recherche-emploi:** passage en DSFR du simulateur ([#6727](https://github.com/SocialGouv/code-du-travail-numerique/issues/6727)) ([fb0a7a4](https://github.com/SocialGouv/code-du-travail-numerique/commit/fb0a7a4ee5043847725d42472cbc0a3eb5d86be2))
* **indemnite-licenciement:** passage du simulateur en DSFR ([#6734](https://github.com/SocialGouv/code-du-travail-numerique/issues/6734)) ([de6ebf5](https://github.com/SocialGouv/code-du-travail-numerique/commit/de6ebf562f6d530f73137ed60074719890b7e252))
* maj mentions legales ([#6658](https://github.com/SocialGouv/code-du-travail-numerique/issues/6658)) ([3032067](https://github.com/SocialGouv/code-du-travail-numerique/commit/30320674ac658ad7f148be77a2f5312ba44f3551))





# [4.186.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.185.0...v4.186.0) (2025-07-31)


### Bug Fixes

* **accessibility:** focus sur le titre à chaque nouvelle étape du simulateur ([#6661](https://github.com/SocialGouv/code-du-travail-numerique/issues/6661)) ([b5aa826](https://github.com/SocialGouv/code-du-travail-numerique/commit/b5aa82607b438815540522ffee3a7f7e86b7d612))
* **agreement:** amélioration de la structure HTML pour l'accessibilité ([#6684](https://github.com/SocialGouv/code-du-travail-numerique/issues/6684)) ([2109759](https://github.com/SocialGouv/code-du-travail-numerique/commit/2109759ee60ec69d44a073d02ba6a617b7e74226))
* **autocomplete:** retrait de la propriété aria-labelledby et correctif sur la propriété for du label ([#6687](https://github.com/SocialGouv/code-du-travail-numerique/issues/6687)) ([a442df8](https://github.com/SocialGouv/code-du-travail-numerique/commit/a442df89ee4bf83eac0c2193a0ac44b91557025d))
* **contrib:** amélioration de l'accessibilité du formulaire ([#6663](https://github.com/SocialGouv/code-du-travail-numerique/issues/6663)) ([bbf9146](https://github.com/SocialGouv/code-du-travail-numerique/commit/bbf91468062dbc30ad471d443092a26fb016d863))
* **droit-du-travail:** gestion du focus sur les cartes ([#6667](https://github.com/SocialGouv/code-du-travail-numerique/issues/6667)) ([704a79a](https://github.com/SocialGouv/code-du-travail-numerique/commit/704a79a156c6c63291f1c8f58700c24162bdeefb))
* **indemnite-licenciement:** correction de l'ancienneté de la 1996 ([#6717](https://github.com/SocialGouv/code-du-travail-numerique/issues/6717)) ([e95a3ac](https://github.com/SocialGouv/code-du-travail-numerique/commit/e95a3ac2f0c8c0f9b829d07662e0de836b8cdc35))
* performance home ([#6641](https://github.com/SocialGouv/code-du-travail-numerique/issues/6641)) ([0ed33d3](https://github.com/SocialGouv/code-du-travail-numerique/commit/0ed33d3abdee7be3a987bbffbb5e66c8588297d5))
* **preavis-licenciement:** correction d'un bug sur la 2148 ([#6721](https://github.com/SocialGouv/code-du-travail-numerique/issues/6721)) ([409f1ea](https://github.com/SocialGouv/code-du-travail-numerique/commit/409f1ea4cc19ce3350ced0cb313de7162012c6a4))
* **rupture-co:** amélioration de l'accessibilité sur la satisfaction ([#6668](https://github.com/SocialGouv/code-du-travail-numerique/issues/6668)) ([0541c78](https://github.com/SocialGouv/code-du-travail-numerique/commit/0541c78fdcc6f26c3f76c3f5c0c441512a89a744))
* **satisfaction:** amélioration de l'accessibilité sur le formulaire ([#6688](https://github.com/SocialGouv/code-du-travail-numerique/issues/6688)) ([a013cda](https://github.com/SocialGouv/code-du-travail-numerique/commit/a013cda1bb6363174ccf5c7c8e0c45fbfff8ceb8))
* **search:** gestion du focus sur le "plus de résultat" ([#6664](https://github.com/SocialGouv/code-du-travail-numerique/issues/6664)) ([bdc804d](https://github.com/SocialGouv/code-du-travail-numerique/commit/bdc804d3da5541d7eb499276c097cf9b5b96a038))
* **stats:** amélioration de la hiérarchie des titres ([#6682](https://github.com/SocialGouv/code-du-travail-numerique/issues/6682)) ([2415b9c](https://github.com/SocialGouv/code-du-travail-numerique/commit/2415b9c8b7e2f240acb731f4a40913be936dd06a))
* **travail:** ajout d'un indicateur nouvelle fenêtre sur les liens ([#6685](https://github.com/SocialGouv/code-du-travail-numerique/issues/6685)) ([8ca0cfe](https://github.com/SocialGouv/code-du-travail-numerique/commit/8ca0cfe202f09f28ec62e6064a44b6235f14e7f2))


### Features

* **indemnite-precarite:** passage en DSFR du simulateur ([#6651](https://github.com/SocialGouv/code-du-travail-numerique/issues/6651)) ([8d3f94a](https://github.com/SocialGouv/code-du-travail-numerique/commit/8d3f94ad930e47b33d57f9bc0c4b4d49fa6291f3))
* **licenciement:** migration de l'outil comprendre sa procédure de licenciement ([#6716](https://github.com/SocialGouv/code-du-travail-numerique/issues/6716)) ([0720510](https://github.com/SocialGouv/code-du-travail-numerique/commit/072051003b4c1da8fc1e38f4c98cc29c4068e717))
* **preavis licenciement:** passage du simulateur en dsfr ([#6715](https://github.com/SocialGouv/code-du-travail-numerique/issues/6715)) ([cd07ec4](https://github.com/SocialGouv/code-du-travail-numerique/commit/cd07ec4302cae8bd3176f7bf51f73830bda5bd24))
* **preavis-demission:** passage en DSFR du simulateur ([#6597](https://github.com/SocialGouv/code-du-travail-numerique/issues/6597)) ([5157292](https://github.com/SocialGouv/code-du-travail-numerique/commit/5157292cbad2bcc3f1c2c50ea928f1f8f5ff100f))
* upgrade version for react dsfr ([#6611](https://github.com/SocialGouv/code-du-travail-numerique/issues/6611)) ([b7332e6](https://github.com/SocialGouv/code-du-travail-numerique/commit/b7332e68ae1a9e3d7563e11a1bed75a061fbcc66))





# [4.185.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.184.0...v4.185.0) (2025-07-03)


### Bug Fixes

* **ci:** ajout de l'environnement preprod sur le build ([#6660](https://github.com/SocialGouv/code-du-travail-numerique/issues/6660)) ([233dd31](https://github.com/SocialGouv/code-du-travail-numerique/commit/233dd31a0921253074ceea9e9f076c6a580870f6))
* html validation ([#6595](https://github.com/SocialGouv/code-du-travail-numerique/issues/6595)) ([e434033](https://github.com/SocialGouv/code-du-travail-numerique/commit/e4340333a0d47659e0665cd182b2d85f8286c1ee))
* **trouver-cc:** envoie d'un event à la sélection d'une CC ([#6642](https://github.com/SocialGouv/code-du-travail-numerique/issues/6642)) ([4c59ce0](https://github.com/SocialGouv/code-du-travail-numerique/commit/4c59ce007b032754abbc4e7738cf1d27bb3c783d))


### Features

* update url service renseignement ([#6655](https://github.com/SocialGouv/code-du-travail-numerique/issues/6655)) ([00b7df3](https://github.com/SocialGouv/code-du-travail-numerique/commit/00b7df3839c3d95bcf9940cebf06c72c51e518c1))





# [4.184.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.183.2...v4.184.0) (2025-07-01)


### Bug Fixes

* buildkit in gh ([#6591](https://github.com/SocialGouv/code-du-travail-numerique/issues/6591)) ([ba9ff93](https://github.com/SocialGouv/code-du-travail-numerique/commit/ba9ff93cea1564f39925e4fefbf7169b417604c3))
* **ci:** persist sha long format ([d59e21c](https://github.com/SocialGouv/code-du-travail-numerique/commit/d59e21c1ee2458d96b92a9ab0327267fc05e1ca5))
* **ci:** persist sha long format ([53f0431](https://github.com/SocialGouv/code-du-travail-numerique/commit/53f043177c06cf68e8c2cb9dd464b74f66bfc295))
* popup consent loading twice in legacy urls ([#6653](https://github.com/SocialGouv/code-du-travail-numerique/issues/6653)) ([d12f727](https://github.com/SocialGouv/code-du-travail-numerique/commit/d12f727c3c9968c25f50b41ce57f6b9c9dbd3ea2))
* snapshot ([c19c0d7](https://github.com/SocialGouv/code-du-travail-numerique/commit/c19c0d77007d28ec5bfb0fbb30ca50ca312cb45b))


### Features

* implement test e2e for autocomplete with accent ([ed37dd8](https://github.com/SocialGouv/code-du-travail-numerique/commit/ed37dd8ea57384333fb41337c514f5ba0eef67e3))





## [4.183.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.183.1...v4.183.2) (2025-06-17)


### Bug Fixes

* matomo tracking disabled prod ([#6630](https://github.com/SocialGouv/code-du-travail-numerique/issues/6630)) ([743e42d](https://github.com/SocialGouv/code-du-travail-numerique/commit/743e42d3c79b42371e507d956a450d44955ce476))





## [4.183.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.183.0...v4.183.1) (2025-06-12)


### Bug Fixes

* **accessibility:** amélioration de l'accessibilité ([#6598](https://github.com/SocialGouv/code-du-travail-numerique/issues/6598)) ([765db39](https://github.com/SocialGouv/code-du-travail-numerique/commit/765db3918a474231b23fa8f615e37f6bb045323a))





# [4.183.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.182.0...v4.183.0) (2025-06-12)


### Bug Fixes

* accessibility search header ([#6594](https://github.com/SocialGouv/code-du-travail-numerique/issues/6594)) ([249e6fa](https://github.com/SocialGouv/code-du-travail-numerique/commit/249e6fa0ec474f1d59a614fbbedec5e11d28129f))
* **accessibility:** mauvais focus après avoir répondu ([#6587](https://github.com/SocialGouv/code-du-travail-numerique/issues/6587)) ([c29104e](https://github.com/SocialGouv/code-du-travail-numerique/commit/c29104ebc4ade24cadc7792428b48d901f374ff3))
* tracking de test ([#6616](https://github.com/SocialGouv/code-du-travail-numerique/issues/6616)) ([1885397](https://github.com/SocialGouv/code-du-travail-numerique/commit/18853974bbc08baa51ad90285ece328dbee1de59))
* **typo:** indentification vs identification ([#6612](https://github.com/SocialGouv/code-du-travail-numerique/issues/6612)) ([5aa0c26](https://github.com/SocialGouv/code-du-travail-numerique/commit/5aa0c26fc79935ab917a8cbfa32d482263966d6e))


### Features

* **information:** migration en DSFR ([#6576](https://github.com/SocialGouv/code-du-travail-numerique/issues/6576)) ([189b4f1](https://github.com/SocialGouv/code-du-travail-numerique/commit/189b4f1eeac6ed89a725315b9dab71ff574b563b))
* **recherche:** passage de la page en dsfr ([#6566](https://github.com/SocialGouv/code-du-travail-numerique/issues/6566)) ([fcc79d1](https://github.com/SocialGouv/code-du-travail-numerique/commit/fcc79d1263338d7ec2b113eab37b525ce070bfc5))
* **widget:** passage des pages aux DSFR ([#6589](https://github.com/SocialGouv/code-du-travail-numerique/issues/6589)) ([5203fe9](https://github.com/SocialGouv/code-du-travail-numerique/commit/5203fe98d78a67280afab21491aeaff02f4b7b55))





# [4.182.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.181.0...v4.182.0) (2025-05-27)


### Features

* 6554 revoir les questions de satisfaction simulateur indemnité de licenciementindemnité de rc ([#6584](https://github.com/SocialGouv/code-du-travail-numerique/issues/6584)) ([3a74387](https://github.com/SocialGouv/code-du-travail-numerique/commit/3a74387b5e0e99d3a88cf710aa34a1be083a27e4))
* activation carte chaleur ([#6574](https://github.com/SocialGouv/code-du-travail-numerique/issues/6574)) ([b80b138](https://github.com/SocialGouv/code-du-travail-numerique/commit/b80b138de51a40c49af1757b7e54cf84083ccd26))





# [4.181.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.180.0...v4.181.0) (2025-05-21)


### Bug Fixes

* 6540 bug sur le tracking du simu rc ([#6557](https://github.com/SocialGouv/code-du-travail-numerique/issues/6557)) ([4ed77c5](https://github.com/SocialGouv/code-du-travail-numerique/commit/4ed77c5d4ad247bc744c46ec7135defcf694e60f))
* **dsfr:** retours sur le simulateurs + spacing sur les fiches contributions ([#6572](https://github.com/SocialGouv/code-du-travail-numerique/issues/6572)) ([b6c9bce](https://github.com/SocialGouv/code-du-travail-numerique/commit/b6c9bcee8f5c975f5e810a68bc705dd8fe0e75f3))
* **themes:** correction des urls ayant comme source `external` ([#6570](https://github.com/SocialGouv/code-du-travail-numerique/issues/6570)) ([23c3150](https://github.com/SocialGouv/code-du-travail-numerique/commit/23c3150483554f1ac311ad336d171889b27335bd))


### Features

* **droit-du-travail:** passage en DSFR ([#6558](https://github.com/SocialGouv/code-du-travail-numerique/issues/6558)) ([4691e93](https://github.com/SocialGouv/code-du-travail-numerique/commit/4691e935b61a7a299105b890dd1cc4718928dd2e))
* **fiches-pratiques:** passage en DSFR ([#6571](https://github.com/SocialGouv/code-du-travail-numerique/issues/6571)) ([c4c4179](https://github.com/SocialGouv/code-du-travail-numerique/commit/c4c4179d590688b973b245295ac77cff92cb2f5b))





# [4.180.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.179.1...v4.180.0) (2025-05-14)


### Bug Fixes

* e2e tests nombre contrib ([#6560](https://github.com/SocialGouv/code-du-travail-numerique/issues/6560)) ([e0bb28c](https://github.com/SocialGouv/code-du-travail-numerique/commit/e0bb28c4b63e08fe2a7509d14b17144fa28979ef))


### Features

* implementation de la campagne SEA 2025 ([#6569](https://github.com/SocialGouv/code-du-travail-numerique/issues/6569)) ([93880ac](https://github.com/SocialGouv/code-du-travail-numerique/commit/93880acfc8474009d7a4d2a9d753dc029fafb5ab))
* **preavis-retraite:** passage en dsfr ([#6524](https://github.com/SocialGouv/code-du-travail-numerique/issues/6524)) ([52c7509](https://github.com/SocialGouv/code-du-travail-numerique/commit/52c75091f10dd58acc3a0a7193100a67ac4db045))





## [4.179.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.179.0...v4.179.1) (2025-04-30)


### Bug Fixes

* bug sur la redirection de la recherche non fonctionnelle depuis le header ([#6556](https://github.com/SocialGouv/code-du-travail-numerique/issues/6556)) ([487cf46](https://github.com/SocialGouv/code-du-travail-numerique/commit/487cf469843c4b1a07c2cb6157486dd34faeab97))





# [4.179.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.178.0...v4.179.0) (2025-04-25)


### Bug Fixes

* correction du role sur la combobox ([#6547](https://github.com/SocialGouv/code-du-travail-numerique/issues/6547)) ([b69fb50](https://github.com/SocialGouv/code-du-travail-numerique/commit/b69fb5007b415454a025309e90925bbc52398fcd))


### Features

* **glossaire:** passage en dsfr ([#6535](https://github.com/SocialGouv/code-du-travail-numerique/issues/6535)) ([eb3c6f3](https://github.com/SocialGouv/code-du-travail-numerique/commit/eb3c6f380673fad47e3c4cd81bf4ca23ba3ec72f))
* **modeles:** migration en DSFR de la page qui liste les modèles de documents ([#6543](https://github.com/SocialGouv/code-du-travail-numerique/issues/6543)) ([c9cf8d2](https://github.com/SocialGouv/code-du-travail-numerique/commit/c9cf8d2fc9964d0cbf920b7123b40ce207e9983b))
* **outils:** passage en dsfr de la page principale ([#6539](https://github.com/SocialGouv/code-du-travail-numerique/issues/6539)) ([4540025](https://github.com/SocialGouv/code-du-travail-numerique/commit/454002590d3ff07e8d234e3125f87d7775283ca1))





# [4.178.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.177.0...v4.178.0) (2025-04-22)


### Bug Fixes

* **e2e:** correction du test sur le salaire brut/net ([#6544](https://github.com/SocialGouv/code-du-travail-numerique/issues/6544)) ([dddec02](https://github.com/SocialGouv/code-du-travail-numerique/commit/dddec02a2646b9f768893be177958ebcc7e2875d))
* event matomo simu RC ([#6541](https://github.com/SocialGouv/code-du-travail-numerique/issues/6541)) ([235e8cb](https://github.com/SocialGouv/code-du-travail-numerique/commit/235e8cbc17a356482ab174b314e47d56a71986a9))


### Features

* **themes:** migration en DSFR des pages thèmes ([#6523](https://github.com/SocialGouv/code-du-travail-numerique/issues/6523)) ([f9e51a5](https://github.com/SocialGouv/code-du-travail-numerique/commit/f9e51a51bd47d1e7709643ba5ac875a198df2fa5))


### Reverts

* Revert "feat(tally): affichage du formulaire pour l'enquête igas (#6488)" (#6542) ([3b27a8d](https://github.com/SocialGouv/code-du-travail-numerique/commit/3b27a8d311ceba9a7ae7882c3e5fd5168d269f25)), closes [#6488](https://github.com/SocialGouv/code-du-travail-numerique/issues/6488) [#6542](https://github.com/SocialGouv/code-du-travail-numerique/issues/6542)





# [4.177.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.176.0...v4.177.0) (2025-04-04)


### Features

* ajout des redirections de 2717 et 2397 vers 3252 ([#6521](https://github.com/SocialGouv/code-du-travail-numerique/issues/6521)) ([5bc47fd](https://github.com/SocialGouv/code-du-travail-numerique/commit/5bc47fd91d2750e74ffcca36dddb1fbe7e997fa0))





# [4.176.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.175.0...v4.176.0) (2025-03-31)


### Bug Fixes

* **convention-collective:** modification du title pour matcher avec la prod ([#6507](https://github.com/SocialGouv/code-du-travail-numerique/issues/6507)) ([22f43fa](https://github.com/SocialGouv/code-du-travail-numerique/commit/22f43fa49df835d7e27d95f031ec878595a4ca8e))


### Features

* **convention-collective:** passage en DSFR ([#6500](https://github.com/SocialGouv/code-du-travail-numerique/issues/6500)) ([cc879d2](https://github.com/SocialGouv/code-du-travail-numerique/commit/cc879d2dade5f4688ca27fe638608f19e302f800))





# [4.175.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.174.0...v4.175.0) (2025-03-24)


### Bug Fixes

* **contributions:** problème d'affichage des accordéons qui ont le même nom ([#6499](https://github.com/SocialGouv/code-du-travail-numerique/issues/6499)) ([3106d59](https://github.com/SocialGouv/code-du-travail-numerique/commit/3106d59da913918c424170c5b6a4b895e71a29dc))
* **sentry:** set the right environment ([#6496](https://github.com/SocialGouv/code-du-travail-numerique/issues/6496)) ([c78cb14](https://github.com/SocialGouv/code-du-travail-numerique/commit/c78cb144d362722dc772508be76683a4a116fac9))


### Features

* **rupture-co:** passage en DSFR ([#6392](https://github.com/SocialGouv/code-du-travail-numerique/issues/6392)) ([4543276](https://github.com/SocialGouv/code-du-travail-numerique/commit/45432763a5c1570337b575e759d47eabb9192cab))





# [4.174.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.173.0...v4.174.0) (2025-03-11)


### Bug Fixes

* **autocomplete:** utilisation du composant Downshift ([#6479](https://github.com/SocialGouv/code-du-travail-numerique/issues/6479)) ([7cf2f15](https://github.com/SocialGouv/code-du-travail-numerique/commit/7cf2f1568e8c002b37a7ab10c48e11e6507e01b9))
* **convention-collective:** ajout des redirections de la DARES du mois de mars 2025  ([feac7d0](https://github.com/SocialGouv/code-du-travail-numerique/commit/feac7d04fae8bcac81d5b013072b45efcb47b0dd))
* **conventions-collectives:** corection de la barre de recherche sur legifrance ([#6490](https://github.com/SocialGouv/code-du-travail-numerique/issues/6490)) ([e02fe9c](https://github.com/SocialGouv/code-du-travail-numerique/commit/e02fe9cb8fadd5b3b0f24fb779fce31fb6d2e1af))
* **e2e:** correction de problème lié à de l'html invalide ([#6486](https://github.com/SocialGouv/code-du-travail-numerique/issues/6486)) ([0a96183](https://github.com/SocialGouv/code-du-travail-numerique/commit/0a9618326845f4770d75b9f8c09f05a2ab0518ed))


### Features

* **sentry:** migration sur la nouvelle version de Sentry ([#6481](https://github.com/SocialGouv/code-du-travail-numerique/issues/6481)) ([7425678](https://github.com/SocialGouv/code-du-travail-numerique/commit/74256780efda8e07c545a21614e7159ccd0de4ab))
* **stats:** ajout des bilans sur la page statistiques ([#6461](https://github.com/SocialGouv/code-du-travail-numerique/issues/6461)) ([7bdc667](https://github.com/SocialGouv/code-du-travail-numerique/commit/7bdc66702fe9ede97c65dc78f64715401c0d8efd))
* **tally:** affichage du formulaire pour l'enquête igas ([#6488](https://github.com/SocialGouv/code-du-travail-numerique/issues/6488)) ([dc967a2](https://github.com/SocialGouv/code-du-travail-numerique/commit/dc967a2df33c2a9541bf7f70c50dadb1fc3bf95a))





# [4.173.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.172.3...v4.173.0) (2025-02-19)


### Bug Fixes

* **contributions:** remise en place des articles liés ([#6458](https://github.com/SocialGouv/code-du-travail-numerique/issues/6458)) ([356aec4](https://github.com/SocialGouv/code-du-travail-numerique/commit/356aec42a7e71f584e4486bac3aea5ec2aab318c))
* **modèle de courriers:** prise en compte des retours RGAA ([#6453](https://github.com/SocialGouv/code-du-travail-numerique/issues/6453)) ([707f6e6](https://github.com/SocialGouv/code-du-travail-numerique/commit/707f6e6a6aa33e0a2b1a96cba864bd61ee826a03))
* **page d'accessibilité:** rendre le html valide ([#6452](https://github.com/SocialGouv/code-du-travail-numerique/issues/6452)) ([e7e0248](https://github.com/SocialGouv/code-du-travail-numerique/commit/e7e024875ffed65ee42d5e2555bb2b0842f6b6df))
* **sitemap:** correction de l'url vers le sitemap ([#6460](https://github.com/SocialGouv/code-du-travail-numerique/issues/6460)) ([d88770d](https://github.com/SocialGouv/code-du-travail-numerique/commit/d88770dc6b72185576719153b7307377dc07d823))


### Features

* **contributions:** ajout du support des infographies dans les contributions ([#6449](https://github.com/SocialGouv/code-du-travail-numerique/issues/6449)) ([8e03a98](https://github.com/SocialGouv/code-du-travail-numerique/commit/8e03a9881d7f8e3eac21f6e152c22465525ce2f9))





## [4.172.3](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.172.2...v4.172.3) (2025-02-10)


### Bug Fixes

* **code:** suppression du vieux code qui n'est plus utilisé pour après le passage au DSFR ([#6446](https://github.com/SocialGouv/code-du-travail-numerique/issues/6446)) ([96f95f5](https://github.com/SocialGouv/code-du-travail-numerique/commit/96f95f571892c374d7f86019490716593d581de5))
* **contribution:** html valide pour les contributions qui sont des fiches SP ([#6450](https://github.com/SocialGouv/code-du-travail-numerique/issues/6450)) ([584da94](https://github.com/SocialGouv/code-du-travail-numerique/commit/584da9450349ac59b8a2119ffdeed085c903ef6f))





## [4.172.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.172.1...v4.172.2) (2025-02-06)


### Bug Fixes

* **convention-collective:** ajout des redirections suite aux changements de la DARES du mois de janvier ([#6447](https://github.com/SocialGouv/code-du-travail-numerique/issues/6447)) ([6fd7767](https://github.com/SocialGouv/code-du-travail-numerique/commit/6fd7767f5eff635abf079730c55ccbffb2f986ac)), closes [#6443](https://github.com/SocialGouv/code-du-travail-numerique/issues/6443)





## [4.172.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.172.0...v4.172.1) (2025-02-04)


### Bug Fixes

* **contributions:** fix de l'erreur js dans la console quand une CC était présente dans le localStorage ([#6445](https://github.com/SocialGouv/code-du-travail-numerique/issues/6445)) ([28f0170](https://github.com/SocialGouv/code-du-travail-numerique/commit/28f017032200605985e5a69aa8204254c0b41dfc))
* **contributions:** modification des events sur les contribs generiques pour être ISO avec ce qu'on avait avant le passage au DSFR ([#6443](https://github.com/SocialGouv/code-du-travail-numerique/issues/6443)) ([f022582](https://github.com/SocialGouv/code-du-travail-numerique/commit/f022582f6421c42492d592ef17da3f2b0a04d55e))





# [4.172.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.171.1...v4.172.0) (2025-02-03)


### Bug Fixes

* **autocomplete:** réutilisation du composant autocomplete sur la home, accentuation du contraste quand on parcours les suggestions au clavier ([#6429](https://github.com/SocialGouv/code-du-travail-numerique/issues/6429)) ([e968432](https://github.com/SocialGouv/code-du-travail-numerique/commit/e968432b0c3987f24bc7edabdf61e952be085180))
* **autocomplete:** réutilisation du composant autocomplete sur la home, accentuation du contraste quand on parcours les suggestions au clavier ([#6429](https://github.com/SocialGouv/code-du-travail-numerique/issues/6429)) ([6364fc2](https://github.com/SocialGouv/code-du-travail-numerique/commit/6364fc20e3e5a6466e7ef40a7f063909c2f66bae))


### Features

* **A propos:** migration au DSFR des pages A propos et Déclaration d'accessibilité ([#6440](https://github.com/SocialGouv/code-du-travail-numerique/issues/6440)) ([aacfbb9](https://github.com/SocialGouv/code-du-travail-numerique/commit/aacfbb94a6e66e28159f3a6de7b57a04c3d31faa))
* **A propos:** migration au DSFR des pages A propos et Déclaration d'accessibilité ([#6440](https://github.com/SocialGouv/code-du-travail-numerique/issues/6440)) ([a53f878](https://github.com/SocialGouv/code-du-travail-numerique/commit/a53f878a108d7f799ed627657c76100a5f8872dc))
* **contribution:** passage au DSFR ([#6428](https://github.com/SocialGouv/code-du-travail-numerique/issues/6428)) ([423d249](https://github.com/SocialGouv/code-du-travail-numerique/commit/423d249be4abb6db04fc66fa7ba75026bae70cd4)), closes [#6096](https://github.com/SocialGouv/code-du-travail-numerique/issues/6096) [#6099](https://github.com/SocialGouv/code-du-travail-numerique/issues/6099) [#6094](https://github.com/SocialGouv/code-du-travail-numerique/issues/6094)
* **contribution:** passage au DSFR ([#6428](https://github.com/SocialGouv/code-du-travail-numerique/issues/6428)) ([04ed765](https://github.com/SocialGouv/code-du-travail-numerique/commit/04ed765428a53741ea61d123cb84e24f12942712)), closes [#6096](https://github.com/SocialGouv/code-du-travail-numerique/issues/6096) [#6099](https://github.com/SocialGouv/code-du-travail-numerique/issues/6099) [#6094](https://github.com/SocialGouv/code-du-travail-numerique/issues/6094)





## [4.171.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.171.0...v4.171.1) (2025-01-23)


### Bug Fixes

* correction d'une faute dans l'erreur lors d'une recherche de CC ([#6432](https://github.com/SocialGouv/code-du-travail-numerique/issues/6432)) ([9651ec4](https://github.com/SocialGouv/code-du-travail-numerique/commit/9651ec4bfdeb05f6cd4dfa2d6a9f93672fd88b45))





# [4.171.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.170.1...v4.171.0) (2025-01-21)


### Bug Fixes

* **accordéons avec des ancres:** les accordéons s'ouvrent bien quand on a une ancre dans l'url ([#6418](https://github.com/SocialGouv/code-du-travail-numerique/issues/6418)) ([9f266a9](https://github.com/SocialGouv/code-du-travail-numerique/commit/9f266a9232ec0b58382dae7bcc1da66a95cc5515))
* **e2e:** les données de la fiche MT ont été modifié ([#6412](https://github.com/SocialGouv/code-du-travail-numerique/issues/6412)) ([e590799](https://github.com/SocialGouv/code-du-travail-numerique/commit/e59079950681052cd4d96051803cb417af3e412e))
* **footer:** ajout du role sur le tag footer ([#6400](https://github.com/SocialGouv/code-du-travail-numerique/issues/6400)) ([a5c11ed](https://github.com/SocialGouv/code-du-travail-numerique/commit/a5c11ed7d3201d3c7aebba16274d11591c92e616))
* **home:** prise en compte des retours RGAA pour les liens sur les tuiles sans textes ([#6417](https://github.com/SocialGouv/code-du-travail-numerique/issues/6417)) ([94b6180](https://github.com/SocialGouv/code-du-travail-numerique/commit/94b6180298b634eeebf3419613792bd09aa534bd))
* **liens:** prise en compte des retours RGAA pour les liens qui s'ouvrent dans une nouvelle fenêtre ([#6416](https://github.com/SocialGouv/code-du-travail-numerique/issues/6416)) ([4a887a4](https://github.com/SocialGouv/code-du-travail-numerique/commit/4a887a4fc7e139ed907d43bdaaed95b817128adc))
* mauvaise canonical sur la page Votre convention collective ([#6419](https://github.com/SocialGouv/code-du-travail-numerique/issues/6419)) ([f74f24a](https://github.com/SocialGouv/code-du-travail-numerique/commit/f74f24addab042d4e7afa8491fa98e01b8e4b7c5))
* **outils trouver sa CC:** prise en compte des retours RGAA ([#6413](https://github.com/SocialGouv/code-du-travail-numerique/issues/6413)) ([8fb2849](https://github.com/SocialGouv/code-du-travail-numerique/commit/8fb284984484b68b35a3e45aa8fa2dc64b40994b))
* **page convention collective:** prise en compte des retours RGAA ([#6415](https://github.com/SocialGouv/code-du-travail-numerique/issues/6415)) ([d896a95](https://github.com/SocialGouv/code-du-travail-numerique/commit/d896a95afe5b2e0507a6785d95ec0775bceaf0e1))
* rgaa review 1 ([#6383](https://github.com/SocialGouv/code-du-travail-numerique/issues/6383)) ([6226cb9](https://github.com/SocialGouv/code-du-travail-numerique/commit/6226cb9903bfcf0395d2c26b0030e80de5ea9a61))
* **satisfaction:** renomer les evenements envoyés tel qu'ils étaient avant ([#6426](https://github.com/SocialGouv/code-du-travail-numerique/issues/6426)) ([968a5aa](https://github.com/SocialGouv/code-du-travail-numerique/commit/968a5aae2c2317f2e95180d1f0754a7d0c48f0af))
* **Trouver sa CC:** mettre le focus sur les résultats quand on fait une recherche par entreprises ([#6425](https://github.com/SocialGouv/code-du-travail-numerique/issues/6425)) ([58b67a2](https://github.com/SocialGouv/code-du-travail-numerique/commit/58b67a2cfb26775e651c415dc9cd71445ba0f40b))


### Features

* rgga pas de alt sur image home ([#6382](https://github.com/SocialGouv/code-du-travail-numerique/issues/6382)) ([f1a9185](https://github.com/SocialGouv/code-du-travail-numerique/commit/f1a91853f726d2ce757d4b7dd165099d43e82951))





## [4.170.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.170.0...v4.170.1) (2025-01-09)

**Note:** Version bump only for package @socialgouv/code-du-travail





# [4.170.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.169.0...v4.170.0) (2025-01-09)


### Bug Fixes

* ajout header plan du site ([#6358](https://github.com/SocialGouv/code-du-travail-numerique/issues/6358)) ([dc52e7e](https://github.com/SocialGouv/code-du-travail-numerique/commit/dc52e7e208d8b49a5b13e34748139c51890290c5))
* **ci-cd:** use token-bureau ([#6397](https://github.com/SocialGouv/code-du-travail-numerique/issues/6397)) ([88fcebe](https://github.com/SocialGouv/code-du-travail-numerique/commit/88fcebea750cce150e3e555cae959ec03fedff5f))
* **contributions:** afficher une hierarchie des headings valides même si un sous-titre est utilisé alors que pas de titre avant ([#6370](https://github.com/SocialGouv/code-du-travail-numerique/issues/6370)) ([f72703d](https://github.com/SocialGouv/code-du-travail-numerique/commit/f72703de6f9bdc89a7b3d549ce214614e89f6608))
* **contributions:** td dans le thead d'un tableau ([#6380](https://github.com/SocialGouv/code-du-travail-numerique/issues/6380)) ([029267e](https://github.com/SocialGouv/code-du-travail-numerique/commit/029267efdeee4fbb2310febb61062138a0f5a934))
* **convention-collection:** utilisation du `focus` sur les lettres de la section ([#6391](https://github.com/SocialGouv/code-du-travail-numerique/issues/6391)) ([645aa6d](https://github.com/SocialGouv/code-du-travail-numerique/commit/645aa6d1a4bfb905de62916df770aff71a1f0b25))
* **convention-collective:** ajout des redirections de la DARES ([#6393](https://github.com/SocialGouv/code-du-travail-numerique/issues/6393)) ([233991f](https://github.com/SocialGouv/code-du-travail-numerique/commit/233991f5f4c7fbafc8049f53a8f1718a94983245))
* focus qui bouge sur le feedback negative lorsque textarea est rempli ([#6381](https://github.com/SocialGouv/code-du-travail-numerique/issues/6381)) ([4e8bf39](https://github.com/SocialGouv/code-du-travail-numerique/commit/4e8bf3968d6aa57b6542133076291a7e3cd93a62))
* **footer:** passage du composant `<NeedMoreInfo/>` dans celui-ci ([#6394](https://github.com/SocialGouv/code-du-travail-numerique/issues/6394)) ([8e77464](https://github.com/SocialGouv/code-du-travail-numerique/commit/8e774649463767e0ccba5e0c7c8b6dc14c09f2cb))
* **home:** utilisation de balise sémantique `<p/>` pour les tuiles ([#6389](https://github.com/SocialGouv/code-du-travail-numerique/issues/6389)) ([5fa2057](https://github.com/SocialGouv/code-du-travail-numerique/commit/5fa2057631e553047447f8f893bfe03ea75fa05c))
* lié le label à l'input search sur la home ([#6356](https://github.com/SocialGouv/code-du-travail-numerique/issues/6356)) ([15dffdd](https://github.com/SocialGouv/code-du-travail-numerique/commit/15dffdd3edcd2dfaacfbfaf9c21d9cb53ec28ead))
* rgaa ajout header contenu lié - partage ([#6359](https://github.com/SocialGouv/code-du-travail-numerique/issues/6359)) ([8d4ebc6](https://github.com/SocialGouv/code-du-travail-numerique/commit/8d4ebc6d1a151037abbb53030f4282c25b901ea4))
* rgaa fix sur l'input contact page besoin plus info ([#6361](https://github.com/SocialGouv/code-du-travail-numerique/issues/6361)) ([9c0e5ac](https://github.com/SocialGouv/code-du-travail-numerique/commit/9c0e5aca45c9d17c2b359400448e0c6b62129edf))
* test e2e ([#6378](https://github.com/SocialGouv/code-du-travail-numerique/issues/6378)) ([fb11f43](https://github.com/SocialGouv/code-du-travail-numerique/commit/fb11f43cc247b68ba21fee911d061249bf3ca918))
* **test e2e:** modification de la date pour ête dans 18 mois ([#6398](https://github.com/SocialGouv/code-du-travail-numerique/issues/6398)) ([19898e3](https://github.com/SocialGouv/code-du-travail-numerique/commit/19898e3c6654699d1110a8f42ebb11fb35465ba9))


### Features

* ajout de aria-live sur compteur caractères suggestion ([#6379](https://github.com/SocialGouv/code-du-travail-numerique/issues/6379)) ([70a216b](https://github.com/SocialGouv/code-du-travail-numerique/commit/70a216bfbf4e5c1897c4b3fbca865ab9236451ff))
* rgaa link target title ([#6367](https://github.com/SocialGouv/code-du-travail-numerique/issues/6367)) ([a01a52b](https://github.com/SocialGouv/code-du-travail-numerique/commit/a01a52bd395b18a7b414480d788d6838262a4436))





# [4.169.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.168.1...v4.169.0) (2024-12-18)


### Bug Fixes

* search cc tracking ([#6373](https://github.com/SocialGouv/code-du-travail-numerique/issues/6373)) ([ff6095d](https://github.com/SocialGouv/code-du-travail-numerique/commit/ff6095d53bc2373856979a4d9ccf65a508c185c4))


### Features

* **information:** utilisation de tiptap sur les pages infos ([#6362](https://github.com/SocialGouv/code-du-travail-numerique/issues/6362)) ([9bbdd41](https://github.com/SocialGouv/code-du-travail-numerique/commit/9bbdd4162e10f9bd022f2293f11fe0432ed8442b))





## [4.168.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.168.0...v4.168.1) (2024-12-17)


### Bug Fixes

* **e2e:** rendre la spec brut/net non flaky ([#6371](https://github.com/SocialGouv/code-du-travail-numerique/issues/6371)) ([5098955](https://github.com/SocialGouv/code-du-travail-numerique/commit/509895594a0992e34daa0ecb4baf0f4ed439f13d))
* **fiches SP:** gérer les cas de liens sans attributs URL ([#6372](https://github.com/SocialGouv/code-du-travail-numerique/issues/6372)) ([54bcc48](https://github.com/SocialGouv/code-du-travail-numerique/commit/54bcc48eba51c5a5e3ac72f5c5ec58e0ea376df5))





# [4.168.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.167.2...v4.168.0) (2024-12-17)


### Bug Fixes

* **matomo:** envoyer les events de changement de pages ([#6368](https://github.com/SocialGouv/code-du-travail-numerique/issues/6368)) ([fdd8487](https://github.com/SocialGouv/code-du-travail-numerique/commit/fdd8487be4d4e970bcd0574827bda1bbbd704dc9))


### Features

* **DSFR:** migration des pages fiches service public ([#6277](https://github.com/SocialGouv/code-du-travail-numerique/issues/6277)) ([85918d7](https://github.com/SocialGouv/code-du-travail-numerique/commit/85918d7d56d2941e119701e1fbb858935f97fb73))





## [4.167.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.167.1...v4.167.2) (2024-12-13)


### Bug Fixes

* ajout du tracking sur outil recherche cc ([#6366](https://github.com/SocialGouv/code-du-travail-numerique/issues/6366)) ([c1fd3d8](https://github.com/SocialGouv/code-du-travail-numerique/commit/c1fd3d8ef0d153b54bc137cbe32a7915da659f72))
* **seo:** retrait des h1 dupliqués ([#6342](https://github.com/SocialGouv/code-du-travail-numerique/issues/6342)) ([26580e0](https://github.com/SocialGouv/code-du-travail-numerique/commit/26580e0abd9544c11b21c3ff9039f6391552a0f7))





## [4.167.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.167.0...v4.167.1) (2024-12-05)


### Bug Fixes

* widget dsfr ([#6341](https://github.com/SocialGouv/code-du-travail-numerique/issues/6341)) ([6018cc5](https://github.com/SocialGouv/code-du-travail-numerique/commit/6018cc58445474fc2d7b16834e76c97f6b6582f4))
* **widget modèle de courrier:** affichage de l'url canonique ([#6340](https://github.com/SocialGouv/code-du-travail-numerique/issues/6340)) ([ed9d3bb](https://github.com/SocialGouv/code-du-travail-numerique/commit/ed9d3bb4dfbb36f282ff2cdf8985b0b51da52200))





# [4.167.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.166.0...v4.167.0) (2024-12-04)


### Bug Fixes

* **replaceAll:** correction de l'erreur sur la page 404 qui load `pandacss` mais qui ne contient pas le `PolyfillComponent` ([b345f9f](https://github.com/SocialGouv/code-du-travail-numerique/commit/b345f9fff67c5bc6158ef8db74edb211e78cef01))
* **text-wrapping:** change reset from `pandacss` ([#6336](https://github.com/SocialGouv/code-du-travail-numerique/issues/6336)) ([a15cdbc](https://github.com/SocialGouv/code-du-travail-numerique/commit/a15cdbc336dcfae32b63e47a0aaa9e5557464dd6))


### Features

* module trouver sa cc ([#6267](https://github.com/SocialGouv/code-du-travail-numerique/issues/6267)) ([847861b](https://github.com/SocialGouv/code-du-travail-numerique/commit/847861bec2b772ec8f7fa426e6ffc79ec86a44e8)), closes [#6079](https://github.com/SocialGouv/code-du-travail-numerique/issues/6079) [#6085](https://github.com/SocialGouv/code-du-travail-numerique/issues/6085) [#6090](https://github.com/SocialGouv/code-du-travail-numerique/issues/6090) [#6082](https://github.com/SocialGouv/code-du-travail-numerique/issues/6082) [#6092](https://github.com/SocialGouv/code-du-travail-numerique/issues/6092) [#6096](https://github.com/SocialGouv/code-du-travail-numerique/issues/6096) [#6099](https://github.com/SocialGouv/code-du-travail-numerique/issues/6099) [#6094](https://github.com/SocialGouv/code-du-travail-numerique/issues/6094)





# [4.166.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.165.0...v4.166.0) (2024-11-28)


### Bug Fixes

* **contribution:** `trim` à `false` sur les tables ([#6324](https://github.com/SocialGouv/code-du-travail-numerique/issues/6324)) ([d957c8f](https://github.com/SocialGouv/code-du-travail-numerique/commit/d957c8fe26a03e75151f587bdb7cfbcca2ab387a))
* **fiches-mt:** ajout du parsing entre deux balises ([#6321](https://github.com/SocialGouv/code-du-travail-numerique/issues/6321)) ([05580fd](https://github.com/SocialGouv/code-du-travail-numerique/commit/05580fd81d1843a917d5449a88cd30524ff648c5))
* **polyfills:** ajout du replaceAll de manière globale ([#6311](https://github.com/SocialGouv/code-du-travail-numerique/issues/6311)) ([cd1bf5c](https://github.com/SocialGouv/code-du-travail-numerique/commit/cd1bf5ce27a14e1fe55f2508457d34c051bb3e0b))
* **tests:** ignorer les fichiers avec `.script` ([136ec7a](https://github.com/SocialGouv/code-du-travail-numerique/commit/136ec7a8da61cae6a1ccd63ec9202c180842714f))


### Features

* support de la version 3.4 des fiches SP ([#6327](https://github.com/SocialGouv/code-du-travail-numerique/issues/6327)) ([34a2210](https://github.com/SocialGouv/code-du-travail-numerique/commit/34a2210e9f2917ad7a2692649dc3b2fdc525b139))
* **theme:** gestion du dark mode sur les widgets ([#6275](https://github.com/SocialGouv/code-du-travail-numerique/issues/6275)) ([a59bb29](https://github.com/SocialGouv/code-du-travail-numerique/commit/a59bb29df50dd1b5815f0eb3be0b15d28c09d71e))





## [4.165.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.165.0...v4.165.1) (2024-11-28)

**Note:** Version bump only for package @socialgouv/code-du-travail





# [4.165.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.164.2...v4.165.0) (2024-11-25)


### Bug Fixes

* **ci:** mis à jour des messages mattermost pour les e2e => retrait des doublons quand les tests fails ([#6317](https://github.com/SocialGouv/code-du-travail-numerique/issues/6317)) ([4ab71bf](https://github.com/SocialGouv/code-du-travail-numerique/commit/4ab71bfd48a4c3830d03454f8461d2314e84b25c))


### Features

* ajout de redirections pour les nouvelles CC ([#6313](https://github.com/SocialGouv/code-du-travail-numerique/issues/6313)) ([4d9fac3](https://github.com/SocialGouv/code-du-travail-numerique/commit/4d9fac375ecb0c9eacfb4a40ac6b8e12c7ee88f0))





## [4.164.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.164.1...v4.164.2) (2024-11-22)


### Bug Fixes

* contenu lié de type SP ne renvoient plus chez nous ([#6314](https://github.com/SocialGouv/code-du-travail-numerique/issues/6314)) ([91a41f9](https://github.com/SocialGouv/code-du-travail-numerique/commit/91a41f9824fa56871e9f9629bf0e80b0d50d6b3e))





## [4.164.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.164.0...v4.164.1) (2024-11-18)


### Bug Fixes

* **fiches-mt:** modication de la canonical ([#6306](https://github.com/SocialGouv/code-du-travail-numerique/issues/6306)) ([cf296a8](https://github.com/SocialGouv/code-du-travail-numerique/commit/cf296a8f382b875a148703837309118bf286c42e))





# [4.164.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.163.0...v4.164.0) (2024-11-15)


### Features

* ajout d'events pour suivre les clicks sur des aides ([#6303](https://github.com/SocialGouv/code-du-travail-numerique/issues/6303)) ([f077b10](https://github.com/SocialGouv/code-du-travail-numerique/commit/f077b1019ea3eec13716ffc196fa464f181842d7))





# [4.163.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.162.0...v4.163.0) (2024-11-13)


### Bug Fixes

* erreur sur le replaceAll sur les anciens navigateurs ([#6287](https://github.com/SocialGouv/code-du-travail-numerique/issues/6287)) ([fc8b363](https://github.com/SocialGouv/code-du-travail-numerique/commit/fc8b36329dcb38a290431e411120b114c721df47))


### Features

* amélioration du message d'erreur sur le salaire brut/net ([#6280](https://github.com/SocialGouv/code-du-travail-numerique/issues/6280)) ([2bbf0ab](https://github.com/SocialGouv/code-du-travail-numerique/commit/2bbf0ab3f670deed7333579a17ab30804106eab2))





# [4.162.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.161.0...v4.162.0) (2024-11-13)


### Bug Fixes

* **dsfr:** modification du logo principal ([#6278](https://github.com/SocialGouv/code-du-travail-numerique/issues/6278)) ([2fced9b](https://github.com/SocialGouv/code-du-travail-numerique/commit/2fced9ba5df784355f7b5e74f14dcbff8098e033))


### Features

* **dsfr:** intégration de la page home ([#6219](https://github.com/SocialGouv/code-du-travail-numerique/issues/6219)) ([c296467](https://github.com/SocialGouv/code-du-travail-numerique/commit/c2964676e5d46db414c2565c7b6bde8f5e03ee8e)), closes [#6079](https://github.com/SocialGouv/code-du-travail-numerique/issues/6079) [#6085](https://github.com/SocialGouv/code-du-travail-numerique/issues/6085) [#6090](https://github.com/SocialGouv/code-du-travail-numerique/issues/6090) [#6082](https://github.com/SocialGouv/code-du-travail-numerique/issues/6082) [#6092](https://github.com/SocialGouv/code-du-travail-numerique/issues/6092) [#6096](https://github.com/SocialGouv/code-du-travail-numerique/issues/6096) [#6099](https://github.com/SocialGouv/code-du-travail-numerique/issues/6099) [#6094](https://github.com/SocialGouv/code-du-travail-numerique/issues/6094)
* **DSFR:** salaire brut / net ([#6260](https://github.com/SocialGouv/code-du-travail-numerique/issues/6260)) ([43505f5](https://github.com/SocialGouv/code-du-travail-numerique/commit/43505f5a790c74f4ec951aa7f009b31f34ae5734)), closes [#6245](https://github.com/SocialGouv/code-du-travail-numerique/issues/6245)





# [4.161.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.160.0...v4.161.0) (2024-11-12)


### Bug Fixes

* ajout du style sur les tableaux pour les fiches MT ([#6266](https://github.com/SocialGouv/code-du-travail-numerique/issues/6266)) ([dbe29ab](https://github.com/SocialGouv/code-du-travail-numerique/commit/dbe29ab159fd0c1bd6dfb222396728dd3c5774e8))
* développer la page convention collective test e2e ([#6272](https://github.com/SocialGouv/code-du-travail-numerique/issues/6272)) ([6e29a0d](https://github.com/SocialGouv/code-du-travail-numerique/commit/6e29a0db7b8792871e2e0c4266a5fff5eebdb65f)), closes [#6079](https://github.com/SocialGouv/code-du-travail-numerique/issues/6079) [#6085](https://github.com/SocialGouv/code-du-travail-numerique/issues/6085) [#6090](https://github.com/SocialGouv/code-du-travail-numerique/issues/6090) [#6082](https://github.com/SocialGouv/code-du-travail-numerique/issues/6082) [#6092](https://github.com/SocialGouv/code-du-travail-numerique/issues/6092) [#6096](https://github.com/SocialGouv/code-du-travail-numerique/issues/6096) [#6099](https://github.com/SocialGouv/code-du-travail-numerique/issues/6099) [#6094](https://github.com/SocialGouv/code-du-travail-numerique/issues/6094)
* **liens réseaux sociaux:** do not display sr-only ([#6270](https://github.com/SocialGouv/code-du-travail-numerique/issues/6270)) ([7fd99a5](https://github.com/SocialGouv/code-du-travail-numerique/commit/7fd99a557b3802776637f1e5ae0a0dc80aa66be1))


### Features

* développer la page convention collective ([#6225](https://github.com/SocialGouv/code-du-travail-numerique/issues/6225)) ([30694a9](https://github.com/SocialGouv/code-du-travail-numerique/commit/30694a9f30858814c8e640a83c376c727517ee13)), closes [#6079](https://github.com/SocialGouv/code-du-travail-numerique/issues/6079) [#6085](https://github.com/SocialGouv/code-du-travail-numerique/issues/6085) [#6090](https://github.com/SocialGouv/code-du-travail-numerique/issues/6090) [#6082](https://github.com/SocialGouv/code-du-travail-numerique/issues/6082) [#6092](https://github.com/SocialGouv/code-du-travail-numerique/issues/6092) [#6096](https://github.com/SocialGouv/code-du-travail-numerique/issues/6096) [#6099](https://github.com/SocialGouv/code-du-travail-numerique/issues/6099) [#6094](https://github.com/SocialGouv/code-du-travail-numerique/issues/6094)
* **dsfr:** migration de la page modèle de document ([#6217](https://github.com/SocialGouv/code-du-travail-numerique/issues/6217)) ([0f21f3f](https://github.com/SocialGouv/code-du-travail-numerique/commit/0f21f3f688a2dae3b62d8ea5d5f786e60bfdc3d7))
* suppression des redirections obsolètes ([#6259](https://github.com/SocialGouv/code-du-travail-numerique/issues/6259)) ([47b8d9d](https://github.com/SocialGouv/code-du-travail-numerique/commit/47b8d9d111a3bea9d1506b45a6c116a7d71d35c5))





# [4.160.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.159.0...v4.160.0) (2024-11-06)


### Bug Fixes

* **dsfr:** Correction d'erreur sur la structure HTML pour les fiches mt ([#6264](https://github.com/SocialGouv/code-du-travail-numerique/issues/6264)) ([4ebe479](https://github.com/SocialGouv/code-du-travail-numerique/commit/4ebe479d73de9aa091bd48b75b10dda36e829077))
* **lighthouse:** ne pas throw d'erreur si les valeurs visées ne sont pas les bonnes ([#6258](https://github.com/SocialGouv/code-du-travail-numerique/issues/6258)) ([92fb699](https://github.com/SocialGouv/code-du-travail-numerique/commit/92fb6998fde74151dd319e2135f1c1c960b50ddc))


### Features

* changer la couleur de bouton de partage ([#6238](https://github.com/SocialGouv/code-du-travail-numerique/issues/6238)) ([756399b](https://github.com/SocialGouv/code-du-travail-numerique/commit/756399be7a31cca46154a3ac3c8b463b0f3bdcc2))
* **ci:** ajout de lighthouse sur les tests heavy pour les pages DSFR ([#6224](https://github.com/SocialGouv/code-du-travail-numerique/issues/6224)) ([34158c7](https://github.com/SocialGouv/code-du-travail-numerique/commit/34158c783a3f744d32c6f9870731426266818a0a))





# [4.159.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.158.1...v4.159.0) (2024-10-31)


### Bug Fixes

* ajouter un espace après les liens fiche cdt ([#6237](https://github.com/SocialGouv/code-du-travail-numerique/issues/6237)) ([482396f](https://github.com/SocialGouv/code-du-travail-numerique/commit/482396f7fe1271571d001383e977ccb203546ecb))
* **dsfr:** ne pas utiliser deux fois la balise HTML ([#6246](https://github.com/SocialGouv/code-du-travail-numerique/issues/6246)) ([3c179b1](https://github.com/SocialGouv/code-du-travail-numerique/commit/3c179b1eac21433c82ae8ba64a9e8fe8b8334332))
* formulation lorsque le résultat légal et cc est identique ([#6250](https://github.com/SocialGouv/code-du-travail-numerique/issues/6250)) ([520afad](https://github.com/SocialGouv/code-du-travail-numerique/commit/520afad9ab708f4091b2da7042fd07151732cd77))


### Features

* ajout d'un event de tracking sur les glossaires ([#6248](https://github.com/SocialGouv/code-du-travail-numerique/issues/6248)) ([3120e3a](https://github.com/SocialGouv/code-du-travail-numerique/commit/3120e3a22d9fa0b8b524d712868eaecc2b1976da))
* **dsfr:** ajout d'un detecteur d'adblock pour éviter qu'un usager partage un message dans le vide ([#6226](https://github.com/SocialGouv/code-du-travail-numerique/issues/6226)) ([833d144](https://github.com/SocialGouv/code-du-travail-numerique/commit/833d144fe8c0debf1e42942246123c5b294511ff)), closes [#6227](https://github.com/SocialGouv/code-du-travail-numerique/issues/6227)
* migration des fiches MT en DSFR ([#6211](https://github.com/SocialGouv/code-du-travail-numerique/issues/6211)) ([ecd387b](https://github.com/SocialGouv/code-du-travail-numerique/commit/ecd387bf6d1d2659fb7a1d12bb1f6e3382a95aab))





## [4.158.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.158.0...v4.158.1) (2024-10-30)


### Bug Fixes

* **simulateur embauche:** revert DSFR sur simulateur embauche ([#6245](https://github.com/SocialGouv/code-du-travail-numerique/issues/6245)) ([6a359dd](https://github.com/SocialGouv/code-du-travail-numerique/commit/6a359dded859d056e405c2b5432a7eed0ea0e138))





# [4.158.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.157.0...v4.158.0) (2024-10-29)


### Bug Fixes

* **feedback:** suppression du bouton de receuil de commentaire "tally" ([#6240](https://github.com/SocialGouv/code-du-travail-numerique/issues/6240)) ([9d00e70](https://github.com/SocialGouv/code-du-travail-numerique/commit/9d00e701ca37c25e401cc991f149499b3f5f04a2))
* **sentry:** manque l'URL sur les pages en 404 ([#6243](https://github.com/SocialGouv/code-du-travail-numerique/issues/6243)) ([9799115](https://github.com/SocialGouv/code-du-travail-numerique/commit/9799115482d17a8b0e4bc2b91861238d9c8b120e))


### Features

* 6188 ajout des tests UI pour le simu preavis de demission ([#6190](https://github.com/SocialGouv/code-du-travail-numerique/issues/6190)) ([6db4f07](https://github.com/SocialGouv/code-du-travail-numerique/commit/6db4f07731e5ba66d934da7e029083c4d0d7f7b3))
* 6189 ajout des tests UI pour le simu preavis de licenciement ([#6191](https://github.com/SocialGouv/code-du-travail-numerique/issues/6191)) ([7f6a995](https://github.com/SocialGouv/code-du-travail-numerique/commit/7f6a99587c5a7c203eef47dcf7e3c2eb9b64f2de))
* 6197 migration du simulateur brutnet ([#6205](https://github.com/SocialGouv/code-du-travail-numerique/issues/6205)) ([259e602](https://github.com/SocialGouv/code-du-travail-numerique/commit/259e602ed0603658a960a1069571197fd876ff13)), closes [#6079](https://github.com/SocialGouv/code-du-travail-numerique/issues/6079) [#6085](https://github.com/SocialGouv/code-du-travail-numerique/issues/6085) [#6090](https://github.com/SocialGouv/code-du-travail-numerique/issues/6090) [#6082](https://github.com/SocialGouv/code-du-travail-numerique/issues/6082) [#6092](https://github.com/SocialGouv/code-du-travail-numerique/issues/6092) [#6096](https://github.com/SocialGouv/code-du-travail-numerique/issues/6096) [#6099](https://github.com/SocialGouv/code-du-travail-numerique/issues/6099) [#6094](https://github.com/SocialGouv/code-du-travail-numerique/issues/6094)
* add indemnite preca UT ([#6199](https://github.com/SocialGouv/code-du-travail-numerique/issues/6199)) ([db071da](https://github.com/SocialGouv/code-du-travail-numerique/commit/db071da8b59eeecc9778f8d482242ccd8f072e15))
* add TU heure recherche emploi ([#6195](https://github.com/SocialGouv/code-du-travail-numerique/issues/6195)) ([826c649](https://github.com/SocialGouv/code-du-travail-numerique/commit/826c6498d7f4c7fe9ca33f8f8dcef24c0b3624d6))
* modification des références et message d'erreurs ([#6239](https://github.com/SocialGouv/code-du-travail-numerique/issues/6239)) ([5f4df8e](https://github.com/SocialGouv/code-du-travail-numerique/commit/5f4df8e4b287638971e021fea84d150e65e4399e))





# [4.157.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.156.1...v4.157.0) (2024-10-22)


### Bug Fixes

* **csp config:** retrait de la règle "data:" ([#6218](https://github.com/SocialGouv/code-du-travail-numerique/issues/6218)) ([1912756](https://github.com/SocialGouv/code-du-travail-numerique/commit/191275669602054ab62b3fefd62a85815f4c0a7d))
* **dsfr:** retours métiers sur les nouvelles pages intégrées ([#6222](https://github.com/SocialGouv/code-du-travail-numerique/issues/6222)) ([5871a59](https://github.com/SocialGouv/code-du-travail-numerique/commit/5871a59751e4334aeb24753c5c979c0725ada45d))
* remove husky precommit to release ([#6229](https://github.com/SocialGouv/code-du-travail-numerique/issues/6229)) ([5f97006](https://github.com/SocialGouv/code-du-travail-numerique/commit/5f9700642eee678f7a919c04da520ab5fd6f81eb))


### Features

* **dsfr:** ajout des premières pages et composants en DSFR ([#6078](https://github.com/SocialGouv/code-du-travail-numerique/issues/6078)) ([d841f65](https://github.com/SocialGouv/code-du-travail-numerique/commit/d841f65ec429eccd16dfcfbfa5e12d5be36270fa)), closes [#6079](https://github.com/SocialGouv/code-du-travail-numerique/issues/6079) [#6085](https://github.com/SocialGouv/code-du-travail-numerique/issues/6085) [#6090](https://github.com/SocialGouv/code-du-travail-numerique/issues/6090) [#6082](https://github.com/SocialGouv/code-du-travail-numerique/issues/6082) [#6092](https://github.com/SocialGouv/code-du-travail-numerique/issues/6092) [#6096](https://github.com/SocialGouv/code-du-travail-numerique/issues/6096) [#6099](https://github.com/SocialGouv/code-du-travail-numerique/issues/6099) [#6094](https://github.com/SocialGouv/code-du-travail-numerique/issues/6094)





## [4.156.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.156.0...v4.156.1) (2024-10-14)

### Bug Fixes

- **indemnité de licenciement:** ajout de l'avenant pour la CC 275 ([#6174](https://github.com/SocialGouv/code-du-travail-numerique/issues/6174)) ([bf843e5](https://github.com/SocialGouv/code-du-travail-numerique/commit/bf843e54f6778bb7be2d937a412b578e02667997))
- preavis demission ref manquante 3239 ([#6168](https://github.com/SocialGouv/code-du-travail-numerique/issues/6168)) ([1a85a22](https://github.com/SocialGouv/code-du-travail-numerique/commit/1a85a2279a74bd8d05d93865433da07d03e8aabc))

# [4.156.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.155.2...v4.156.0) (2024-10-10)

### Bug Fixes

- **bouton questionnaire:** ne pas ouvrir avec l'animation si on est en mobile ([#6200](https://github.com/SocialGouv/code-du-travail-numerique/issues/6200)) ([c284244](https://github.com/SocialGouv/code-du-travail-numerique/commit/c2842445d5ed2804617dd02ec219fceba1b842d3))
- **deps:** update dependency next to v14.2.11 [security] ([9d8bcb7](https://github.com/SocialGouv/code-du-travail-numerique/commit/9d8bcb7d7306afede239256cb56710f8551794b8))
- **error logs:** retrait du log dans sentry des erreurs d'accès au localStorage ([#6181](https://github.com/SocialGouv/code-du-travail-numerique/issues/6181)) ([8e20206](https://github.com/SocialGouv/code-du-travail-numerique/commit/8e20206358baca515c75727f3a4af6ab487d4e52))
- **idcc:** ajout des redirections pour les CC qui ont été supprimé ([#6187](https://github.com/SocialGouv/code-du-travail-numerique/issues/6187)) ([2a1752a](https://github.com/SocialGouv/code-du-travail-numerique/commit/2a1752acc9bd6f5eb0c7c3c4bb859ce7e7589070))
- **idcc:** ne pas afficher le lien vers la CC si pas de slug ([#6193](https://github.com/SocialGouv/code-du-travail-numerique/issues/6193)) ([221338c](https://github.com/SocialGouv/code-du-travail-numerique/commit/221338c9670e69538e93ec2c2f15e16e1a9539bb))
- **indemnité de licenciement:** simplification de la CC 275 ([#6173](https://github.com/SocialGouv/code-du-travail-numerique/issues/6173)) ([10cc1bd](https://github.com/SocialGouv/code-du-travail-numerique/commit/10cc1bd0e156243dd33da88c7915e89a0637c63e))
- liveness probe ([#6184](https://github.com/SocialGouv/code-du-travail-numerique/issues/6184)) ([0237f23](https://github.com/SocialGouv/code-du-travail-numerique/commit/0237f23fbe412288a6c8e07073a6561002b55fdb))
- **trouver sa cc:** update url canonique ([#6175](https://github.com/SocialGouv/code-du-travail-numerique/issues/6175)) ([eb77564](https://github.com/SocialGouv/code-du-travail-numerique/commit/eb77564180242664082a9e3bc6f374e6de53d7f7))

### Features

- **modèles de documents:** track des utilisateurs qui type CTRL + C sur la page ([#6186](https://github.com/SocialGouv/code-du-travail-numerique/issues/6186)) ([da37349](https://github.com/SocialGouv/code-du-travail-numerique/commit/da37349065200e3c5da9c2d0ab03b9ee3e83c4de))

## [4.155.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.155.1...v4.155.2) (2024-09-25)

### Bug Fixes

- **typo:** typo dans le titre de rupture conventionnelle + update de l'animation sur le bouton du questionnaire ([#6164](https://github.com/SocialGouv/code-du-travail-numerique/issues/6164)) ([99ace13](https://github.com/SocialGouv/code-du-travail-numerique/commit/99ace132f58c1af5d5f261c98498b030840a3baa))

## [4.155.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.155.0...v4.155.1) (2024-09-23)

### Bug Fixes

- back to main nodepool ([#6162](https://github.com/SocialGouv/code-du-travail-numerique/issues/6162)) ([002e3c7](https://github.com/SocialGouv/code-du-travail-numerique/commit/002e3c7ae1f479a541ee42b0ca338b78b3f53c69))
- **link:** ne pas afficher l'icon lien externe sur `code.travail.gouv.fr` ([#6155](https://github.com/SocialGouv/code-du-travail-numerique/issues/6155)) ([2f3b7f2](https://github.com/SocialGouv/code-du-travail-numerique/commit/2f3b7f29b7473ecfb415494668657074e8e1b86b))
- **url accéssibilté:** mise à jour du lien vers le site https://accessibilite.numerique.gouv.fr/ ([#6160](https://github.com/SocialGouv/code-du-travail-numerique/issues/6160)) ([901ab7f](https://github.com/SocialGouv/code-du-travail-numerique/commit/901ab7fc69ac6dfce4b80440d3ae4f157ca8202e))

# [4.155.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.154.0...v4.155.0) (2024-09-19)

### Features

- change feedback hand wave ([#6148](https://github.com/SocialGouv/code-du-travail-numerique/issues/6148)) ([2e9dff3](https://github.com/SocialGouv/code-du-travail-numerique/commit/2e9dff3d3e541764f1879d07c1ac5a45fe605fff))

# [4.154.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.153.0...v4.154.0) (2024-09-19)

### Bug Fixes

- **deps:** update dependency next to v14.2.10 [security] ([05bf2b0](https://github.com/SocialGouv/code-du-travail-numerique/commit/05bf2b039244748a47097215b087f957299cc3ad))
- **e2e:** mis à jour de la contribution ([#6115](https://github.com/SocialGouv/code-du-travail-numerique/issues/6115)) ([536e4c8](https://github.com/SocialGouv/code-du-travail-numerique/commit/536e4c82d843ab2e89737af39c766bc9014ec3e0))
- **html:** modification du bouton sur le bandeau pour avoir un html valide ([#6133](https://github.com/SocialGouv/code-du-travail-numerique/issues/6133)) ([b3d7c73](https://github.com/SocialGouv/code-du-travail-numerique/commit/b3d7c7306da4f56b8d4e8ac4e7568a25b0a2d906))
- **preavis-retraite:** correction des valeurs pour la CC 2216 ([#6144](https://github.com/SocialGouv/code-du-travail-numerique/issues/6144)) ([90000b5](https://github.com/SocialGouv/code-du-travail-numerique/commit/90000b5be84b489eb088d0560a4856b7cfbba44b))

### Features

- **conventions-collectives:** désactiver le click sur les CCs 9999 + ignorer les events matomos sur celles-ci ([#6095](https://github.com/SocialGouv/code-du-travail-numerique/issues/6095)) ([837559b](https://github.com/SocialGouv/code-du-travail-numerique/commit/837559becfdb02bd975c405f5caed0d787610ce5))
- implement feedback hand wave ([#6145](https://github.com/SocialGouv/code-du-travail-numerique/issues/6145)) ([bf88fa0](https://github.com/SocialGouv/code-du-travail-numerique/commit/bf88fa05824af9eaf226cb806f7143dbd12b1cde))

# [4.153.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.152.0...v4.153.0) (2024-09-11)

### Bug Fixes

- **cypress:** modification des conditions des tests ([#6105](https://github.com/SocialGouv/code-du-travail-numerique/issues/6105)) ([fe44cbd](https://github.com/SocialGouv/code-du-travail-numerique/commit/fe44cbd50f17321dcb1ab3d3577188b80672c8bb))
- dedicated nodepool ([#6106](https://github.com/SocialGouv/code-du-travail-numerique/issues/6106)) ([4e09b21](https://github.com/SocialGouv/code-du-travail-numerique/commit/4e09b2126bc95db7bf8ff27f481704869ab1bf50))
- **preavis-retraite:** correction de petits bugs sur le resultat ([#6098](https://github.com/SocialGouv/code-du-travail-numerique/issues/6098)) ([d6eee29](https://github.com/SocialGouv/code-du-travail-numerique/commit/d6eee293ce46c76e968e48fe4202e21f0607f840))
- **rupture-co:** changement du nom de l'event a l'étape `result` ([#6103](https://github.com/SocialGouv/code-du-travail-numerique/issues/6103)) ([8cbca28](https://github.com/SocialGouv/code-du-travail-numerique/commit/8cbca28ac4c64adf1b6f49a6d0aab79d865676ba))

### Features

- amélioration du bandeau pour le questionnaire ([#6117](https://github.com/SocialGouv/code-du-travail-numerique/issues/6117)) ([34830c0](https://github.com/SocialGouv/code-du-travail-numerique/commit/34830c04e40aef2ffac7ecc52019777190a27bf2))

# [4.152.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.151.1...v4.152.0) (2024-09-04)

### Bug Fixes

- **csp:** remove reporting on sentry ([#6092](https://github.com/SocialGouv/code-du-travail-numerique/issues/6092)) ([a28634e](https://github.com/SocialGouv/code-du-travail-numerique/commit/a28634eddd7b55af23bc01c82c87bedaa1ae5771))

### Features

- ajout d'un questionnaire sur l'utilisation du site ([#6084](https://github.com/SocialGouv/code-du-travail-numerique/issues/6084)) ([5be1d4a](https://github.com/SocialGouv/code-du-travail-numerique/commit/5be1d4affee9d821b6f67914fc6e4b3ef45095b0))

## [4.151.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.151.0...v4.151.1) (2024-08-30)

### Bug Fixes

- **recherche:** remonter les pré-qualifiés dans la recherche ([#6082](https://github.com/SocialGouv/code-du-travail-numerique/issues/6082)) ([f85f181](https://github.com/SocialGouv/code-du-travail-numerique/commit/f85f181bc90bce4a8fdbab57c1bda6cec21eb8e5))

# [4.151.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.150.0...v4.151.0) (2024-08-19)

### Features

- **contribution:** ajout d'un titre pour le SEO ([#6071](https://github.com/SocialGouv/code-du-travail-numerique/issues/6071)) ([0ec1b1c](https://github.com/SocialGouv/code-du-travail-numerique/commit/0ec1b1c7e9752b956bdd16819b1daaaf6426bc12))

# [4.150.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.149.1...v4.150.0) (2024-08-13)

### Bug Fixes

- **seo:** retrait d'un lien interne en nofollow ([#6069](https://github.com/SocialGouv/code-du-travail-numerique/issues/6069)) ([bce5781](https://github.com/SocialGouv/code-du-travail-numerique/commit/bce5781dc0153b283068c0387b9bbc57f9f74ec3))

### Features

- **seo:** amélioration du SEO pour la rupture co ([#6074](https://github.com/SocialGouv/code-du-travail-numerique/issues/6074)) ([9068330](https://github.com/SocialGouv/code-du-travail-numerique/commit/90683309c12f5676c468704d158358d92df2930d))

## [4.149.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.149.0...v4.149.1) (2024-08-07)

### Bug Fixes

- dedicated prod nodepool ([#6064](https://github.com/SocialGouv/code-du-travail-numerique/issues/6064)) ([dc5c979](https://github.com/SocialGouv/code-du-travail-numerique/commit/dc5c97938eed1e23b2c27917c740b99eaf2aab5b))
- **e2e:** utilisation du sitemap pour générer les tests e2e ([#6063](https://github.com/SocialGouv/code-du-travail-numerique/issues/6063)) ([7d2aad0](https://github.com/SocialGouv/code-du-travail-numerique/commit/7d2aad0985d3ec7d617f2d639e97235f68a839f9))

# [4.149.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.148.0...v4.149.0) (2024-08-05)

### Bug Fixes

- **e2e:** utilisation du sitemap pour générer les tests e2e ([#6060](https://github.com/SocialGouv/code-du-travail-numerique/issues/6060)) ([0453b98](https://github.com/SocialGouv/code-du-travail-numerique/commit/0453b986296421e6c910ba97d7d8881ff8234a85))
- **eslint:** upgrade to latest version ([#6061](https://github.com/SocialGouv/code-du-travail-numerique/issues/6061)) ([81c072e](https://github.com/SocialGouv/code-du-travail-numerique/commit/81c072ebddebcf8aca3e24268eec4e16363744e8))
- **rupture-co:** ne pas autoriser une date de fin identique à la date de début ([#6055](https://github.com/SocialGouv/code-du-travail-numerique/issues/6055)) ([d1d84c7](https://github.com/SocialGouv/code-du-travail-numerique/commit/d1d84c702678256fd348f84ff28671e5083ca4b3))

### Features

- **preavis-retraite:** refacto au niveau du `state` du simulateur ([#6054](https://github.com/SocialGouv/code-du-travail-numerique/issues/6054)) ([1efb1c5](https://github.com/SocialGouv/code-du-travail-numerique/commit/1efb1c545a71d18441d5e444c120eb8dcf43eef4))
- **widget:** implement rupture co ([#5900](https://github.com/SocialGouv/code-du-travail-numerique/issues/5900)) ([70f1bc9](https://github.com/SocialGouv/code-du-travail-numerique/commit/70f1bc9233621b638a9650ed1b240b6d54915202))

# [4.148.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.147.0...v4.148.0) (2024-07-24)

### Bug Fixes

- **2148:** ne pas arrondir l'ancienneté en année complète si moins d'un pour avoir une indemnité en cas de rupture co (ne change rien à l'indemnité de licenciement) ([#6036](https://github.com/SocialGouv/code-du-travail-numerique/issues/6036)) ([3f1e854](https://github.com/SocialGouv/code-du-travail-numerique/commit/3f1e854c6887bcdbce9b192288541b96813947d7))
- **related-content:** passer l'url pour les articles liés externes ([#6050](https://github.com/SocialGouv/code-du-travail-numerique/issues/6050)) ([fb96ebf](https://github.com/SocialGouv/code-du-travail-numerique/commit/fb96ebf648e6b873dca1cb7df21279baaef183cf))
- **rupture-co:** activation du questionnaire de satisfaction ([#6046](https://github.com/SocialGouv/code-du-travail-numerique/issues/6046)) ([b7aed3a](https://github.com/SocialGouv/code-du-travail-numerique/commit/b7aed3a2adca0125e04c00f44fa915366f61379b))
- **rupture-co:** ajout d'espace pour le titre long ([#6048](https://github.com/SocialGouv/code-du-travail-numerique/issues/6048)) ([6a9527e](https://github.com/SocialGouv/code-du-travail-numerique/commit/6a9527e6d4704f256b0e72c7bfdb8d765fdbe0e8))
- **rupture-co:** désactiver les anciennes règles de la 1486 ([#6045](https://github.com/SocialGouv/code-du-travail-numerique/issues/6045)) ([299b29f](https://github.com/SocialGouv/code-du-travail-numerique/commit/299b29f89510663579b669c97f4740ed11b6d746))
- **rupture-co:** retrait de l'autofocus sur l'étape ancienneté ([#6047](https://github.com/SocialGouv/code-du-travail-numerique/issues/6047)) ([77eba52](https://github.com/SocialGouv/code-du-travail-numerique/commit/77eba52f549fb3c7d435e5ea834152bdc9177ac6))

### Features

- **agreements:** ajout de nouvelles fusions de convention collective ([#6051](https://github.com/SocialGouv/code-du-travail-numerique/issues/6051)) ([bed0ec9](https://github.com/SocialGouv/code-du-travail-numerique/commit/bed0ec95e3ca5e39fbbfc904ada31047eac26a32))
- **tools:** ajout d'un identifiant de campagne pour la recherche d'entreprise ([#6052](https://github.com/SocialGouv/code-du-travail-numerique/issues/6052)) ([cf4749c](https://github.com/SocialGouv/code-du-travail-numerique/commit/cf4749c12260e6a5a34957723764a3bf6cd56e73))

# [4.147.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.146.4...v4.147.0) (2024-07-17)

### Bug Fixes

- **csp:** ajout de matomo au niveau de l'image ([#6038](https://github.com/SocialGouv/code-du-travail-numerique/issues/6038)) ([40af0f7](https://github.com/SocialGouv/code-du-travail-numerique/commit/40af0f7734cbf8b4c79f5c93d2c9d131e801c230))

### Features

- **apis:** migrations des APIs côté `getServerSideProps` ([#6033](https://github.com/SocialGouv/code-du-travail-numerique/issues/6033)) ([2615cd6](https://github.com/SocialGouv/code-du-travail-numerique/commit/2615cd669c0ca143e0dc093949bc44ee851336f1))
- **contributions:** ajout de la date de mise à jour sur les contributions ([#6034](https://github.com/SocialGouv/code-du-travail-numerique/issues/6034)) ([01838d4](https://github.com/SocialGouv/code-du-travail-numerique/commit/01838d426a5b240bcec6c693f839b76aaff392d7))

## [4.146.4](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.146.3...v4.146.4) (2024-07-15)

### Bug Fixes

- **api entreprises:** ne pas catch l'erreur pour qu'elle apparaisse côté client ([#6031](https://github.com/SocialGouv/code-du-travail-numerique/issues/6031)) ([62bd84f](https://github.com/SocialGouv/code-du-travail-numerique/commit/62bd84f71769171506f30961741cb9833590ea5c))
- **code:** nettoyage de code inutilisé ([#6024](https://github.com/SocialGouv/code-du-travail-numerique/issues/6024)) ([37993db](https://github.com/SocialGouv/code-du-travail-numerique/commit/37993dbda37170c496bff43a1328ca26cbb5e3eb))
- **csp:** add a `report-to` param to get csp report ([#6028](https://github.com/SocialGouv/code-du-travail-numerique/issues/6028)) ([7beb52c](https://github.com/SocialGouv/code-du-travail-numerique/commit/7beb52c251456a43c72488c5e0b09e2362752d4f))

## [4.146.3](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.146.2...v4.146.3) (2024-07-05)

### Bug Fixes

- **csp:** optimisation des permissions ([#6023](https://github.com/SocialGouv/code-du-travail-numerique/issues/6023)) ([6a45e1d](https://github.com/SocialGouv/code-du-travail-numerique/commit/6a45e1dee3417072b16a316034c7dc06e76102a9))
- **recherche:** mettre en place des messages d'erreur en mode hors-ligne ([#6021](https://github.com/SocialGouv/code-du-travail-numerique/issues/6021)) ([379246e](https://github.com/SocialGouv/code-du-travail-numerique/commit/379246ebeb14ea91df9f23e2a88f32445dd10bc3))

## [4.146.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.146.1...v4.146.2) (2024-07-05)

### Bug Fixes

- **agreement:** mise à jour de l'URL pour la convention collective 7026 ([#6012](https://github.com/SocialGouv/code-du-travail-numerique/issues/6012)) ([c223b42](https://github.com/SocialGouv/code-du-travail-numerique/commit/c223b42425b0c18374b96bd58de20effdb163bea))
- **csp:** add matomo to connect-src ([c683b57](https://github.com/SocialGouv/code-du-travail-numerique/commit/c683b57c8eeb1e1742eec788613207e563208d3e))
- **widget search:** ne pas crasher si l'on ne peut pas accéder à la méthod ResizeObserver ([#6005](https://github.com/SocialGouv/code-du-travail-numerique/issues/6005)) ([28bdeb9](https://github.com/SocialGouv/code-du-travail-numerique/commit/28bdeb90bc8e39c05783f0ca406b4f5f1bcbbd0f))

## [4.146.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.146.0...v4.146.1) (2024-07-04)

### Bug Fixes

- **csp:** add geo api gouv ([3e30c21](https://github.com/SocialGouv/code-du-travail-numerique/commit/3e30c21a1a92aa332a79ca6a9de5e5d1646e65c3))

# [4.146.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.145.1...v4.146.0) (2024-07-04)

### Bug Fixes

- bug CC 1517 validation notif ne fonctionne pas ([#6009](https://github.com/SocialGouv/code-du-travail-numerique/issues/6009)) ([9a1dbf1](https://github.com/SocialGouv/code-du-travail-numerique/commit/9a1dbf146becad1490f8db79d3c85266829b0fea))
- cdtn update resources ([#6011](https://github.com/SocialGouv/code-du-travail-numerique/issues/6011)) ([f795212](https://github.com/SocialGouv/code-du-travail-numerique/commit/f79521268721a4734ccfa89283410b7320cb9dea))
- **search:** clean deps + highlight dans la recherche ([#6016](https://github.com/SocialGouv/code-du-travail-numerique/issues/6016)) ([e813007](https://github.com/SocialGouv/code-du-travail-numerique/commit/e81300713cae0477d88e13fce85be2965da6b329))

### Features

- adaptation calcul anciennete requise CC rupture co ([#5997](https://github.com/SocialGouv/code-du-travail-numerique/issues/5997)) ([a20f396](https://github.com/SocialGouv/code-du-travail-numerique/commit/a20f39600734a6c87c2b8fdf68423728cf353877))
- **cc non étendues:** suppression de tous les simulateurs des CC non étendues 29, 413 et 2420 ([#5998](https://github.com/SocialGouv/code-du-travail-numerique/issues/5998)) ([3d4d0af](https://github.com/SocialGouv/code-du-travail-numerique/commit/3d4d0afb185ec0677f9433c742572f733cc50355))
- **recherche-entreprise:** utilisation d'annuaire entreprise ([#5631](https://github.com/SocialGouv/code-du-travail-numerique/issues/5631)) ([beef24f](https://github.com/SocialGouv/code-du-travail-numerique/commit/beef24f82970e7ced658d87e0f9ef4cd9247de7b))

## [4.145.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.145.0...v4.145.1) (2024-06-27)

### Bug Fixes

- **localStorage error:** do not crash if error "Failed to read the 'localStorage' property from 'Window': Access is denied for this document." is thrown ([#5999](https://github.com/SocialGouv/code-du-travail-numerique/issues/5999)) ([fa29fd5](https://github.com/SocialGouv/code-du-travail-numerique/commit/fa29fd516cda01b1e59ecdbbfd21955cf9067c34))

# [4.145.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.144.1...v4.145.0) (2024-06-27)

### Bug Fixes

- bug page resultat simu ([#5981](https://github.com/SocialGouv/code-du-travail-numerique/issues/5981)) ([81bdb2d](https://github.com/SocialGouv/code-du-travail-numerique/commit/81bdb2d06450610fdcc8d4fa75affe3e21c4a613))
- **indemenité de licenciement:** ne pas crasher si la date est invalid ([#5993](https://github.com/SocialGouv/code-du-travail-numerique/issues/5993)) ([6171807](https://github.com/SocialGouv/code-du-travail-numerique/commit/6171807afb0f3b79a75f2e33b1747f8a68848999))
- **preavis-licenciement:** catégorie professionnel rajouté en plus sur 2420 ([#5996](https://github.com/SocialGouv/code-du-travail-numerique/issues/5996)) ([1bbb4b1](https://github.com/SocialGouv/code-du-travail-numerique/commit/1bbb4b181232882ab71ea13acd39ecd2bf6e7061))

### Features

- **e2e:** test la validité de l'html de toutes les pages contributions et convention-collectives ([#5686](https://github.com/SocialGouv/code-du-travail-numerique/issues/5686)) ([d91c95c](https://github.com/SocialGouv/code-du-travail-numerique/commit/d91c95caa16e15e12d440b27c57032d416b2cca6))

## [4.144.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.144.0...v4.144.1) (2024-06-24)

### Bug Fixes

- dedicated nodepool ([#5987](https://github.com/SocialGouv/code-du-travail-numerique/issues/5987)) ([a7f2a67](https://github.com/SocialGouv/code-du-travail-numerique/commit/a7f2a6703c08068912fbdb39dd0c7a2c1ba5f5af))
- **html:** correction de l'invalidité html sur la partie recherche ([#5989](https://github.com/SocialGouv/code-du-travail-numerique/issues/5989)) ([ed2b100](https://github.com/SocialGouv/code-du-travail-numerique/commit/ed2b100e90e627a9e4a44785b34239ad0a7252a8))

# [4.144.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.143.2...v4.144.0) (2024-06-24)

### Bug Fixes

- 5948 error dans les logs maxlistenersexceededwarning ([#5966](https://github.com/SocialGouv/code-du-travail-numerique/issues/5966)) ([3d63440](https://github.com/SocialGouv/code-du-travail-numerique/commit/3d634405c79d736c35f140a36ba178ef3f4c92b0))
- **config:** .node-version to good node version ([62289bd](https://github.com/SocialGouv/code-du-travail-numerique/commit/62289bd19774f9646c8b9cce9a60189a98afff2e))
- **preavis de retraire:** modification de l'url de la fiche service publique ([#5975](https://github.com/SocialGouv/code-du-travail-numerique/issues/5975)) ([ee28723](https://github.com/SocialGouv/code-du-travail-numerique/commit/ee2872365ebdf8fac3be26bbdc25957becdb6a35))
- **sentry:** adding commit information to release context + avoid to create n release by n commit on dev ([#5974](https://github.com/SocialGouv/code-du-travail-numerique/issues/5974)) ([2195b5d](https://github.com/SocialGouv/code-du-travail-numerique/commit/2195b5d27a33189449364d65ba5c87bf34112d19))

### Features

- 5954 fix page stats ([#5971](https://github.com/SocialGouv/code-du-travail-numerique/issues/5971)) ([c5c2798](https://github.com/SocialGouv/code-du-travail-numerique/commit/c5c27985371e0dde53b98bd6379efc8cde2b46ba))
- **combobox:** use `downshift` instead of `react-autosuggest` ([#5972](https://github.com/SocialGouv/code-du-travail-numerique/issues/5972)) ([2bdc92f](https://github.com/SocialGouv/code-du-travail-numerique/commit/2bdc92f8bbb8baacde68869469485411f009eb02))
- **search:** remove usage of NLP to process document ([#5950](https://github.com/SocialGouv/code-du-travail-numerique/issues/5950)) ([4e9f061](https://github.com/SocialGouv/code-du-travail-numerique/commit/4e9f06176a93426082e56143d50087fa48bb5372)), closes [#5943](https://github.com/SocialGouv/code-du-travail-numerique/issues/5943)

## [4.143.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.143.1...v4.143.2) (2024-06-18)

### Bug Fixes

- **sentry:** set right project name following the change of the project name ([ee1bd5a](https://github.com/SocialGouv/code-du-travail-numerique/commit/ee1bd5ad255a4442c2c5c4321f4e3486545cccc8))

## [4.143.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.143.0...v4.143.1) (2024-06-17)

### Bug Fixes

- **sentry:** modification configuration ([#5969](https://github.com/SocialGouv/code-du-travail-numerique/issues/5969)) ([3f40c0e](https://github.com/SocialGouv/code-du-travail-numerique/commit/3f40c0e12e9895d55445c21c4e49eeb9ee334c94))

# [4.143.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.142.0...v4.143.0) (2024-06-17)

### Bug Fixes

- **simulateur indemnité de licenciement:** ajout d'une validation pour bloquer les utilisateurs qui entrent des dates de type "23/05/272024" ([#5965](https://github.com/SocialGouv/code-du-travail-numerique/issues/5965)) ([9a39511](https://github.com/SocialGouv/code-du-travail-numerique/commit/9a39511477edaf9ab2342bf6a8fd5fbf5493bad4))

### Features

- CC fusions ([#5967](https://github.com/SocialGouv/code-du-travail-numerique/issues/5967)) ([1af11e9](https://github.com/SocialGouv/code-du-travail-numerique/commit/1af11e96c493909487fddb85b12a2a6409d162a3))
- **sentry:** upgrade to V8 + use default setup configuration to use `opentelemetry` ([#5960](https://github.com/SocialGouv/code-du-travail-numerique/issues/5960)) ([146f8f2](https://github.com/SocialGouv/code-du-travail-numerique/commit/146f8f2ec4f096d27890561e446f552b8144754f))

# [4.142.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.141.0...v4.142.0) (2024-06-13)

### Bug Fixes

- **api:** remove unused log ([#5941](https://github.com/SocialGouv/code-du-travail-numerique/issues/5941)) ([e78d14e](https://github.com/SocialGouv/code-du-travail-numerique/commit/e78d14edd4505f11db89305181800f17b8ee7a1b))
- bug sur la selection CC qui maj pas moteur publicaode ([#5956](https://github.com/SocialGouv/code-du-travail-numerique/issues/5956)) ([c54b807](https://github.com/SocialGouv/code-du-travail-numerique/commit/c54b8074052cb9e0c0c4eac4ef99e72686bcbf11))
- MaxListenersExceededWarning ([#5961](https://github.com/SocialGouv/code-du-travail-numerique/issues/5961)) ([0a0965c](https://github.com/SocialGouv/code-du-travail-numerique/commit/0a0965c1917c944a484604033f4b96e3d21c98ac))
- **page informations:** uniformisation de la manière dont on render le html sur nos pages ([#5943](https://github.com/SocialGouv/code-du-travail-numerique/issues/5943)) ([b0efaf2](https://github.com/SocialGouv/code-du-travail-numerique/commit/b0efaf29d119305a5fe411a37118109c1e2d2f05))
- **performance:** changement des valeurs pour le pod `app` ([#5949](https://github.com/SocialGouv/code-du-travail-numerique/issues/5949)) ([a1a971e](https://github.com/SocialGouv/code-du-travail-numerique/commit/a1a971ef9d6184d145672bb28d86b5e611002908))
- **rupture-co:** correction CC 3248 ([#5883](https://github.com/SocialGouv/code-du-travail-numerique/issues/5883)) ([9ac1df6](https://github.com/SocialGouv/code-du-travail-numerique/commit/9ac1df672c8f65e9a757da74cd203a58fafaa3fa))
- **SecurityError:** correction des erreurs dans les widgets du au fait que le site est loadé dans une iframe ([#5945](https://github.com/SocialGouv/code-du-travail-numerique/issues/5945)) ([baa103a](https://github.com/SocialGouv/code-du-travail-numerique/commit/baa103a55cc54505e26ad0f7e87b3a67fe0e932a))
- **texte cc 3239:** modification du texte lors la séléction de CC pour corriger le fait que la 3239 est sur-représenté aujourd'hui ([#5962](https://github.com/SocialGouv/code-du-travail-numerique/issues/5962)) ([cc62d29](https://github.com/SocialGouv/code-du-travail-numerique/commit/cc62d293bba9c3441dc4e58cebee0c4d85994598))
- use new sentry project to resolve sentry bug ([#5944](https://github.com/SocialGouv/code-du-travail-numerique/issues/5944)) ([236eb87](https://github.com/SocialGouv/code-du-travail-numerique/commit/236eb87aefc7dfa71d59ccffc23d6f2def671780))

### Features

- 5873 revenir au composant html 5 pour les champs dates ([#5911](https://github.com/SocialGouv/code-du-travail-numerique/issues/5911)) ([a68132b](https://github.com/SocialGouv/code-du-travail-numerique/commit/a68132ba714d49d497d0e450ec75a301fec7ffa8))
- **dep:** ajout de `sharp` pour l'optimisation d'image ([#5940](https://github.com/SocialGouv/code-du-travail-numerique/issues/5940)) ([fa1ccab](https://github.com/SocialGouv/code-du-travail-numerique/commit/fa1ccabb4a3ff12efef2c2524e018f14a70f59f4))
- page CC non supported et 404 ([#5921](https://github.com/SocialGouv/code-du-travail-numerique/issues/5921)) ([4a7a601](https://github.com/SocialGouv/code-du-travail-numerique/commit/4a7a6016624d7d97ebace97fc3a91d9645b2e687))

# [4.141.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.140.0...v4.141.0) (2024-06-05)

### Bug Fixes

- **e2e:** ajout d'un wait pour attendre que l'accordéon soit ouvert ([#5939](https://github.com/SocialGouv/code-du-travail-numerique/issues/5939)) ([47c7ee8](https://github.com/SocialGouv/code-du-travail-numerique/commit/47c7ee85dbf5075b004a214a5fdde56d87321c77))

### Features

- **elasticsearch:** upgrade to v8 ([#5886](https://github.com/SocialGouv/code-du-travail-numerique/issues/5886)) ([9d508c1](https://github.com/SocialGouv/code-du-travail-numerique/commit/9d508c16f700dbd5fd7af0194dd89cb05f5952ab))

# [4.140.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.139.0...v4.140.0) (2024-06-04)

### Bug Fixes

- **accordion:** ne pas crasher s'il y a un selector invalid dans l'url ([#5935](https://github.com/SocialGouv/code-du-travail-numerique/issues/5935)) ([c09d821](https://github.com/SocialGouv/code-du-travail-numerique/commit/c09d8214e1dc723d61fe069eb37bb41e3797ebd4))
- **indemnité de licenciement:** ne pas crasher si le salaire conventionnel est à 0 ([#5937](https://github.com/SocialGouv/code-du-travail-numerique/issues/5937)) ([e020a07](https://github.com/SocialGouv/code-du-travail-numerique/commit/e020a0782a025c54eadd0b13e19c06ede7da7e85))
- **indemnité de rupture co:** nettoyage de la question sur l'inaptitude dans la rupture co ([#5938](https://github.com/SocialGouv/code-du-travail-numerique/issues/5938)) ([4f3b434](https://github.com/SocialGouv/code-du-travail-numerique/commit/4f3b434e81efd5e23d765a5699419c824c6db862))

### Features

- **accordéons:** ajout d'ancre sur tous les accordéons pour pouvoir les ouvrir en mettant une ancre dans l'url ([#5925](https://github.com/SocialGouv/code-du-travail-numerique/issues/5925)) ([50502e6](https://github.com/SocialGouv/code-du-travail-numerique/commit/50502e61d7a1b0dca9dba66ac6a73192fbc6d43a))
- **pages convention collective:** changement du format de la page pour n'afficher que les liens vers les contribs au lieu des réponses ([#5924](https://github.com/SocialGouv/code-du-travail-numerique/issues/5924)) ([760bb1b](https://github.com/SocialGouv/code-du-travail-numerique/commit/760bb1bd2afe520ef8ebcf39a119908e949c9171))
- **rupture co:** affichage des notifications pour la 2120 ([#5927](https://github.com/SocialGouv/code-du-travail-numerique/issues/5927)) ([6a89823](https://github.com/SocialGouv/code-du-travail-numerique/commit/6a89823f9e0f5d824a97403211b46d81b1c196a1))

# [4.139.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.138.0...v4.139.0) (2024-05-31)

### Bug Fixes

- **idemnite-licenciement:** impossible de saisir un salaire annuel inférieur ou égal à 0 ([#5918](https://github.com/SocialGouv/code-du-travail-numerique/issues/5918)) ([be28eac](https://github.com/SocialGouv/code-du-travail-numerique/commit/be28eac660abb007c43dbc43d9666dd3325473ff))
- **indemnité licenciement:** affichage des salaires sur la page résultat ([#5928](https://github.com/SocialGouv/code-du-travail-numerique/issues/5928)) ([1772924](https://github.com/SocialGouv/code-du-travail-numerique/commit/17729249d8e9a1f8773eea383f68e756c22e4305))
- **url:** modification des URLs des sdr ([#5923](https://github.com/SocialGouv/code-du-travail-numerique/issues/5923)) ([add03d4](https://github.com/SocialGouv/code-du-travail-numerique/commit/add03d441c6a4d3326907ab1c7dfb42b09820bf4))

### Features

- **e2e:** ajout de tests pour les widgets en remote ([#5919](https://github.com/SocialGouv/code-du-travail-numerique/issues/5919)) ([55bd2fd](https://github.com/SocialGouv/code-du-travail-numerique/commit/55bd2fd5da9b96549d3f29068f606c6c7fc72884))

# [4.138.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.137.1...v4.138.0) (2024-05-28)

### Bug Fixes

- **urls des convention-collectives:** modifications des règles de redirections pour ne matcher que les urls voulues ([#5922](https://github.com/SocialGouv/code-du-travail-numerique/issues/5922)) ([267d746](https://github.com/SocialGouv/code-du-travail-numerique/commit/267d746b6cb79339fa2c443193becfde5f4345df))

### Features

- 5874 formatter le rsultat sur les 2 simulateurs ([#5882](https://github.com/SocialGouv/code-du-travail-numerique/issues/5882)) ([35e6006](https://github.com/SocialGouv/code-du-travail-numerique/commit/35e600622cf153bf0d48e005042602b57083dac8))

## [4.137.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.137.0...v4.137.1) (2024-05-23)

### Bug Fixes

- **actions:** display mattermost message ([7f5b3fb](https://github.com/SocialGouv/code-du-travail-numerique/commit/7f5b3fb32f88ca337f407727ae45f8738eb05f44))
- **actions:** modification de l'action mattermost suite à son update ([#5902](https://github.com/SocialGouv/code-du-travail-numerique/issues/5902)) ([18470e3](https://github.com/SocialGouv/code-du-travail-numerique/commit/18470e36d3e13c0fd9e21aa7932d416e6550ac10))
- **e2e:** ajout des tests dans les sous dossiers ([#5879](https://github.com/SocialGouv/code-du-travail-numerique/issues/5879)) ([682fce9](https://github.com/SocialGouv/code-du-travail-numerique/commit/682fce9d3acaf16a6e9aaf3c300aec67453ff594))
- **e2e:** correction de la version du plugin pour notifier sur mattermost ([#5897](https://github.com/SocialGouv/code-du-travail-numerique/issues/5897)) ([33322cf](https://github.com/SocialGouv/code-du-travail-numerique/commit/33322cf227d9b6a74d71ba43bdd4cfe322b0df79))
- **footer:** update logo ([#5917](https://github.com/SocialGouv/code-du-travail-numerique/issues/5917)) ([83d6d34](https://github.com/SocialGouv/code-du-travail-numerique/commit/83d6d34a8c9f0581ef8fa78aded428b8bdbaa0f8))
- html tag description tuile modele ([#5906](https://github.com/SocialGouv/code-du-travail-numerique/issues/5906)) ([274ebf6](https://github.com/SocialGouv/code-du-travail-numerique/commit/274ebf6b4122f66efd1436e44a5eb7bec6047881))
- **indemnité de licenciement:** calcul du salaire de référence conventionnel correct ([#5885](https://github.com/SocialGouv/code-du-travail-numerique/issues/5885)) ([a5f0655](https://github.com/SocialGouv/code-du-travail-numerique/commit/a5f0655c18177f5179e47c5c7775a1d45c923949))
- **modeles-de-courrier:** modification du titre de deux modèles ([#5899](https://github.com/SocialGouv/code-du-travail-numerique/issues/5899)) ([91114d1](https://github.com/SocialGouv/code-du-travail-numerique/commit/91114d1208bd289e586bfad86790b2c305f3949c))

# [4.137.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.136.1...v4.137.0) (2024-05-14)

### Bug Fixes

- **images:** optimisation des images pendant build ([#5870](https://github.com/SocialGouv/code-du-travail-numerique/issues/5870)) ([ef68e5b](https://github.com/SocialGouv/code-du-travail-numerique/commit/ef68e5b5201145f68a99deb29ffec3f379d85a79))
- **search-cc:** erreur 404 à la sélection d'une entreprise ([#5878](https://github.com/SocialGouv/code-du-travail-numerique/issues/5878)) ([2ce43dd](https://github.com/SocialGouv/code-du-travail-numerique/commit/2ce43dd0edf53e253e6ef5b3d40faa0539115fb9))

### Features

- **package.json:** upgrade `next` + `cypress` ([#5862](https://github.com/SocialGouv/code-du-travail-numerique/issues/5862)) ([aa2f454](https://github.com/SocialGouv/code-du-travail-numerique/commit/aa2f454e2fa0cf641a55c80d44681eb45d368f9d))
- **sentry:** upgrade sentry + ajout de logs sur l'IL ([#5869](https://github.com/SocialGouv/code-du-travail-numerique/issues/5869)) ([549b361](https://github.com/SocialGouv/code-du-travail-numerique/commit/549b36182eff26774d79bc0b001183e10b24c14b))
- **types:** synchronisation des types au niveau de l'admin ([#5826](https://github.com/SocialGouv/code-du-travail-numerique/issues/5826)) ([f878be3](https://github.com/SocialGouv/code-du-travail-numerique/commit/f878be338415f4cd86489dd7a57a0ecaf1140de6))

## [4.136.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.136.0...v4.136.1) (2024-05-07)

### Bug Fixes

- **anchor:** affichage de l'ancre au niveau de l'accordéon sur les `fiches-ministère-travail` ([#5831](https://github.com/SocialGouv/code-du-travail-numerique/issues/5831)) ([0bf84f4](https://github.com/SocialGouv/code-du-travail-numerique/commit/0bf84f40fbe4f7e5645d4312e5a95c76a6e91fd1))
- **e2e:** modification du test e2e integration afin d'enlever les failure aléatoires ([#5847](https://github.com/SocialGouv/code-du-travail-numerique/issues/5847)) ([7e5ad15](https://github.com/SocialGouv/code-du-travail-numerique/commit/7e5ad150606335b7ef5d9bf39367f9f23cd55913))
- **indemnite-licenciement:** ajout de log à l'étape résultat ([#5857](https://github.com/SocialGouv/code-du-travail-numerique/issues/5857)) ([22b49c8](https://github.com/SocialGouv/code-du-travail-numerique/commit/22b49c873490f9e8fb3ac8e41f5b06d13fc6437d))
- **rupture-co:** changement de wording au niveau du résultat ([#5841](https://github.com/SocialGouv/code-du-travail-numerique/issues/5841)) ([059572e](https://github.com/SocialGouv/code-du-travail-numerique/commit/059572e62c1b90c0f5da15545bbc8ee3f69564e7))
- **rupture-co:** inéligibilité activée même si l'utilisateur clique CDI en premier ([#5845](https://github.com/SocialGouv/code-du-travail-numerique/issues/5845)) ([3ac0802](https://github.com/SocialGouv/code-du-travail-numerique/commit/3ac08020a6980c494f39e9180b52952e3a70dd91))
- **rupture-co:** résultat au niveau de la 176 avec une règle qui avait un problème ([#5840](https://github.com/SocialGouv/code-du-travail-numerique/issues/5840)) ([0dd227d](https://github.com/SocialGouv/code-du-travail-numerique/commit/0dd227db2010982594c7f414a34d8145431abcac))

# [4.136.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.135.0...v4.136.0) (2024-05-06)

### Bug Fixes

- **rupture-co:** ne pas afficher l'outil dans la liste ([#5846](https://github.com/SocialGouv/code-du-travail-numerique/issues/5846)) ([8eb4147](https://github.com/SocialGouv/code-du-travail-numerique/commit/8eb414778b403d4472f46f361991a264a9023a43))

### Features

- clean old meta from preavis licenciement + precarite ([#5824](https://github.com/SocialGouv/code-du-travail-numerique/issues/5824)) ([488c961](https://github.com/SocialGouv/code-du-travail-numerique/commit/488c96179ae2fed21db9e5fef97da1b35a7b2ee1))
- implementation widget CC pour telerc ([#5817](https://github.com/SocialGouv/code-du-travail-numerique/issues/5817)) ([b389361](https://github.com/SocialGouv/code-du-travail-numerique/commit/b3893616a2a7ef46cad2e54284323620a6721198))

# [4.135.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.134.2...v4.135.0) (2024-05-03)

### Bug Fixes

- **ci:** modification du paramètre `env` par `with` sur `mattermost/action-mattermost-notif` ([#5819](https://github.com/SocialGouv/code-du-travail-numerique/issues/5819)) ([b94bf4c](https://github.com/SocialGouv/code-du-travail-numerique/commit/b94bf4c13b125876d80458a3b4741db94c6a85e8))
- **e2e:** correction des tests e2e ([#5813](https://github.com/SocialGouv/code-du-travail-numerique/issues/5813)) ([2060384](https://github.com/SocialGouv/code-du-travail-numerique/commit/20603843a436efc51bf21bec4c8305e88b46822f))
- **indemnite-licenciement:** ajout de log + tests sur les années ([#5798](https://github.com/SocialGouv/code-du-travail-numerique/issues/5798)) ([56c357e](https://github.com/SocialGouv/code-du-travail-numerique/commit/56c357e305dab454d9791b44709f5694f29cd277))
- **indemnite-licenciement:** correction de la cc 2596 + 1404 ([#5832](https://github.com/SocialGouv/code-du-travail-numerique/issues/5832)) ([9b3e0c8](https://github.com/SocialGouv/code-du-travail-numerique/commit/9b3e0c8c75315d2dca6aed1882ed3f8966746868))
- **react-ui:** tableau qui ne s'overflow pas ([#5830](https://github.com/SocialGouv/code-du-travail-numerique/issues/5830)) ([7e196db](https://github.com/SocialGouv/code-du-travail-numerique/commit/7e196dbc5e3cdac3747736f884dbc5e4a5d26bff))
- **rupture-co:** cacher le simulateur rupture-co en production ([#5838](https://github.com/SocialGouv/code-du-travail-numerique/issues/5838)) ([d2ed6dd](https://github.com/SocialGouv/code-du-travail-numerique/commit/d2ed6dd3ae760de30f858d13edb8e50ab34d79ff))
- **rupture-co:** modification de wording pour la formule de la CC 292 ([#5839](https://github.com/SocialGouv/code-du-travail-numerique/issues/5839)) ([88ca997](https://github.com/SocialGouv/code-du-travail-numerique/commit/88ca997644f64e886bc66ae34a54e729ee7594a3))
- **typescript:** automatic watcher for `react-ui` + disable implicit type ([#5806](https://github.com/SocialGouv/code-du-travail-numerique/issues/5806)) ([8bf7337](https://github.com/SocialGouv/code-du-travail-numerique/commit/8bf7337b8d0f910ddc513f3e50f5975944553124))

### Features

- **indemnite-licenciement:** ajout de l'outil de rupture conventionnelle ([#5703](https://github.com/SocialGouv/code-du-travail-numerique/issues/5703)) ([27962be](https://github.com/SocialGouv/code-du-travail-numerique/commit/27962be5c0267ce7c0eda5959bab2ef755f4f80b)), closes [#5717](https://github.com/SocialGouv/code-du-travail-numerique/issues/5717)

## [4.134.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.134.1...v4.134.2) (2024-04-16)

### Reverts

- **react-ui:** modification sur la date ([49aebdc](https://github.com/SocialGouv/code-du-travail-numerique/commit/49aebdc437376e1fb8e72a4224f9463f6ca96c70))

## [4.134.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.134.0...v4.134.1) (2024-04-16)

### Bug Fixes

- **e2e:** set number of idcc for h2 in contributions ([adba475](https://github.com/SocialGouv/code-du-travail-numerique/commit/adba475bfeb3dd90373603cb911a1fc21d064d54))

# [4.134.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.133.0...v4.134.0) (2024-04-16)

### Bug Fixes

- **contributions:** modification d'un H2 sur la page contribution pour la rendre plus lisible en cas de réponse très courte ([#5775](https://github.com/SocialGouv/code-du-travail-numerique/issues/5775)) ([12edbb9](https://github.com/SocialGouv/code-du-travail-numerique/commit/12edbb9f451460a8e8e114a7fb2c586038f93c29))
- retirer les data-testid de la production ([#5781](https://github.com/SocialGouv/code-du-travail-numerique/issues/5781)) ([e154dd1](https://github.com/SocialGouv/code-du-travail-numerique/commit/e154dd19af7775e2df777c0cb4db58e0144415b7))

### Features

- desinstaller ancienne contrib ([#5712](https://github.com/SocialGouv/code-du-travail-numerique/issues/5712)) ([a9504ba](https://github.com/SocialGouv/code-du-travail-numerique/commit/a9504ba0ceda5ac44d373704ae302b7f3306014d)), closes [#5752](https://github.com/SocialGouv/code-du-travail-numerique/issues/5752)
- **redirections:** modification suite à la MAJ des CCs de la dares ([#5787](https://github.com/SocialGouv/code-du-travail-numerique/issues/5787)) ([f8ae3e6](https://github.com/SocialGouv/code-du-travail-numerique/commit/f8ae3e606910c4e5f4e6ac8bff64e3976eb6eaf9))

# [4.133.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.132.0...v4.133.0) (2024-04-09)

### Bug Fixes

- bug lorsque l'ancienneté arrive à 0 ([#5714](https://github.com/SocialGouv/code-du-travail-numerique/issues/5714)) ([2e70765](https://github.com/SocialGouv/code-du-travail-numerique/commit/2e70765dcc1633230021858f51787e20e089587c))
- changement du logo jpeg -> png ([#5721](https://github.com/SocialGouv/code-du-travail-numerique/issues/5721)) ([8e10ef2](https://github.com/SocialGouv/code-du-travail-numerique/commit/8e10ef2354d3d8a16875cac3eb5eaf60304da687))
- **e2e:** suppression du test sur les anciennes contributions ([#5735](https://github.com/SocialGouv/code-du-travail-numerique/issues/5735)) ([6d511da](https://github.com/SocialGouv/code-du-travail-numerique/commit/6d511da8fe3980fda2d91799ee63fd80c3d0fa62))
- **indemnite-licenciement:** valider les absences seulement si les dates en amont sont valides ([#5754](https://github.com/SocialGouv/code-du-travail-numerique/issues/5754)) ([830c7ca](https://github.com/SocialGouv/code-du-travail-numerique/commit/830c7ca51bd59b27658e6402cd069018f77ca96a))
- **kontinuous:** set right limits and requests ([#5729](https://github.com/SocialGouv/code-du-travail-numerique/issues/5729)) ([2ad8dda](https://github.com/SocialGouv/code-du-travail-numerique/commit/2ad8dda6b3500896207101e3e24e7c145408091b))
- **recherche-entreprise:** suppression du paramètre `employer=true` qui bug ([#5770](https://github.com/SocialGouv/code-du-travail-numerique/issues/5770)) ([00fcf85](https://github.com/SocialGouv/code-du-travail-numerique/commit/00fcf8521b3f45d1e15accf523a90b0da9b8b67d))
- **snyk:** Security upgrade katex from 0.13.24 to 0.16.10 ([#5728](https://github.com/SocialGouv/code-du-travail-numerique/issues/5728)) ([0204190](https://github.com/SocialGouv/code-du-travail-numerique/commit/0204190ef5fdd2867b1650cc022c0ef01ab189f1))
- utilisation extraInfos pour les salaires ([#5765](https://github.com/SocialGouv/code-du-travail-numerique/issues/5765)) ([3a4f2eb](https://github.com/SocialGouv/code-du-travail-numerique/commit/3a4f2eb027f2c1fb0a4df32d60f6193222f24c53))

### Features

- 1480 non géré indemnite licenciement ([#5733](https://github.com/SocialGouv/code-du-travail-numerique/issues/5733)) ([ad4ab9f](https://github.com/SocialGouv/code-du-travail-numerique/commit/ad4ab9fe15fd62593687a8bd001e6099a88851cf))
- ajout des pages informations au plan du site ([#5723](https://github.com/SocialGouv/code-du-travail-numerique/issues/5723)) ([fd5d3c8](https://github.com/SocialGouv/code-du-travail-numerique/commit/fd5d3c8b0811a1162c98754dcbc31647f97882a6))
- ajout du TU UI indemnit de licenciement bug 675 ([#5768](https://github.com/SocialGouv/code-du-travail-numerique/issues/5768)) ([9d7fbb7](https://github.com/SocialGouv/code-du-travail-numerique/commit/9d7fbb7e18920b310461a036ee59385c274d65c1))
- **legal pages:** mise à jour de notre hébergeur sur les pages Mentions légales et Politique de confidentialité ([#5741](https://github.com/SocialGouv/code-du-travail-numerique/issues/5741)) ([adeb49c](https://github.com/SocialGouv/code-du-travail-numerique/commit/adeb49c97b51671c68e5c33979459d6f4839a13a))
- **log:** amélioration des logs sur une vectorisation en échec ([#5760](https://github.com/SocialGouv/code-du-travail-numerique/issues/5760)) ([ba4471d](https://github.com/SocialGouv/code-du-travail-numerique/commit/ba4471da0042e226bcbff1babfdfd8ab0cc1905d))
- **ui:** retrait du composant OverflowWrapper dont nous n'avons plus l'utilité (mais qui provoque des erreurs côté client) ([#5753](https://github.com/SocialGouv/code-du-travail-numerique/issues/5753)) ([8ce9b1c](https://github.com/SocialGouv/code-du-travail-numerique/commit/8ce9b1ccf36b3786aaa7d3a370f4868e6dfcb3b7))

# [4.132.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.131.1...v4.132.0) (2024-03-26)

### Features

- bouger api modele de courrier ([#5690](https://github.com/SocialGouv/code-du-travail-numerique/issues/5690)) ([c6bcffe](https://github.com/SocialGouv/code-du-travail-numerique/commit/c6bcffe40e54b626252dd48d8271c4f769d58ebf))

## [4.131.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.131.0...v4.131.1) (2024-03-25)

### Bug Fixes

- migration up workflows + urls review ([877635b](https://github.com/SocialGouv/code-du-travail-numerique/commit/877635b10811cc3349b69d6188a88708b2ceb26e))

### Features

- migration ovh ([341c6f9](https://github.com/SocialGouv/code-du-travail-numerique/commit/341c6f9651171e71fe047ac8ce3303cfd81e7086))

# [4.131.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.130.0...v4.131.0) (2024-03-25)

### Bug Fixes

- bug sur le calculate salary 1483 ([#5711](https://github.com/SocialGouv/code-du-travail-numerique/issues/5711)) ([0b661dd](https://github.com/SocialGouv/code-du-travail-numerique/commit/0b661dda4269bb5f4b4b18f954e4053a3fd3a8d1))
- **migration ovh:** mise à jour des urls en dev de serving ml ([#5709](https://github.com/SocialGouv/code-du-travail-numerique/issues/5709)) ([39e9a85](https://github.com/SocialGouv/code-du-travail-numerique/commit/39e9a859f4f7062d899ab37b306bdc16ab19ed36))

### Features

- **information:** optimisation du chargement des contenus `relatedDocuments` pendant l'export ([#5699](https://github.com/SocialGouv/code-du-travail-numerique/issues/5699)) ([700fa13](https://github.com/SocialGouv/code-du-travail-numerique/commit/700fa131ca86a042c42bdffd74422e088d4a75ee))

# [4.130.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.129.3...v4.130.0) (2024-03-19)

### Features

- changement message info page CC non etendu ([#5689](https://github.com/SocialGouv/code-du-travail-numerique/issues/5689)) ([ed0fe31](https://github.com/SocialGouv/code-du-travail-numerique/commit/ed0fe31364c396df6c0894a37065287ef1d4a5b2))
- **convention-collectives:** migration de nouvelles pages au nouveau format ([#5698](https://github.com/SocialGouv/code-du-travail-numerique/issues/5698)) ([706c2f0](https://github.com/SocialGouv/code-du-travail-numerique/commit/706c2f03e2ba4fb2e74de4625c0a57c397de9602))
- **recherche-entreprise:** ajout de messages spécifiques lorsqu'il n'y a pas CCs présentes dans la liste de l'établissement ([#5680](https://github.com/SocialGouv/code-du-travail-numerique/issues/5680)) ([6ad6627](https://github.com/SocialGouv/code-du-travail-numerique/commit/6ad66278754b3cecfbb35fadca4f94e87f8c5798))

## [4.129.3](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.129.2...v4.129.3) (2024-03-14)

### Bug Fixes

- **actions:** set command for sitemap in different run ([23a7907](https://github.com/SocialGouv/code-du-travail-numerique/commit/23a790777d4337a08918aa24e81b93fafdae4b57))

## [4.129.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.129.1...v4.129.2) (2024-03-14)

### Bug Fixes

- **actions:** verification du `sitemap.xml` ([#5701](https://github.com/SocialGouv/code-du-travail-numerique/issues/5701)) ([b4fbcb1](https://github.com/SocialGouv/code-du-travail-numerique/commit/b4fbcb11c130f2391cae10686c1da66eb150a0d0))
- **html:** bloqué la possibilité d'avoir des headings dans les titres des accordéons si le titleLevel > 6 ([#5688](https://github.com/SocialGouv/code-du-travail-numerique/issues/5688)) ([cf603f3](https://github.com/SocialGouv/code-du-travail-numerique/commit/cf603f3845fd5da1b323fa55401d3d49da7df83e))
- **xml:** set content-type header for the sitemap ([#5700](https://github.com/SocialGouv/code-du-travail-numerique/issues/5700)) ([7791021](https://github.com/SocialGouv/code-du-travail-numerique/commit/779102115703bb77211f4e65fedfe2257fee4795))

## [4.129.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.129.0...v4.129.1) (2024-03-13)

### Bug Fixes

- **s3:** update csp config ([#5694](https://github.com/SocialGouv/code-du-travail-numerique/issues/5694)) ([ee3562d](https://github.com/SocialGouv/code-du-travail-numerique/commit/ee3562d90024ba7d377566a4fea7196d73033be5))

# [4.129.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.128.0...v4.129.0) (2024-03-13)

### Features

- **indemnite-licenciement:** use calculate from information step ([#5675](https://github.com/SocialGouv/code-du-travail-numerique/issues/5675)) ([8534bfd](https://github.com/SocialGouv/code-du-travail-numerique/commit/8534bfd6d1f4afaa7f0166cc5c931c2489561136))
- **upload:** use `s3` instead of `azure` ([#5672](https://github.com/SocialGouv/code-du-travail-numerique/issues/5672)) ([7110810](https://github.com/SocialGouv/code-du-travail-numerique/commit/7110810f0fab5ab841f6cff6b9d4ea07c53e4dfb))

# [4.128.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.127.0...v4.128.0) (2024-03-11)

### Bug Fixes

- bug calculate si pas de salaires ([#5683](https://github.com/SocialGouv/code-du-travail-numerique/issues/5683)) ([6f2acbc](https://github.com/SocialGouv/code-du-travail-numerique/commit/6f2acbca31c0dfd191ec529c6202d430940cbaf3))
- **indemnite-licenciement:** correction des erreurs liées aux dates + `catch` des erreurs `publicodes` ([#5685](https://github.com/SocialGouv/code-du-travail-numerique/issues/5685)) ([7569990](https://github.com/SocialGouv/code-du-travail-numerique/commit/7569990e0951a863f0db624719b2db2d3a023c95))
- **simulateurs:** modification pour la CC 176 ([#5677](https://github.com/SocialGouv/code-du-travail-numerique/issues/5677)) ([b432392](https://github.com/SocialGouv/code-du-travail-numerique/commit/b4323924ca595c5676fd2776757e2219302da2ab))
- **simulateurs:** retours sur la 176 ([160aca4](https://github.com/SocialGouv/code-du-travail-numerique/commit/160aca4878867908df57d52015141a8519533ca9))
- unextended bug prod ([#5665](https://github.com/SocialGouv/code-du-travail-numerique/issues/5665)) ([8071498](https://github.com/SocialGouv/code-du-travail-numerique/commit/8071498a9b1ddee67226eb23bd8f207f86159246))

### Features

- **rupture-co:** ajout de la partie légale dans le modèle ([#5650](https://github.com/SocialGouv/code-du-travail-numerique/issues/5650)) ([e650a56](https://github.com/SocialGouv/code-du-travail-numerique/commit/e650a5683d75cd78749bc1c4ad7b396cabde7799))

# [4.127.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.126.0...v4.127.0) (2024-03-04)

### Features

- cas specifique des CC non etendues - message d'alerte ([#5637](https://github.com/SocialGouv/code-du-travail-numerique/issues/5637)) ([656bc3f](https://github.com/SocialGouv/code-du-travail-numerique/commit/656bc3fee8929fc17dd72a2ca3592615cc333a75))

# [4.126.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.125.1...v4.126.0) (2024-03-04)

### Bug Fixes

- **indemnite-licenciement:** correction de l'ancienneté calculée sur la 3248 ([#5654](https://github.com/SocialGouv/code-du-travail-numerique/issues/5654)) ([c9c27bc](https://github.com/SocialGouv/code-du-travail-numerique/commit/c9c27bc59b6b105f867f9e026870a8169fa08c33))
- **indemnite-licenciement:** erreur calcul sur certaines CC ([#5664](https://github.com/SocialGouv/code-du-travail-numerique/issues/5664)) ([e4b1684](https://github.com/SocialGouv/code-du-travail-numerique/commit/e4b168480a1bcb678a87e0542db8d0891ba5cfaf))
- **indemnite-licenciement:** erreur lors du calcul du légal suite refacto ([#5660](https://github.com/SocialGouv/code-du-travail-numerique/issues/5660)) ([a0105e2](https://github.com/SocialGouv/code-du-travail-numerique/commit/a0105e25a094824c38447aa9c5a03a36a7ced190))
- **redirections:** cc 1518 qui s'auto-redirigée ([#5657](https://github.com/SocialGouv/code-du-travail-numerique/issues/5657)) ([825026e](https://github.com/SocialGouv/code-du-travail-numerique/commit/825026e051a599078cc529cd381846e1fb1af296))

### Features

- **indemnite-licenciement:** renomage de la prime exceptionnelle de pouvoir d’achat ([#5656](https://github.com/SocialGouv/code-du-travail-numerique/issues/5656)) ([1d63f26](https://github.com/SocialGouv/code-du-travail-numerique/commit/1d63f261393aeef125a08f7319af8d950c502d56))
- remove contenu correspondant from h2 ([#5658](https://github.com/SocialGouv/code-du-travail-numerique/issues/5658)) ([689681f](https://github.com/SocialGouv/code-du-travail-numerique/commit/689681fb749e8bfb56ef3d73934646d58bc1c335))

## [4.125.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.125.0...v4.125.1) (2024-02-27)

### Bug Fixes

- **workflow:** add `needs` on preproduction for e2e ([84fd34c](https://github.com/SocialGouv/code-du-travail-numerique/commit/84fd34c4e0d4531042672c78121dd335d9e3b4b5))

# [4.125.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.124.0...v4.125.0) (2024-02-27)

### Bug Fixes

- **3248:** application des retours métiers ([#5617](https://github.com/SocialGouv/code-du-travail-numerique/issues/5617)) ([5e75576](https://github.com/SocialGouv/code-du-travail-numerique/commit/5e75576227836cf9da324957190b5e61aed5dab9))

### Features

- **redirections:** ajout des redirections pour les idcc `0054`, `0650`, etc. ([#5652](https://github.com/SocialGouv/code-du-travail-numerique/issues/5652)) ([eddc374](https://github.com/SocialGouv/code-du-travail-numerique/commit/eddc374a7e1e2a962ff5fb269c7915a1856425db))

# [4.124.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.123.2...v4.124.0) (2024-02-23)

### Bug Fixes

- **convention-collective:** gestion des redirection des anciennes CC de la méta vers la nouvelle pour la page CC quand seulement l'IDCC dans l'url (utilisé par annuaire entreprise) ([#5648](https://github.com/SocialGouv/code-du-travail-numerique/issues/5648)) ([2550a04](https://github.com/SocialGouv/code-du-travail-numerique/commit/2550a040b3deb94e3c8c8cec8190f7d09a376700))

### Features

- **e2e:** ajout de tests pour les pages informations ([#5645](https://github.com/SocialGouv/code-du-travail-numerique/issues/5645)) ([8e92995](https://github.com/SocialGouv/code-du-travail-numerique/commit/8e92995699603d257e0235d5f6abaf751b380f08))

## [4.123.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.123.1...v4.123.2) (2024-02-22)

### Bug Fixes

- **error:** pas de fails si pas de description ([#5643](https://github.com/SocialGouv/code-du-travail-numerique/issues/5643)) ([b3804d6](https://github.com/SocialGouv/code-du-travail-numerique/commit/b3804d65032f02fea07360001af16e124dfc1745))

## [4.123.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.123.0...v4.123.1) (2024-02-22)

### Bug Fixes

- api items id -> ids ([#5642](https://github.com/SocialGouv/code-du-travail-numerique/issues/5642)) ([146ac24](https://github.com/SocialGouv/code-du-travail-numerique/commit/146ac2486375b06f4b32c37b25def323d31810fc))
- **e2e:** correction de la path + envoie à mattermost en erreur ([#5640](https://github.com/SocialGouv/code-du-travail-numerique/issues/5640)) ([37953b3](https://github.com/SocialGouv/code-du-travail-numerique/commit/37953b3e75d21b5a3c02eabfb849a2374484dbc4))
- **e2e:** simplification du test `footer.spec.ts` + ajout d'un mode de test `heavy` ([#5629](https://github.com/SocialGouv/code-du-travail-numerique/issues/5629)) ([bfac7ec](https://github.com/SocialGouv/code-du-travail-numerique/commit/bfac7ec22afbebd71e4bfab2a9b8ec781656ae08))

# [4.123.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.122.0...v4.123.0) (2024-02-19)

### Bug Fixes

- **contributions:** reformatage des titres avec CC ([#5623](https://github.com/SocialGouv/code-du-travail-numerique/issues/5623)) ([86b888e](https://github.com/SocialGouv/code-du-travail-numerique/commit/86b888e0e69bbd257ad6dd47d24e11b32a7f0b52))
- **renseignement:** correction de l'URL pour mayotte ([#5614](https://github.com/SocialGouv/code-du-travail-numerique/issues/5614)) ([f37fb98](https://github.com/SocialGouv/code-du-travail-numerique/commit/f37fb9850382e4a0be95aaa04419429d17774517))

### Features

- **contribution:** ajout de h1 uniques pour les contributions personnalisées qui ont un titre court et pour les CC avec un nom court ([#5611](https://github.com/SocialGouv/code-du-travail-numerique/issues/5611)) ([9529f49](https://github.com/SocialGouv/code-du-travail-numerique/commit/9529f492afa19c5a1cc0aba2ec4059ba27b64bb9))
- **convention collective:** Intégration de la CC 1543 dans la CC 1586 et Intégration de la CC 2344 dans la CC 3248 ([#5616](https://github.com/SocialGouv/code-du-travail-numerique/issues/5616)) ([d230007](https://github.com/SocialGouv/code-du-travail-numerique/commit/d230007a74b5dfa67f10a5e848d90467de363294))
- **glossaire:** retrait du markdown dans les définitions du glossaire ([#5607](https://github.com/SocialGouv/code-du-travail-numerique/issues/5607)) ([2977717](https://github.com/SocialGouv/code-du-travail-numerique/commit/2977717662affb520d70b27ab52dfa2a48b4ec20))
- **page convention collective:** retrait des réponses des contribs dans les page CC 1518, ajout des liens vers les contribs personnalisés ([#5605](https://github.com/SocialGouv/code-du-travail-numerique/issues/5605)) ([8b415e8](https://github.com/SocialGouv/code-du-travail-numerique/commit/8b415e8e77244a728d20865bd14c63f67ba25add))
- **plan-du-site:** ajout des pages contributions personnalisées dans le plan du site ([#5604](https://github.com/SocialGouv/code-du-travail-numerique/issues/5604)) ([c95168e](https://github.com/SocialGouv/code-du-travail-numerique/commit/c95168eb38395af898a37e9183bf3a36ce8f6c08))

# [4.122.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.121.1...v4.122.0) (2024-02-06)

### Bug Fixes

- **utils:** ajout du type glossaire pour la mapping ([#5603](https://github.com/SocialGouv/code-du-travail-numerique/issues/5603)) ([3aed439](https://github.com/SocialGouv/code-du-travail-numerique/commit/3aed43929bbf7fc445e4a54c3a9efc75751eb343))
- **widgets:** ajout d'un nouveau widget pour le calcul du preavis de demission ([#5606](https://github.com/SocialGouv/code-du-travail-numerique/issues/5606)) ([ad2ec7e](https://github.com/SocialGouv/code-du-travail-numerique/commit/ad2ec7e7d8cf340bfa2d39f2d997530824aad7dc))

### Features

- **contributions:** gestion des headings dynamiques en fonction de la page où ils sont affichés ([#5585](https://github.com/SocialGouv/code-du-travail-numerique/issues/5585)) ([2d573c7](https://github.com/SocialGouv/code-du-travail-numerique/commit/2d573c734d71be887f8d5842a4256da6dcf926ea))

## [4.121.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.121.0...v4.121.1) (2024-01-30)

### Bug Fixes

- **redirections:** cc 1391 fusionnée dans la 275 ([ad96f56](https://github.com/SocialGouv/code-du-travail-numerique/commit/ad96f5648d0b67f26af476119dda5ecc99448d7c))

# [4.121.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.120.1...v4.121.0) (2024-01-30)

### Bug Fixes

- **indemnite-licenciement:** retours sur l'ancienneté de la CC 176 ([#5552](https://github.com/SocialGouv/code-du-travail-numerique/issues/5552)) ([79a7a0f](https://github.com/SocialGouv/code-du-travail-numerique/commit/79a7a0f7ce55f56d309978c14a337a3980cd014d))

### Features

- **ccs:** fusion de la cc 1391 dans la 275 ([#5557](https://github.com/SocialGouv/code-du-travail-numerique/issues/5557)) ([6de51cc](https://github.com/SocialGouv/code-du-travail-numerique/commit/6de51cc817cb2b766a3fe711c7b72ae222d0cdad))
- **indemnite-licenciement:** fusion de la CC 1391 dans la 275 ([#5567](https://github.com/SocialGouv/code-du-travail-numerique/issues/5567)) ([f39c76e](https://github.com/SocialGouv/code-du-travail-numerique/commit/f39c76e9f63dce419eb05f5f43e8882f6e56c055))

## [4.120.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.120.0...v4.120.1) (2024-01-29)

### Bug Fixes

- **contribution:** balise HTML non parsée dans un li ([#5577](https://github.com/SocialGouv/code-du-travail-numerique/issues/5577)) ([f07e8fc](https://github.com/SocialGouv/code-du-travail-numerique/commit/f07e8fc46d3220ebcc2ceb33732193925a6b94f3))
- **contribution:** mise à jour des metas sur les nouvelles contributions ([#5599](https://github.com/SocialGouv/code-du-travail-numerique/issues/5599)) ([a22a1a5](https://github.com/SocialGouv/code-du-travail-numerique/commit/a22a1a5fe86cfe0a4294b8f0fc10ac2e16805a5a))
- **sea:** suppression des trackers pour la campagne SEA ([#5598](https://github.com/SocialGouv/code-du-travail-numerique/issues/5598)) ([c5deb7a](https://github.com/SocialGouv/code-du-travail-numerique/commit/c5deb7a21643f889a25542f00ce7ef61076b9b84))

# [4.120.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.119.1...v4.120.0) (2024-01-25)

### Bug Fixes

- **html:** ajout d'un test pour vérifier la validité du html de certaines pages + fix des erreurs détéctées ([#5568](https://github.com/SocialGouv/code-du-travail-numerique/issues/5568)) ([54b6cac](https://github.com/SocialGouv/code-du-travail-numerique/commit/54b6cac950a224b437ad298751a40962f965d968))
- **indemnite-licenciement:** mise en place d'un plafond sur la CC 573 ([#5579](https://github.com/SocialGouv/code-du-travail-numerique/issues/5579)) ([b961f10](https://github.com/SocialGouv/code-du-travail-numerique/commit/b961f10027e7e7b9254c5e988740f2dd154b8101))
- **style des accordéon:** retrait de l'espace en haut des corps des accordéon ([#5545](https://github.com/SocialGouv/code-du-travail-numerique/issues/5545)) ([7539e12](https://github.com/SocialGouv/code-du-travail-numerique/commit/7539e1220f43b27aefa64cfd8355d03fac281389))

### Features

- **contribution:** Suppression du code pour les POCs ([#5581](https://github.com/SocialGouv/code-du-travail-numerique/issues/5581)) ([28411e1](https://github.com/SocialGouv/code-du-travail-numerique/commit/28411e1ee8db767935fcfd97089fd3a796a6b2d3))
- **recherche-entreprise:** afficher les entreprises qui ont complété `9999` comme numéro d'idcc ([#5564](https://github.com/SocialGouv/code-du-travail-numerique/issues/5564)) ([a092d10](https://github.com/SocialGouv/code-du-travail-numerique/commit/a092d107787cbc02ec9ad1867f3ea973bde4b247))
- **simulateurs:** ajout une possibilité pour certaines CCs de donner un example avec le lendemain ([#5555](https://github.com/SocialGouv/code-du-travail-numerique/issues/5555)) ([c400e94](https://github.com/SocialGouv/code-du-travail-numerique/commit/c400e94ad24df06ae17accea117614d3c8aa0c74))
- utilisation du nouveau logo du ministère ([#5588](https://github.com/SocialGouv/code-du-travail-numerique/issues/5588)) ([51006eb](https://github.com/SocialGouv/code-du-travail-numerique/commit/51006ebf76a80b0a65bded90b35b91de8d247d6b))

## [4.119.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.119.0...v4.119.1) (2024-01-11)

### Bug Fixes

- **contribution:** nettoyage de la fonctionnalité spécifique au CC personalisé sans contenu quand la générique n'a pas de CDT. ([#5560](https://github.com/SocialGouv/code-du-travail-numerique/issues/5560)) ([0b596bb](https://github.com/SocialGouv/code-du-travail-numerique/commit/0b596bbe72bedb29c987a4bb191588296129e30a))

# [4.119.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.118.0...v4.119.0) (2024-01-11)

### Bug Fixes

- **alerts:** sur les contribs dont la générique ne prévoit rien ([#5549](https://github.com/SocialGouv/code-du-travail-numerique/issues/5549)) ([e409d64](https://github.com/SocialGouv/code-du-travail-numerique/commit/e409d64abcffb5dcd0f5fd78d86ca6b8fd3e3ad6))
- **console warning:** react error in console ([#5546](https://github.com/SocialGouv/code-du-travail-numerique/issues/5546)) ([7a1a2b7](https://github.com/SocialGouv/code-du-travail-numerique/commit/7a1a2b74368a8d089e32c9370c75385b28bc844c))
- **contributions:** affichage des fiche-sp pour les contribs conventionnelles référençant une générique ([#5538](https://github.com/SocialGouv/code-du-travail-numerique/issues/5538)) ([b9c480a](https://github.com/SocialGouv/code-du-travail-numerique/commit/b9c480a69c16f1f061b580dc52fe1315ea3178da))
- **contributions:** correction des espaces au sein des `p` ([#5543](https://github.com/SocialGouv/code-du-travail-numerique/issues/5543)) ([54aa4fe](https://github.com/SocialGouv/code-du-travail-numerique/commit/54aa4feb55cdc3f3f5f6b1e4cb7db0bc9b6a1c88))
- li paragraphe enlever margin ([#5550](https://github.com/SocialGouv/code-du-travail-numerique/issues/5550)) ([f00ac4c](https://github.com/SocialGouv/code-du-travail-numerique/commit/f00ac4c18b7aa8fdc1c93e0bc8d39038573688e3))
- **ui:** retours pour les contributions de la meta ([#5522](https://github.com/SocialGouv/code-du-travail-numerique/issues/5522)) ([66f2306](https://github.com/SocialGouv/code-du-travail-numerique/commit/66f230677f024d13c2f6542594784e98d5455671))
- **warning:** one more warning ([#5548](https://github.com/SocialGouv/code-du-travail-numerique/issues/5548)) ([e5da6eb](https://github.com/SocialGouv/code-du-travail-numerique/commit/e5da6eb96df681af16610b5dc8bb75a24762c99b))

### Features

- **contributions:** mise en place de redirections pour les contrib personnalisées qui n'ont plus de page réponse ([#5553](https://github.com/SocialGouv/code-du-travail-numerique/issues/5553)) ([63980e8](https://github.com/SocialGouv/code-du-travail-numerique/commit/63980e85370fcaddc62d4e96e315ea5cd953fe5f))

# [4.118.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.117.0...v4.118.0) (2023-12-28)

### Bug Fixes

- **e2e:** remove delay when typing in `recherche-entreprise` ([#5509](https://github.com/SocialGouv/code-du-travail-numerique/issues/5509)) ([55a6a00](https://github.com/SocialGouv/code-du-travail-numerique/commit/55a6a002d51d1d636650ee558947f81029568362))
- **e2e:** set carrefour banque instead of carrefour ([57649c6](https://github.com/SocialGouv/code-du-travail-numerique/commit/57649c66bd3cb488d33f8ff465c0b42e37d571a2))
- **e2e:** set good enterprise name ([6e532c4](https://github.com/SocialGouv/code-du-travail-numerique/commit/6e532c4586f44ef8b19369c2feeb9732c3357880))
- **meta:** retours sur les changements apportés par la nouvelle convention collective 3248 ([#5521](https://github.com/SocialGouv/code-du-travail-numerique/issues/5521)) ([04d3fbe](https://github.com/SocialGouv/code-du-travail-numerique/commit/04d3fbe4d71d0f9a12e8366af3ab1c32b1f2a795))

### Features

- gestion des contrib où le CDT ne prévoit rien ([#5479](https://github.com/SocialGouv/code-du-travail-numerique/issues/5479)) ([7421167](https://github.com/SocialGouv/code-du-travail-numerique/commit/742116778687e962d2665b418fc2cdc7852a6aec))
- **meta:** désactivation des anciennes CC Meta après 1er janvier ([#5488](https://github.com/SocialGouv/code-du-travail-numerique/issues/5488)) ([092069b](https://github.com/SocialGouv/code-du-travail-numerique/commit/092069b40e495547d2016d273ba1ac450921a40b)), closes [#5430](https://github.com/SocialGouv/code-du-travail-numerique/issues/5430) [#5419](https://github.com/SocialGouv/code-du-travail-numerique/issues/5419) [#5482](https://github.com/SocialGouv/code-du-travail-numerique/issues/5482) [#5423](https://github.com/SocialGouv/code-du-travail-numerique/issues/5423) [#5421](https://github.com/SocialGouv/code-du-travail-numerique/issues/5421)
- **next:** replacing call of the API in `getStaticProps` by direct call during build time ([#5514](https://github.com/SocialGouv/code-du-travail-numerique/issues/5514)) ([fc2385d](https://github.com/SocialGouv/code-du-travail-numerique/commit/fc2385d8010d3ffa24f617a7fd39f4f223ff91f8))
- **next:** upgrade to v14 ([#5501](https://github.com/SocialGouv/code-du-travail-numerique/issues/5501)) ([ca6419b](https://github.com/SocialGouv/code-du-travail-numerique/commit/ca6419b889237f19bf69cd0c10b28f78862d497c))
- **next:** use `getStaticProps` instead of `getServerSideProps` ([#5515](https://github.com/SocialGouv/code-du-travail-numerique/issues/5515)) ([6e6c936](https://github.com/SocialGouv/code-du-travail-numerique/commit/6e6c936b2e20b725f0a94dfb7c60ba591e58f033))

# [4.117.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.116.0...v4.117.0) (2023-12-21)

### Bug Fixes

- affichage du nom court de la CC sur la page de résultat des outils (fix des test e2e) ([#5499](https://github.com/SocialGouv/code-du-travail-numerique/issues/5499)) ([0826bbf](https://github.com/SocialGouv/code-du-travail-numerique/commit/0826bbf56207690d05baf83ae6df39c165078690))
- ajout du support de la 3248 dans POC des contributions ([#5503](https://github.com/SocialGouv/code-du-travail-numerique/issues/5503)) ([20d80a0](https://github.com/SocialGouv/code-du-travail-numerique/commit/20d80a0c6b78595f0ce052c9d8e9eb0bbd277a38))
- correction d'une erreur HTML dans le code ([#5510](https://github.com/SocialGouv/code-du-travail-numerique/issues/5510)) ([8bc4027](https://github.com/SocialGouv/code-du-travail-numerique/commit/8bc402741348af9acd067588122048a5c6265e8b))
- mise à jour du sous-titre de la page convention collective ([#5498](https://github.com/SocialGouv/code-du-travail-numerique/issues/5498)) ([3beb637](https://github.com/SocialGouv/code-du-travail-numerique/commit/3beb6378e6417f3d876124de1c3fc9025a051776))
- ne pas trim car on a des balises contenant un simple espace par moment ([#5504](https://github.com/SocialGouv/code-du-travail-numerique/issues/5504)) ([6deeedf](https://github.com/SocialGouv/code-du-travail-numerique/commit/6deeedf4ddc1fd7896a3defffb0d7c2342468b08))
- **performance:** valeur de préprod mise en adéquation avec la prod ([#5500](https://github.com/SocialGouv/code-du-travail-numerique/issues/5500)) ([29ebdc8](https://github.com/SocialGouv/code-du-travail-numerique/commit/29ebdc8df8896cb3788f831143b2f42f6169dca4))
- support du rowspan dans le thead des tableaux ([#5508](https://github.com/SocialGouv/code-du-travail-numerique/issues/5508)) ([6cc22f4](https://github.com/SocialGouv/code-du-travail-numerique/commit/6cc22f4b1082c7df25f7820f82b8fda71710fed8))
- suppression d'un dollar en trop ([#5507](https://github.com/SocialGouv/code-du-travail-numerique/issues/5507)) ([b964219](https://github.com/SocialGouv/code-du-travail-numerique/commit/b964219d35186962db2d328ddf9844a1875539ae))

### Features

- placer les références sans url à la fin de la liste ([#5506](https://github.com/SocialGouv/code-du-travail-numerique/issues/5506)) ([923b7b2](https://github.com/SocialGouv/code-du-travail-numerique/commit/923b7b257e9996610dab77e712394adc1e64796c))

# [4.116.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.115.0...v4.116.0) (2023-12-18)

### Bug Fixes

- désactive le test de sniff jusqu'à la fin de la campagne ([#5487](https://github.com/SocialGouv/code-du-travail-numerique/issues/5487)) ([a5b5014](https://github.com/SocialGouv/code-du-travail-numerique/commit/a5b5014876a515b9c15ba7c48362911cfbe01caf))
- **e2e:** correction des test e2e avec les données entreprises mise à jour ([#5466](https://github.com/SocialGouv/code-du-travail-numerique/issues/5466)) ([db2c3f9](https://github.com/SocialGouv/code-du-travail-numerique/commit/db2c3f969cfdcd217170d69fefe3179cec830e6c))
- **e2e:** correction des test e2e avec les données entreprises mise à jour ([#5466](https://github.com/SocialGouv/code-du-travail-numerique/issues/5466)) ([669fce5](https://github.com/SocialGouv/code-du-travail-numerique/commit/669fce531a21a2bccb6c8f42b9903ada56f91cb4))
- html valide sur le page contrib generic ([#5481](https://github.com/SocialGouv/code-du-travail-numerique/issues/5481)) ([0c1ca7b](https://github.com/SocialGouv/code-du-travail-numerique/commit/0c1ca7b421c6fd600464dec5735c9b0bfa52bc54))
- **informations:** les références peuvent être `null` ([#5458](https://github.com/SocialGouv/code-du-travail-numerique/issues/5458)) ([15a8d5f](https://github.com/SocialGouv/code-du-travail-numerique/commit/15a8d5fa4a32cc2e74bcbddcb476f1a928c119b5))
- url du "Centre européen des entreprises à participation publique" sur la page droit du travail ([#5495](https://github.com/SocialGouv/code-du-travail-numerique/issues/5495)) ([8f152d4](https://github.com/SocialGouv/code-du-travail-numerique/commit/8f152d48af149a2fd66f5d5e9abe8443d21a90a0))

### Features

- **contribution:** un message block peut être vide ([#5486](https://github.com/SocialGouv/code-du-travail-numerique/issues/5486)) ([916cdbc](https://github.com/SocialGouv/code-du-travail-numerique/commit/916cdbccf8d0dfeaf2037c133314253fd5ac74fe))
- **conventions-collectives:** ajout des nouvelles conventions collectives ([#5450](https://github.com/SocialGouv/code-du-travail-numerique/issues/5450)) ([d2391ad](https://github.com/SocialGouv/code-du-travail-numerique/commit/d2391ad85514d31dde008574700c24a547c33e35)), closes [#5445](https://github.com/SocialGouv/code-du-travail-numerique/issues/5445) [#5466](https://github.com/SocialGouv/code-du-travail-numerique/issues/5466)
- linked admin to frontend ([#5465](https://github.com/SocialGouv/code-du-travail-numerique/issues/5465)) ([8cb9d6b](https://github.com/SocialGouv/code-du-travail-numerique/commit/8cb9d6b8caf40b0ddb252c219fb8127613231009)), closes [#5466](https://github.com/SocialGouv/code-du-travail-numerique/issues/5466)
- support de la 3248 dans l'ancien format des contributions ([#5477](https://github.com/SocialGouv/code-du-travail-numerique/issues/5477)) ([bcffbd4](https://github.com/SocialGouv/code-du-travail-numerique/commit/bcffbd4306bcdf754ef0fc0e5813fc7176159ad1))

### Reverts

- Revert "feat(3248): ajout des outils (⚠️ ne pas merger) (#5419)" ([45bf501](https://github.com/SocialGouv/code-du-travail-numerique/commit/45bf5014da6506b105bb58068bc6d3fe5e1c4265)), closes [#5419](https://github.com/SocialGouv/code-du-travail-numerique/issues/5419)

# [4.115.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.114.0...v4.115.0) (2023-12-07)

### Bug Fixes

- **deps:** update dependency @sentry/nextjs to v7.77.0 [security] ([#5434](https://github.com/SocialGouv/code-du-travail-numerique/issues/5434)) ([f265a0a](https://github.com/SocialGouv/code-du-travail-numerique/commit/f265a0aec252d8ee0fa67e2ef93edbc1ee92c8fe))
- **kubernetes:** upgrade performance ([#5462](https://github.com/SocialGouv/code-du-travail-numerique/issues/5462)) ([9dce8c1](https://github.com/SocialGouv/code-du-travail-numerique/commit/9dce8c137d37c0f82fc673dfa2efbcf3bd70aed0))
- **page accessibilté:** mise à jour de la page ([#5454](https://github.com/SocialGouv/code-du-travail-numerique/issues/5454)) ([e57e7bf](https://github.com/SocialGouv/code-du-travail-numerique/commit/e57e7bfdf487496b917fa62949e5fc7efe93bae9))
- **seo:** "Contributions" renomé en "Fiches pratiques" + disallow /recherche in robots.txt ([#5451](https://github.com/SocialGouv/code-du-travail-numerique/issues/5451)) ([49268f2](https://github.com/SocialGouv/code-du-travail-numerique/commit/49268f25150193c5a01040112c8af03c7760a9df))

### Features

- **contribution:** handle new contrib display ([#5441](https://github.com/SocialGouv/code-du-travail-numerique/issues/5441)) ([0db0c23](https://github.com/SocialGouv/code-du-travail-numerique/commit/0db0c235a987f08a61132863465a636e183f39be)), closes [#5445](https://github.com/SocialGouv/code-du-travail-numerique/issues/5445)

# [4.114.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.113.0...v4.114.0) (2023-11-21)

### Features

- **contrib:** affichage de la réponse CDT dès le début pour essayer d'améliorer le SEO ([#5442](https://github.com/SocialGouv/code-du-travail-numerique/issues/5442)) ([311b967](https://github.com/SocialGouv/code-du-travail-numerique/commit/311b967adcc680325329837539c1802937e2bb75))

# [4.113.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.112.0...v4.113.0) (2023-11-10)

### Features

- **redirect:** ajout d'une redirection sur une fiche SP ([6f73be3](https://github.com/SocialGouv/code-du-travail-numerique/commit/6f73be3fca97d3c4f1e901b2e2b84194ac1c8387))

# [4.112.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.111.0...v4.112.0) (2023-11-03)

### Features

- **sea:** ajout du bandeau tarteaucitron pour la campagne ([#5417](https://github.com/SocialGouv/code-du-travail-numerique/issues/5417)) ([83a0732](https://github.com/SocialGouv/code-du-travail-numerique/commit/83a07328f2b1ac68a859dfaaf03825afa43822ff))

# [4.111.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.110.0...v4.111.0) (2023-10-23)

### Bug Fixes

- **accessibility:** meilleure accessibilité sur les outils ([#5390](https://github.com/SocialGouv/code-du-travail-numerique/issues/5390)) ([43e8ad3](https://github.com/SocialGouv/code-du-travail-numerique/commit/43e8ad327f0e5b4a6b8c93f690b9821f7900f5c7))
- **contribs:** le bouton "afficher les informations" est visible des le début sur les nouvelles pages contribs ([#5403](https://github.com/SocialGouv/code-du-travail-numerique/issues/5403)) ([51d3fcd](https://github.com/SocialGouv/code-du-travail-numerique/commit/51d3fcd1a032a6373f82d031237ec62e015cffe8))
- **contributions:** remise en place des éléments dans le bon ordre ([#5401](https://github.com/SocialGouv/code-du-travail-numerique/issues/5401)) ([c6374af](https://github.com/SocialGouv/code-du-travail-numerique/commit/c6374afe5d6f8c54ded441874650a64120b293f3))
- **déclaration d'accessibilité:** mise à jour de la déclaration d'accessibilité ([#5405](https://github.com/SocialGouv/code-du-travail-numerique/issues/5405)) ([c46dcec](https://github.com/SocialGouv/code-du-travail-numerique/commit/c46dcec819918352bcb95c339914fb94c3417a57))
- **indemnité de licenciement:** correction du lien sur une des références ([#5404](https://github.com/SocialGouv/code-du-travail-numerique/issues/5404)) ([853d070](https://github.com/SocialGouv/code-du-travail-numerique/commit/853d07029975794fe85be2dc2e7e40cb0ebfc71d))
- **indemnite-licenciement:** retours de la cc 1516 ([#5392](https://github.com/SocialGouv/code-du-travail-numerique/issues/5392)) ([c674b32](https://github.com/SocialGouv/code-du-travail-numerique/commit/c674b325ffeec650cc765ebe138e1ff2a63514a7))
- **seo:** retrait de tout les nofollow ([#5402](https://github.com/SocialGouv/code-du-travail-numerique/issues/5402)) ([9ebe4f5](https://github.com/SocialGouv/code-du-travail-numerique/commit/9ebe4f52531af8578eb9d54f28ad990943e8c0dc))
- **tooltip:** remove breaking space when copy to editor ([#5400](https://github.com/SocialGouv/code-du-travail-numerique/issues/5400)) ([d4d468b](https://github.com/SocialGouv/code-du-travail-numerique/commit/d4d468b32c40a8a0af9dccc53c60b2b4ab59d351))
- use display inline-block to avoid regression ([#5408](https://github.com/SocialGouv/code-du-travail-numerique/issues/5408)) ([7106024](https://github.com/SocialGouv/code-du-travail-numerique/commit/710602406e964d1bef953169cf007988c9bb1ec6))

### Features

- **accessibilité:** un seul lien sur les tuiles ([#5388](https://github.com/SocialGouv/code-du-travail-numerique/issues/5388)) ([88ead81](https://github.com/SocialGouv/code-du-travail-numerique/commit/88ead81f55e16d4d458cb7b044d24fe499859541))

# [4.110.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.109.0...v4.110.0) (2023-10-16)

### Bug Fixes

- **accessibility:** remove b and i tags ([#5380](https://github.com/SocialGouv/code-du-travail-numerique/issues/5380)) ([f1d6204](https://github.com/SocialGouv/code-du-travail-numerique/commit/f1d620431bde3d9bf91d4a78abdc68414fee0a65))
- **stripe:** valeur par défaut sur la longueur des Stripe ([#5391](https://github.com/SocialGouv/code-du-travail-numerique/issues/5391)) ([02fccd7](https://github.com/SocialGouv/code-du-travail-numerique/commit/02fccd7544eae2adb94e9538d5487c08e59e6104))

### Features

- ajout des conventions collectives sans page legifrance ([#5373](https://github.com/SocialGouv/code-du-travail-numerique/issues/5373)) ([605a0f9](https://github.com/SocialGouv/code-du-travail-numerique/commit/605a0f9fc8ebb12a5c621675e563779d1ab58da5))

# [4.109.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.108.1...v4.109.0) (2023-10-05)

### Features

- **2120:** activation de la CC 2120 pour l'indemnité de licenciement ([#5376](https://github.com/SocialGouv/code-du-travail-numerique/issues/5376)) ([ac61c63](https://github.com/SocialGouv/code-du-travail-numerique/commit/ac61c63cbd43ae8bcf6cb667d23c139f988c77b7))

## [4.108.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.108.0...v4.108.1) (2023-09-22)

### Bug Fixes

- **2120:** prise ne compte de la part variable du salaire dans le calcul du SRef ([#5371](https://github.com/SocialGouv/code-du-travail-numerique/issues/5371)) ([064cb24](https://github.com/SocialGouv/code-du-travail-numerique/commit/064cb24da78702f5f6b0cb2b716de085d6d3df60))
- **sentry:** lower events rate to reduce production logs ([#5374](https://github.com/SocialGouv/code-du-travail-numerique/issues/5374)) ([6ed1182](https://github.com/SocialGouv/code-du-travail-numerique/commit/6ed1182b3fd301bc2ad0d0768ac7b745effc4243))

# [4.108.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.107.0...v4.108.0) (2023-09-11)

### Bug Fixes

- **contributions:** ajout d'un scroll automatique sur la partie code du travail ([#5357](https://github.com/SocialGouv/code-du-travail-numerique/issues/5357)) ([6b9129a](https://github.com/SocialGouv/code-du-travail-numerique/commit/6b9129a5170b21f6b16a9d4b364c925f369470e1))
- **e2e:** set number of li in contributions ([4a0162c](https://github.com/SocialGouv/code-du-travail-numerique/commit/4a0162c238f992c5b6d6d84f894e61c65ac0ca25))
- Faute orthographe contrat à durée indéterminée et contrat à duré… ([#5345](https://github.com/SocialGouv/code-du-travail-numerique/issues/5345)) ([6266f11](https://github.com/SocialGouv/code-du-travail-numerique/commit/6266f11a93879ec69d53f4e6acd22461d29e058e))
- **indemnite-licenciement:** retours sur la cc 2216 ([#5356](https://github.com/SocialGouv/code-du-travail-numerique/issues/5356)) ([4687586](https://github.com/SocialGouv/code-du-travail-numerique/commit/46875866aa63c57ee7dc80af25284e9f6824cc3f))
- **seo:** make sure text is present on the page, on page load ([#5369](https://github.com/SocialGouv/code-du-travail-numerique/issues/5369)) ([ac011d4](https://github.com/SocialGouv/code-du-travail-numerique/commit/ac011d427ba7dec6705e480ef078f59093ecd988))

### Features

- modifier le nom d'une catégorie pro CC 44 ([#5342](https://github.com/SocialGouv/code-du-travail-numerique/issues/5342)) ([e60ca0a](https://github.com/SocialGouv/code-du-travail-numerique/commit/e60ca0a5bc6ef08c9d48ba910a9fb329b47a751d))
- Retirer les articles du code du travail dans les sources pour u… ([#5347](https://github.com/SocialGouv/code-du-travail-numerique/issues/5347)) ([1ab6f8d](https://github.com/SocialGouv/code-du-travail-numerique/commit/1ab6f8da3a1bbbb3036ff0328de8822e13cd0475))

# [4.107.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.106.0...v4.107.0) (2023-08-25)

### Bug Fixes

- bloc cc non traité qui ne s'affiche pas ([#5314](https://github.com/SocialGouv/code-du-travail-numerique/issues/5314)) ([519f73e](https://github.com/SocialGouv/code-du-travail-numerique/commit/519f73e9b209b94888d57e3573c129fc9e4142d1))
- bug ouverture consulter notre aide ([#5331](https://github.com/SocialGouv/code-du-travail-numerique/issues/5331)) ([f321469](https://github.com/SocialGouv/code-du-travail-numerique/commit/f3214699b1aa96574930551ffb434db7e71e9841))
- **e2e:** set number of li in contributions ([c85b7ae](https://github.com/SocialGouv/code-du-travail-numerique/commit/c85b7ae95c74b4e8ec51f488a8035b17423737cb))
- **errors:** sentry error on publicodes ([#5304](https://github.com/SocialGouv/code-du-travail-numerique/issues/5304)) ([0a6ae69](https://github.com/SocialGouv/code-du-travail-numerique/commit/0a6ae696d5a25bf89594bcfd9aa0035642740855))
- **indemnite-licenciement:** retour pour la cc 2120 ([#5309](https://github.com/SocialGouv/code-du-travail-numerique/issues/5309)) ([4c4725a](https://github.com/SocialGouv/code-du-travail-numerique/commit/4c4725a71af2992d471cdf049f81ddaca06e6d81))

### Features

- 5301 quick win accessibilité 2023 ([#5328](https://github.com/SocialGouv/code-du-travail-numerique/issues/5328)) ([e8b7e41](https://github.com/SocialGouv/code-du-travail-numerique/commit/e8b7e419c21948855d2929aaf12341e75134fe3e))
- Activer la CC 176 ([#5344](https://github.com/SocialGouv/code-du-travail-numerique/issues/5344)) ([81b7982](https://github.com/SocialGouv/code-du-travail-numerique/commit/81b7982d585e38a3f02711cbd6f747549dbd0c91))
- gestion des ruptures conventionnels dans l'outils heuresRechercheEmploi ([#5337](https://github.com/SocialGouv/code-du-travail-numerique/issues/5337)) ([6ef7b88](https://github.com/SocialGouv/code-du-travail-numerique/commit/6ef7b880c9f26d41f70710e449e4df99db144100))
- indemnite licenciement desactiver cc176 ([#5348](https://github.com/SocialGouv/code-du-travail-numerique/issues/5348)) ([a26615b](https://github.com/SocialGouv/code-du-travail-numerique/commit/a26615b06b4b8958f440276565c6202eb2974a40))

# [4.106.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.105.1...v4.106.0) (2023-08-09)

### Bug Fixes

- **affichage des cc:** quand une cc est inconnue sur une entreprise ([#5284](https://github.com/SocialGouv/code-du-travail-numerique/issues/5284)) ([99aa96c](https://github.com/SocialGouv/code-du-travail-numerique/commit/99aa96ccf6799b5b419013725093fcee12e031e9))
- **e2e:** change date for indemnite-licenciement ([9f55dde](https://github.com/SocialGouv/code-du-travail-numerique/commit/9f55dde1808c76a91973fc05c9e7348e60562c79))
- **events:** refactor `pushAgreements` ([#5302](https://github.com/SocialGouv/code-du-travail-numerique/issues/5302)) ([7119a85](https://github.com/SocialGouv/code-du-travail-numerique/commit/7119a85d8aad97d00b3fe3b076d1ce97b459a3e1))
- **indemite-licenciement:** modification de la margin du questionnaire a la premiere etape ([3f74e61](https://github.com/SocialGouv/code-du-travail-numerique/commit/3f74e61e4935eb6c1c5c793d26eea4e8a2ed5097))
- **indemnite-licenciement:** cc 2148 majoration ([#5283](https://github.com/SocialGouv/code-du-travail-numerique/issues/5283)) ([6078aaa](https://github.com/SocialGouv/code-du-travail-numerique/commit/6078aaa9e19917ec37e511ad7fb509b4294808ee))
- **modeles:** modification des disclaimers et des titres ([#5299](https://github.com/SocialGouv/code-du-travail-numerique/issues/5299)) ([61f06b3](https://github.com/SocialGouv/code-du-travail-numerique/commit/61f06b3fc70ce574c5f6abaeac18969cd22f07da))

### Features

- 5271 indemnité de licenciement créer un questionnaire spécifique ([#5287](https://github.com/SocialGouv/code-du-travail-numerique/issues/5287)) ([969c330](https://github.com/SocialGouv/code-du-travail-numerique/commit/969c330a99e7f027775578ffbbc6e17cdd58fa92))
- **accessibilité:** mise à jour de la page accessibilité ([#5295](https://github.com/SocialGouv/code-du-travail-numerique/issues/5295)) ([399b2e7](https://github.com/SocialGouv/code-du-travail-numerique/commit/399b2e7d6501f96b40f1bca38c245e0eab367658))
- add redirection ([#5307](https://github.com/SocialGouv/code-du-travail-numerique/issues/5307)) ([a0941c8](https://github.com/SocialGouv/code-du-travail-numerique/commit/a0941c8ba87d26257f8ffdfcc690f577a1202f16))
- **contributions:** nouvelle version pages personnalisables ([#5280](https://github.com/SocialGouv/code-du-travail-numerique/issues/5280)) ([1ba1342](https://github.com/SocialGouv/code-du-travail-numerique/commit/1ba134214330a469588e4ad5bd2b7bf62ff3cd00))
- indemnite licenciement 176 ([#5234](https://github.com/SocialGouv/code-du-travail-numerique/issues/5234)) ([d803a58](https://github.com/SocialGouv/code-du-travail-numerique/commit/d803a582db59c9e644db94b9c6c4afbd1624da9e))
- **indemnite-licenciement:** activation de nouvelles CC ([#5300](https://github.com/SocialGouv/code-du-travail-numerique/issues/5300)) ([8c513d5](https://github.com/SocialGouv/code-du-travail-numerique/commit/8c513d56a7562ddb4a48e4c6bba356353181e840))

## [4.105.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.105.0...v4.105.1) (2023-07-19)

### Bug Fixes

- **1740:** ajout des redirections ([#5281](https://github.com/SocialGouv/code-du-travail-numerique/issues/5281)) ([ac99c01](https://github.com/SocialGouv/code-du-travail-numerique/commit/ac99c010610f5bf4679bef1c63ab14d226796ad5))

# [4.105.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.104.2...v4.105.0) (2023-07-17)

### Bug Fixes

- **fiche service public:** fix image width on mobile ([#5269](https://github.com/SocialGouv/code-du-travail-numerique/issues/5269)) ([1bf5de6](https://github.com/SocialGouv/code-du-travail-numerique/commit/1bf5de68b85bfdbca14a199e118cfc6457a76de7))
- **preavis-retraite:** rajout de l idcc ([9dde572](https://github.com/SocialGouv/code-du-travail-numerique/commit/9dde57273353380a7868362c2c055e8aaa0d2f34))
- **preavis-retraite:** revert + fix unit test ([c8a5eaf](https://github.com/SocialGouv/code-du-travail-numerique/commit/c8a5eafb6443da80661acc6b2e2f31bf451b2032))

### Features

- **convention-collective:** ajout d'une redirection vers nos pages CC à partir d'une url contenant seulement l'IDCC ([#5277](https://github.com/SocialGouv/code-du-travail-numerique/issues/5277)) ([7532331](https://github.com/SocialGouv/code-du-travail-numerique/commit/7532331f32cd7c6f8d6db99b7b1a88a6e1dc1317))
- **simulator:** ajout d'un singleton pour charger les modèles ([#5251](https://github.com/SocialGouv/code-du-travail-numerique/issues/5251)) ([40faea2](https://github.com/SocialGouv/code-du-travail-numerique/commit/40faea2edd819f40efac5a7391d779c6ef189255))

## [4.104.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.104.1...v4.104.2) (2023-07-06)

### Bug Fixes

- **canonical:** `search` replaced by keyword `recherche` ([#5260](https://github.com/SocialGouv/code-du-travail-numerique/issues/5260)) ([362418c](https://github.com/SocialGouv/code-du-travail-numerique/commit/362418c541667cadf8a11cabd31b97d96e76309f))
- widget console error ([#5264](https://github.com/SocialGouv/code-du-travail-numerique/issues/5264)) ([2e7020d](https://github.com/SocialGouv/code-du-travail-numerique/commit/2e7020d8dfceb887fe0c69d83e240be22767a3c5))
- **widget:** le lien s'ouvre dans une nouvelle page pour la convention collective 3239 ([#5263](https://github.com/SocialGouv/code-du-travail-numerique/issues/5263)) ([afe9484](https://github.com/SocialGouv/code-du-travail-numerique/commit/afe9484e43e6e6d304117e683109eea22fed52b4))

## [4.104.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.104.0...v4.104.1) (2023-07-06)

### Bug Fixes

- console error widget ([#5262](https://github.com/SocialGouv/code-du-travail-numerique/issues/5262)) ([b4f6499](https://github.com/SocialGouv/code-du-travail-numerique/commit/b4f6499043541f3396be2cb5631c46ca8a94ca22))
- enlevé an des unités dans champs texte ([#5249](https://github.com/SocialGouv/code-du-travail-numerique/issues/5249)) ([b4dc40b](https://github.com/SocialGouv/code-du-travail-numerique/commit/b4dc40be8bc4d0624a86ebd341db2bf2212db104))
- **image:** allow images coming from service public ([#5261](https://github.com/SocialGouv/code-du-travail-numerique/issues/5261)) ([44fce19](https://github.com/SocialGouv/code-du-travail-numerique/commit/44fce19bccdbdbc90ddeda5303756f4a7b407b93))
- **services de renseignements:** updates url with redirect + test only once the duplicated url ([#5258](https://github.com/SocialGouv/code-du-travail-numerique/issues/5258)) ([eae64a8](https://github.com/SocialGouv/code-du-travail-numerique/commit/eae64a84af54dceee4d134b611cbf2c8dd591b08))

# [4.104.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.103.0...v4.104.0) (2023-07-04)

### Bug Fixes

- bug bouton suivant indemnite precarité ([#5242](https://github.com/SocialGouv/code-du-travail-numerique/issues/5242)) ([06009bb](https://github.com/SocialGouv/code-du-travail-numerique/commit/06009bb6cca3e1bafab690ad4d44dcb4e34c3570))
- **contribs page:** add link to cc page on the contrib page ([#5216](https://github.com/SocialGouv/code-du-travail-numerique/issues/5216)) ([1be33c7](https://github.com/SocialGouv/code-du-travail-numerique/commit/1be33c7ec9968a3fab2cc642ba8fb7a3d621d743))
- **fiche service public:** affichage des images ([#5240](https://github.com/SocialGouv/code-du-travail-numerique/issues/5240)) ([37175d8](https://github.com/SocialGouv/code-du-travail-numerique/commit/37175d8f2cf1ad2261503b50d4870447298bc84e))
- **indemnite-licenciement:** ajout d'un message specifique pour la CC 44 ([#5237](https://github.com/SocialGouv/code-du-travail-numerique/issues/5237)) ([e5ed301](https://github.com/SocialGouv/code-du-travail-numerique/commit/e5ed301f947ffbc1582c6843da02ddab5edcf177))
- **link:** open in a new tab no enterprise link ([e0269b4](https://github.com/SocialGouv/code-du-travail-numerique/commit/e0269b4761cab7a2d84fe9d054cf065543a1455c))
- **node:** upgrade to latest version of node ([#5241](https://github.com/SocialGouv/code-du-travail-numerique/issues/5241)) ([ca37299](https://github.com/SocialGouv/code-du-travail-numerique/commit/ca3729966f2a70fdac1a33390b557a6d58a9e3fe))
- **preavis-retraite:** Mise a la retraite pour un Cadres de la 1505 ([#5236](https://github.com/SocialGouv/code-du-travail-numerique/issues/5236)) ([e105ecd](https://github.com/SocialGouv/code-du-travail-numerique/commit/e105ecd220fae61407566425e73170c5d6ad0ff2))
- test e2e sur les fiches SP ([#5243](https://github.com/SocialGouv/code-du-travail-numerique/issues/5243)) ([d101cc0](https://github.com/SocialGouv/code-du-travail-numerique/commit/d101cc0198fde0ab8283a07121e4e9b64dd3f961))
- widget targets ([#5252](https://github.com/SocialGouv/code-du-travail-numerique/issues/5252)) ([94804d0](https://github.com/SocialGouv/code-du-travail-numerique/commit/94804d09521568370cb7487ffd35c818382cb891))
- **widget:** put back query selector with "\*" ([#5259](https://github.com/SocialGouv/code-du-travail-numerique/issues/5259)) ([339d2bd](https://github.com/SocialGouv/code-du-travail-numerique/commit/339d2bde79ffca89a1f7a79803c6dc8b707aec64))

### Features

- **indemnité de licenciement:** implémentation de la CC 292 ([#5214](https://github.com/SocialGouv/code-du-travail-numerique/issues/5214)) ([0104fe5](https://github.com/SocialGouv/code-du-travail-numerique/commit/0104fe52e6141f14bb0d060900ae2046bf27aa20))
- **indemnite-licenciement:** ajout de la cc 2120 ([#5230](https://github.com/SocialGouv/code-du-travail-numerique/issues/5230)) ([6593b38](https://github.com/SocialGouv/code-du-travail-numerique/commit/6593b383023293aad9f7bbd47588277124adb040))
- **indemnite-licenciement:** Mise en place d'un module de recherche pour la CC 3239 ([#4958](https://github.com/SocialGouv/code-du-travail-numerique/issues/4958)) ([4e649a6](https://github.com/SocialGouv/code-du-travail-numerique/commit/4e649a67f659dbaaf73521fccbb9900e5276d623))

# [4.103.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.102.2...v4.103.0) (2023-06-27)

### Bug Fixes

- **indemnité de licenciement:** ne pas prendre que les années complètes pour le droit à l'indemnité pour la 2148 ([#5238](https://github.com/SocialGouv/code-du-travail-numerique/issues/5238)) ([5a1d9d9](https://github.com/SocialGouv/code-du-travail-numerique/commit/5a1d9d9dce0b4d81b8b422f9a2ad0a23d551cda9))
- **lerna:** set local version for lerna ([19e9d06](https://github.com/SocialGouv/code-du-travail-numerique/commit/19e9d062e3dd3d4c1df4fdcb50d44a1a62fb2169))
- sref ([#5232](https://github.com/SocialGouv/code-du-travail-numerique/issues/5232)) ([5e5c231](https://github.com/SocialGouv/code-du-travail-numerique/commit/5e5c231a3e574068ebb68bbec8041de98448e00b))

### Features

- **indemnite-licenciement:** activation de nouvelles CCs ([c5d6a72](https://github.com/SocialGouv/code-du-travail-numerique/commit/c5d6a72b2e68d315384a99a27163c43b0038ef00))

## [4.102.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.102.1...v4.102.2) (2023-06-22)

### Bug Fixes

- iframe security blob ([#5227](https://github.com/SocialGouv/code-du-travail-numerique/issues/5227)) ([b6c1bd1](https://github.com/SocialGouv/code-du-travail-numerique/commit/b6c1bd1c55951ed09f66e9af442fa1cbbedbcbeb))

## [4.102.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.102.0...v4.102.1) (2023-06-20)

### Bug Fixes

- **lerna:** remove useWorkspace ([7b2ef0a](https://github.com/SocialGouv/code-du-travail-numerique/commit/7b2ef0a391594b65f3e2c237646f01e8d3cbe535))

# [4.102.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.101.3...v4.102.0) (2023-06-20)

### Bug Fixes

- **fiche service public:** handle type FragmentConditionne in ElementBuilder ([#5209](https://github.com/SocialGouv/code-du-travail-numerique/issues/5209)) ([6859773](https://github.com/SocialGouv/code-du-travail-numerique/commit/68597733faf437bdbc92ffe7bfb762f65c32dda1))
- **indemnité de licenciement:** Reformuler la question sur la date de fin de contrat ([#5210](https://github.com/SocialGouv/code-du-travail-numerique/issues/5210)) ([f18702a](https://github.com/SocialGouv/code-du-travail-numerique/commit/f18702a2d7544ba1efad9556fd18f06ea6eaf436))
- **indemnite-licenciement:** ne pas inclure les années incomplètes pour le calcul de l'ancienneté CC 2148 ([#5206](https://github.com/SocialGouv/code-du-travail-numerique/issues/5206)) ([565c767](https://github.com/SocialGouv/code-du-travail-numerique/commit/565c7674b8aff534e5abe91017006ea2c09e477d))
- **politique-confidentialite:** correctif du lien vers la CNIL ([#5223](https://github.com/SocialGouv/code-du-travail-numerique/issues/5223)) ([be26325](https://github.com/SocialGouv/code-du-travail-numerique/commit/be2632520529ada874fec8cfa7244b37d694f0ad))
- **react-ui:** set styled-components in dependencies ([c0226db](https://github.com/SocialGouv/code-du-travail-numerique/commit/c0226db4f4ae0892ffb09adb65b4070e32e0ef8b))
- wording ([#5215](https://github.com/SocialGouv/code-du-travail-numerique/issues/5215)) ([9969e22](https://github.com/SocialGouv/code-du-travail-numerique/commit/9969e22d98fe7ebfe1ced082e4f7d839da09bc64))

### Features

- indemnite licenciement 1404 ([#5133](https://github.com/SocialGouv/code-du-travail-numerique/issues/5133)) ([5fa2153](https://github.com/SocialGouv/code-du-travail-numerique/commit/5fa215383e48e04431817a28a7b5f9603f2b385d))
- **indemnite-licenciement:** activation de nouvelles CCs ([eeab2b4](https://github.com/SocialGouv/code-du-travail-numerique/commit/eeab2b4ff4c8b49ae783cc2327d422eb7119e6e2))
- **indemnite-licenciement:** désactivation de la CC 2596 ([04b6df4](https://github.com/SocialGouv/code-du-travail-numerique/commit/04b6df432e1bf97bcb8e5c2f3d2722d068960def))
- **sentry:** add replay feature ([#5220](https://github.com/SocialGouv/code-du-travail-numerique/issues/5220)) ([3e2aec3](https://github.com/SocialGouv/code-du-travail-numerique/commit/3e2aec32a756d3c7f4799efb9c6101d33b370e65))
- widgetiser les modeles ([#5182](https://github.com/SocialGouv/code-du-travail-numerique/issues/5182)) ([6664158](https://github.com/SocialGouv/code-du-travail-numerique/commit/6664158039337cdb0f173ac4796797f3218ef815))

## [4.101.3](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.101.2...v4.101.3) (2023-06-12)

### Bug Fixes

- **secret:** reseal secret ([e8b730c](https://github.com/SocialGouv/code-du-travail-numerique/commit/e8b730c8796bf6a554f029d17f3c5cc54c00ad7a))

## [4.101.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.101.1...v4.101.2) (2023-06-12)

### Bug Fixes

- dep ([34046be](https://github.com/SocialGouv/code-du-travail-numerique/commit/34046be79a8ea3d5da3d610f6ea0eec8cdedf5a0))
- dep ([dc57529](https://github.com/SocialGouv/code-du-travail-numerique/commit/dc57529d27de12d9cd1a49c9986564d6130cea4d))
- **kontinuous:** secret ([e93f15e](https://github.com/SocialGouv/code-du-travail-numerique/commit/e93f15ea7dbb59f9ccaae798fbc911d6e762b4d0))

## [4.101.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.101.0...v4.101.1) (2023-06-12)

### Bug Fixes

- **dependencies:** auto-increment version of local package ([20f7d3a](https://github.com/SocialGouv/code-du-travail-numerique/commit/20f7d3a93db5a8b2fa79bceef8556655851a8a6b))

# [4.101.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.100.0...v4.101.0) (2023-06-12)

### Bug Fixes

- ajout des sources maps pour dev ([f64dcea](https://github.com/SocialGouv/code-du-travail-numerique/commit/f64dceaea2dca11ffe6f54e83bf6590e0939e667))
- **dependencies:** from dependabot to renovate ([b30618d](https://github.com/SocialGouv/code-du-travail-numerique/commit/b30618ddb8b69fa4e90d43cba887e70a535a3ac0))
- **deps:** update dependency @next/bundle-analyzer to v13 ([#5204](https://github.com/SocialGouv/code-du-travail-numerique/issues/5204)) ([e7911af](https://github.com/SocialGouv/code-du-travail-numerique/commit/e7911af74125c4a4f061ef222d5d8deba2575c6f))
- **dockerfile:** add update and upgrade on dependencies ([#5205](https://github.com/SocialGouv/code-du-travail-numerique/issues/5205)) ([b19733f](https://github.com/SocialGouv/code-du-travail-numerique/commit/b19733f4aea74c5515c171ce6bfa94f28775a9cb))
- **docker:** set alpine version for node 20 ([3eacf73](https://github.com/SocialGouv/code-du-travail-numerique/commit/3eacf73bf3de0f92146fea1c394c3dc9243c0028))
- **e2e:** fix tests ([#5181](https://github.com/SocialGouv/code-du-travail-numerique/issues/5181)) ([bfb64a8](https://github.com/SocialGouv/code-du-travail-numerique/commit/bfb64a84085f365f6ade776494ae07d5ef3f2130))
- **indemnité de licenciement:** derniers retours sur la 1516 suite au nouvel avenant ([#5208](https://github.com/SocialGouv/code-du-travail-numerique/issues/5208)) ([56d0a4c](https://github.com/SocialGouv/code-du-travail-numerique/commit/56d0a4cd5c962eded5157d14af7ce05f73b17875))
- **indemnité de licenciement:** mise en place des modifs issues d'un avenant du 6 février 2023 sur la cc 1516 ([#5188](https://github.com/SocialGouv/code-du-travail-numerique/issues/5188)) ([48a571d](https://github.com/SocialGouv/code-du-travail-numerique/commit/48a571d5786c5598ef0ba551cdc36257abf37a1c))
- **indemnite-licenciement:** ajout d'une notification pour la CC 3239 ([#5164](https://github.com/SocialGouv/code-du-travail-numerique/issues/5164)) ([e3f6ca5](https://github.com/SocialGouv/code-du-travail-numerique/commit/e3f6ca5d57f018066f9b854c2d8f5f1472057ef6))
- **indemnite-licenciement:** revert sur salary 1672 et 1702 ([0d071fa](https://github.com/SocialGouv/code-du-travail-numerique/commit/0d071fae3d5df923d41626c357a1e585c2aec99d))
- **indemnite-licenciement:** salaire de reference non pris en compte sur la cc 44 ([#5162](https://github.com/SocialGouv/code-du-travail-numerique/issues/5162)) ([1d4362f](https://github.com/SocialGouv/code-du-travail-numerique/commit/1d4362f9101d1d3734e9236c3f87bf4d309712a3))
- **indemnite-licenciement:** tests unitaires pour la cc 1740 ([c961387](https://github.com/SocialGouv/code-du-travail-numerique/commit/c96138736c8bdf162e522bb817f6b46fbf1fee87))
- **package.json:** command update snapshot for frontend ([1198c9f](https://github.com/SocialGouv/code-du-travail-numerique/commit/1198c9f75050f1d74afe9c20b6c82fba21f72b19))
- **sentry:** disable webpack plugin ([48aae3b](https://github.com/SocialGouv/code-du-travail-numerique/commit/48aae3b7f798b73d0f3ea00db8dccc006733fdd1))
- **sentry:** getting source maps ([#5166](https://github.com/SocialGouv/code-du-travail-numerique/issues/5166)) ([c393785](https://github.com/SocialGouv/code-du-travail-numerique/commit/c393785d626b8b9da1bde689be870f766eff9bf6))
- **simulateurs:** mise en place des modifs issues d'un avenant du 6 février 2023 sur la cc 1516 ([#5189](https://github.com/SocialGouv/code-du-travail-numerique/issues/5189)) ([b8903e9](https://github.com/SocialGouv/code-du-travail-numerique/commit/b8903e9bac57011d3ad08d4b883395d4b2b66ba0))
- **source-maps:** remove for preproduction and production ([e309bd2](https://github.com/SocialGouv/code-du-travail-numerique/commit/e309bd29c689adee34478d9dfcedb3cd618222fb))
- **storybook:** probleme sur le deploiemenent en prod suite à l'upgrade de storybook ([#5183](https://github.com/SocialGouv/code-du-travail-numerique/issues/5183)) ([605ab40](https://github.com/SocialGouv/code-du-travail-numerique/commit/605ab4074e8869dbd8e53006713cc1146659c3b4))
- **storybook:** typescript error in production environment ([18b795c](https://github.com/SocialGouv/code-du-travail-numerique/commit/18b795c068c4fafc57dfa28cb5b45e1fe11c12f9))
- **trouver sa cc:** ajout d'urls spécifiques aux 2 outils pour rechercher sa CC (et suppression du mechanisme de redirection avec un hash dans l'url) ([#5173](https://github.com/SocialGouv/code-du-travail-numerique/issues/5173)) ([66aa66a](https://github.com/SocialGouv/code-du-travail-numerique/commit/66aa66a0c9254f6e2dc38dcbe8aa6346065f2fbf))
- utilisation des maps pour sentry ([#5176](https://github.com/SocialGouv/code-du-travail-numerique/issues/5176)) ([538ed7a](https://github.com/SocialGouv/code-du-travail-numerique/commit/538ed7a906a6caea95020425531dde8a82d9adae))
- **widget:** stop scrolling too much when widget is installed on very height page ([#5177](https://github.com/SocialGouv/code-du-travail-numerique/issues/5177)) ([5855b2d](https://github.com/SocialGouv/code-du-travail-numerique/commit/5855b2d72d16d0afcc04cd044cdec1fee00fe7ff))
- **workflow:** add `ignore_empty` params for sentry ([de517b6](https://github.com/SocialGouv/code-du-travail-numerique/commit/de517b6aa5d627c156226990795ef6c2038ca97a))
- **workflow:** depreciate action has been replaced ([fa7c16c](https://github.com/SocialGouv/code-du-travail-numerique/commit/fa7c16c2a62e47bac52c5d8a93cf44dd4a3265c7))
- **workflow:** sentry prefix for preprod ([ffdf685](https://github.com/SocialGouv/code-du-travail-numerique/commit/ffdf685bd02b2570e5554c52021323cc18fd36c9))
- **workflow:** storybook can be deployed to github ([46baeb8](https://github.com/SocialGouv/code-du-travail-numerique/commit/46baeb8d1caeffda65994cc795bd8e421649d5f6))
- **workflow:** storybook deployment ([e5e3c33](https://github.com/SocialGouv/code-du-travail-numerique/commit/e5e3c33d438d8e84a62431c02b28ce2b8401343e))

### Features

- **accessibilité:** rendre la recherche de CC par entreprise accessible ([#5151](https://github.com/SocialGouv/code-du-travail-numerique/issues/5151)) ([22c92a8](https://github.com/SocialGouv/code-du-travail-numerique/commit/22c92a892f2c8a30e00f0b7a746372736677bb2d))
- **dep:** optimize fetching of yarn dependencies ([#5190](https://github.com/SocialGouv/code-du-travail-numerique/issues/5190)) ([49878e3](https://github.com/SocialGouv/code-du-travail-numerique/commit/49878e3251b0d7aab82ce1c7652bd8cad829e67c))
- **dep:** use dependabot instead of renovate ([#5193](https://github.com/SocialGouv/code-du-travail-numerique/issues/5193)) ([776f30a](https://github.com/SocialGouv/code-du-travail-numerique/commit/776f30a6e3b0f024ec1aa519e4d3a582145ea56e))
- **indemnite-licenciement:** ajout d'une note en bas de page sur le résultat ([#5172](https://github.com/SocialGouv/code-du-travail-numerique/issues/5172)) ([b852136](https://github.com/SocialGouv/code-du-travail-numerique/commit/b852136f7d6ba734bf86dbc053b076d3078387cb))
- **indemnite-licenciement:** ajout de la cc 1483 ([#5154](https://github.com/SocialGouv/code-du-travail-numerique/issues/5154)) ([a8030e1](https://github.com/SocialGouv/code-du-travail-numerique/commit/a8030e18369777db579022f10d20a0de92b82ff5))
- **indemnite-licenciement:** ajout de la cc 1740 ([#5155](https://github.com/SocialGouv/code-du-travail-numerique/issues/5155)) ([d66e652](https://github.com/SocialGouv/code-du-travail-numerique/commit/d66e652b92a3e47f10d0901f65165fdbae9ef89f))
- **indemnite-licenciement:** retirer pour certaines cc un messages sur la page resultat ([#5165](https://github.com/SocialGouv/code-du-travail-numerique/issues/5165)) ([dd14970](https://github.com/SocialGouv/code-du-travail-numerique/commit/dd14970ac6d44c0aa5fc69099ea3fe6e0326b1d9))
- **page contribution:** ajout d'un lien vers la CC quand la page est personalisée + passage en ts ([#5150](https://github.com/SocialGouv/code-du-travail-numerique/issues/5150)) ([f78a9eb](https://github.com/SocialGouv/code-du-travail-numerique/commit/f78a9eb8f78c9f32ced7e3af390c2f3271bd06f8))
- **sentry:** ajout des source maps ([#5200](https://github.com/SocialGouv/code-du-travail-numerique/issues/5200)) ([700d656](https://github.com/SocialGouv/code-du-travail-numerique/commit/700d656c6e683a06648c0e9ac5c68978b2f2147f))
- **widget:** ajout d'une balise meta et d'une balise canonical ([#5170](https://github.com/SocialGouv/code-du-travail-numerique/issues/5170)) ([861b8fa](https://github.com/SocialGouv/code-du-travail-numerique/commit/861b8fa3b9b7479fd68469b4238039af7b342dd6))
- **workflow:** add auto deploy on all branch except dependabot ([4e4d5c3](https://github.com/SocialGouv/code-du-travail-numerique/commit/4e4d5c3d35c58063e0a0bbe5d21a41c304c0fb16))
- **workflow:** add autodeploy to dev ([8f333e7](https://github.com/SocialGouv/code-du-travail-numerique/commit/8f333e7b1705a9d916d7a85d260486e5b141fd47))
- **workflow:** add cypress to the pipeline ([#5207](https://github.com/SocialGouv/code-du-travail-numerique/issues/5207)) ([81f6c70](https://github.com/SocialGouv/code-du-travail-numerique/commit/81f6c70e8f348c2df5e0f5d2429c0f2ce2c39202))
- **workflow:** clean + upgrade workflow for register ([#5201](https://github.com/SocialGouv/code-du-travail-numerique/issues/5201)) ([5efeab5](https://github.com/SocialGouv/code-du-travail-numerique/commit/5efeab5189ada85bc7664d2054e428c1b323c081))
- **yarn:** use cache in ci with github action ([#5191](https://github.com/SocialGouv/code-du-travail-numerique/issues/5191)) ([7634bdc](https://github.com/SocialGouv/code-du-travail-numerique/commit/7634bdc2e934fab496b6e1b5d77aef00b526a16f))

# [4.100.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.99.0...v4.100.0) (2023-05-24)

### Bug Fixes

- **preavis-retraite:** correctif sur la référence 4.6 pour la CC 1486 ([#5159](https://github.com/SocialGouv/code-du-travail-numerique/issues/5159)) ([3a76392](https://github.com/SocialGouv/code-du-travail-numerique/commit/3a76392ca855c2dbe392cd01c690b6b5468722a6))

### Features

- **indemnite-licenciement:** activation de la CC 1702 ([#5163](https://github.com/SocialGouv/code-du-travail-numerique/issues/5163)) ([5431442](https://github.com/SocialGouv/code-du-travail-numerique/commit/5431442ce53717a34f8d4a95129d1c9ff9d43eca))
- **indemnite-licenciement:** retours suite aux tests de la cc 1702 ([#5139](https://github.com/SocialGouv/code-du-travail-numerique/issues/5139)) ([fb1514f](https://github.com/SocialGouv/code-du-travail-numerique/commit/fb1514f6a6be44991c52ac033b6c4e7c82ef1709))

# [4.99.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.98.1...v4.99.0) (2023-05-23)

### Bug Fixes

- **error:** "undefined is not an object (evaluating 't.input.focus')" seen on sentry ([#5132](https://github.com/SocialGouv/code-du-travail-numerique/issues/5132)) ([f13356f](https://github.com/SocialGouv/code-du-travail-numerique/commit/f13356f1ac928f0a2fff239e22a348c7cac1439c))
- **Indemnité de licenciement:** wording ([#5131](https://github.com/SocialGouv/code-du-travail-numerique/issues/5131)) ([37dabb7](https://github.com/SocialGouv/code-du-travail-numerique/commit/37dabb70832cbaedeb808da3fa3ee2a5ee9a109e))
- **indemnite-licenciement:** ajout de la notification si le legal et le conventionnel sont égaux ([#5123](https://github.com/SocialGouv/code-du-travail-numerique/issues/5123)) ([f387bb7](https://github.com/SocialGouv/code-du-travail-numerique/commit/f387bb70b0759c1da3daf8dd815a227f69c109d9))
- **indemnite-licenciement:** correction de l'étape résultat avec les informations en trop ([#5125](https://github.com/SocialGouv/code-du-travail-numerique/issues/5125)) ([4304c46](https://github.com/SocialGouv/code-du-travail-numerique/commit/4304c46b393d9c5a79f0fa04c8472b3f1328c33c))
- ne pas calculer les données pour les CC non supportées ([#5158](https://github.com/SocialGouv/code-du-travail-numerique/issues/5158)) ([35c9498](https://github.com/SocialGouv/code-du-travail-numerique/commit/35c9498e2c73dd7b2f888b7724bbcd8ce14dc582))
- **simulators:** maj de la 1486 ([#5137](https://github.com/SocialGouv/code-du-travail-numerique/issues/5137)) ([dc9247b](https://github.com/SocialGouv/code-du-travail-numerique/commit/dc9247b4b0f042aa4fe0278edcfa2ac1003f740e))

### Features

- **event:** ajout d'un event pour tracker le `header` et les voir plus de la page `home` ([#5124](https://github.com/SocialGouv/code-du-travail-numerique/issues/5124)) ([44a29d8](https://github.com/SocialGouv/code-du-travail-numerique/commit/44a29d8e019cf5ea2ba3237b2dd5bdae33825472))
- **indemnite de licenciement:** add cc 1516 ([#5031](https://github.com/SocialGouv/code-du-travail-numerique/issues/5031)) ([fb36106](https://github.com/SocialGouv/code-du-travail-numerique/commit/fb36106ba6541794fda293accc7d4801fd038671))
- **indemnité de licenciement:** add cc 1606 ([#5087](https://github.com/SocialGouv/code-du-travail-numerique/issues/5087)) ([bdf36ed](https://github.com/SocialGouv/code-du-travail-numerique/commit/bdf36ed6092d3ff40a4bda1020b8876a4b7c29c0))
- **indemnite de licenciement:** add cc 2148 ([#5034](https://github.com/SocialGouv/code-du-travail-numerique/issues/5034)) ([e191681](https://github.com/SocialGouv/code-du-travail-numerique/commit/e191681a59917c79009fc1ead846be5250ebb158))
- **indemnité de licenciement:** Ne pas poser la question "le motif est-il économique ?" si l'usager a indiqué qu'il était en inaptitude pro à l'étape "contrat de travail" ([#5119](https://github.com/SocialGouv/code-du-travail-numerique/issues/5119)) ([60d9d12](https://github.com/SocialGouv/code-du-travail-numerique/commit/60d9d12fff0f449c42d811632d4b9a869dd4cb67))
- indemnite licenciement 1043 ([#5129](https://github.com/SocialGouv/code-du-travail-numerique/issues/5129)) ([7dbec04](https://github.com/SocialGouv/code-du-travail-numerique/commit/7dbec0496453c2d48e79ac165d1d59a4a87397a9))
- indemnite licenciement 275 fix métier ([#5112](https://github.com/SocialGouv/code-du-travail-numerique/issues/5112)) ([ca4fc4c](https://github.com/SocialGouv/code-du-travail-numerique/commit/ca4fc4c5082817fb2c4e85b3c2f763b9c788957a))
- **indemnite-licenciement:** activation CC 675 - 1996 - 1505 - 1147 ([#5156](https://github.com/SocialGouv/code-du-travail-numerique/issues/5156)) ([e88a5e0](https://github.com/SocialGouv/code-du-travail-numerique/commit/e88a5e0502a8741ac3e6b1aa75f3756ab3143293))
- **indemnite-licenciement:** ajout de la cc 1672 ([#4993](https://github.com/SocialGouv/code-du-travail-numerique/issues/4993)) ([adfeb7f](https://github.com/SocialGouv/code-du-travail-numerique/commit/adfeb7f7de3d6d4a22edfaf33a0dea5c8c3464a9))
- **indemnite-licenciement:** nouvelles règles pour la CC 1486 ([#5143](https://github.com/SocialGouv/code-du-travail-numerique/issues/5143)) ([811b13f](https://github.com/SocialGouv/code-du-travail-numerique/commit/811b13f0230a36c403f36bc2025a5e34e03a5ee9))
- **plan-du-site:** Ajout d'un plan du site qui permet de répertorier tout notre contenu généré ([#5117](https://github.com/SocialGouv/code-du-travail-numerique/issues/5117)) ([06a2909](https://github.com/SocialGouv/code-du-travail-numerique/commit/06a2909e70d0e1b01c34323b4070f78e967639ff))

## [4.98.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.98.0...v4.98.1) (2023-04-20)

### Bug Fixes

- **csp:** remove prefetch-src property ([565790c](https://github.com/SocialGouv/code-du-travail-numerique/commit/565790c9e5e8b124d426f226b6f6eb0b8edb6030))

# [4.98.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.97.1...v4.98.0) (2023-04-20)

### Bug Fixes

- **2596:** fix ancienneté when cc is disabled (for prod) + remove event on theme as it is not working ([#5122](https://github.com/SocialGouv/code-du-travail-numerique/issues/5122)) ([f741e9c](https://github.com/SocialGouv/code-du-travail-numerique/commit/f741e9c4b26a2b5447bfa9e98bbd0295df2d40ec))
- **500:** set an error 404 when page is not found on `slug` ([#5118](https://github.com/SocialGouv/code-du-travail-numerique/issues/5118)) ([34fb5dd](https://github.com/SocialGouv/code-du-travail-numerique/commit/34fb5dd665f5a70ca04dbac09b3c1fcccfecbdcd))
- **accessibility:** add aria-disabled when button is disabled ([#5061](https://github.com/SocialGouv/code-du-travail-numerique/issues/5061)) ([714ac05](https://github.com/SocialGouv/code-du-travail-numerique/commit/714ac058968edff9697b3fa69b51de20160cb3d3))
- **cypress:** timeout linked to DOM element ([9eed808](https://github.com/SocialGouv/code-du-travail-numerique/commit/9eed8083bf40a1a8fc95871a22b1bdfe70c0186d))
- **dep:** renovate config fix ([4c9de68](https://github.com/SocialGouv/code-du-travail-numerique/commit/4c9de68cd53d4f8ff6c52d30d2a44fcd546f30a5))
- erreur matomo console themes demission ([#5097](https://github.com/SocialGouv/code-du-travail-numerique/issues/5097)) ([1a2d0d5](https://github.com/SocialGouv/code-du-travail-numerique/commit/1a2d0d5f0c772c3d548bf7d24bd3870bbd5d3694))
- **indemnite-licenciement:** ajout congé parental à temps partiel dans le texte d'intro d'absence ([#5102](https://github.com/SocialGouv/code-du-travail-numerique/issues/5102)) ([d4c3508](https://github.com/SocialGouv/code-du-travail-numerique/commit/d4c35082c78c0c6c11325fa8dec28942c39dc949))
- **indemnite-licenciement:** desactivation du bouton entrer sur l'étape Convention Collective ([#5108](https://github.com/SocialGouv/code-du-travail-numerique/issues/5108)) ([e2bfbad](https://github.com/SocialGouv/code-du-travail-numerique/commit/e2bfbad461e78d1b2aa6d43845272f82f230534a))
- **indemnite-licenciement:** retours sur la CC 44 ([#5113](https://github.com/SocialGouv/code-du-travail-numerique/issues/5113)) ([6275b0e](https://github.com/SocialGouv/code-du-travail-numerique/commit/6275b0eed42cee14b0b45df00635bd230ceb3736))
- **null error:** when input is undefined ([#5076](https://github.com/SocialGouv/code-du-travail-numerique/issues/5076)) ([03b22b1](https://github.com/SocialGouv/code-du-travail-numerique/commit/03b22b184dc497db2f2a68c52ecfad8c6d32f3e6))
- préavis retraite quand une cc est déjà enregistrée délai avant que le bouton radio soit coché ([#5090](https://github.com/SocialGouv/code-du-travail-numerique/issues/5090)) ([3c55be5](https://github.com/SocialGouv/code-du-travail-numerique/commit/3c55be5b166fe809f908f175540c1efd81f3c8cf))
- search widget message wording ([#5114](https://github.com/SocialGouv/code-du-travail-numerique/issues/5114)) ([a113dd8](https://github.com/SocialGouv/code-du-travail-numerique/commit/a113dd875f388f56dc92cae634af656a92798c6b))
- **simulator:** handle error when fetch `/api/idcc` and `/api/enterprise` ([#5109](https://github.com/SocialGouv/code-du-travail-numerique/issues/5109)) ([472fad6](https://github.com/SocialGouv/code-du-travail-numerique/commit/472fad64f36ab15f2dbac7687f1c7b96041635ac))

### Features

- indemnité de licenciement faire le +1 également pour le dernier salaire demandé comme pour la calcul dancienneté ([#5086](https://github.com/SocialGouv/code-du-travail-numerique/issues/5086)) ([2d2e205](https://github.com/SocialGouv/code-du-travail-numerique/commit/2d2e20537a99655705c1e6841806289116e87e8d))
- **indemnite de licenciement:** add cc 2596 ([#5029](https://github.com/SocialGouv/code-du-travail-numerique/issues/5029)) ([6dc0f5a](https://github.com/SocialGouv/code-du-travail-numerique/commit/6dc0f5a763433c1034c85d1b943b406ba044fded))
- **indemnité licenciement:** remove congé paternité as it is now included in the ancienneté ([#5017](https://github.com/SocialGouv/code-du-travail-numerique/issues/5017)) ([8a4ca24](https://github.com/SocialGouv/code-du-travail-numerique/commit/8a4ca2451382cdbfd7626fcdccf10668ec072046))
- **sentry:** add source map ([#5092](https://github.com/SocialGouv/code-du-travail-numerique/issues/5092) ([9749c23](https://github.com/SocialGouv/code-du-travail-numerique/commit/9749c2327b177fdeb645a89d1fd16109388cd21d))
- **widget recherche:** Add track event on click ([#5116](https://github.com/SocialGouv/code-du-travail-numerique/issues/5116)) ([f14f284](https://github.com/SocialGouv/code-du-travail-numerique/commit/f14f284a062c4bcad1aa0d57474b0372d3c19cab))
- **widget:** ajout de l'indemnité de précarité ([#5103](https://github.com/SocialGouv/code-du-travail-numerique/issues/5103)) ([92d759a](https://github.com/SocialGouv/code-du-travail-numerique/commit/92d759aaea5936e63ed845114e2679694bc87700))
- **widget:** ajout de la recherche convention collective ([#5107](https://github.com/SocialGouv/code-du-travail-numerique/issues/5107)) ([d837d4f](https://github.com/SocialGouv/code-du-travail-numerique/commit/d837d4fbcca6eb9467063fba476ebe3b2f68d4b3))

## [4.97.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.97.0...v4.97.1) (2023-04-11)

### Bug Fixes

- **indemnite-licenciement:** bug affichage question salaire indemnite de licenciement ([#5101](https://github.com/SocialGouv/code-du-travail-numerique/issues/5101)) ([cf95e5f](https://github.com/SocialGouv/code-du-travail-numerique/commit/cf95e5f08dc20716db5fc387d2f0ccbb47b6fd99))

# [4.97.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.96.0...v4.97.0) (2023-04-07)

### Bug Fixes

- **build:** add types for cors ([dd62b13](https://github.com/SocialGouv/code-du-travail-numerique/commit/dd62b1351767735dde8b99f467ccc6b311bed79f))
- **docker:** optimize docker image ([#5030](https://github.com/SocialGouv/code-du-travail-numerique/issues/5030)) ([7ecd6ef](https://github.com/SocialGouv/code-du-travail-numerique/commit/7ecd6efd2eea22aff2e7ceb390545ee69482680d))
- indemnite licenciement seniority with absence ([#5054](https://github.com/SocialGouv/code-du-travail-numerique/issues/5054)) ([00ea92c](https://github.com/SocialGouv/code-du-travail-numerique/commit/00ea92c2b38701cdbfbc22db178cca74af840cfd))
- **indemnite-licenciement:** affichage du resultat légal pour les ccs non supporté ([#5098](https://github.com/SocialGouv/code-du-travail-numerique/issues/5098)) ([17aaea2](https://github.com/SocialGouv/code-du-travail-numerique/commit/17aaea24bd323cee41994a0d99c82893d4ccba16))
- **indemnite-licenciement:** calcul de l'indemnité pour une ancienneté supérieure à 10 ans (CC 3127) ([#5071](https://github.com/SocialGouv/code-du-travail-numerique/issues/5071)) ([67321ae](https://github.com/SocialGouv/code-du-travail-numerique/commit/67321ae6e3b154cc0c3d46ae117d54963dbd7ec6))
- **info bulle:** style on mobile ([#5060](https://github.com/SocialGouv/code-du-travail-numerique/issues/5060)) ([cf6d7c2](https://github.com/SocialGouv/code-du-travail-numerique/commit/cf6d7c29f50b909ca34c7c009ecdfc463d52eed8))
- **lockfile:** update dep ([219c417](https://github.com/SocialGouv/code-du-travail-numerique/commit/219c417151986642eb6eef75666012862c570ff0))
- **pages:** remove last `getInitialProps` and transform some files in `tsx` ([#5091](https://github.com/SocialGouv/code-du-travail-numerique/issues/5091))Co-authored-by: Caroline <4971715+carolineBda@users.noreply.github.com> ([7214147](https://github.com/SocialGouv/code-du-travail-numerique/commit/7214147e6dedd2dd74b73fa4d0b200ebe9448e04))
- **widget:** track widget click ([#5075](https://github.com/SocialGouv/code-du-travail-numerique/issues/5075)) ([fff82bf](https://github.com/SocialGouv/code-du-travail-numerique/commit/fff82bfe2bcc9f45a8af40ff073d4d982a9ce6b9))
- **workflow:** dev action set automatic url ([8bda97a](https://github.com/SocialGouv/code-du-travail-numerique/commit/8bda97aff36c70cf122707d6e7c57c625593444f))

### Features

- **api:** ajout d'un middleware qui ajoute cors en `preprod` et `dev` ([#5089](https://github.com/SocialGouv/code-du-travail-numerique/issues/5089)) ([fb6ee11](https://github.com/SocialGouv/code-du-travail-numerique/commit/fb6ee11e6315b8656e3540da3c5e823ba4f5fb70))
- **api:** Supression du projet `koa` pour utiliser l'API interne à `next` ([#5042](https://github.com/SocialGouv/code-du-travail-numerique/issues/5042)) ([f833e6b](https://github.com/SocialGouv/code-du-travail-numerique/commit/f833e6bf9bc1227043051222e07aaa2acc332c3f)), closes [#5068](https://github.com/SocialGouv/code-du-travail-numerique/issues/5068)
- cc 275 transport aerien personnel au sol ([#5046](https://github.com/SocialGouv/code-du-travail-numerique/issues/5046)) ([7128cde](https://github.com/SocialGouv/code-du-travail-numerique/commit/7128cde9741b17687826f3c2bd39c1ee2d3e3f6a)), closes [#5008](https://github.com/SocialGouv/code-du-travail-numerique/issues/5008)
- **indemnite-licenciement:** ajout d'un tooltip sur un `SectionTitle` ([#5059](https://github.com/SocialGouv/code-du-travail-numerique/issues/5059)) ([b554099](https://github.com/SocialGouv/code-du-travail-numerique/commit/b55409920c24b963a554aed9dfc7361bf0efab92))
- **indemnite-licenciement:** ajout de la cc 2614 ([#5035](https://github.com/SocialGouv/code-du-travail-numerique/issues/5035)) ([3690f50](https://github.com/SocialGouv/code-du-travail-numerique/commit/3690f5080e3f5e40c07d4baa8b89d2b0ee2a15ef))
- **indemnite-licenciement:** ajout de la cc 86 ([#5073](https://github.com/SocialGouv/code-du-travail-numerique/issues/5073)) ([e020089](https://github.com/SocialGouv/code-du-travail-numerique/commit/e020089ea813d7ea36b03417a7458a882ac52269))
- scroll to top widget ([#5065](https://github.com/SocialGouv/code-du-travail-numerique/issues/5065)) ([73fe3e2](https://github.com/SocialGouv/code-du-travail-numerique/commit/73fe3e252f47621de90ce3b043721a303ee1db32))

# [4.96.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.95.0...v4.96.0) (2023-03-31)

### Bug Fixes

- widget scroll hidden ([#5072](https://github.com/SocialGouv/code-du-travail-numerique/issues/5072)) ([89e8ab4](https://github.com/SocialGouv/code-du-travail-numerique/commit/89e8ab45d6ac58c7ffb87268ffa53a0a278c161d))

### Features

- **indemnite-licenciement:** ajout de la CC 1266 ([#5041](https://github.com/SocialGouv/code-du-travail-numerique/issues/5041)) ([8982ee0](https://github.com/SocialGouv/code-du-travail-numerique/commit/8982ee06b7b541de5dbdfb2c20e11318c03b6a61))

# [4.95.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.94.0...v4.95.0) (2023-03-31)

### Bug Fixes

- **company search:** should not ignore the address field ([#5064](https://github.com/SocialGouv/code-du-travail-numerique/issues/5064)) ([f134a01](https://github.com/SocialGouv/code-du-travail-numerique/commit/f134a01e88b09493cebf9712e26e4ab8d5428187))
- widget cookies & erreur sur logo search ([#5067](https://github.com/SocialGouv/code-du-travail-numerique/issues/5067)) ([1fe54ba](https://github.com/SocialGouv/code-du-travail-numerique/commit/1fe54ba7f7ab4bb80e04e7469eb0b501047a818b))

### Features

- **convention-collective:** ajout d'une redirection pour le changement nom de la CC 1518 ([#5069](https://github.com/SocialGouv/code-du-travail-numerique/issues/5069)) ([b6660de](https://github.com/SocialGouv/code-du-travail-numerique/commit/b6660deecdd709b26519cc696660ebc77e706941))

# [4.94.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.93.1...v4.94.0) (2023-03-30)

### Bug Fixes

- **actions:** modification du message d un workflow ([4048fd2](https://github.com/SocialGouv/code-du-travail-numerique/commit/4048fd20d3abbb22f296d86d6c0d3308f55c0058))
- **actions:** test workflow verif prod ([03b9063](https://github.com/SocialGouv/code-du-travail-numerique/commit/03b9063c0d191b5c079f23a3f56378aaf6087abb))
- correctif sur les tests unitaires de robots.txt ([#5038](https://github.com/SocialGouv/code-du-travail-numerique/issues/5038)) ([1871bf3](https://github.com/SocialGouv/code-du-travail-numerique/commit/1871bf36d65b609c88b45f45673b48d23d0ce4db))
- **e2e:** add to .gitignore downloads folder ([0752489](https://github.com/SocialGouv/code-du-travail-numerique/commit/0752489b1d3e89787703886b90ab8f8db296eae7))
- **e2e:** remove from documentation ([728d933](https://github.com/SocialGouv/code-du-travail-numerique/commit/728d9335c34a125d40db7e6a71fc0ee0ff5e1430))
- **e2e:** suppression du repo ([f9aa2f9](https://github.com/SocialGouv/code-du-travail-numerique/commit/f9aa2f9e5d96efcc6501d259eb09267a8079df7d))
- **frontend:** affichage du meta title ([#5056](https://github.com/SocialGouv/code-du-travail-numerique/issues/5056)) ([0d56377](https://github.com/SocialGouv/code-du-travail-numerique/commit/0d563772c25cb2da7664ee139f26d136a1e285f5))
- **indemnite de licenciement:** 1596 & 1597 remove "absence pour maladie non professionnelle" and "arrêt maladie lié à un accident de trajet" from ancienneté ([#5032](https://github.com/SocialGouv/code-du-travail-numerique/issues/5032)) ([19bd5e2](https://github.com/SocialGouv/code-du-travail-numerique/commit/19bd5e2c1a1c3d2083b7ca7ba664c6920a3d4859))
- **indemnite-licenciement:** à la saisie, perte du focus sur le champ date dans les absences ([#5040](https://github.com/SocialGouv/code-du-travail-numerique/issues/5040) ([5bad148](https://github.com/SocialGouv/code-du-travail-numerique/commit/5bad148bd93a68473f05f2911de798a0b8c7452f))
- **indemnite-licenciement:** correctif de la cc 44 ([#5028](https://github.com/SocialGouv/code-du-travail-numerique/issues/5028) ([7ab9008](https://github.com/SocialGouv/code-du-travail-numerique/commit/7ab9008f451ec3e50b38af82323e0f19f6ffb38f))
- **indemnite-licenciement:** refacto au niveau de l'ancienneté requise ([#5012](https://github.com/SocialGouv/code-du-travail-numerique/issues/5012)) ([c151f53](https://github.com/SocialGouv/code-du-travail-numerique/commit/c151f533a8f0aeb46f5169472ffb3a2282b71c9b))
- **preavis démission:** add ref juridique to résultat ([#5033](https://github.com/SocialGouv/code-du-travail-numerique/issues/5033)) ([2c8c803](https://github.com/SocialGouv/code-du-travail-numerique/commit/2c8c8037a83e067c47b13db9d7366281012ff763))

### Features

- ajout de la notif cc 2511 ([#5053](https://github.com/SocialGouv/code-du-travail-numerique/issues/5053)) ([268eb15](https://github.com/SocialGouv/code-du-travail-numerique/commit/268eb15653a277b5798ebbf9cbb20b3bfc91b75e))
- ajout des messages pour widget search ([#5057](https://github.com/SocialGouv/code-du-travail-numerique/issues/5057)) ([b29256a](https://github.com/SocialGouv/code-du-travail-numerique/commit/b29256a9ea60c1d68a8aca98deed22d4d60a905c))
- ajout du widget indemnite licenciement ([#5018](https://github.com/SocialGouv/code-du-travail-numerique/issues/5018)) ([5184d93](https://github.com/SocialGouv/code-du-travail-numerique/commit/5184d93ea3e90970782b435f5be6a84846a99163))
- **footer:** mise en place d'un footer DSFR ([#5020](https://github.com/SocialGouv/code-du-travail-numerique/issues/5020)) ([94fa245](https://github.com/SocialGouv/code-du-travail-numerique/commit/94fa24567641e86526a43f4ad4a8bf36f79a6101))
- implement cc 1505 ([#4994](https://github.com/SocialGouv/code-du-travail-numerique/issues/4994)) ([f9d9b2a](https://github.com/SocialGouv/code-du-travail-numerique/commit/f9d9b2a97e056b2cf99cbf47a77804ce213a0448))
- **indemnite-licenciement:** add supported cc ([#5058](https://github.com/SocialGouv/code-du-travail-numerique/issues/5058)) ([3242e2f](https://github.com/SocialGouv/code-du-travail-numerique/commit/3242e2f521b52cfc39410e453f74127ffb8ed131))
- **indemnite-licenciement:** ajout de la cc 675 ([#4980](https://github.com/SocialGouv/code-du-travail-numerique/issues/4980))Co-authored-by: Martial Maillot <martial.maillot@gmail.com> ([c34adbe](https://github.com/SocialGouv/code-du-travail-numerique/commit/c34adbe4265a4427f54cdc8c69ec8271f5135cf3))
- prendre referer au lieu de src_url ([#5051](https://github.com/SocialGouv/code-du-travail-numerique/issues/5051)) ([d9e83c4](https://github.com/SocialGouv/code-du-travail-numerique/commit/d9e83c41d4fb4de685fed462ce34d29cf86ed694))
- refonte du widget search ([#5007](https://github.com/SocialGouv/code-du-travail-numerique/issues/5007)) ([762b02a](https://github.com/SocialGouv/code-du-travail-numerique/commit/762b02aa40aef1c6998a35af21b4244ea38716cd))
- **workflow:** ajout d'un workflow pour vérifier que le site est bien live et que le `robots.txt` est carré ([#5039](https://github.com/SocialGouv/code-du-travail-numerique/issues/5039) ([bbc2e55](https://github.com/SocialGouv/code-du-travail-numerique/commit/bbc2e5567481c9050b25b1c9b5e218bd8d63171a))

## [4.93.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.93.0...v4.93.1) (2023-03-20)

### Bug Fixes

- https in sitemap.xml ([ddd666f](https://github.com/SocialGouv/code-du-travail-numerique/commit/ddd666f798ce469c78293408cd05b24ab4de7b99))

# [4.93.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.92.1...v4.93.0) (2023-03-20)

### Bug Fixes

- **environment-variable:** production variable for `robots.txt` ([#5037](https://github.com/SocialGouv/code-du-travail-numerique/issues/5037)) ([7a5798c](https://github.com/SocialGouv/code-du-travail-numerique/commit/7a5798c204b3caa229b750e9ce4c8e846721bef2))
- **indemnite-licencement:** event pour l'inégibilité ([#4992](https://github.com/SocialGouv/code-du-travail-numerique/issues/4992)) ([293907e](https://github.com/SocialGouv/code-du-travail-numerique/commit/293907ea87eac5afd20ea955775d14cdb3bbfca8))
- **workflow:** action dev variable ([1e1aed1](https://github.com/SocialGouv/code-du-travail-numerique/commit/1e1aed1e1a5a2900cebb5996f0bb86e7336b2020))

### Features

- **e2e:** migrations des derniers tests codecepts vers cypress ([#5002](https://github.com/SocialGouv/code-du-travail-numerique/issues/5002)) ([8cec5cd](https://github.com/SocialGouv/code-du-travail-numerique/commit/8cec5cdb147cc5f042e022ce39aad201afeba47a))
- **indemnite-licenciement:** ajout de la cc 1147 ([#5008](https://github.com/SocialGouv/code-du-travail-numerique/issues/5008)) ([b395c29](https://github.com/SocialGouv/code-du-travail-numerique/commit/b395c2927970b82b4dde942b42a2ddc6e21382a9))

## [4.92.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.92.0...v4.92.1) (2023-03-14)

### Bug Fixes

- **dependencies:** upgrade zustand and fix deprecated part ([#5003](https://github.com/SocialGouv/code-du-travail-numerique/issues/5003)) ([9fcbb7d](https://github.com/SocialGouv/code-du-travail-numerique/commit/9fcbb7d10d334ff08d2190e2b8c7784695493b5d))
- **kubernetes:** sealed secret on production ([#5021](https://github.com/SocialGouv/code-du-travail-numerique/issues/5021) ([b29d75a](https://github.com/SocialGouv/code-du-travail-numerique/commit/b29d75a575856ca60d3001f58d0859596f66d63d))

# [4.92.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.91.1...v4.92.0) (2023-03-14)

### Bug Fixes

- affichage radio outils & widgets ([#5000](https://github.com/SocialGouv/code-du-travail-numerique/issues/5000)) ([4a2ceef](https://github.com/SocialGouv/code-du-travail-numerique/commit/4a2ceef1e029618ecc4e8fa60efb71a24ca0a146))
- **build:** error in getStaticProps ([fb7d7ef](https://github.com/SocialGouv/code-du-travail-numerique/commit/fb7d7efb092b65cc6363b81066e958dc3e4e3ce2))
- **cc search:** use the react-autosuggest component for cc search result to have full accessibility ([#4990](https://github.com/SocialGouv/code-du-travail-numerique/issues/4990)) ([d43a2ba](https://github.com/SocialGouv/code-du-travail-numerique/commit/d43a2baa698bff8a603efb1316edb6efd621ae6d))
- **convention-collective:** CC 2941 changement nom des categories ([#4999](https://github.com/SocialGouv/code-du-travail-numerique/issues/4999)) ([02e4c5b](https://github.com/SocialGouv/code-du-travail-numerique/commit/02e4c5b2b068e539e9511c53d8ad0c4eb378ce09))
- cypress test e2e ([43179a5](https://github.com/SocialGouv/code-du-travail-numerique/commit/43179a5d074f3f45b81d1ed220304145260f362d))
- dev workflow ([c5a59bf](https://github.com/SocialGouv/code-du-travail-numerique/commit/c5a59bf0ab1ae677033b27eaf2c8bdda78e46c94))
- dev workflow ([3279a42](https://github.com/SocialGouv/code-du-travail-numerique/commit/3279a42f20cea7027b33cb08f54e1772c9ae52ac))
- **husky:** delete prepush hook ([#4971](https://github.com/SocialGouv/code-du-travail-numerique/issues/4971)) ([5843984](https://github.com/SocialGouv/code-du-travail-numerique/commit/584398418084e9cdcda59e4e60477436d0f19724))
- **indemnité de licenciement:** fix mobile style ([#4972](https://github.com/SocialGouv/code-du-travail-numerique/issues/4972)) ([7c18480](https://github.com/SocialGouv/code-du-travail-numerique/commit/7c18480cebefaa2e874e8491d1fcbdc3a1c66196))
- **indemnité de licenciement:** remove unused code ([#4968](https://github.com/SocialGouv/code-du-travail-numerique/issues/4968)) ([3a096fe](https://github.com/SocialGouv/code-du-travail-numerique/commit/3a096fe0aba181cceb66cd5cc3873e54660f7542))
- **indemnité de licenciement:** retours à la ligne dans l'affichage du résultat ([#5015](https://github.com/SocialGouv/code-du-travail-numerique/issues/5015)) ([95a7947](https://github.com/SocialGouv/code-du-travail-numerique/commit/95a794792e00617f482e142adb331b64e8f97c52))
- **indemnite-licenciement:** correctif des retours de la selection des CCs non traitées ([#4983](https://github.com/SocialGouv/code-du-travail-numerique/issues/4983)) ([d9e9c18](https://github.com/SocialGouv/code-du-travail-numerique/commit/d9e9c186541ad8176d4b0aa6d2542d749ab0a080))
- **indemnite-licenciement:** fallback when month label is missing ([#4946](https://github.com/SocialGouv/code-du-travail-numerique/issues/4946)) ([56b2734](https://github.com/SocialGouv/code-du-travail-numerique/commit/56b2734fb06d304956221b4bff90d16d0633a829))
- **indemnite-licenciement:** retours de la CC 3239 ([#4984](https://github.com/SocialGouv/code-du-travail-numerique/issues/4984)) ([8b65895](https://github.com/SocialGouv/code-du-travail-numerique/commit/8b65895916df4733c179e009f8b3fb4e2bcbe73e))
- **package:** move from `@maxgfr/react-accessible-accordion` to `@socialgouv/react-accessible-accordion` ([#4963](https://github.com/SocialGouv/code-du-travail-numerique/issues/4963)) ([c3d33d2](https://github.com/SocialGouv/code-du-travail-numerique/commit/c3d33d2a3208bd337c53c03b832d22112358a9dc))
- **search:** affiche la suggestion de recherche en absolute ([#4996](https://github.com/SocialGouv/code-du-travail-numerique/issues/4996)) ([84959a8](https://github.com/SocialGouv/code-du-travail-numerique/commit/84959a8f07aabc00553cf2017aba6d940f6b20e7))
- **Tile:** make html valid by moving the anchor inside ([#4940](https://github.com/SocialGouv/code-du-travail-numerique/issues/4940)) ([b633454](https://github.com/SocialGouv/code-du-travail-numerique/commit/b63345447e24eaaa50f274988a732be18e1e321c))
- **trouver sa convention collective:** make combobox accessible ([#4939](https://github.com/SocialGouv/code-du-travail-numerique/issues/4939)) ([f4e5373](https://github.com/SocialGouv/code-du-travail-numerique/commit/f4e53732042b78a72c901cdc2ddd79a2c3ab7579))
- widget recherche hauteur ([#4978](https://github.com/SocialGouv/code-du-travail-numerique/issues/4978)) ([1adc49b](https://github.com/SocialGouv/code-du-travail-numerique/commit/1adc49ba8ba06ee42a3d86e6f9139ba1cd4a0e7f))
- **workflow:** change node version ([#4962](https://github.com/SocialGouv/code-du-travail-numerique/issues/4962)) ([f1bec54](https://github.com/SocialGouv/code-du-travail-numerique/commit/f1bec5460b65801291b04830bbf81de743380dad))
- **workflow:** dev is not deploying ([#4974](https://github.com/SocialGouv/code-du-travail-numerique/issues/4974)) ([c0fddef](https://github.com/SocialGouv/code-du-travail-numerique/commit/c0fddef08b33738033f720d97b1d57e3fd170211))
- **workflow:** otpimize `review.yml` ([#4973](https://github.com/SocialGouv/code-du-travail-numerique/issues/4973))Co-authored-by: Martial Maillot <martial.maillot@gmail.com> ([b2012e2](https://github.com/SocialGouv/code-du-travail-numerique/commit/b2012e213e7606944f9e0fe6641578efa5279d07))
- **workflow:** security is trigger only when dev is done ([4f0e78a](https://github.com/SocialGouv/code-du-travail-numerique/commit/4f0e78a8c96b22309f2c519beb1d6891e91f4d15))
- **workflow:** set naming ([97537a4](https://github.com/SocialGouv/code-du-travail-numerique/commit/97537a424ed7a9382fbb72ac26ec2ad933cead96))
- **workflow:** set output ([b576967](https://github.com/SocialGouv/code-du-travail-numerique/commit/b5769671b6989d8eb063e638cab67f17f5aace1e))
- **workflow:** set url for codecept ([af4f250](https://github.com/SocialGouv/code-du-travail-numerique/commit/af4f250eaa0cf90b5093a0d09340aea901de7ef4))
- **workflow:** setup node version for storybook ([d65b926](https://github.com/SocialGouv/code-du-travail-numerique/commit/d65b926f839a3d8ccd92c704a3385c756efff5f3))

### Features

- feature flag pour les nouvelles CC ([#4979](https://github.com/SocialGouv/code-du-travail-numerique/issues/4979)) ([9810a9d](https://github.com/SocialGouv/code-du-travail-numerique/commit/9810a9d38e401fa82de9ab95c3e09d26d6246dfd))
- form accessibility ([#4951](https://github.com/SocialGouv/code-du-travail-numerique/issues/4951)) ([d8f5b90](https://github.com/SocialGouv/code-du-travail-numerique/commit/d8f5b907e364daeb858236e15e71b05a15b187c5))
- **home:** ajout de nouvelles rebriques ([#4961](https://github.com/SocialGouv/code-du-travail-numerique/issues/4961) ([5ea49e2](https://github.com/SocialGouv/code-du-travail-numerique/commit/5ea49e2f74f7752512ef6b4558f0e695e1b7b5ac))
- **indemnité de licenciement:** ajout de la cc 1996 ([#4966](https://github.com/SocialGouv/code-du-travail-numerique/issues/4966))Co-authored-by: Martial Maillot <martial.maillot@gmail.com> ([9aad948](https://github.com/SocialGouv/code-du-travail-numerique/commit/9aad948ae0eb9c7947cbe64d4bd16b078b07410e))
- **security headers:** add missing security headers ([#4969](https://github.com/SocialGouv/code-du-travail-numerique/issues/4969)) ([a331615](https://github.com/SocialGouv/code-du-travail-numerique/commit/a33161579c102f7e6ca6dbdc6e274afe24a9d22c))

## [4.91.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.91.0...v4.91.1) (2023-02-17)

### Bug Fixes

- **actions:** production workflow is fixed ([7240383](https://github.com/SocialGouv/code-du-travail-numerique/commit/724038337227710c228b8749c470b4a8eb8ab552))

# [4.91.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.90.1...v4.91.0) (2023-02-17)

### Bug Fixes

- **dependencies:** update lockfile ([#4950](https://github.com/SocialGouv/code-du-travail-numerique/issues/4950)) ([0aeda16](https://github.com/SocialGouv/code-du-travail-numerique/commit/0aeda16a6e6c421004a27608bd8c20b551b9179b))
- **dep:** retours next 13 ([#4944](https://github.com/SocialGouv/code-du-travail-numerique/issues/4944)) ([b53caa8](https://github.com/SocialGouv/code-du-travail-numerique/commit/b53caa83270f7d18d6d47c461f57bf7a64fae26c))
- **indemnite-licenciement:** matomo event is now binded to `currentStepIndex` instead of trigger `nextStep` or `previousStep` ([#4956](https://github.com/SocialGouv/code-du-travail-numerique/issues/4956)) ([7c259db](https://github.com/SocialGouv/code-du-travail-numerique/commit/7c259db44e780f15026dfca0cdb65e8066690019))
- **lit:** remove deprecated dependency lit-element ([#4933](https://github.com/SocialGouv/code-du-travail-numerique/issues/4933)) ([5c1482a](https://github.com/SocialGouv/code-du-travail-numerique/commit/5c1482a0866ef121886ce2646f75f0f1c38d98af))
- **react-ui:** amélioration du bundling en rust ([#4953](https://github.com/SocialGouv/code-du-travail-numerique/issues/4953)) ([6e2ae57](https://github.com/SocialGouv/code-du-travail-numerique/commit/6e2ae57acdd40df288c4d8d8e05c7c162007d77d))

### Features

- **dependencies:** upgrade next to 13 + react to 18 ([#4894](https://github.com/SocialGouv/code-du-travail-numerique/issues/4894)) ([380ea32](https://github.com/SocialGouv/code-du-travail-numerique/commit/380ea324c829aaa6214ecc65b8605a62032e8d80))

## [4.90.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.90.0...v4.90.1) (2023-02-06)

### Bug Fixes

- affichage du résumé de questionnaire sur page info ([#4932](https://github.com/SocialGouv/code-du-travail-numerique/issues/4932)) ([4fa6f9c](https://github.com/SocialGouv/code-du-travail-numerique/commit/4fa6f9cefd43eadaa5bbe7cbd4632f22a3c4dfe1))
- **contribution:** utilisation de la nouvelle API entreprise ([#4931](https://github.com/SocialGouv/code-du-travail-numerique/issues/4931)) ([9bb15c5](https://github.com/SocialGouv/code-du-travail-numerique/commit/9bb15c5d01cc84df1fb1ff0c72adbee1d225aebd))

# [4.90.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.89.0...v4.90.0) (2023-02-01)

### Bug Fixes

- **indemnité de licenciement:** when user select arret de travail with invalid date and then de-select ([#4921](https://github.com/SocialGouv/code-du-travail-numerique/issues/4921)) ([937d05c](https://github.com/SocialGouv/code-du-travail-numerique/commit/937d05c727dd22c990681023ef4e338d23e94339))
- **indemnite-licenciement:** message pour une CC non traité ([#4922](https://github.com/SocialGouv/code-du-travail-numerique/issues/4922)) ([3c28ec9](https://github.com/SocialGouv/code-du-travail-numerique/commit/3c28ec9c57b9d4f58e98faa4cdf1390cfd48d800))
- **indemnite-licenciement:** remise à zéro des données propres à la CC 3239 ([#4926](https://github.com/SocialGouv/code-du-travail-numerique/issues/4926)) ([6948136](https://github.com/SocialGouv/code-du-travail-numerique/commit/6948136fcfc4e0361d9083532e0da8a25e49ea09))
- **preavis-retraite:** ne supporte pas les espaces insécables ([#4929](https://github.com/SocialGouv/code-du-travail-numerique/issues/4929)) ([251c309](https://github.com/SocialGouv/code-du-travail-numerique/commit/251c309ad6407c0f266ffd3fed83383466bab671))
- seach enteprise with employer only ([#4908](https://github.com/SocialGouv/code-du-travail-numerique/issues/4908)) ([a3504ea](https://github.com/SocialGouv/code-du-travail-numerique/commit/a3504eac42fb66ae9a0c1a9a8017bca7fb86a066))

### Features

- ajout d'une redirection ([#4917](https://github.com/SocialGouv/code-du-travail-numerique/issues/4917)) ([7cab3f8](https://github.com/SocialGouv/code-du-travail-numerique/commit/7cab3f8e5dd5f5a9fe7afc71cd54229328ad3ef9))
- **header:** add new header menu ([#4895](https://github.com/SocialGouv/code-du-travail-numerique/issues/4895)) ([e752709](https://github.com/SocialGouv/code-du-travail-numerique/commit/e75270908acf648e2262b1f404f45541b0db2534))
- **licenciement:** support CC pour le simulateur ([#4469](https://github.com/SocialGouv/code-du-travail-numerique/issues/4469)) ([bb42c53](https://github.com/SocialGouv/code-du-travail-numerique/commit/bb42c53403000d679227905b7dd1664aa0e38bb6))

# [4.89.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.88.1...v4.89.0) (2023-01-18)

### Bug Fixes

- **404:** make all landing pages return status code 404 if page does not exist ([#4872](https://github.com/SocialGouv/code-du-travail-numerique/issues/4872)) ([187748b](https://github.com/SocialGouv/code-du-travail-numerique/commit/187748b12944c11463a1e2c4edd38e4e8d1de50f))
- **accessibility issues:** make html valid ([#4853](https://github.com/SocialGouv/code-du-travail-numerique/issues/4853)) ([3472475](https://github.com/SocialGouv/code-du-travail-numerique/commit/3472475419de549a56406337f66ceb54209e57b6))
- **deps:** update dependency @koa/cors to v4 ([#4725](https://github.com/SocialGouv/code-du-travail-numerique/issues/4725)) ([b408b86](https://github.com/SocialGouv/code-du-travail-numerique/commit/b408b8684de7b79e720cc3cd2bef7eb4324f7e8b))
- **metrics:** remove at internet 🎉 ([#4849](https://github.com/SocialGouv/code-du-travail-numerique/issues/4849)) ([3a9547f](https://github.com/SocialGouv/code-du-travail-numerique/commit/3a9547fd73515ace3a1d5b4c55e7bdd181fef1bc))
- **perf:** remove getInitialProps from \_app.tsx ([#4886](https://github.com/SocialGouv/code-du-travail-numerique/issues/4886)) ([0825ab2](https://github.com/SocialGouv/code-du-travail-numerique/commit/0825ab21bee656f65ec9420c894780161db60eb0))
- **procedure-licenciement:** event qui ne dispose pas de `view_step_` ([#4827](https://github.com/SocialGouv/code-du-travail-numerique/issues/4827)) ([9e87ea9](https://github.com/SocialGouv/code-du-travail-numerique/commit/9e87ea93a128f2b2f16a96c8be8a93b3f9bf143c))
- **procedure-licenciement:** rollback sur le nom du questionnaire aux niveaux des events ([#4829](https://github.com/SocialGouv/code-du-travail-numerique/issues/4829)) ([5cbf0f8](https://github.com/SocialGouv/code-du-travail-numerique/commit/5cbf0f8199b05c2975b59b98876a6be4a13dc351))
- renommé l'event matomo pour recherche emploi ([#4868](https://github.com/SocialGouv/code-du-travail-numerique/issues/4868)) ([5207d7e](https://github.com/SocialGouv/code-du-travail-numerique/commit/5207d7e15555bd11ea69dc46415391dd10a8f457))
- **renovate:** configuration ([#4861](https://github.com/SocialGouv/code-du-travail-numerique/issues/4861)) ([d49a82b](https://github.com/SocialGouv/code-du-travail-numerique/commit/d49a82be00eb202e72cd5973cc830458be8d0d8c))
- **seo issues:** search header link should be nofollow so it is not crawled by search engine & tools should return 404 if does not exist ([#4846](https://github.com/SocialGouv/code-du-travail-numerique/issues/4846)) ([454c5fe](https://github.com/SocialGouv/code-du-travail-numerique/commit/454c5fe6b048cae6b04d87461423b8dd6f35126a))
- **simulateurs:** changement au niveau des dates de préavis ([#4838](https://github.com/SocialGouv/code-du-travail-numerique/issues/4838)) ([fbd398d](https://github.com/SocialGouv/code-du-travail-numerique/commit/fbd398decdc355cea89ad940fca728528e84a50c))

### Features

- remove piwik + track service public link ([#4884](https://github.com/SocialGouv/code-du-travail-numerique/issues/4884)) ([93ff8f1](https://github.com/SocialGouv/code-du-travail-numerique/commit/93ff8f18ec15d70cdcb9770df3094d3889b37ebd))

## [4.88.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.88.0...v4.88.1) (2022-12-23)

### Bug Fixes

- références manquante dans les sections page info ([#4822](https://github.com/SocialGouv/code-du-travail-numerique/issues/4822)) ([04d9d29](https://github.com/SocialGouv/code-du-travail-numerique/commit/04d9d29b368745f09b89478343d897b9913817ed))

# [4.88.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.87.0...v4.88.0) (2022-12-20)

### Bug Fixes

- **api:** send referer when calling recherche-entreprises ([#4667](https://github.com/SocialGouv/code-du-travail-numerique/issues/4667)) ([ca8e1d3](https://github.com/SocialGouv/code-du-travail-numerique/commit/ca8e1d3e56c7cf3c4f3e0897748635c297696800))
- build:npm command ([46c7e13](https://github.com/SocialGouv/code-du-travail-numerique/commit/46c7e13b610c3de4504302e833ad0cb83c53ddc6))
- correction orthographe ([#4666](https://github.com/SocialGouv/code-du-travail-numerique/issues/4666)) ([13354ae](https://github.com/SocialGouv/code-du-travail-numerique/commit/13354ae4f09896850c27894c29deaf4071bc4604))
- **deps:** update dependency @sentry/nextjs to v7 ([#4726](https://github.com/SocialGouv/code-du-travail-numerique/issues/4726)) ([eb513b6](https://github.com/SocialGouv/code-du-travail-numerique/commit/eb513b68d5d5ab49abc8166acf3b0d703485e681))
- **deps:** update dependency @socialgouv/cdtn-logger to v2 ([#4727](https://github.com/SocialGouv/code-du-travail-numerique/issues/4727)) ([8228719](https://github.com/SocialGouv/code-du-travail-numerique/commit/8228719107b9f4a21209152fac9be939d5487ed9))
- **deps:** update dependency husky to v8 ([#4728](https://github.com/SocialGouv/code-du-travail-numerique/issues/4728)) ([be210eb](https://github.com/SocialGouv/code-du-travail-numerique/commit/be210eb23d355f46751b75316d31f0e8ae5a01d9))
- **deps:** update dependency next-transpile-modules to v10 ([#4731](https://github.com/SocialGouv/code-du-travail-numerique/issues/4731)) ([c52dda0](https://github.com/SocialGouv/code-du-travail-numerique/commit/c52dda061a405c49326d92a9fd9a0df82c5aec0d))
- **deps:** update dependency uuid to v9 ([#4734](https://github.com/SocialGouv/code-du-travail-numerique/issues/4734)) ([dc29912](https://github.com/SocialGouv/code-du-travail-numerique/commit/dc29912f6c64ce8df483b7b8f105c9c82b7a6caa))
- **deps:** update dependency yaml to v2 ([#4735](https://github.com/SocialGouv/code-du-travail-numerique/issues/4735)) ([e3b4263](https://github.com/SocialGouv/code-du-travail-numerique/commit/e3b42633966187bcea331cefe7042266a48da342))
- **deps:** upgrade stylelint ([#4765](https://github.com/SocialGouv/code-du-travail-numerique/issues/4765)) ([796fede](https://github.com/SocialGouv/code-du-travail-numerique/commit/796fede1fdc8e71cfc361f198cfa01f3038c3a94))
- **fiche-mt:** passer la logique de process html côté `fiche-travail-data` ([#4756](https://github.com/SocialGouv/code-du-travail-numerique/issues/4756)) ([7bf756e](https://github.com/SocialGouv/code-du-travail-numerique/commit/7bf756eb91b2945d993b9d598a0b5dfbf262aa6d))
- glossary display page info ([#4751](https://github.com/SocialGouv/code-du-travail-numerique/issues/4751)) ([896da42](https://github.com/SocialGouv/code-du-travail-numerique/commit/896da4245c748ad3ae5aea057aa66ac8589380d6))
- info page tabs h2 ([#4802](https://github.com/SocialGouv/code-du-travail-numerique/issues/4802)) ([98bd6c7](https://github.com/SocialGouv/code-du-travail-numerique/commit/98bd6c75253ecd4d827aeac6c9e12f99cb264ef1))
- **lint:** remove warnings from lint staged ([#4780](https://github.com/SocialGouv/code-du-travail-numerique/issues/4780)) ([9c3a98d](https://github.com/SocialGouv/code-du-travail-numerique/commit/9c3a98da031af79448ccc9630ae5a16959a9726a))
- minor dep ([a34eb16](https://github.com/SocialGouv/code-du-travail-numerique/commit/a34eb164a31d24c4bca38576b151001d42cf3a40))
- **package:** migration de `react-fiche-service-public` ([#4759](https://github.com/SocialGouv/code-du-travail-numerique/issues/4759)) ([b76eba5](https://github.com/SocialGouv/code-du-travail-numerique/commit/b76eba54ab62c81d6f0c8df57fcfbb9e75f96d75))
- **sea:** remove tarteaucitron / cookie ([#4813](https://github.com/SocialGouv/code-du-travail-numerique/issues/4813)) ([aab4017](https://github.com/SocialGouv/code-du-travail-numerique/commit/aab40177fb26b8d299eaed015643622f14ff802d))
- **security:** use `node-fetch` in cjs builder ([#4746](https://github.com/SocialGouv/code-du-travail-numerique/issues/4746)) ([c7c2742](https://github.com/SocialGouv/code-du-travail-numerique/commit/c7c27420d4e737988a861d8e827b29b8ca944777))
- **seo:** remove duplicated titles ([#4776](https://github.com/SocialGouv/code-du-travail-numerique/issues/4776)) ([dd114b7](https://github.com/SocialGouv/code-du-travail-numerique/commit/dd114b74ba638a81a23794d7f9ce052a81dcd6b3))
- **workflow:** set test on all pr ([#4740](https://github.com/SocialGouv/code-du-travail-numerique/issues/4740)) ([990bc9d](https://github.com/SocialGouv/code-du-travail-numerique/commit/990bc9d5710223e077a434a27e1880fa65ec1321))

### Features

- add review branch to dev ([#4768](https://github.com/SocialGouv/code-du-travail-numerique/issues/4768)) ([5a6f8da](https://github.com/SocialGouv/code-du-travail-numerique/commit/5a6f8da71207a46d886c53da0b6011908d80ca92))
- **modeles:** suppression du package data + fetching simulator information from api ([#4741](https://github.com/SocialGouv/code-du-travail-numerique/issues/4741)) ([f52190e](https://github.com/SocialGouv/code-du-travail-numerique/commit/f52190eddb893f1e083e10efdedb2392dc5c3702))
- update wording for questionnaire ([#4758](https://github.com/SocialGouv/code-du-travail-numerique/issues/4758)) ([cd98993](https://github.com/SocialGouv/code-du-travail-numerique/commit/cd98993eb638e8e4ce51c8ae911ab8073fe56c44))

# [4.87.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.22...v4.87.0) (2022-11-18)

### Features

- **versionning:** add version in `/api/health` ([#4687](https://github.com/SocialGouv/code-du-travail-numerique/issues/4687)) ([26abd72](https://github.com/SocialGouv/code-du-travail-numerique/commit/26abd72a1fef22087157bf68affae9581c70ebea))

## [4.86.22](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.21...v4.86.22) (2022-11-18)

### Features

- **lerna:** go back to lerna ([ade1ff5](https://github.com/SocialGouv/code-du-travail-numerique/commit/ade1ff5a566330fa007596af8d6961d7d8d86900))

## [4.86.21](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.20...v4.86.21) (2022-11-18)

### Bug Fixes

- **npm:** with old token ([fcd42f2](https://github.com/SocialGouv/code-du-travail-numerique/commit/fcd42f2928083b13d6e9a5617d195fb2c26837b9))

## [4.86.20](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.19...v4.86.20) (2022-11-18)

### Bug Fixes

- **npm:** token ci ([4b0ebb5](https://github.com/SocialGouv/code-du-travail-numerique/commit/4b0ebb5e7277aa0bfe448aa8689cb1cbf3326009))

## [4.86.19](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.18...v4.86.19) (2022-11-18)

### Bug Fixes

- **npm:** authentification and registration set ([22cd7b6](https://github.com/SocialGouv/code-du-travail-numerique/commit/22cd7b60e04a6450dca1d46bfae7738aa04d66f0))

## [4.86.18](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.17...v4.86.18) (2022-11-18)

### Bug Fixes

- auth ([77f45bf](https://github.com/SocialGouv/code-du-travail-numerique/commit/77f45bfde80e39d38942e6f31f0360a90c7c50ec))

## [4.86.17](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.16...v4.86.17) (2022-11-18)

### Bug Fixes

- **workflow:** set token ([77e89dd](https://github.com/SocialGouv/code-du-travail-numerique/commit/77e89dde271f818ad67923eff29965027490a1c2))

## [4.86.16](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.15...v4.86.16) (2022-11-18)

### Bug Fixes

- **workflow:** remove npm whoami ([bf5755b](https://github.com/SocialGouv/code-du-travail-numerique/commit/bf5755bacf03e732d5a8d8c79e3acf2176746fac))

## [4.86.15](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.14...v4.86.15) (2022-11-18)

### Bug Fixes

- **workflow:** publish to npm without lerna ([#4686](https://github.com/SocialGouv/code-du-travail-numerique/issues/4686)) ([a572294](https://github.com/SocialGouv/code-du-travail-numerique/commit/a5722940d4310a42e436b5e72d4ca1442ac0571e))

## [4.86.14](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.13...v4.86.14) (2022-11-18)

### Bug Fixes

- **workflow:** remove unsued code ([#4685](https://github.com/SocialGouv/code-du-travail-numerique/issues/4685)) ([d246d72](https://github.com/SocialGouv/code-du-travail-numerique/commit/d246d72acb7be3f692675b40ad04d2aac608cbcd))

## [4.86.13](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.12...v4.86.13) (2022-11-18)

### Bug Fixes

- token ([fcbd250](https://github.com/SocialGouv/code-du-travail-numerique/commit/fcbd250efe99ebfea53a22f4734f14792129313d))

## [4.86.12](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.11...v4.86.12) (2022-11-18)

### Bug Fixes

- **workflow:** set registry to yarn ([d9f330b](https://github.com/SocialGouv/code-du-travail-numerique/commit/d9f330bbd14597bf5214eff198461c0b666a92b2))

## [4.86.11](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.10...v4.86.11) (2022-11-18)

### Bug Fixes

- **lerna:** add scope ([9d49823](https://github.com/SocialGouv/code-du-travail-numerique/commit/9d498232bdbe3b210d6800a5da95eb72f1c1ce3d))
- **package.json:** useless info ([d7f1b1c](https://github.com/SocialGouv/code-du-travail-numerique/commit/d7f1b1c3537301734ff1efcd5bdf81946bc3d668))

## [4.86.10](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.9...v4.86.10) (2022-11-18)

### Bug Fixes

- **lerna:** no verify access ([da1f05d](https://github.com/SocialGouv/code-du-travail-numerique/commit/da1f05d98d1569bdc4cc57cead2bf1b8c6c3df15))

## [4.86.9](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.8...v4.86.9) (2022-11-18)

### Bug Fixes

- **lerna:** verify access ([c94e25f](https://github.com/SocialGouv/code-du-travail-numerique/commit/c94e25f23fa069ba1c12b709c5219d5fd0c9d80c))

## [4.86.8](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.7...v4.86.8) (2022-11-18)

### Bug Fixes

- **lerna:** command with npx ([5ae3428](https://github.com/SocialGouv/code-du-travail-numerique/commit/5ae34288f60d21638bbc52f02af26e1c2dcf426b))

## [4.86.7](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.6...v4.86.7) (2022-11-18)

### Bug Fixes

- **npm:** set registry to `.com` ([#4684](https://github.com/SocialGouv/code-du-travail-numerique/issues/4684)) ([d7c9fdd](https://github.com/SocialGouv/code-du-travail-numerique/commit/d7c9fdd8b989c0e973fb74ad00f8c109c87ca4f3))

## [4.86.6](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.5...v4.86.6) (2022-11-18)

### Bug Fixes

- workflow ([ab92aec](https://github.com/SocialGouv/code-du-travail-numerique/commit/ab92aec801124ba82873c8530fa9d667ec585679))

### Features

- **workflow:** publish ([#4683](https://github.com/SocialGouv/code-du-travail-numerique/issues/4683)) ([257b6a2](https://github.com/SocialGouv/code-du-travail-numerique/commit/257b6a200cc7df29d51b47487bb9edd9680ac32f))

## [4.86.5](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.4...v4.86.5) (2022-11-18)

### Bug Fixes

- **lerna:** downgrade to v5 ([#4682](https://github.com/SocialGouv/code-du-travail-numerique/issues/4682)) ([76f0644](https://github.com/SocialGouv/code-du-travail-numerique/commit/76f0644879f699f7610e384d27294d961a5d8bbf))

## [4.86.4](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.3...v4.86.4) (2022-11-18)

### Bug Fixes

- **lerna:** add rebase from master to dev for versionning if action of publish failed ([#4681](https://github.com/SocialGouv/code-du-travail-numerique/issues/4681)) ([24082a6](https://github.com/SocialGouv/code-du-travail-numerique/commit/24082a62d082bceacda09a1298190cb1d05735da))

## [4.86.3](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.2...v4.86.3) (2022-11-17)

### Bug Fixes

- **ci:** upgrade lerna to v6 ([#4679](https://github.com/SocialGouv/code-du-travail-numerique/issues/4679)) ([bcdff49](https://github.com/SocialGouv/code-du-travail-numerique/commit/bcdff491f5974911e9676e2e9bb48fe7d1d1ade5))
- **lerna:** `--no-verify-access` is set by default ([#4680](https://github.com/SocialGouv/code-du-travail-numerique/issues/4680)) ([e4027cf](https://github.com/SocialGouv/code-du-travail-numerique/commit/e4027cf88ca42e20a8eef6e5c2deec382424c9e8))
- **lerna:** token no verify access ([#4678](https://github.com/SocialGouv/code-du-travail-numerique/issues/4678)) ([5610baf](https://github.com/SocialGouv/code-du-travail-numerique/commit/5610baf26ea4730e0226bf0a3d4d665e6465f6ef))

## [4.86.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.1...v4.86.2) (2022-11-17)

### Bug Fixes

- **lerna:** npm token ([#4677](https://github.com/SocialGouv/code-du-travail-numerique/issues/4677)) ([70041c2](https://github.com/SocialGouv/code-du-travail-numerique/commit/70041c26a8d365a8855de7348f909fad064a05bf))

## [4.86.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.86.0...v4.86.1) (2022-11-17)

### Bug Fixes

- **npm:** local token instead of orga token ([#4676](https://github.com/SocialGouv/code-du-travail-numerique/issues/4676)) ([e1842d3](https://github.com/SocialGouv/code-du-travail-numerique/commit/e1842d38e5abe0df2f76e7a5ccc22c9f902e5c7b))

# [4.86.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.85.0...v4.86.0) (2022-11-17)

### Bug Fixes

- **fiche service public:** ajout du titre pour les encarts "ou s'adresser" ([#4657](https://github.com/SocialGouv/code-du-travail-numerique/issues/4657)) ([885f0bb](https://github.com/SocialGouv/code-du-travail-numerique/commit/885f0bb9b8d4242276bf4cebc65daed2e892f6ae))
- **preavis-retraite:** Forcer publicodes à calculer la prochaine question au changement d'origine ([#4669](https://github.com/SocialGouv/code-du-travail-numerique/issues/4669)) ([ded5f39](https://github.com/SocialGouv/code-du-travail-numerique/commit/ded5f397171635e85b13344a8a64a32db331085b))
- **simulator:** heure recherche emploi qui réinitialise le `criteria` ([#4674](https://github.com/SocialGouv/code-du-travail-numerique/issues/4674)) ([d4a83c7](https://github.com/SocialGouv/code-du-travail-numerique/commit/d4a83c7f00160192176ab3d557a5a1a0b1940c11))
- **simulator:** messages d'erreurs qui s'affichent dorénavant à l'étape information ([#4671](https://github.com/SocialGouv/code-du-travail-numerique/issues/4671)) ([c30fd59](https://github.com/SocialGouv/code-du-travail-numerique/commit/c30fd59f0c711d56b59ca70b415e454ff7464bb6))

### Features

- **outils:** ajout de l'outils comprendre sa procédure de licenciement ([#4524](https://github.com/SocialGouv/code-du-travail-numerique/issues/4524)) ([e9fffe6](https://github.com/SocialGouv/code-du-travail-numerique/commit/e9fffe6444b41ac41439b3ad7da7b72fd6dcf1ec)), closes [#4525](https://github.com/SocialGouv/code-du-travail-numerique/issues/4525) [#4531](https://github.com/SocialGouv/code-du-travail-numerique/issues/4531) [#4542](https://github.com/SocialGouv/code-du-travail-numerique/issues/4542) [#4552](https://github.com/SocialGouv/code-du-travail-numerique/issues/4552) [#4559](https://github.com/SocialGouv/code-du-travail-numerique/issues/4559) [#4567](https://github.com/SocialGouv/code-du-travail-numerique/issues/4567) [#4621](https://github.com/SocialGouv/code-du-travail-numerique/issues/4621) [#4647](https://github.com/SocialGouv/code-du-travail-numerique/issues/4647)

# [4.85.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.84.1...v4.85.0) (2022-11-15)

### Bug Fixes

- **renovate:** go back to renovate ([#4660](https://github.com/SocialGouv/code-du-travail-numerique/issues/4660)) ([157f29d](https://github.com/SocialGouv/code-du-travail-numerique/commit/157f29dec6826ee8ebaafeadf76902fde2b0853b))

### Features

- **e2e:** migrate e2e test "Recherche de convention collective par entreprise" to cypress ([#4656](https://github.com/SocialGouv/code-du-travail-numerique/issues/4656)) ([338e9a2](https://github.com/SocialGouv/code-du-travail-numerique/commit/338e9a204d2948050c4c5cc09c0dbf8acb2c8880))
- **outils:** retirer les notifications pour la CC 3239 ([#4628](https://github.com/SocialGouv/code-du-travail-numerique/issues/4628)) ([3c154c9](https://github.com/SocialGouv/code-du-travail-numerique/commit/3c154c9e3343912ba63528fadb9ea97c58c2857f))

## [4.84.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.84.0...v4.84.1) (2022-11-14)

### Bug Fixes

- **k8s:** optimization of `requests` / `limits` in dev and production mode ([#4659](https://github.com/SocialGouv/code-du-travail-numerique/issues/4659)) ([c078145](https://github.com/SocialGouv/code-du-travail-numerique/commit/c078145e847a7fbed9f6b7ce408b8fd0d06a31b6))

# [4.84.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.83.0...v4.84.0) (2022-11-07)

### Bug Fixes

- **deps:** passage de renovate à dependabot ([#4627](https://github.com/SocialGouv/code-du-travail-numerique/issues/4627)) ([9b409a0](https://github.com/SocialGouv/code-du-travail-numerique/commit/9b409a01dc01f4a4b0771e2670113c5998e23b04))
- **k8s:** performance et réplicas ([#4648](https://github.com/SocialGouv/code-du-travail-numerique/issues/4648)) ([eda70bb](https://github.com/SocialGouv/code-du-travail-numerique/commit/eda70bb1b726c0c3c02d98a65b4df52d9e71ad1d))
- **preavis-retraite:** ref 3239 ([#4632](https://github.com/SocialGouv/code-du-travail-numerique/issues/4632)) ([10969bb](https://github.com/SocialGouv/code-du-travail-numerique/commit/10969bb618e811ebeadab61f305c0c11e6ec805d))

### Features

- **cc 1505:** changement de nom des catégories + mises à jour des références juridiques ([#4635](https://github.com/SocialGouv/code-du-travail-numerique/issues/4635)) ([5f1d1c5](https://github.com/SocialGouv/code-du-travail-numerique/commit/5f1d1c586f34b6ee2eaefd7ce37a24bb198dfd8a))
- **test:** supprimer les balises data-testid en production ([#4631](https://github.com/SocialGouv/code-du-travail-numerique/issues/4631)) ([e47246c](https://github.com/SocialGouv/code-du-travail-numerique/commit/e47246c6b7378f9a5fd56c631ee8fd6f1f732722))

# [4.83.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.82.0...v4.83.0) (2022-11-02)

### Bug Fixes

- **lint:** cypress in typescript ([#4624](https://github.com/SocialGouv/code-du-travail-numerique/issues/4624)) ([eabca85](https://github.com/SocialGouv/code-du-travail-numerique/commit/eabca853443608509216cd8d387f4f57e1856888))
- correction des tests e2e ([#4589](https://github.com/SocialGouv/code-du-travail-numerique/issues/4589)) ([e4e1e02](https://github.com/SocialGouv/code-du-travail-numerique/commit/e4e1e02b5115f41670a9ad6f45a5af73dc9a24fe))
- préavis de démission bouton suivant grisé ([#4615](https://github.com/SocialGouv/code-du-travail-numerique/issues/4615)) ([8dd8812](https://github.com/SocialGouv/code-du-travail-numerique/commit/8dd8812f12259c84059fff3eddc0d99752b79e89))
- **deps:** update all dependencies (patch) ([#4579](https://github.com/SocialGouv/code-du-travail-numerique/issues/4579)) ([395e51b](https://github.com/SocialGouv/code-du-travail-numerique/commit/395e51b38a7f9cebee8914a83a211bc28cf0971f))
- widget display ([#4601](https://github.com/SocialGouv/code-du-travail-numerique/issues/4601)) ([5b10902](https://github.com/SocialGouv/code-du-travail-numerique/commit/5b10902a8126b77863b7b29d311f9e39427d3d61))
- **ci:** deprecated `set-output` fixed ([#4599](https://github.com/SocialGouv/code-du-travail-numerique/issues/4599)) ([99bd1f4](https://github.com/SocialGouv/code-du-travail-numerique/commit/99bd1f47afb532b68707cc7540da0b3dc2aa95a6))
- **ci:** semantic pr name ([#4590](https://github.com/SocialGouv/code-du-travail-numerique/issues/4590)) ([78b93c5](https://github.com/SocialGouv/code-du-travail-numerique/commit/78b93c54824c4a0b7801bd1584ec172c24cd332d))
- **dateInput:** permet de taper slash quand on entre une date ([#4561](https://github.com/SocialGouv/code-du-travail-numerique/issues/4561)) ([d35aa88](https://github.com/SocialGouv/code-du-travail-numerique/commit/d35aa882edf65bec5ae30109e95fa7fab7282b5c))
- **heure recherche emploi:** CC 275 / Cadres / Licenciement-Démission => "50 heures par mois" ([#4597](https://github.com/SocialGouv/code-du-travail-numerique/issues/4597)) ([9d24e74](https://github.com/SocialGouv/code-du-travail-numerique/commit/9d24e74fd6c706a8968f6062f6a9ef796db4c153))
- **k8s:** fix resources limits ([#4603](https://github.com/SocialGouv/code-du-travail-numerique/issues/4603)) ([017217a](https://github.com/SocialGouv/code-du-travail-numerique/commit/017217ad4ca2b9d71b8f904e05e645657aba588a))
- **simulateur:** filtre des questions sur le type de rupture ([#4569](https://github.com/SocialGouv/code-du-travail-numerique/issues/4569)) ([f43f969](https://github.com/SocialGouv/code-du-travail-numerique/commit/f43f969edb4cead5e6a02d78b78719bf315763db))

### Features

- **cookies:** ajout du bandeau pour la campagne SEA ([#4611](https://github.com/SocialGouv/code-du-travail-numerique/issues/4611)) ([08b2a91](https://github.com/SocialGouv/code-du-travail-numerique/commit/08b2a91a827b7ed6fbe9f09abc7d1ec2f78b3040))
- **cypress:** add cypress to project ([#4598](https://github.com/SocialGouv/code-du-travail-numerique/issues/4598)) ([764d6b7](https://github.com/SocialGouv/code-du-travail-numerique/commit/764d6b7c6b45146ae30cc6c554c46d5186dafe16))

# [4.82.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.81.0...v4.82.0) (2022-09-27)

### Bug Fixes

- **heure-absence:** cc 16 resultat ([#4564](https://github.com/SocialGouv/code-du-travail-numerique/issues/4564)) ([4129eef](https://github.com/SocialGouv/code-du-travail-numerique/commit/4129eef5988a4a48715bef1fa77590e5adbe5c9a))
- mdoele redirections ([#4562](https://github.com/SocialGouv/code-du-travail-numerique/issues/4562)) ([283a19a](https://github.com/SocialGouv/code-du-travail-numerique/commit/283a19aabcea50b999c61c0d9d2a50dc38050ef2))
- **preavis-demission:** cc 16 ([#4533](https://github.com/SocialGouv/code-du-travail-numerique/issues/4533)) ([48c0048](https://github.com/SocialGouv/code-du-travail-numerique/commit/48c0048131287916f1c9638fa47abec1d3cd62ea))
- **snapshots:** use date-fns to format the date ([#4526](https://github.com/SocialGouv/code-du-travail-numerique/issues/4526)) ([ca1ec4d](https://github.com/SocialGouv/code-du-travail-numerique/commit/ca1ec4d62a5e9f2dd1835efcf911cb9c473088da))

### Features

- **modeles:** modification des titres et meta descriptions ([#4554](https://github.com/SocialGouv/code-du-travail-numerique/issues/4554)) ([13d09c2](https://github.com/SocialGouv/code-du-travail-numerique/commit/13d09c23a231f716bd7d2385742c7c66b63577a6))
- use meta_title ([#4551](https://github.com/SocialGouv/code-du-travail-numerique/issues/4551)) ([490a292](https://github.com/SocialGouv/code-du-travail-numerique/commit/490a2928ae251ed0cfb60447e30b65fa663db946))

# [4.81.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.80.0...v4.81.0) (2022-08-22)

### Features

- add content block display ([#4485](https://github.com/SocialGouv/code-du-travail-numerique/issues/4485)) ([d932219](https://github.com/SocialGouv/code-du-travail-numerique/commit/d93221900bc12d6346fc6ee4e1b41078346043e4)), closes [#4510](https://github.com/SocialGouv/code-du-travail-numerique/issues/4510)

# [4.80.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.79.2...v4.80.0) (2022-08-02)

### Bug Fixes

- **indemnite-licenciement:** event naming ([#4504](https://github.com/SocialGouv/code-du-travail-numerique/issues/4504)) ([40ef865](https://github.com/SocialGouv/code-du-travail-numerique/commit/40ef86559211d21b7f402da7c01f01690aeae6bb))
- event ([#4503](https://github.com/SocialGouv/code-du-travail-numerique/issues/4503)) ([024d148](https://github.com/SocialGouv/code-du-travail-numerique/commit/024d1484c961b2e6d1ce3566a54812a53d1e738a))
- **preavis-retraite:** cc 1517 départ ([#4501](https://github.com/SocialGouv/code-du-travail-numerique/issues/4501)) ([8d06ca9](https://github.com/SocialGouv/code-du-travail-numerique/commit/8d06ca982d7b1f309691a167b07ecf9459747853))

### Features

- **event:** add `user_blocked_info_cc` event ([#4492](https://github.com/SocialGouv/code-du-travail-numerique/issues/4492)) ([c0c081f](https://github.com/SocialGouv/code-du-travail-numerique/commit/c0c081f2e32b83b45f3811ffe49b22c2246930bd))

## [4.79.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.79.1...v4.79.2) (2022-07-01)

### Bug Fixes

- docker ([147bfd3](https://github.com/SocialGouv/code-du-travail-numerique/commit/147bfd3ba94820dfc6478ae2c8badba7b04966d8))
- node version ([876e174](https://github.com/SocialGouv/code-du-travail-numerique/commit/876e174dba787c63e3756e849a80afbdfa2d5b11))

## [4.79.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.79.0...v4.79.1) (2022-07-01)

**Note:** Version bump only for package @socialgouv/code-du-travail

# [4.79.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.78.1...v4.79.0) (2022-07-01)

### Bug Fixes

- **search:** add synonymes and a snapshot test to most popular result ([#4393](https://github.com/SocialGouv/code-du-travail-numerique/issues/4393)) ([4eec42f](https://github.com/SocialGouv/code-du-travail-numerique/commit/4eec42f2711269990fa0d7832b9124cb7e29ec19))
- **tools:** le résultat de la convention collective mal renseigné ([#4460](https://github.com/SocialGouv/code-du-travail-numerique/issues/4460)) ([39a0571](https://github.com/SocialGouv/code-du-travail-numerique/commit/39a0571746143634a1b5cd437978a2481bd088ea))
- **tools:** perte de la CC après un retour sur les simulateurs ([#4450](https://github.com/SocialGouv/code-du-travail-numerique/issues/4450)) ([4179459](https://github.com/SocialGouv/code-du-travail-numerique/commit/41794594b1b2a8417d6d972fecffe7bfaa2ce7cd))

### Features

- **partner:** mise à jour du logo du Ministère du Travail ([#4447](https://github.com/SocialGouv/code-du-travail-numerique/issues/4447)) ([9e700e8](https://github.com/SocialGouv/code-du-travail-numerique/commit/9e700e83f4433f5391d999b54ac466baef0c6c0a))
- **simulator:** indemnité de licenciement store ([#4431](https://github.com/SocialGouv/code-du-travail-numerique/issues/4431)) ([1ae50da](https://github.com/SocialGouv/code-du-travail-numerique/commit/1ae50dab352af2b5bbd2214d2f39556820d5138c))
- **tools:** assistant maternel ne peut pas être mis à la retraite ([#4438](https://github.com/SocialGouv/code-du-travail-numerique/issues/4438)) ([fcfc248](https://github.com/SocialGouv/code-du-travail-numerique/commit/fcfc248265b71331272c01d04ad857181f540c55))
- **tools:** modification des règles du préavis de démission pour la CC 3239 ([#4449](https://github.com/SocialGouv/code-du-travail-numerique/issues/4449)) ([6242448](https://github.com/SocialGouv/code-du-travail-numerique/commit/62424484a4cc06811c5f713e892d8a7156c7df42))
- **tools:** modification des règles du préavis de retraite pour la CC 3239 ([#4448](https://github.com/SocialGouv/code-du-travail-numerique/issues/4448)) ([ef6d912](https://github.com/SocialGouv/code-du-travail-numerique/commit/ef6d9123951ebf4354509dd8438b039426685072))
- **tools:** modification des résultats de l'indemnité de licenciement pour la CC 3239 ([#4446](https://github.com/SocialGouv/code-du-travail-numerique/issues/4446)) ([685d578](https://github.com/SocialGouv/code-du-travail-numerique/commit/685d57842c1d8132b6bab47c2c8ea970a8a33e6b))

## [4.78.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.78.0...v4.78.1) (2022-06-17)

### Bug Fixes

- **frontend:** beautify ErrorBoundary ([#4417](https://github.com/SocialGouv/code-du-travail-numerique/issues/4417)) ([4f5ac2b](https://github.com/SocialGouv/code-du-travail-numerique/commit/4f5ac2b71f03ddb75bdb2b8d08ddf3a439efa8e4))
- **workflow:** add github release ([bc15f5a](https://github.com/SocialGouv/code-du-travail-numerique/commit/bc15f5a57c39c5e2282a4a73a27291e1e468844b))

# [4.78.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.77.1...v4.78.0) (2022-06-16)

### Bug Fixes

- **redirection:** remove accent on 1505 slug ([#4436](https://github.com/SocialGouv/code-du-travail-numerique/issues/4436)) ([1c834d2](https://github.com/SocialGouv/code-du-travail-numerique/commit/1c834d259d617b428744466a8b3aaa3bf24ce1b2))
- github action to sync with gitlab ([#4433](https://github.com/SocialGouv/code-du-travail-numerique/issues/4433)) ([b2c1e14](https://github.com/SocialGouv/code-du-travail-numerique/commit/b2c1e14de7576a29acf19d42af0e4f6924e8a603))

### Features

- add a redirection to new agreement 1505 url ([#4432](https://github.com/SocialGouv/code-du-travail-numerique/issues/4432)) ([492685e](https://github.com/SocialGouv/code-du-travail-numerique/commit/492685e23811451f9c4b425380aab52d8e3835e6))
- **simulator:** precise date to the result ([#4368](https://github.com/SocialGouv/code-du-travail-numerique/issues/4368)) ([532d58e](https://github.com/SocialGouv/code-du-travail-numerique/commit/532d58eacbbf3a583c65e81c93b072ea3ddf287a))

## [4.77.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.77.0...v4.77.1) (2022-05-18)

### Bug Fixes

- **simulator:** remise à zéro du simulateur en quittant la page ([#4415](https://github.com/SocialGouv/code-du-travail-numerique/issues/4415)) ([93e33b5](https://github.com/SocialGouv/code-du-travail-numerique/commit/93e33b58623fe29454b974ade7ba2b1f8f7da20f))

# [4.77.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.76.0...v4.77.0) (2022-05-12)

### Bug Fixes

- **ATInternet:** fix img load blocked by CSP rule ([#4406](https://github.com/SocialGouv/code-du-travail-numerique/issues/4406)) ([78fbdcb](https://github.com/SocialGouv/code-du-travail-numerique/commit/78fbdcb60a608e92630cdb8a7c7f11590ff22104))
- **simulator:** indemnité de licenciement bug de selection absence ([#4412](https://github.com/SocialGouv/code-du-travail-numerique/issues/4412)) ([ad133b9](https://github.com/SocialGouv/code-du-travail-numerique/commit/ad133b9ae3677c7c924bd4ee58b0e7e3a8f7ddbf))
- **simulator metadata:** update simulators metadata for SEO purpose ([#4403](https://github.com/SocialGouv/code-du-travail-numerique/issues/4403)) ([6c71ecd](https://github.com/SocialGouv/code-du-travail-numerique/commit/6c71ecdf5be00b082061bd1dc09475737e624903))
- **simulator ui:** do not modify salary inputs on scroll event and do not scroll to top on change value in the form ([#4405](https://github.com/SocialGouv/code-du-travail-numerique/issues/4405)) ([e703962](https://github.com/SocialGouv/code-du-travail-numerique/commit/e7039624df38904fbd9b96250c60a205febbbb65))

### Features

- **simulator:** amélioration de la gestion du state ([#4383](https://github.com/SocialGouv/code-du-travail-numerique/issues/4383)) ([075ab8a](https://github.com/SocialGouv/code-du-travail-numerique/commit/075ab8abd6595d0bf4935c0185e6ac6b95501b4e)), closes [#4380](https://github.com/SocialGouv/code-du-travail-numerique/issues/4380) [#4382](https://github.com/SocialGouv/code-du-travail-numerique/issues/4382) [#4384](https://github.com/SocialGouv/code-du-travail-numerique/issues/4384)

# [4.76.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.75.4...v4.76.0) (2022-04-27)

### Bug Fixes

- **api:** réécriture de la partie statistique côté api ([#4363](https://github.com/SocialGouv/code-du-travail-numerique/issues/4363)) ([0ca31dd](https://github.com/SocialGouv/code-du-travail-numerique/commit/0ca31dd2218b7c29b4854ea87b2735873ffcad71))
- **ATInternet:** fix script loading to fix js error on load of ATInternet ([#4402](https://github.com/SocialGouv/code-du-travail-numerique/issues/4402)) ([cd37419](https://github.com/SocialGouv/code-du-travail-numerique/commit/cd37419161459fe57c347ad92dc12878db413aa7))
- **events:** ajout d'un paramètre manquant pour matomo sur la page theme ([#4376](https://github.com/SocialGouv/code-du-travail-numerique/issues/4376)) ([78b873e](https://github.com/SocialGouv/code-du-travail-numerique/commit/78b873ee6ed2bfe5fc2d4950039a34181ea37e45))
- **form:** change cc (with [@m-maillot](https://github.com/m-maillot)) ([#4401](https://github.com/SocialGouv/code-du-travail-numerique/issues/4401)) ([14ceb91](https://github.com/SocialGouv/code-du-travail-numerique/commit/14ceb91e0085eed2e244447635bff0289b7a0ab4))
- **hooks:** add diff to dev ([#4369](https://github.com/SocialGouv/code-du-travail-numerique/issues/4369)) ([73bbb4f](https://github.com/SocialGouv/code-du-travail-numerique/commit/73bbb4f5ab355ffa3b5a91dce758aa54922eb2da))
- **logging:** make preprod log on Sentry preprod ([#4381](https://github.com/SocialGouv/code-du-travail-numerique/issues/4381)) ([c9ca632](https://github.com/SocialGouv/code-du-travail-numerique/commit/c9ca632b01b3b8f3d2821454d8c4730a3b4c27ee))
- **preavis de retraite:** do not show empty situation if no title on result page ([#4394](https://github.com/SocialGouv/code-du-travail-numerique/issues/4394)) ([4c89588](https://github.com/SocialGouv/code-du-travail-numerique/commit/4c89588d7ebcfac96cfaa4d5ba376ecdfbd2162a))
- **simulateurs:** bug de changements de CC nouveau parcours ([#4388](https://github.com/SocialGouv/code-du-travail-numerique/issues/4388)) ([4fc2881](https://github.com/SocialGouv/code-du-travail-numerique/commit/4fc2881ee8bb143e84363d4e2ac576d27ab5038b))
- **version:** update dependencies ([#4389](https://github.com/SocialGouv/code-du-travail-numerique/issues/4389)) ([be7bb1f](https://github.com/SocialGouv/code-du-travail-numerique/commit/be7bb1f170dc22507942e7c266bf1577178948b2))

### Features

- **agreement step:** for Heure de recherche d'emploi & préavis de démisison agreement step can not be skipped ([#4379](https://github.com/SocialGouv/code-du-travail-numerique/issues/4379)) ([58afc1e](https://github.com/SocialGouv/code-du-travail-numerique/commit/58afc1ee1e89623a9f955129f942713d0e878913))
- **simulator:** publicodes for indemnité de licenciement ([#4275](https://github.com/SocialGouv/code-du-travail-numerique/issues/4275)) ([07ec458](https://github.com/SocialGouv/code-du-travail-numerique/commit/07ec458b46352920c5b2bcb4f2587454d4529c36)), closes [#4267](https://github.com/SocialGouv/code-du-travail-numerique/issues/4267) [#4268](https://github.com/SocialGouv/code-du-travail-numerique/issues/4268) [#4302](https://github.com/SocialGouv/code-du-travail-numerique/issues/4302) [#4359](https://github.com/SocialGouv/code-du-travail-numerique/issues/4359) [#4375](https://github.com/SocialGouv/code-du-travail-numerique/issues/4375)

## [4.75.4](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.75.0...v4.75.4) (2022-04-06)

### Bug Fixes

- **ci:** commit loop ([#4365](https://github.com/SocialGouv/code-du-travail-numerique/issues/4365)) ([cae2fd3](https://github.com/SocialGouv/code-du-travail-numerique/commit/cae2fd3513f40fcfeb4d72a3175b5b3fc283abcd)), closes [#4334](https://github.com/SocialGouv/code-du-travail-numerique/issues/4334)
- **csp:** azure config ([#4361](https://github.com/SocialGouv/code-du-travail-numerique/issues/4361)) ([d6a73f5](https://github.com/SocialGouv/code-du-travail-numerique/commit/d6a73f54d0ea930eb5989235db84db56fbb30c6f)), closes [#4357](https://github.com/SocialGouv/code-du-travail-numerique/issues/4357)
- action for dev ([e35f2e5](https://github.com/SocialGouv/code-du-travail-numerique/commit/e35f2e5cb13a79438c5694058f99cd8332424e31))
- action for dev ([#4357](https://github.com/SocialGouv/code-du-travail-numerique/issues/4357)) ([20cd33a](https://github.com/SocialGouv/code-du-travail-numerique/commit/20cd33a7dd789468b77ea654d8cdb4c140e3e2c5))
- add wait ([93f290a](https://github.com/SocialGouv/code-du-travail-numerique/commit/93f290a24ff16e9c99ede85c4443f66e3e00d9b5))
- autoapproove ([f1ab154](https://github.com/SocialGouv/code-du-travail-numerique/commit/f1ab1546cb81ec53d055d64039eac1ca4d3bd87b))
- autoapproove ([72760b4](https://github.com/SocialGouv/code-du-travail-numerique/commit/72760b4b09bbb117fbaec122dde08d7d030ef933))
- automerge ([5b06089](https://github.com/SocialGouv/code-du-travail-numerique/commit/5b060892b9f3b2ba407924a65cb55b12643dc0f3))
- dev as default branch ([9ddfb69](https://github.com/SocialGouv/code-du-travail-numerique/commit/9ddfb697de4bcca2b969e13982a7bf0c7b1c81b8))
- dev as default branch ([5ebd96e](https://github.com/SocialGouv/code-du-travail-numerique/commit/5ebd96e8ca114e5ef66f20a55a8c88ea33d51a49))
- dev as default branch ([9346f81](https://github.com/SocialGouv/code-du-travail-numerique/commit/9346f81264d67b745a45780bdc6254f1a13834a5))
- dev as default branch ([ac0fc0f](https://github.com/SocialGouv/code-du-travail-numerique/commit/ac0fc0f4db05855a40709bcd499605554be3839f))
- dev as default branch ([1dea8bc](https://github.com/SocialGouv/code-du-travail-numerique/commit/1dea8bcd7cf9eac56f242be180f4b1e23a58a6c2))
- dev as default branch ([f38ff4d](https://github.com/SocialGouv/code-du-travail-numerique/commit/f38ff4db703a59af2a9250fe396159bafdd5448d))
- force ([e212900](https://github.com/SocialGouv/code-du-travail-numerique/commit/e2129009e22b4e47e47a4676fc5bb66c9c5bdcd9))
- force ([bc3a665](https://github.com/SocialGouv/code-du-travail-numerique/commit/bc3a66552beacced8d7f33f05e0dbddc4aaaf04b))
- prerelease + secu ([d1547ab](https://github.com/SocialGouv/code-du-travail-numerique/commit/d1547aba2f945ccef62e867b57e7255becc9c40f))
- sync ([8096bb4](https://github.com/SocialGouv/code-du-travail-numerique/commit/8096bb4157f8fbe8c82ca9a46f3042453afc90ae))
- sync ([66e9130](https://github.com/SocialGouv/code-du-travail-numerique/commit/66e91304c3b790c6158a251a4be397f60c25e7c3))
- **autodevops-deactivate:** has no db deactivation ([#4342](https://github.com/SocialGouv/code-du-travail-numerique/issues/4342)) ([9642a78](https://github.com/SocialGouv/code-du-travail-numerique/commit/9642a784714c219dd4e33b0ea0cd71bb262c586a))
- **autodevops-deactivate:** naming ([#4343](https://github.com/SocialGouv/code-du-travail-numerique/issues/4343)) ([a815b92](https://github.com/SocialGouv/code-du-travail-numerique/commit/a815b923cfb2bfcfc9a53a3c0e7583865690bbc7))
- **autodevops-deactivate:** rancherProject ([#4339](https://github.com/SocialGouv/code-du-travail-numerique/issues/4339)) ([e085376](https://github.com/SocialGouv/code-du-travail-numerique/commit/e085376cee4e366ea7acfe01e78cc6b86a3cdb3e))
- **autodevops-deactivate:** revert change ([#4340](https://github.com/SocialGouv/code-du-travail-numerique/issues/4340)) ([fb3e336](https://github.com/SocialGouv/code-du-travail-numerique/commit/fb3e3361198ce8c4a828646b291f35004030fb0d))
- **ci:** automerge dev to master ([#4337](https://github.com/SocialGouv/code-du-travail-numerique/issues/4337)) ([1f820b6](https://github.com/SocialGouv/code-du-travail-numerique/commit/1f820b63599ee69cfe55459f83ebc25ce941359a))
- **deactivation:** has no db deactivation ([#4341](https://github.com/SocialGouv/code-du-travail-numerique/issues/4341)) ([81e1714](https://github.com/SocialGouv/code-du-travail-numerique/commit/81e1714c15b11a0412f3d3f76ddfe37feb4bfe3e))

### Features

- update documentation ([6ffd16a](https://github.com/SocialGouv/code-du-travail-numerique/commit/6ffd16a7790fdb9d38825144d7768ac41c2d1ade))

## [4.75.3](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.75.2...v4.75.3) (2022-04-06)

### Bug Fixes

- dev as default branch ([554472b](https://github.com/SocialGouv/code-du-travail-numerique/commit/554472b62c5e8f60788b0bef9477c28584c1eadc))
- dev as default branch ([ed06576](https://github.com/SocialGouv/code-du-travail-numerique/commit/ed065764fb89d25456b8b694a50964030202006c))
- dev as default branch ([48b318a](https://github.com/SocialGouv/code-du-travail-numerique/commit/48b318ab0bf6ce4911e5f4c5ac536527901886cf))
- dev as default branch ([b7e93de](https://github.com/SocialGouv/code-du-travail-numerique/commit/b7e93de90dff05db9a6da7ced3e588293218de95))
- dev as default branch ([9d38312](https://github.com/SocialGouv/code-du-travail-numerique/commit/9d38312f4bbe720b56ef34402993a843591edecb))
- dev as default branch ([f8c926b](https://github.com/SocialGouv/code-du-travail-numerique/commit/f8c926bf9a59a7f4583e0269ae8a58dde675d36b))
- dev as default branch ([91e97c8](https://github.com/SocialGouv/code-du-travail-numerique/commit/91e97c85a64f067af15bdd3653baecdfa406ded7))
- dev as default branch ([59dc014](https://github.com/SocialGouv/code-du-travail-numerique/commit/59dc014b00b5dde2ff2aa9c78f336a2bdf6318fe))
- dev as default branch ([dac9187](https://github.com/SocialGouv/code-du-travail-numerique/commit/dac9187837a9790be0b4dd02f60e46b4447b3b7b))
- dev as default branch ([f9fef79](https://github.com/SocialGouv/code-du-travail-numerique/commit/f9fef79b956ae902769c4b6af77c46c0add4fd78))
- dev as default branch ([93b1aa5](https://github.com/SocialGouv/code-du-travail-numerique/commit/93b1aa5455c2887bce55a7101aeafe6094946236))
- **csp:** azure config ([#4361](https://github.com/SocialGouv/code-du-travail-numerique/issues/4361)) ([eb4ee19](https://github.com/SocialGouv/code-du-travail-numerique/commit/eb4ee19c2903da81e831f623fc2932a27896dbec)), closes [#4357](https://github.com/SocialGouv/code-du-travail-numerique/issues/4357)
- dev as default branch ([baa1a9c](https://github.com/SocialGouv/code-du-travail-numerique/commit/baa1a9c09f7677d30fe6f438a6fad788802ec8af))
- dev as default branch ([955ece4](https://github.com/SocialGouv/code-du-travail-numerique/commit/955ece46349e271be6eaaa1ddcdbb32909a54753))
- dev as default branch ([e869bc8](https://github.com/SocialGouv/code-du-travail-numerique/commit/e869bc82b9b6a350a42a0d332c5a7789e0113262))
- dev as default branch ([8846987](https://github.com/SocialGouv/code-du-travail-numerique/commit/8846987f13b942db0d895cbe65ced41580efcfb3))
- dev as default branch ([1297908](https://github.com/SocialGouv/code-du-travail-numerique/commit/1297908a8068a8c10bf2ebb5dde9989debd2a551))
- dev as default branch ([6bda2cc](https://github.com/SocialGouv/code-du-travail-numerique/commit/6bda2cc28f1a41f2dd9168c018fdf44fba269fbb))
- dev as default branch ([d4598f9](https://github.com/SocialGouv/code-du-travail-numerique/commit/d4598f9e36a770f9bdb064cd37d86663e0b3db82))
- dev as default branch ([c4c3e5d](https://github.com/SocialGouv/code-du-travail-numerique/commit/c4c3e5dd4939276c9eba88b3640f2605ca6aec55))
- dev as default branch ([8348c88](https://github.com/SocialGouv/code-du-travail-numerique/commit/8348c881439c2b0a75050c4bbc623e2448fe4eb8))
- dev as default branch ([8f3be54](https://github.com/SocialGouv/code-du-travail-numerique/commit/8f3be546a23643c4e339152f9aea7deb32ae0ded))
- dev as default branch ([a72560e](https://github.com/SocialGouv/code-du-travail-numerique/commit/a72560ede6ee3b69ded123d1a2ce271681888358))
- dev as default branch ([683937f](https://github.com/SocialGouv/code-du-travail-numerique/commit/683937f4760b24d7d5ca3e9e82cbeb5e4b1b3ce2))
- dev as default branch ([a2cf7b1](https://github.com/SocialGouv/code-du-travail-numerique/commit/a2cf7b1e434f34d1450c5304415b7ed26c743615))
- dev as default branch ([27293e4](https://github.com/SocialGouv/code-du-travail-numerique/commit/27293e45594c436efaf857fdecd54ad325b6c2d7))
- dev as default branch ([175e020](https://github.com/SocialGouv/code-du-travail-numerique/commit/175e0202147d76dc11b2158730c5949b6611f835))
- dev as default branch ([105f9a9](https://github.com/SocialGouv/code-du-travail-numerique/commit/105f9a97e6d9bccda27c6a6127aba31785409bcc))
- dev as default branch ([9f23f7f](https://github.com/SocialGouv/code-du-travail-numerique/commit/9f23f7fcd0b6ce39627acec80d6b7c4ea5b2d5a9))
- dev as default branch ([1deca43](https://github.com/SocialGouv/code-du-travail-numerique/commit/1deca43a2c518fbed4907d769df9b5a250152f69))
- dev as default branch ([df0ff68](https://github.com/SocialGouv/code-du-travail-numerique/commit/df0ff684e3e44e4cb112e6999203ac3dd54d8d3b))
- dev as default branch ([cb15697](https://github.com/SocialGouv/code-du-travail-numerique/commit/cb15697aff4f274c3b0972c9a374f13cc8f8f60f))
- dev as default branch ([09114a0](https://github.com/SocialGouv/code-du-travail-numerique/commit/09114a08ddb6827885cf2738d6ce332339cc9d8f))

## [4.75.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.75.1...v4.75.2) (2022-04-04)

### Bug Fixes

- dev as default branch ([477a7ed](https://github.com/SocialGouv/code-du-travail-numerique/commit/477a7ed1be511a9d6c2b5a4a8b29cd116f1fd7f3))
- dev as default branch ([44d7582](https://github.com/SocialGouv/code-du-travail-numerique/commit/44d7582b6d4df68e4565cd2e2652ae78f88f5e9f))
- dev as default branch ([3d6d916](https://github.com/SocialGouv/code-du-travail-numerique/commit/3d6d9166e6b7a6bb01941f61d135aafbfdbcbbf6))
- dev as default branch ([ae67c79](https://github.com/SocialGouv/code-du-travail-numerique/commit/ae67c7915941ed7bcd27d05a5be1e55edf3db374))
- dev as default branch ([990baa3](https://github.com/SocialGouv/code-du-travail-numerique/commit/990baa30bb93d00be125ef4154e8c42465ac00bb))
- dev as default branch ([cc7939b](https://github.com/SocialGouv/code-du-travail-numerique/commit/cc7939bf0f1dbcda130a522b17c6f2cf9240f826))
- dev as default branch ([c15caa5](https://github.com/SocialGouv/code-du-travail-numerique/commit/c15caa54d2643bbd14cbf743a13712810a29bb45))
- dev as default branch ([03fc361](https://github.com/SocialGouv/code-du-travail-numerique/commit/03fc361ba8ce5db9d1d723282cff8fa2d304376a))
- dev as default branch ([7def3e1](https://github.com/SocialGouv/code-du-travail-numerique/commit/7def3e1cd348294300ad361865133025d2dced62))

## [4.75.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.75.0...v4.75.1) (2022-04-04)

### Bug Fixes

- action for dev ([d6f13bf](https://github.com/SocialGouv/code-du-travail-numerique/commit/d6f13bfb571a6e60e6bffceeff5ae9fd11f1b9e6))
- action for dev ([#4357](https://github.com/SocialGouv/code-du-travail-numerique/issues/4357)) ([5067ee0](https://github.com/SocialGouv/code-du-travail-numerique/commit/5067ee00b4a4ebb9035413d779fe093ccc66e286))
- add wait ([a34bfe3](https://github.com/SocialGouv/code-du-travail-numerique/commit/a34bfe3ef33072b77f97910daec8319211b9e4ce))
- autoapproove ([769a5f1](https://github.com/SocialGouv/code-du-travail-numerique/commit/769a5f149013c4bc109df6b23c567f84df822561))
- autoapproove ([f7c89cb](https://github.com/SocialGouv/code-du-travail-numerique/commit/f7c89cba24d63e6264142a8f6ccbfe40dcacabc8))
- automerge ([5e3f14c](https://github.com/SocialGouv/code-du-travail-numerique/commit/5e3f14cf80ef4d130ad36d779c5bf67c9c054195))
- dev as default branch ([3c141b7](https://github.com/SocialGouv/code-du-travail-numerique/commit/3c141b754b71032d7eb3fdfceb984032ac27d0f9))
- dev as default branch ([3d710be](https://github.com/SocialGouv/code-du-travail-numerique/commit/3d710be76105c9a1775ecbe103c0cbc65b4841b1))
- dev as default branch ([3ffc27c](https://github.com/SocialGouv/code-du-travail-numerique/commit/3ffc27ccb29631f590cb41d2ab4670cfb2f02705))
- force ([123f774](https://github.com/SocialGouv/code-du-travail-numerique/commit/123f774a1a8c1fed13426e3b35e79111b6a43dda))
- force ([6c1c32f](https://github.com/SocialGouv/code-du-travail-numerique/commit/6c1c32fa6dcbf2c82268e40c600cff5bc5663af5))
- prerelease + secu ([b538366](https://github.com/SocialGouv/code-du-travail-numerique/commit/b5383665110bc5f932e2527e5703042dcdb6f5cf))
- sync ([81030fc](https://github.com/SocialGouv/code-du-travail-numerique/commit/81030fc475e6ac5ae044bee637dd4b3d9876404f))
- sync ([7fc044c](https://github.com/SocialGouv/code-du-travail-numerique/commit/7fc044c728a9ce578a1a651fbd6475a60b666c2b))
- **autodevops-deactivate:** has no db deactivation ([#4342](https://github.com/SocialGouv/code-du-travail-numerique/issues/4342)) ([9642a78](https://github.com/SocialGouv/code-du-travail-numerique/commit/9642a784714c219dd4e33b0ea0cd71bb262c586a))
- **autodevops-deactivate:** naming ([#4343](https://github.com/SocialGouv/code-du-travail-numerique/issues/4343)) ([a815b92](https://github.com/SocialGouv/code-du-travail-numerique/commit/a815b923cfb2bfcfc9a53a3c0e7583865690bbc7))
- **autodevops-deactivate:** rancherProject ([#4339](https://github.com/SocialGouv/code-du-travail-numerique/issues/4339)) ([e085376](https://github.com/SocialGouv/code-du-travail-numerique/commit/e085376cee4e366ea7acfe01e78cc6b86a3cdb3e))
- **autodevops-deactivate:** revert change ([#4340](https://github.com/SocialGouv/code-du-travail-numerique/issues/4340)) ([fb3e336](https://github.com/SocialGouv/code-du-travail-numerique/commit/fb3e3361198ce8c4a828646b291f35004030fb0d))
- **ci:** automerge dev to master ([#4337](https://github.com/SocialGouv/code-du-travail-numerique/issues/4337)) ([1f820b6](https://github.com/SocialGouv/code-du-travail-numerique/commit/1f820b63599ee69cfe55459f83ebc25ce941359a))
- **deactivation:** has no db deactivation ([#4341](https://github.com/SocialGouv/code-du-travail-numerique/issues/4341)) ([81e1714](https://github.com/SocialGouv/code-du-travail-numerique/commit/81e1714c15b11a0412f3d3f76ddfe37feb4bfe3e))

# [4.75.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.74.0...v4.75.0) (2022-03-30)

### Bug Fixes

- **scripts:** robots.txt prod ([#4332](https://github.com/SocialGouv/code-du-travail-numerique/issues/4332)) ([a35c6df](https://github.com/SocialGouv/code-du-travail-numerique/commit/a35c6df2bcd3b40817c1fccc7e68219e1214e9aa))

### Features

- add a redirection ([#4335](https://github.com/SocialGouv/code-du-travail-numerique/issues/4335)) ([14df992](https://github.com/SocialGouv/code-du-travail-numerique/commit/14df992438189ad260e27fe7d8d691cf7d088dfb))
- **sitemap:** serve sitemap directly under /sitemap.xml (to avoid redirect and avoid having 2 duplicated content served under 2 differents url ([#4329](https://github.com/SocialGouv/code-du-travail-numerique/issues/4329)) ([d78c908](https://github.com/SocialGouv/code-du-travail-numerique/commit/d78c908acaaefd4eee5750d68220a8c84181d727))

# [4.74.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.73.0...v4.74.0) (2022-03-28)

### Bug Fixes

- **deps:** upgrade next to v12 ([#4280](https://github.com/SocialGouv/code-du-travail-numerique/issues/4280)) ([10ae94f](https://github.com/SocialGouv/code-du-travail-numerique/commit/10ae94fa4424230fb72e74bb63bd98ef9abd6ac8))
- **hn in tabs:** when tabs do not have headings level as parameter, then starts at H2 not H1 ([#4311](https://github.com/SocialGouv/code-du-travail-numerique/issues/4311)) ([fd015f0](https://github.com/SocialGouv/code-du-travail-numerique/commit/fd015f0e961d9c2e09624d720ca4954ee75d2d9e))
- **spacings in questions:** standardize spacing around questions in tools ([#4309](https://github.com/SocialGouv/code-du-travail-numerique/issues/4309)) ([a5a7b97](https://github.com/SocialGouv/code-du-travail-numerique/commit/a5a7b9796a6a5ba69aa2ce3c15728d5319a9db8c))

### Features

- **e2e:** add 2 missing e2e test for tools: "Indemnité de précarité" & "Salaire brut/net" ([#4306](https://github.com/SocialGouv/code-du-travail-numerique/issues/4306)) ([6d89564](https://github.com/SocialGouv/code-du-travail-numerique/commit/6d89564dd455e315337178b0fac4addeca2f7900))
- **outil - heures-recherche-emploi:** outil "heures pour recherche d'emploi" by "Heures d'absence pour rechercher un emploi" ([#4308](https://github.com/SocialGouv/code-du-travail-numerique/issues/4308)) ([4410f39](https://github.com/SocialGouv/code-du-travail-numerique/commit/4410f39dd029d860e3851e681f548b66a8f457fa))
- **widget:** new widget for preavis de retraite ([#4287](https://github.com/SocialGouv/code-du-travail-numerique/issues/4287)) ([745026e](https://github.com/SocialGouv/code-du-travail-numerique/commit/745026eda3929d15359d3184584636d2a6d94a33))

# [4.73.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.72.0...v4.73.0) (2022-03-16)

### Features

- **redirects:** add new url to redirects after remove of multiples articles ([#4301](https://github.com/SocialGouv/code-du-travail-numerique/issues/4301)) ([c7b3acc](https://github.com/SocialGouv/code-du-travail-numerique/commit/c7b3acc9664a8cf00c0bce0335669708d6f3de0f))

# [4.72.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.71.0...v4.72.0) (2022-03-11)

### Bug Fixes

- **e2e:** dossier covid-19 as changed ([#4298](https://github.com/SocialGouv/code-du-travail-numerique/issues/4298)) ([60c21f9](https://github.com/SocialGouv/code-du-travail-numerique/commit/60c21f9dae62781f5300638a0e6db769fc432ba9))
- **e2e:** fix e2e test after update dossier ([#4300](https://github.com/SocialGouv/code-du-travail-numerique/issues/4300)) ([2fbd4f4](https://github.com/SocialGouv/code-du-travail-numerique/commit/2fbd4f47330864b1eb2d7146e7a17bd5182cf897))
- **events:** wrapping same component + optimization with callback ([#4222](https://github.com/SocialGouv/code-du-travail-numerique/issues/4222)) ([bae7e41](https://github.com/SocialGouv/code-du-travail-numerique/commit/bae7e415e327b92c112cd4ff716929003c32916d))
- **frontend:** reduce introduction ([#4279](https://github.com/SocialGouv/code-du-travail-numerique/issues/4279)) ([1875a3e](https://github.com/SocialGouv/code-du-travail-numerique/commit/1875a3e826e5e5e08137d665116f0d11aea61e92))
- **simulators:** skip steps on simulators even if agreement is supported ([#4276](https://github.com/SocialGouv/code-du-travail-numerique/issues/4276)) ([43d52a1](https://github.com/SocialGouv/code-du-travail-numerique/commit/43d52a12d18b53df704749725295924001296370))
- **simulators:** wrong event sent for cc_select ([#4294](https://github.com/SocialGouv/code-du-travail-numerique/issues/4294)) ([9b65ac5](https://github.com/SocialGouv/code-du-travail-numerique/commit/9b65ac5e0e6df025b79623a2f1ee5f7940f22634))
- **url:** fix link on simulateur Indemnite de licenciement + add redirections for deleted articles ([#4299](https://github.com/SocialGouv/code-du-travail-numerique/issues/4299)) ([8968eb3](https://github.com/SocialGouv/code-du-travail-numerique/commit/8968eb33d507b79a1a80b3eccc32d88ef3ebd4e4))
- remove useless advertising ([#4281](https://github.com/SocialGouv/code-du-travail-numerique/issues/4281)) ([a622fa5](https://github.com/SocialGouv/code-du-travail-numerique/commit/a622fa5890b224b8d3e9a0796552176f77f03ba7))

### Features

- **analytics:** add fabrique matomo lib ([#4251](https://github.com/SocialGouv/code-du-travail-numerique/issues/4251)) ([057afcd](https://github.com/SocialGouv/code-du-travail-numerique/commit/057afcd39f8dcd521327d2e854d991d4c35eca3a))
- **event:** add event for print result ([#4273](https://github.com/SocialGouv/code-du-travail-numerique/issues/4273)) ([edbffb5](https://github.com/SocialGouv/code-du-travail-numerique/commit/edbffb54fa9adfab1287c7892bdaf68040195488))
- **frontend:** refacto publicodes handler ([#4261](https://github.com/SocialGouv/code-du-travail-numerique/issues/4261)) ([5a412e3](https://github.com/SocialGouv/code-du-travail-numerique/commit/5a412e36c29647c50122938d061329dbffcf2c64))

# [4.71.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.70.0...v4.71.0) (2022-02-28)

### Features

- **alert wording:** fix wording to be generic on all simulators + error on heure de recherches emploi ([#4266](https://github.com/SocialGouv/code-du-travail-numerique/issues/4266)) ([a84b878](https://github.com/SocialGouv/code-du-travail-numerique/commit/a84b87892db97c3f30781d88deacd41afac85bc9))

# [4.70.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.69.1...v4.70.0) (2022-02-28)

### Features

- **simulators:** Implement new agreement route ([#4205](https://github.com/SocialGouv/code-du-travail-numerique/issues/4205)) ([4f1bc73](https://github.com/SocialGouv/code-du-travail-numerique/commit/4f1bc73e8c1ad498c1b36a086fdd797426892b2c))

## [4.69.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.69.0...v4.69.1) (2022-02-25)

### Bug Fixes

- **k8s:** fix redirect ingress apiVersion ([#4233](https://github.com/SocialGouv/code-du-travail-numerique/issues/4233)) ([eee4d47](https://github.com/SocialGouv/code-du-travail-numerique/commit/eee4d47186aa35799329ef11a1022374de3f921d))
- **tracking:** fix url sent on route change when tracking outils' start event ([#4254](https://github.com/SocialGouv/code-du-travail-numerique/issues/4254)) ([368b8e3](https://github.com/SocialGouv/code-du-travail-numerique/commit/368b8e3b070fa096fc06a41d17915cced84e9992))

# [4.69.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.68.0...v4.69.0) (2022-02-10)

### Bug Fixes

- **affichage preavis demission:** Pb affichage résultat préavis de dé… ([#4229](https://github.com/SocialGouv/code-du-travail-numerique/issues/4229)) ([98fde15](https://github.com/SocialGouv/code-du-travail-numerique/commit/98fde15e3663902b5ef59db0d8d1f7c2896db000))
- **build:** fix dockerfile to not merge node_modules without taking in account yarn.lock ([#4220](https://github.com/SocialGouv/code-du-travail-numerique/issues/4220)) ([d1f0f3c](https://github.com/SocialGouv/code-du-travail-numerique/commit/d1f0f3cba0568241dcc52c3857bd8a805e4f258a))
- **sdr:** link update ([#4240](https://github.com/SocialGouv/code-du-travail-numerique/issues/4240)) ([83113bb](https://github.com/SocialGouv/code-du-travail-numerique/commit/83113bb057d025106cfd763e793e0d8b06ae9002))

### Features

- **simulator:** add new CC 2941 ([#4166](https://github.com/SocialGouv/code-du-travail-numerique/issues/4166)) ([8330d59](https://github.com/SocialGouv/code-du-travail-numerique/commit/8330d59949b592446720173a680e01597d8df2ac))

# [4.68.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.67.1...v4.68.0) (2022-02-02)

### Bug Fixes

- **frontend:** page stats when matomo is down ([#4193](https://github.com/SocialGouv/code-du-travail-numerique/issues/4193)) ([d038840](https://github.com/SocialGouv/code-du-travail-numerique/commit/d03884029c287a4eea33d690dee69d37afb7398f))
- **headings:** on tabs ([#4114](https://github.com/SocialGouv/code-du-travail-numerique/issues/4114)) ([7c155f9](https://github.com/SocialGouv/code-du-travail-numerique/commit/7c155f96e33ed3d1a59bb4a60bcbabe8a5ddf567))
- **secu:** use non-privilegied docker user ([#4201](https://github.com/SocialGouv/code-du-travail-numerique/issues/4201)) ([9f665df](https://github.com/SocialGouv/code-du-travail-numerique/commit/9f665df5197f3291a4993f002907d7ae9540dbce))
- issues after enabled check null in typescript ([#4213](https://github.com/SocialGouv/code-du-travail-numerique/issues/4213)) ([1e6b727](https://github.com/SocialGouv/code-du-travail-numerique/commit/1e6b727f3c278b13804762985469c5843cc19d39))

### Features

- **cc search:** update call for new API ([#4212](https://github.com/SocialGouv/code-du-travail-numerique/issues/4212)) ([923f149](https://github.com/SocialGouv/code-du-travail-numerique/commit/923f149c25f6ffcb687bde560151090e27e24f46))
- **simulator:** add help button + events ([#4210](https://github.com/SocialGouv/code-du-travail-numerique/issues/4210)) ([253bbd8](https://github.com/SocialGouv/code-du-travail-numerique/commit/253bbd80d2cbf6b8607981cab52614489358d16f))

## [4.67.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.67.0...v4.67.1) (2022-01-24)

### Bug Fixes

- **pass:** url ([#4207](https://github.com/SocialGouv/code-du-travail-numerique/issues/4207)) ([b88c03b](https://github.com/SocialGouv/code-du-travail-numerique/commit/b88c03b021caf58f8298bc7f4396aa6d11d42b98))

# [4.67.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.66.2...v4.67.0) (2022-01-24)

### Bug Fixes

- **modeles:** question order for CC 650 ([#4185](https://github.com/SocialGouv/code-du-travail-numerique/issues/4185)) ([1f5a32f](https://github.com/SocialGouv/code-du-travail-numerique/commit/1f5a32fa466bf399e811e29c612709fe33dedd28))
- k8s variable ([#4186](https://github.com/SocialGouv/code-du-travail-numerique/issues/4186)) ([b4c74c3](https://github.com/SocialGouv/code-du-travail-numerique/commit/b4c74c3ba7fdfe88e4a49e171252d5606b79afb9))

### Features

- **modeles:** add cc 2148 for retirement ([#4176](https://github.com/SocialGouv/code-du-travail-numerique/issues/4176)) ([829e66d](https://github.com/SocialGouv/code-du-travail-numerique/commit/829e66da9f4bcab31d8970aaad5f6109c465c686))
- **modeles:** add cc 86 for retirement simulator / adding selected result to the publicode context ([#4175](https://github.com/SocialGouv/code-du-travail-numerique/issues/4175)) ([b62cf7d](https://github.com/SocialGouv/code-du-travail-numerique/commit/b62cf7d5102f5580a6e6940c59a85b2df3e47b64))
- **modeles:** cc 2596 for retirement added ([#4164](https://github.com/SocialGouv/code-du-travail-numerique/issues/4164)) ([ffb9815](https://github.com/SocialGouv/code-du-travail-numerique/commit/ffb9815854cc361dec7a5deba6cd3c4e70204ed2))
- **redirection:** add new redirection + simplify mapping redirection ([#4190](https://github.com/SocialGouv/code-du-travail-numerique/issues/4190)) ([6d05d54](https://github.com/SocialGouv/code-du-travail-numerique/commit/6d05d548c3a27602c145cf55081646bcdd2c474d))
- **simulator:** add time picto on all simulator first step ([#4188](https://github.com/SocialGouv/code-du-travail-numerique/issues/4188)) ([2db0bb2](https://github.com/SocialGouv/code-du-travail-numerique/commit/2db0bb279bb4114b56d08402223afa2b0380c471))

## [4.66.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.66.1...v4.66.2) (2022-01-14)

### Bug Fixes

- **ui:** form select ([#4184](https://github.com/SocialGouv/code-du-travail-numerique/issues/4184)) ([6789ab8](https://github.com/SocialGouv/code-du-travail-numerique/commit/6789ab8fd0442395f580d966ee6fa6c75f8673ea))

## [4.66.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.66.0...v4.66.1) (2022-01-14)

### Bug Fixes

- REVERT "feat(cc search): update query params for latest recherche entreprise API WIP" ([#4178](https://github.com/SocialGouv/code-du-travail-numerique/issues/4178)) ([1d71939](https://github.com/SocialGouv/code-du-travail-numerique/commit/1d71939d6939f80cb1200638feff1a2ffd78888f))
- spacing on simulator ([#4183](https://github.com/SocialGouv/code-du-travail-numerique/issues/4183)) ([5e163f6](https://github.com/SocialGouv/code-du-travail-numerique/commit/5e163f696baa9735bdb7586de50c7dc1151a2d34))

# [4.66.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.65.4...v4.66.0) (2022-01-14)

### Bug Fixes

- **api:** set search option same as before ([#4161](https://github.com/SocialGouv/code-du-travail-numerique/issues/4161)) ([b5365e6](https://github.com/SocialGouv/code-du-travail-numerique/commit/b5365e6f3bee2823034646595cee2d105e1274bc))
- **cc-search:** do not display address when multiple match [#90](https://github.com/SocialGouv/code-du-travail-numerique/issues/90) ([#4073](https://github.com/SocialGouv/code-du-travail-numerique/issues/4073)) ([4c2f7ab](https://github.com/SocialGouv/code-du-travail-numerique/commit/4c2f7aba7993eb10bf4ae3b2a402112db04d0d49))
- **frontend:** remove comment for cheerio ([#4163](https://github.com/SocialGouv/code-du-travail-numerique/issues/4163)) ([c655f79](https://github.com/SocialGouv/code-du-travail-numerique/commit/c655f792538c9e69edab784b0e7bac4c6bb7d0f1))
- **frontend:** spacing search ([#4145](https://github.com/SocialGouv/code-du-travail-numerique/issues/4145)) ([b67de96](https://github.com/SocialGouv/code-du-travail-numerique/commit/b67de96e4a465691cda824ee48e3a16a4ec9430f))
- **rgaa:** 8.9 P05 à P14 ([#4076](https://github.com/SocialGouv/code-du-travail-numerique/issues/4076)) ([4321dd5](https://github.com/SocialGouv/code-du-travail-numerique/commit/4321dd5d82dd18a250ebe7d17e9585ece13a2ffe))

### Features

- **accessibility:** update accessibility conformity info ([#4159](https://github.com/SocialGouv/code-du-travail-numerique/issues/4159)) ([c8e4fc2](https://github.com/SocialGouv/code-du-travail-numerique/commit/c8e4fc23cdf5d00acf467825ef497d4c68969598))
- **cc search:** update query params for latest recherche entreprise API WIP ([#3896](https://github.com/SocialGouv/code-du-travail-numerique/issues/3896)) ([855cca7](https://github.com/SocialGouv/code-du-travail-numerique/commit/855cca79ef28bab433699d7f1d62344218acd164))
- **frontend:** add anonymous at internet tracking ([#4149](https://github.com/SocialGouv/code-du-travail-numerique/issues/4149)) ([1c82da8](https://github.com/SocialGouv/code-du-travail-numerique/commit/1c82da87f94a40836327bc3bc058c6b334a6074e))
- **heading style:** make headings style different for each heading ([#4167](https://github.com/SocialGouv/code-du-travail-numerique/issues/4167)) ([55b0555](https://github.com/SocialGouv/code-du-travail-numerique/commit/55b05558405467da2f6d4a87bfdad2cd62c2533e))

## [4.65.4](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.65.3...v4.65.4) (2022-01-05)

### Bug Fixes

- **h1:** add missing H1 on page SimulateurEmbauche.js ([#4156](https://github.com/SocialGouv/code-du-travail-numerique/issues/4156)) ([4cb85fe](https://github.com/SocialGouv/code-du-travail-numerique/commit/4cb85fe19804ca6ce83e849b70745cdffe168da9))
- **parsing:** fix error 500 when parsing anchors ([#4152](https://github.com/SocialGouv/code-du-travail-numerique/issues/4152)) ([39b54e0](https://github.com/SocialGouv/code-du-travail-numerique/commit/39b54e0a536e4a2bf2a227712479b05ef92f55db))
- **simulator:** message + tests for 3239 ([#4148](https://github.com/SocialGouv/code-du-travail-numerique/issues/4148)) ([40c7b16](https://github.com/SocialGouv/code-du-travail-numerique/commit/40c7b1627940b67488b501fea820fb8621bb94a6))

## [4.65.3](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.65.2...v4.65.3) (2022-01-04)

### Bug Fixes

- redirection 3239 ([#4147](https://github.com/SocialGouv/code-du-travail-numerique/issues/4147)) ([cc02ddd](https://github.com/SocialGouv/code-du-travail-numerique/commit/cc02ddd3066b63c89719b16238741f1dd8db5ec9))

## [4.65.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.65.1...v4.65.2) (2021-12-31)

### Bug Fixes

- **middleware:** redirection cc 1809 ([#4142](https://github.com/SocialGouv/code-du-travail-numerique/issues/4142)) ([68ff6ec](https://github.com/SocialGouv/code-du-travail-numerique/commit/68ff6ec5304e44dd6188ab506f40680237d81699))

## [4.65.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.65.0...v4.65.1) (2021-12-31)

### Bug Fixes

- **doc:** readme.md ([#4141](https://github.com/SocialGouv/code-du-travail-numerique/issues/4141)) ([c002a65](https://github.com/SocialGouv/code-du-travail-numerique/commit/c002a659fee176f138209ab4f22382ea3c1bc537))

# [4.65.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.64.0...v4.65.0) (2021-12-30)

### Bug Fixes

- **frontend:** redirection from last to new cc ([#4140](https://github.com/SocialGouv/code-du-travail-numerique/issues/4140)) ([7e932cf](https://github.com/SocialGouv/code-du-travail-numerique/commit/7e932cf02bb3dd41764b53b30790a7ceef6344dc))
- **react-ui:** Update icon (svgr) ([#4139](https://github.com/SocialGouv/code-du-travail-numerique/issues/4139)) ([ec27a43](https://github.com/SocialGouv/code-du-travail-numerique/commit/ec27a43b84a655ef1d012aab047efb655aac4f9d))

### Features

- **simulator:** add CC 3239 for all simulators ([#4122](https://github.com/SocialGouv/code-du-travail-numerique/issues/4122)) ([4f251d6](https://github.com/SocialGouv/code-du-travail-numerique/commit/4f251d6f179b74ad08eb8ba0da2e3a8057d19d22))

# [4.64.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.63.1...v4.64.0) (2021-12-30)

### Bug Fixes

- **deps:** update dependency next to v11.1.3 [security] ([#4127](https://github.com/SocialGouv/code-du-travail-numerique/issues/4127)) ([9c45459](https://github.com/SocialGouv/code-du-travail-numerique/commit/9c454596242f09a87d6391de36e6593c72c82b24))
- **frontend:** regex tooltip ([#4136](https://github.com/SocialGouv/code-du-travail-numerique/issues/4136)) ([fa194b0](https://github.com/SocialGouv/code-du-travail-numerique/commit/fa194b009d11d83e5582a4860f65c8dfad6fbe88))
- **frontend:** remove cookies tracker (tarteaucitron + AT Internet) ([#4133](https://github.com/SocialGouv/code-du-travail-numerique/issues/4133)) ([8333f6a](https://github.com/SocialGouv/code-du-travail-numerique/commit/8333f6a1b96bd7add9ad2a62a063eb629acb1ecc))
- **frontend:** remove tag from dailymotion embed ([#4135](https://github.com/SocialGouv/code-du-travail-numerique/issues/4135)) ([110b77d](https://github.com/SocialGouv/code-du-travail-numerique/commit/110b77dc661c16ac607871f24dcd7e82a1f076c0))
- **frontend:** spacing page personnalisable + ajout d'un `p` ([#4137](https://github.com/SocialGouv/code-du-travail-numerique/issues/4137)) ([a9f1e59](https://github.com/SocialGouv/code-du-travail-numerique/commit/a9f1e5912404c45679a0becf142a8742c1b2cdee))

### Features

- **frontend:** redirection CC 2111 and 2395 to 3239 ([#4134](https://github.com/SocialGouv/code-du-travail-numerique/issues/4134)) ([dee15fb](https://github.com/SocialGouv/code-du-travail-numerique/commit/dee15fb7456086df3838a3ed5744e49fb3007d97))

## [4.63.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.63.0...v4.63.1) (2021-12-22)

### Bug Fixes

- **frontend:** html on enterprise button ([#4132](https://github.com/SocialGouv/code-du-travail-numerique/issues/4132)) ([5d6c095](https://github.com/SocialGouv/code-du-travail-numerique/commit/5d6c095a2d9c86d3715a6d984a9af345a9e70d27))

# [4.63.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.62.0...v4.63.0) (2021-12-22)

### Bug Fixes

- **api:** search weight for CC ([#4129](https://github.com/SocialGouv/code-du-travail-numerique/issues/4129)) ([74b0e1f](https://github.com/SocialGouv/code-du-travail-numerique/commit/74b0e1f3da32f5f61b9c4763c725413a0942678c))

### Features

- **api:** add highlight on search ([#4130](https://github.com/SocialGouv/code-du-travail-numerique/issues/4130)) ([01384d2](https://github.com/SocialGouv/code-du-travail-numerique/commit/01384d2878f22a265ce38fdaf7cfe652d3edca7b))

# [4.62.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.61.0...v4.62.0) (2021-12-21)

### Bug Fixes

- **api:** french ([#4128](https://github.com/SocialGouv/code-du-travail-numerique/issues/4128)) ([0a140f1](https://github.com/SocialGouv/code-du-travail-numerique/commit/0a140f18b835f4a03eb9df32062188b3c6cedd39))
- **app:** spacing on search results ([#4123](https://github.com/SocialGouv/code-du-travail-numerique/issues/4123)) ([32e5d13](https://github.com/SocialGouv/code-du-travail-numerique/commit/32e5d13d7823c0650fb15a7c029264774be852ea))
- **deps:** update all dependencies ([#3706](https://github.com/SocialGouv/code-du-travail-numerique/issues/3706)) ([3507c59](https://github.com/SocialGouv/code-du-travail-numerique/commit/3507c59efe0a592f88c48b2f1988ef2d30323691))
- **sdr:** url grand est ([#4124](https://github.com/SocialGouv/code-du-travail-numerique/issues/4124)) ([b523500](https://github.com/SocialGouv/code-du-travail-numerique/commit/b5235007c971a10a7a4e50252b761960028e7a18))

### Features

- **api:** add synonymes ([#4126](https://github.com/SocialGouv/code-du-travail-numerique/issues/4126)) ([fbe0127](https://github.com/SocialGouv/code-du-travail-numerique/commit/fbe01276b100d8bf225f08738f115fdcbb934452))

# [4.61.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.60.3...v4.61.0) (2021-12-20)

### Bug Fixes

- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.241.0 ([#4082](https://github.com/SocialGouv/code-du-travail-numerique/issues/4082)) ([614482d](https://github.com/SocialGouv/code-du-travail-numerique/commit/614482d1d9d8b9781bc551047a67afc13d80c9c2))
- **frontend:** security XSS / image tag ([#4030](https://github.com/SocialGouv/code-du-travail-numerique/issues/4030)) ([28c122d](https://github.com/SocialGouv/code-du-travail-numerique/commit/28c122d52fa919b2f39d1a591d76c3f1c7e1391e))
- **k8s:** increase www pod requests to reduce HPA issues ([#4100](https://github.com/SocialGouv/code-du-travail-numerique/issues/4100)) ([ea40db7](https://github.com/SocialGouv/code-du-travail-numerique/commit/ea40db7b9258943c9ece6af3498f4f0c0f24c1b5))
- **rgaa:** 8.9 P01 à P04 ([#4083](https://github.com/SocialGouv/code-du-travail-numerique/issues/4083)) ([0c37ac5](https://github.com/SocialGouv/code-du-travail-numerique/commit/0c37ac514f0dd8189b997e102b67072c260b4a15))
- **rgaa:** add the title "page courante" to the menu ([#4093](https://github.com/SocialGouv/code-du-travail-numerique/issues/4093)) ([673122f](https://github.com/SocialGouv/code-du-travail-numerique/commit/673122fd3c1bc9c2208b62fcdaed6cbcb083b7b9))
- **secu:** add k8s network policies and update snaps ([#4109](https://github.com/SocialGouv/code-du-travail-numerique/issues/4109)) ([05e76a8](https://github.com/SocialGouv/code-du-travail-numerique/commit/05e76a82a960a98b93b5efd804ebeff3baa10746))
- **simulator:** préavis de retraite => Q° restent à remplir quand je… ([#4072](https://github.com/SocialGouv/code-du-travail-numerique/issues/4072)) ([3d0be81](https://github.com/SocialGouv/code-du-travail-numerique/commit/3d0be814b138c28543bcf96895974ec1a46ddc30))

### Features

- **agreement:** add a highlight on search agreements ([#4117](https://github.com/SocialGouv/code-du-travail-numerique/issues/4117)) ([9acd5ab](https://github.com/SocialGouv/code-du-travail-numerique/commit/9acd5abfead3fdcc8fee23c6e160c6c1afbf899e))
- **agreement:** add an highlight on agreement ([#4115](https://github.com/SocialGouv/code-du-travail-numerique/issues/4115)) ([a29de2a](https://github.com/SocialGouv/code-du-travail-numerique/commit/a29de2a574d3decab43dbaaf7f3ffd722e5dabd5))
- **simulator:** add CC 1516 (Organismes de formation) ([#4056](https://github.com/SocialGouv/code-du-travail-numerique/issues/4056)) ([3d6feec](https://github.com/SocialGouv/code-du-travail-numerique/commit/3d6feec0acdcdad973daa469d169e721fe661d68))
- **simulator:** add CC 1606 (Bricolage) ([#4061](https://github.com/SocialGouv/code-du-travail-numerique/issues/4061)) ([c440440](https://github.com/SocialGouv/code-du-travail-numerique/commit/c44044037b72335f2565a134d2b97b34fad3004a))
- **simulator:** add CC 2420 (Bâtiment cadres) ([#4057](https://github.com/SocialGouv/code-du-travail-numerique/issues/4057)) ([ac2d827](https://github.com/SocialGouv/code-du-travail-numerique/commit/ac2d8276b9c588f219e29214a193ef1ae771720b))
- **simulator:** add CC 2511 (Sport) ([#4058](https://github.com/SocialGouv/code-du-travail-numerique/issues/4058)) ([1c9838e](https://github.com/SocialGouv/code-du-travail-numerique/commit/1c9838efcbc2678398716df63f57a30af725dcd3))
- **simulator:** add CC 2614 (Travaux publics) ([#4059](https://github.com/SocialGouv/code-du-travail-numerique/issues/4059)) ([2023c7c](https://github.com/SocialGouv/code-du-travail-numerique/commit/2023c7c87bb3ff3f122a6903d068245a2c2acb9a))

## [4.60.3](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.60.2...v4.60.3) (2021-12-07)

### Bug Fixes

- **accordion:** do not crash if no titleLevel ([#4104](https://github.com/SocialGouv/code-du-travail-numerique/issues/4104)) ([ac2f192](https://github.com/SocialGouv/code-du-travail-numerique/commit/ac2f192c07d53b7eaac0c599d0d83ae571377039))
- **simulateur:** change url of salaire brut/net to mon-entreprise.urssaf.fr ([#4106](https://github.com/SocialGouv/code-du-travail-numerique/issues/4106)) ([cce3742](https://github.com/SocialGouv/code-du-travail-numerique/commit/cce3742b5a61d454014a706587f0892821c9f5d4))

## [4.60.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.60.1...v4.60.2) (2021-12-06)

**Note:** Version bump only for package @socialgouv/code-du-travail

## [4.60.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.60.0...v4.60.1) (2021-12-06)

### Bug Fixes

- **ci:** fix slugify ([#4040](https://github.com/SocialGouv/code-du-travail-numerique/issues/4040)) ([6442636](https://github.com/SocialGouv/code-du-travail-numerique/commit/6442636946a725a2fc059e1c68c214f4a89b9e43))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.235.0 ([#4043](https://github.com/SocialGouv/code-du-travail-numerique/issues/4043)) ([a812149](https://github.com/SocialGouv/code-du-travail-numerique/commit/a8121491d44e9ec80855bef9d454d9caf27d38ce))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.237.0 ([#4050](https://github.com/SocialGouv/code-du-travail-numerique/issues/4050)) ([233f600](https://github.com/SocialGouv/code-du-travail-numerique/commit/233f600b00f94f9e7d867a627b900e48eecfbe83))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.238.0 ([#4055](https://github.com/SocialGouv/code-du-travail-numerique/issues/4055)) ([761b638](https://github.com/SocialGouv/code-du-travail-numerique/commit/761b6385b87f23977171f64661c9b27293cc044d))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.239.0 ([#4075](https://github.com/SocialGouv/code-du-travail-numerique/issues/4075)) ([24c408f](https://github.com/SocialGouv/code-du-travail-numerique/commit/24c408f01c600338b18508fd46e3d8fabb76ae33))
- **frontend:** message du préavis de retraite ([#4048](https://github.com/SocialGouv/code-du-travail-numerique/issues/4048)) ([c853e15](https://github.com/SocialGouv/code-du-travail-numerique/commit/c853e15c89f83387c175b143acdadeffd7284623))
- **frontend:** remove survey modal ([#4068](https://github.com/SocialGouv/code-du-travail-numerique/issues/4068)) ([49ff445](https://github.com/SocialGouv/code-du-travail-numerique/commit/49ff445552b77dc186ea4a3e23fcc505be1b57ba))
- **hn:** add headings in accordion when possible ([#4038](https://github.com/SocialGouv/code-du-travail-numerique/issues/4038)) ([590dc7a](https://github.com/SocialGouv/code-du-travail-numerique/commit/590dc7af0739481fbe82e44e4a3756fed934b5bf))
- **html validity:** clean attributes un-needed on htlm tags ([#4045](https://github.com/SocialGouv/code-du-travail-numerique/issues/4045)) ([8421996](https://github.com/SocialGouv/code-du-travail-numerique/commit/84219961b373129ac70da6b21ae6527ccdd2cfbf))
- **modeles:** préavis retraite message ([#4024](https://github.com/SocialGouv/code-du-travail-numerique/issues/4024)) ([064822d](https://github.com/SocialGouv/code-du-travail-numerique/commit/064822d74ba0441f85f69297584583171d702397))
- **preavis de retraite:** fix error when no cc on preavis de retraite… ([#4046](https://github.com/SocialGouv/code-du-travail-numerique/issues/4046)) ([185de9a](https://github.com/SocialGouv/code-du-travail-numerique/commit/185de9a891c24f5a4e2b704e96b859e0727674f6))
- **rgaa:** criteria 11.5 ([#4054](https://github.com/SocialGouv/code-du-travail-numerique/issues/4054)) ([1f819bf](https://github.com/SocialGouv/code-du-travail-numerique/commit/1f819bfc1020868391ebc1027755f399c9720e19))
- **rgaa:** criteria 9.1 ([#4053](https://github.com/SocialGouv/code-du-travail-numerique/issues/4053)) ([bc487e2](https://github.com/SocialGouv/code-du-travail-numerique/commit/bc487e222a9c6747f6f6349b60a930436202ab43))
- **RGAA:** 8.9 P07 + 10.3 P13 ([#4047](https://github.com/SocialGouv/code-du-travail-numerique/issues/4047)) ([2418aa3](https://github.com/SocialGouv/code-du-travail-numerique/commit/2418aa3052f4d98090801c333ccfd88bad497b16))
- **simulator:** avoid help disappear on select answer ([#4039](https://github.com/SocialGouv/code-du-travail-numerique/issues/4039)) ([8d33db1](https://github.com/SocialGouv/code-du-travail-numerique/commit/8d33db171322304f589d5760fc9f11fea453803f))
- **simulators:** error on : "l'indemnité de licenciement" ([#4037](https://github.com/SocialGouv/code-du-travail-numerique/issues/4037)) ([45e5f7d](https://github.com/SocialGouv/code-du-travail-numerique/commit/45e5f7d432218d44c8562faa51b01f7361e14d19))
- **wizard button:** regresison after accessibility code ([#4069](https://github.com/SocialGouv/code-du-travail-numerique/issues/4069)) ([d20487a](https://github.com/SocialGouv/code-du-travail-numerique/commit/d20487a65d99a0f39ee036d7954f95a532dd43d7))

# [4.60.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.59.0...v4.60.0) (2021-11-24)

### Bug Fixes

- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.232.0 ([#4025](https://github.com/SocialGouv/code-du-travail-numerique/issues/4025)) ([c551212](https://github.com/SocialGouv/code-du-travail-numerique/commit/c5512120da493f8f22704fbe1629c4ea7ebf7e82))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.233.0 ([#4032](https://github.com/SocialGouv/code-du-travail-numerique/issues/4032)) ([00a72e4](https://github.com/SocialGouv/code-du-travail-numerique/commit/00a72e45e77cf85bf945066543bad730f65882b4))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.234.0 ([#4035](https://github.com/SocialGouv/code-du-travail-numerique/issues/4035)) ([0811599](https://github.com/SocialGouv/code-du-travail-numerique/commit/0811599907485d79f5caca1c1c55f2c245071f60))

### Features

- **modeles:** add cc 1517 retirement ([#4001](https://github.com/SocialGouv/code-du-travail-numerique/issues/4001)) ([55472a6](https://github.com/SocialGouv/code-du-travail-numerique/commit/55472a6fbd544f775da7da80eca8e45f816a9f9a))
- **modeles:** add cc 1672 retirement ([#4002](https://github.com/SocialGouv/code-du-travail-numerique/issues/4002)) ([8fde611](https://github.com/SocialGouv/code-du-travail-numerique/commit/8fde6114b15fa1e47b214221f8af13e653231b18))
- **modeles:** add cc 1740 retirement ([#4000](https://github.com/SocialGouv/code-du-travail-numerique/issues/4000)) ([055f926](https://github.com/SocialGouv/code-du-travail-numerique/commit/055f92630fc90baf0c6dde267f4e710631622e75))
- **modeles:** add cc 1996 retirement ([#4003](https://github.com/SocialGouv/code-du-travail-numerique/issues/4003)) ([b4fc604](https://github.com/SocialGouv/code-du-travail-numerique/commit/b4fc604553f1614de67508726f6ef9027743463b))
- **modeles:** add cc 3127 retirement ([#4004](https://github.com/SocialGouv/code-du-travail-numerique/issues/4004)) ([ab89b51](https://github.com/SocialGouv/code-du-travail-numerique/commit/ab89b519944f5d585dd874295c30789ffa911afc))

# [4.59.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.58.2...v4.59.0) (2021-11-18)

### Bug Fixes

- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.231.0 ([#4022](https://github.com/SocialGouv/code-du-travail-numerique/issues/4022)) ([6df984f](https://github.com/SocialGouv/code-du-travail-numerique/commit/6df984f6e05f417916e78f65a6ac90c29eb2c054))

### Features

- **test:** ajout des tests unitaires pour le simulateur de tracking ([#4019](https://github.com/SocialGouv/code-du-travail-numerique/issues/4019)) ([0d5fb46](https://github.com/SocialGouv/code-du-travail-numerique/commit/0d5fb46e77d7980b9b4f000d38179ffb6239a759))

## [4.58.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.58.1...v4.58.2) (2021-11-17)

### Bug Fixes

- **simulator:** use the new logo for preavis retraite ([#4018](https://github.com/SocialGouv/code-du-travail-numerique/issues/4018)) ([26eb3de](https://github.com/SocialGouv/code-du-travail-numerique/commit/26eb3de908fb35a6a718dcc9b846dcb5f6c39891))

## [4.58.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.58.0...v4.58.1) (2021-11-17)

### Bug Fixes

- **simulator:** enable preavis retraite simulator on prod ([#4017](https://github.com/SocialGouv/code-du-travail-numerique/issues/4017)) ([232c99a](https://github.com/SocialGouv/code-du-travail-numerique/commit/232c99a090126b6e95462735233c7768cfbc425d))

# [4.58.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.57.1...v4.58.0) (2021-11-17)

### Bug Fixes

- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.228.0 ([#3931](https://github.com/SocialGouv/code-du-travail-numerique/issues/3931)) ([cbeeee7](https://github.com/SocialGouv/code-du-travail-numerique/commit/cbeeee7b59788542a12d9c0282a98409f2b891b9))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.229.0 ([#3999](https://github.com/SocialGouv/code-du-travail-numerique/issues/3999)) ([923a979](https://github.com/SocialGouv/code-du-travail-numerique/commit/923a979a484be18d589a5f871a33bffcb25530aa))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.230.0 ([#4011](https://github.com/SocialGouv/code-du-travail-numerique/issues/4011)) ([7477bd8](https://github.com/SocialGouv/code-du-travail-numerique/commit/7477bd8755f307137b169432c26af4b103309d8a))
- **frontend:** fix footer alignement ([#4005](https://github.com/SocialGouv/code-du-travail-numerique/issues/4005)) ([df7d381](https://github.com/SocialGouv/code-du-travail-numerique/commit/df7d3817149c889d3b5a45b1ee4db53c6854392e))
- **RGAA 10.6:** make the email link more visible in contact dialog ([#4008](https://github.com/SocialGouv/code-du-travail-numerique/issues/4008)) ([dcce8da](https://github.com/SocialGouv/code-du-travail-numerique/commit/dcce8dadbcb403a5dd8f400739afc80bd1cf7b27))

### Features

- **simulators:** feedbacks after review ([#3997](https://github.com/SocialGouv/code-du-travail-numerique/issues/3997)) ([199e418](https://github.com/SocialGouv/code-du-travail-numerique/commit/199e4184e506a1956c5f5e9b8b66178ca051b558))
- **tracking:** cc treated or untreated are tracked ([#3872](https://github.com/SocialGouv/code-du-travail-numerique/issues/3872)) ([eb09cbb](https://github.com/SocialGouv/code-du-travail-numerique/commit/eb09cbb8564f5ffdf984255e993d903727297696))
- **tracking:** metrics on help click ([#3948](https://github.com/SocialGouv/code-du-travail-numerique/issues/3948)) ([2300a18](https://github.com/SocialGouv/code-du-travail-numerique/commit/2300a18fc53724dcc45ec1abde3e818b389d78f8))

## [4.57.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.57.0...v4.57.1) (2021-11-09)

### Bug Fixes

- **frontend:** Canonical + 404 ([#3979](https://github.com/SocialGouv/code-du-travail-numerique/issues/3979)) ([f62ba8a](https://github.com/SocialGouv/code-du-travail-numerique/commit/f62ba8a83a66e5988acc02098f75c09d04740ad0))
- **simulators:** fix on preavis de retraite after review ([#3956](https://github.com/SocialGouv/code-du-travail-numerique/issues/3956)) ([511a72f](https://github.com/SocialGouv/code-du-travail-numerique/commit/511a72f49bb65fbc485ce50d1e0520f2bd93963b))

# [4.57.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.56.5...v4.57.0) (2021-11-09)

### Bug Fixes

- **modeles:** cc 1404 ([#3987](https://github.com/SocialGouv/code-du-travail-numerique/issues/3987)) ([393686a](https://github.com/SocialGouv/code-du-travail-numerique/commit/393686a13ca3232efdb1045781aa781f4113fa50))

### Features

- **pop-up:** disable cookie consent pop-up if not on production ([#3988](https://github.com/SocialGouv/code-du-travail-numerique/issues/3988)) ([5df8aae](https://github.com/SocialGouv/code-du-travail-numerique/commit/5df8aaedeb3cf044883bc5a0a6d5b220e4dda67e))

## [4.56.5](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.56.4...v4.56.5) (2021-11-05)

### Bug Fixes

- **ci:** preprod ([#3984](https://github.com/SocialGouv/code-du-travail-numerique/issues/3984)) ([e66d1d6](https://github.com/SocialGouv/code-du-travail-numerique/commit/e66d1d6343cc6282cfb305382da48370b78e0669))

## [4.56.4](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.56.3...v4.56.4) (2021-11-05)

### Bug Fixes

- **citron:** ajout des derniers éléments ([#3983](https://github.com/SocialGouv/code-du-travail-numerique/issues/3983)) ([05342e3](https://github.com/SocialGouv/code-du-travail-numerique/commit/05342e3c44eb088816d464a2940cab9aa9569ec1))

## [4.56.3](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.56.2...v4.56.3) (2021-11-05)

### Bug Fixes

- **ci:** tag preprod ([#3982](https://github.com/SocialGouv/code-du-travail-numerique/issues/3982)) ([b7693f2](https://github.com/SocialGouv/code-du-travail-numerique/commit/b7693f214c15eef752589f971add797186264a66))

## [4.56.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.56.1...v4.56.2) (2021-11-05)

### Bug Fixes

- **tarteaucitron:** load pop-up on built url (e.g. /outils/[slug]) ([#3981](https://github.com/SocialGouv/code-du-travail-numerique/issues/3981)) ([9f993b3](https://github.com/SocialGouv/code-du-travail-numerique/commit/9f993b39b1ae363543055b11eef1bce31041630c))

## [4.56.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.56.0...v4.56.1) (2021-11-04)

### Bug Fixes

- **ci:** use the preprod environment to generate preprod image ([#3980](https://github.com/SocialGouv/code-du-travail-numerique/issues/3980)) ([5c4c0db](https://github.com/SocialGouv/code-du-travail-numerique/commit/5c4c0db5a6f090a0608778070f81c8ca18a956b6))

# [4.56.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.55.1...v4.56.0) (2021-11-04)

### Bug Fixes

- **checkbox:** revert ([#3976](https://github.com/SocialGouv/code-du-travail-numerique/issues/3976)) ([1acb9c1](https://github.com/SocialGouv/code-du-travail-numerique/commit/1acb9c115967a06a430940a2d5aa888f264bbb94))
- **ci:** kosko ([#3930](https://github.com/SocialGouv/code-du-travail-numerique/issues/3930)) ([bf4b529](https://github.com/SocialGouv/code-du-travail-numerique/commit/bf4b5298ec30226bbc0f45ce3adae0ec3d4e4bb3))
- **ci:** quality optimization ([#3937](https://github.com/SocialGouv/code-du-travail-numerique/issues/3937)) ([617981a](https://github.com/SocialGouv/code-du-travail-numerique/commit/617981a81e0c6fcbafa69039e79f256554df7f64))
- **frontend:** checkbox partially clickable ([#3947](https://github.com/SocialGouv/code-du-travail-numerique/issues/3947)) ([722c086](https://github.com/SocialGouv/code-du-travail-numerique/commit/722c0866d0bcd14b8acd863bf348ddfc2eadc1bf))
- **html:** on page droit du travail & home page ([#3960](https://github.com/SocialGouv/code-du-travail-numerique/issues/3960)) ([86f5335](https://github.com/SocialGouv/code-du-travail-numerique/commit/86f533531f31a926cdd0e174a837bfce31eb993c))
- **modeles:** cc 1404 et cc 1518 ([#3933](https://github.com/SocialGouv/code-du-travail-numerique/issues/3933)) ([7d7629c](https://github.com/SocialGouv/code-du-travail-numerique/commit/7d7629ce399af250a30b1f529d6ca0eac7920842))
- **seo:** standardize website's titles ([#3898](https://github.com/SocialGouv/code-du-travail-numerique/issues/3898)) ([3685a6d](https://github.com/SocialGouv/code-du-travail-numerique/commit/3685a6d7a1350f35df7bf101ef20d93b38d7e386))
- **svg:** command ([#3971](https://github.com/SocialGouv/code-du-travail-numerique/issues/3971)) ([e413e99](https://github.com/SocialGouv/code-du-travail-numerique/commit/e413e99ddbbded249f92851dabca1860225b8507))
- **title:** use Collapse instead of accordion on References element ([#3934](https://github.com/SocialGouv/code-du-travail-numerique/issues/3934)) ([d844db5](https://github.com/SocialGouv/code-du-travail-numerique/commit/d844db556aed5a0c0d709ec3ce8743ca7853dbe5))
- deactivation ([#3943](https://github.com/SocialGouv/code-du-travail-numerique/issues/3943)) ([3bedbae](https://github.com/SocialGouv/code-du-travail-numerique/commit/3bedbae58338eaa624a7c1c9ad0496a4cb4e2dad))

### Features

- tarteaucitron added ([#3920](https://github.com/SocialGouv/code-du-travail-numerique/issues/3920)) ([46d60ab](https://github.com/SocialGouv/code-du-travail-numerique/commit/46d60abf06e41e1bbf608cbe02b2a3bd65a8f138))
- **modeles:** add cc 2264 retirement ([#3826](https://github.com/SocialGouv/code-du-travail-numerique/issues/3826)) ([a1b2d3f](https://github.com/SocialGouv/code-du-travail-numerique/commit/a1b2d3fdf9c5ff75ecb39bb1224982273bf7a139))
- add good params ([#3946](https://github.com/SocialGouv/code-du-travail-numerique/issues/3946)) ([4af5f76](https://github.com/SocialGouv/code-du-travail-numerique/commit/4af5f76bec18110fd694d42582f4cfb29984c4b1))

## [4.55.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.55.0...v4.55.1) (2021-10-26)

### Bug Fixes

- secrets ([#3929](https://github.com/SocialGouv/code-du-travail-numerique/issues/3929)) ([e57daa7](https://github.com/SocialGouv/code-du-travail-numerique/commit/e57daa7ecf714f3da9b92b017a41f16cbb244826))

# [4.55.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.54.1...v4.55.0) (2021-10-26)

### Bug Fixes

- concurrency ([#3925](https://github.com/SocialGouv/code-du-travail-numerique/issues/3925)) ([5a96c20](https://github.com/SocialGouv/code-du-travail-numerique/commit/5a96c202a53ac1e5718fe16fa0a24d2c445c026c))
- release git ([#3926](https://github.com/SocialGouv/code-du-travail-numerique/issues/3926)) ([8945a3b](https://github.com/SocialGouv/code-du-travail-numerique/commit/8945a3bac5171b3e8c574eaf4439872149328c60))
- secrets ([#3927](https://github.com/SocialGouv/code-du-travail-numerique/issues/3927)) ([f496cab](https://github.com/SocialGouv/code-du-travail-numerique/commit/f496cab46f996e876a8bfa7107ebc2aacfa9b31d))
- secrets ([#3928](https://github.com/SocialGouv/code-du-travail-numerique/issues/3928)) ([a9fb772](https://github.com/SocialGouv/code-du-travail-numerique/commit/a9fb772b4ff97ac6e7a28c20df2437b57251d7e7))
- **accessibility:** make html is valid on all pages ([#3846](https://github.com/SocialGouv/code-du-travail-numerique/issues/3846)) ([04c11a7](https://github.com/SocialGouv/code-du-travail-numerique/commit/04c11a7798ed04f74172e5b89cab9e3f022a386b))
- **command:** add typescript for dev mode api ([#3891](https://github.com/SocialGouv/code-du-travail-numerique/issues/3891)) ([2051396](https://github.com/SocialGouv/code-du-travail-numerique/commit/2051396977a5fd7d3bb174b06dc2ff21f2010e45))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.218.0 ([#3885](https://github.com/SocialGouv/code-du-travail-numerique/issues/3885)) ([262c495](https://github.com/SocialGouv/code-du-travail-numerique/commit/262c4953c4884ba51fbd4423b887c41d0ec8198e))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.219.0 ([#3890](https://github.com/SocialGouv/code-du-travail-numerique/issues/3890)) ([86c99ba](https://github.com/SocialGouv/code-du-travail-numerique/commit/86c99ba7fcb49117dc06275d5c977f0a49a886ec))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.220.0 ([#3915](https://github.com/SocialGouv/code-du-travail-numerique/issues/3915)) ([fff2b5d](https://github.com/SocialGouv/code-du-travail-numerique/commit/fff2b5da0aa9ff4af29c05c7ff813431ae4b74e4))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.221.0 ([#3918](https://github.com/SocialGouv/code-du-travail-numerique/issues/3918)) ([3e4c2b2](https://github.com/SocialGouv/code-du-travail-numerique/commit/3e4c2b22b08b3c25bc1816047574aac20d9ae902))
- **frontend:** modify h-n structure ([#3784](https://github.com/SocialGouv/code-du-travail-numerique/issues/3784)) ([e0e610a](https://github.com/SocialGouv/code-du-travail-numerique/commit/e0e610a4f89407f63e249621f97e58ad539213f1))
- **frontend:** spacing result ([#3875](https://github.com/SocialGouv/code-du-travail-numerique/issues/3875)) ([6ecc109](https://github.com/SocialGouv/code-du-travail-numerique/commit/6ecc109ece297e999a1e5e911fc443e03447db6b))
- **html:** Fix html validity (remove form within form on wizard) ([#3899](https://github.com/SocialGouv/code-du-travail-numerique/issues/3899)) ([967bf64](https://github.com/SocialGouv/code-du-travail-numerique/commit/967bf64b765bbf7e80f6581bc30e75cec4aa58a6))
- **IDLL:** Fix calcul indemnité de calcul dans le cas d'une prime et d'un salaire ([#3905](https://github.com/SocialGouv/code-du-travail-numerique/issues/3905)) ([11539a5](https://github.com/SocialGouv/code-du-travail-numerique/commit/11539a5e420db1479aeb4c6e273f4ea7740a9288))
- **modeles:** cc préavis-retraite ([#3921](https://github.com/SocialGouv/code-du-travail-numerique/issues/3921)) ([7daa746](https://github.com/SocialGouv/code-du-travail-numerique/commit/7daa7460b88ab46c05353006cae1fd8d85d41e14))
- **security:** 'unsafe-inline' inside script-src ([#3862](https://github.com/SocialGouv/code-du-travail-numerique/issues/3862)) ([5a2dc74](https://github.com/SocialGouv/code-du-travail-numerique/commit/5a2dc74c081817ac881cd3479036654edb0e1e89))
- **simulators:** when CC has no info to ask, skip info step ([#3886](https://github.com/SocialGouv/code-du-travail-numerique/issues/3886)) ([e6f66f8](https://github.com/SocialGouv/code-du-travail-numerique/commit/e6f66f88f2682d011a3824d0f9e5003fcea41c4b))
- **storybook:** action github ([#3908](https://github.com/SocialGouv/code-du-travail-numerique/issues/3908)) ([f01fa2e](https://github.com/SocialGouv/code-du-travail-numerique/commit/f01fa2ebcf3a6555a85b071cc461c357bf1a7bb8))
- ci ([#3879](https://github.com/SocialGouv/code-du-travail-numerique/issues/3879)) ([2409ad1](https://github.com/SocialGouv/code-du-travail-numerique/commit/2409ad1b51e57a2f6b119f6107a99fde64ef10d2))

### Features

- **accessiblity:** fix blue and red color on some pages in accessibility mode ([#3871](https://github.com/SocialGouv/code-du-travail-numerique/issues/3871)) ([bbb997f](https://github.com/SocialGouv/code-du-travail-numerique/commit/bbb997fa024dbfc064a81d96823122fea9039471))
- **ci:** optimize CI and replace gitlab ci ([#3895](https://github.com/SocialGouv/code-du-travail-numerique/issues/3895)) ([f44baf5](https://github.com/SocialGouv/code-du-travail-numerique/commit/f44baf531a4075d42d424d438dba51c85571a65a))
- **e2e:** add test for canonical ([#3819](https://github.com/SocialGouv/code-du-travail-numerique/issues/3819)) ([0160f2d](https://github.com/SocialGouv/code-du-travail-numerique/commit/0160f2d654cbf7d4a380327f34ac40cc150f7d53))
- **modeles:** add cc 1518 retirement ([#3833](https://github.com/SocialGouv/code-du-travail-numerique/issues/3833)) ([34c8ba8](https://github.com/SocialGouv/code-du-travail-numerique/commit/34c8ba808293116ab3158077d19a50bd83fe5bdb))
- **simulator:** add matomo event on show more link ([#3884](https://github.com/SocialGouv/code-du-travail-numerique/issues/3884)) ([4de4fe2](https://github.com/SocialGouv/code-du-travail-numerique/commit/4de4fe2caf7240d7d6f4ab0117184a1946307f3b))
- **simulator:** add a specific message for coming agreements ([#3839](https://github.com/SocialGouv/code-du-travail-numerique/issues/3839)) ([320f144](https://github.com/SocialGouv/code-du-travail-numerique/commit/320f1449d20fea10fd5b44249c11d3022b175352))
- **simulator:** add CC 1404 ([#3809](https://github.com/SocialGouv/code-du-travail-numerique/issues/3809)) ([e94a694](https://github.com/SocialGouv/code-du-travail-numerique/commit/e94a6945e3b92818cc612248d8ce26e8e3f2e9e9))
- **simulator:** Add CC 1979 ([#3825](https://github.com/SocialGouv/code-du-travail-numerique/issues/3825)) ([252d419](https://github.com/SocialGouv/code-du-travail-numerique/commit/252d4192fd00833a4ff73fd1eadb0a9a6802791d))
- **simulator:** add matomo for retirement ([#3864](https://github.com/SocialGouv/code-du-travail-numerique/issues/3864)) ([5bc44c3](https://github.com/SocialGouv/code-du-travail-numerique/commit/5bc44c3b48075c623bbd942b6b4b2fb494877810))

## [4.54.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.54.0...v4.54.1) (2021-10-15)

### Bug Fixes

- **pipeline:** correction ([#3878](https://github.com/SocialGouv/code-du-travail-numerique/issues/3878)) ([3ff3e4d](https://github.com/SocialGouv/code-du-travail-numerique/commit/3ff3e4d5911646c45b454ac01a7f99cc9e26c4fe))
- use ccn own api to search agreement ([#3877](https://github.com/SocialGouv/code-du-travail-numerique/issues/3877)) ([1d657d8](https://github.com/SocialGouv/code-du-travail-numerique/commit/1d657d8d97d209fe9e4abff6ea16405e32175e95))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.217.0 ([#3874](https://github.com/SocialGouv/code-du-travail-numerique/issues/3874)) ([3074bff](https://github.com/SocialGouv/code-du-travail-numerique/commit/3074bfff137ea94f31222d46c54b3773080b3f3b))

# 4.54.0 (2021-10-14)

### Bug Fixes

- **data:** linter and reference about Code du travail ([#3831](https://github.com/SocialGouv/code-du-travail-numerique/issues/3831)) ([0cb2fbf](https://github.com/SocialGouv/code-du-travail-numerique/commit/0cb2fbf4f0adba1ea6aea52e5265c349f0f4946b))
- **data:** linter is now effective ([#3859](https://github.com/SocialGouv/code-du-travail-numerique/issues/3859)) ([e7d046c](https://github.com/SocialGouv/code-du-travail-numerique/commit/e7d046c6a730785cc10b33ca0783afeb212557f6))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.206.0 ([#3793](https://github.com/SocialGouv/code-du-travail-numerique/issues/3793)) ([3ea1d20](https://github.com/SocialGouv/code-du-travail-numerique/commit/3ea1d2066e7b0b62f7ac6157338fea1ff8223d66))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.207.0 ([#3795](https://github.com/SocialGouv/code-du-travail-numerique/issues/3795)) ([c4aa8a9](https://github.com/SocialGouv/code-du-travail-numerique/commit/c4aa8a9ad609b71b8b8e3ccac77c1c039eece53a))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.208.0 ([#3800](https://github.com/SocialGouv/code-du-travail-numerique/issues/3800)) ([276e11b](https://github.com/SocialGouv/code-du-travail-numerique/commit/276e11ba415f423ac3493abd04905460619807db))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.209.0 ([#3810](https://github.com/SocialGouv/code-du-travail-numerique/issues/3810)) ([fa44f51](https://github.com/SocialGouv/code-du-travail-numerique/commit/fa44f516af403b4d61d205f955248f23b9d45294))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.210.0 ([#3815](https://github.com/SocialGouv/code-du-travail-numerique/issues/3815)) ([1ad8124](https://github.com/SocialGouv/code-du-travail-numerique/commit/1ad81245f69244b7cf17e1a1f69b43c7cc4bfd84))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.211.0 ([#3820](https://github.com/SocialGouv/code-du-travail-numerique/issues/3820)) ([49c79db](https://github.com/SocialGouv/code-du-travail-numerique/commit/49c79dbfa33333d5192984047e2fbdcc55e5a97e))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.212.0 ([#3829](https://github.com/SocialGouv/code-du-travail-numerique/issues/3829)) ([59a1b2c](https://github.com/SocialGouv/code-du-travail-numerique/commit/59a1b2c242eb551f79b96942b6f14fe395cdd3a7))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.213.0 ([#3835](https://github.com/SocialGouv/code-du-travail-numerique/issues/3835)) ([89b3faf](https://github.com/SocialGouv/code-du-travail-numerique/commit/89b3faf522c43b062954ae3d2ab694f2bdb18a48))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.214.0 ([#3842](https://github.com/SocialGouv/code-du-travail-numerique/issues/3842)) ([5564868](https://github.com/SocialGouv/code-du-travail-numerique/commit/5564868d89b0533c8f8c5bcc06babf7dc94084b8))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.215.0 ([#3852](https://github.com/SocialGouv/code-du-travail-numerique/issues/3852)) ([a9aa917](https://github.com/SocialGouv/code-du-travail-numerique/commit/a9aa917a91efc882d2974c61b63f819d622aa1b6))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.216.0 ([#3863](https://github.com/SocialGouv/code-du-travail-numerique/issues/3863)) ([be3a614](https://github.com/SocialGouv/code-du-travail-numerique/commit/be3a61478e8e6bd624dff6f615ed1c7fbbdd9904))
- **deps:** update dependency lit-element to v3 ([#3796](https://github.com/SocialGouv/code-du-travail-numerique/issues/3796)) ([1369c52](https://github.com/SocialGouv/code-du-travail-numerique/commit/1369c5295fc3a42ff52c4155c77b6d42bc832161))
- **deps:** update dependency puppeteer to v10 ([#3714](https://github.com/SocialGouv/code-du-travail-numerique/issues/3714)) ([5a37495](https://github.com/SocialGouv/code-du-travail-numerique/commit/5a37495388ded125b0efcb23bdee2849785ca0e5))
- **events:** debounce cc search events - 3814 ([#3840](https://github.com/SocialGouv/code-du-travail-numerique/issues/3840)) ([a2f4453](https://github.com/SocialGouv/code-du-travail-numerique/commit/a2f44531d0beddf8d6f6f6b731c9afde10f01cee))
- **frontend:** Add status code to 404, and other pages ([#3801](https://github.com/SocialGouv/code-du-travail-numerique/issues/3801)) ([5309fba](https://github.com/SocialGouv/code-du-travail-numerique/commit/5309fba9ec39ed9f5f0f4af09e111065af6515d3))
- **package.json:** update command ([#3805](https://github.com/SocialGouv/code-du-travail-numerique/issues/3805)) ([e48018b](https://github.com/SocialGouv/code-du-travail-numerique/commit/e48018ba7e093928d16185c66c1070c5e14ce315))
- **package.json:** update command ([#3816](https://github.com/SocialGouv/code-du-travail-numerique/issues/3816)) ([661321c](https://github.com/SocialGouv/code-du-travail-numerique/commit/661321c8b573fece484865dd9c1382860e487d5d))
- **search:** fix deduplication between PQ and Search ([#3850](https://github.com/SocialGouv/code-du-travail-numerique/issues/3850)) ([c6a3585](https://github.com/SocialGouv/code-du-travail-numerique/commit/c6a3585b8f1a0b167bdcdd28fd9b374088125ced))
- **ui:** add label to burger menu (accessibility) ([#3830](https://github.com/SocialGouv/code-du-travail-numerique/issues/3830)) ([6ebe2b9](https://github.com/SocialGouv/code-du-travail-numerique/commit/6ebe2b9f8b4fbbd34210d7cf37a5dddf40df6560))

### Features

- add lint-staged ([#3866](https://github.com/SocialGouv/code-du-travail-numerique/issues/3866)) ([c6f63ef](https://github.com/SocialGouv/code-du-travail-numerique/commit/c6f63efcc6c72aafa4f9b5c39b32cfc8872be8b9))
- **api:** add babel as processor instead of esm ([#3749](https://github.com/SocialGouv/code-du-travail-numerique/issues/3749)) ([25933f5](https://github.com/SocialGouv/code-du-travail-numerique/commit/25933f55cc07dba39716f0c227834da0c66c419f))
- **cc:** add 1480 ([#3807](https://github.com/SocialGouv/code-du-travail-numerique/issues/3807)) ([e2e4677](https://github.com/SocialGouv/code-du-travail-numerique/commit/e2e4677c506183f71e0fd25e7b578caa7c458242))
- **e2e:** add codecept ui to view more easily test e2e ([#3781](https://github.com/SocialGouv/code-du-travail-numerique/issues/3781)) ([7d7a555](https://github.com/SocialGouv/code-du-travail-numerique/commit/7d7a5554349b2cdb08d93ea665e76bfbab02c90c))
- **modeles:** add 1486 cc retirement ([#3818](https://github.com/SocialGouv/code-du-travail-numerique/issues/3818)) ([98717ff](https://github.com/SocialGouv/code-du-travail-numerique/commit/98717ff0d9d2eecb8f8899b118c824fe4f6205a2))
- **modeles:** add cc 1043 retirement ([#3776](https://github.com/SocialGouv/code-du-travail-numerique/issues/3776)) ([986badf](https://github.com/SocialGouv/code-du-travail-numerique/commit/986badf2b1a66cbc89f9c3c4f4abb8e34b29b7df))
- **modeles:** add cc 1351 retirement ([#3778](https://github.com/SocialGouv/code-du-travail-numerique/issues/3778)) ([44b3410](https://github.com/SocialGouv/code-du-travail-numerique/commit/44b34104542ad1a1c9d43465a4d26a2e19a0e360))
- **modeles:** add cc 1505 retirement ([#3822](https://github.com/SocialGouv/code-du-travail-numerique/issues/3822)) ([65328c3](https://github.com/SocialGouv/code-du-travail-numerique/commit/65328c3c6fdaa3d527b915f4fbd1d4c71f9eb0ea))
- **modeles:** add cc 1527 retirement ([#3834](https://github.com/SocialGouv/code-du-travail-numerique/issues/3834)) ([0a7caaa](https://github.com/SocialGouv/code-du-travail-numerique/commit/0a7caaa6633644a0070720604777156d637ed64b))
- **modeles:** add cc 1596 ([#3823](https://github.com/SocialGouv/code-du-travail-numerique/issues/3823)) ([2663e1a](https://github.com/SocialGouv/code-du-travail-numerique/commit/2663e1ad36668d8ebb361873f7042e671911d16b))
- **modeles:** add cc 1597 ([#3824](https://github.com/SocialGouv/code-du-travail-numerique/issues/3824)) ([1e46133](https://github.com/SocialGouv/code-du-travail-numerique/commit/1e461333acc540ecd90c3c208b4c555dd29ecf55))
- **modeles:** add cc 1720 ([#3837](https://github.com/SocialGouv/code-du-travail-numerique/issues/3837)) ([9fe81ca](https://github.com/SocialGouv/code-du-travail-numerique/commit/9fe81ca829da9d317de343cdca12d65673eaf5db))
- **modeles:** add cc 2098 retirement ([#3836](https://github.com/SocialGouv/code-du-travail-numerique/issues/3836)) ([dbbef90](https://github.com/SocialGouv/code-du-travail-numerique/commit/dbbef906e5d711cdb473db733515752ee83647c9))
- **modeles:** add cc 2120 retirement ([#3838](https://github.com/SocialGouv/code-du-travail-numerique/issues/3838)) ([51d1154](https://github.com/SocialGouv/code-du-travail-numerique/commit/51d1154e35e7ea4255301eef514916c55b08e0f8))
- **modeles:** add cc 2216 ([#3754](https://github.com/SocialGouv/code-du-travail-numerique/issues/3754)) ([85ede1e](https://github.com/SocialGouv/code-du-travail-numerique/commit/85ede1ed0cd193db8c10e188b726120e2276f859))
- **modeles:** add cc 3043 retirement ([#3748](https://github.com/SocialGouv/code-du-travail-numerique/issues/3748)) ([72133d2](https://github.com/SocialGouv/code-du-travail-numerique/commit/72133d2d7e6cffc2880524c63502e0d47c47cdd4))
- **pipeline:** ts to js ([#3827](https://github.com/SocialGouv/code-du-travail-numerique/issues/3827)) ([2042d3a](https://github.com/SocialGouv/code-du-travail-numerique/commit/2042d3a396fe692669360725efe846cc8e188983))
- **simulator:** add CC 1147 ([#3774](https://github.com/SocialGouv/code-du-travail-numerique/issues/3774)) ([b9761ad](https://github.com/SocialGouv/code-du-travail-numerique/commit/b9761ad5d56fcc619287c338f1f7bcd25340bef4))
- **simulator:** add CC 1266 ([#3775](https://github.com/SocialGouv/code-du-travail-numerique/issues/3775)) ([8901b08](https://github.com/SocialGouv/code-du-travail-numerique/commit/8901b084709f777dc9c63d6b8331db3c0e4422cf))
- **simulator:** add cc 1483 ([#3806](https://github.com/SocialGouv/code-du-travail-numerique/issues/3806)) ([c39d117](https://github.com/SocialGouv/code-du-travail-numerique/commit/c39d1179e6c403cdffc2e548dc3fe6f0b5521ae0))
- **simulator:** Add CC 1501 ([#3817](https://github.com/SocialGouv/code-du-travail-numerique/issues/3817)) ([98b7082](https://github.com/SocialGouv/code-du-travail-numerique/commit/98b7082ef9cc4791f1ace8276f2076ef1b4edfd5))
- **simulator:** add CC 2609 ([#3763](https://github.com/SocialGouv/code-du-travail-numerique/issues/3763)) ([db5a85e](https://github.com/SocialGouv/code-du-travail-numerique/commit/db5a85ec82ac58a60baa9276bb6cf53f928fdac8))
- **simulator:** add CC 787 ([#3773](https://github.com/SocialGouv/code-du-travail-numerique/issues/3773)) ([e09ef52](https://github.com/SocialGouv/code-du-travail-numerique/commit/e09ef5201551771ed654613ac1a29c53ae08655b))
- **simulator:** update description's text for simulator "preavis de retraire" ([#3849](https://github.com/SocialGouv/code-du-travail-numerique/issues/3849)) ([5213e1e](https://github.com/SocialGouv/code-du-travail-numerique/commit/5213e1e2997c334fab534ef9b099b99a04f0d40e))
- **simulators:** add CC 1090 & CC 843 ([#3751](https://github.com/SocialGouv/code-du-travail-numerique/issues/3751)) ([f575e75](https://github.com/SocialGouv/code-du-travail-numerique/commit/f575e75022f02c09d6f2304f2f3ca764a6afd527))
- **widget:** Add backlink to widget code snippet (SEO purpose) ([#3791](https://github.com/SocialGouv/code-du-travail-numerique/issues/3791)) ([7776d37](https://github.com/SocialGouv/code-du-travail-numerique/commit/7776d379e2f024ef84b3886dc0704db03cc37e7a))

## [4.53.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.53.0...v4.53.1) (2021-09-24)

### Bug Fixes

- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.202.0 ([#3758](https://github.com/SocialGouv/code-du-travail-numerique/issues/3758)) ([0f1bf76](https://github.com/SocialGouv/code-du-travail-numerique/commit/0f1bf7606288252cdaa3236c21ba48e8fd0810c5))
- **frontend:** add cannonical tag to all pages ([#3764](https://github.com/SocialGouv/code-du-travail-numerique/issues/3764)) ([6f8a5f3](https://github.com/SocialGouv/code-du-travail-numerique/commit/6f8a5f3be36a32f3876b0885820c642d31343de0))
- **frontend:** zoom and contribution error fixed ([#3771](https://github.com/SocialGouv/code-du-travail-numerique/issues/3771)) ([304e704](https://github.com/SocialGouv/code-du-travail-numerique/commit/304e704ba9f215cebbc41c97150a260bd3793741))

# 4.53.0 (2021-09-17)

### Bug Fixes

- **ci:** kube 1.2 ingress annotations ([#3740](https://github.com/SocialGouv/code-du-travail-numerique/issues/3740)) ([3f5cfec](https://github.com/SocialGouv/code-du-travail-numerique/commit/3f5cfec3446848d80f3d050a454df01700acdd96))
- **data:** fix some SDR urls ([#3672](https://github.com/SocialGouv/code-du-travail-numerique/issues/3672)) ([852695a](https://github.com/SocialGouv/code-du-travail-numerique/commit/852695a38344aa1ff1ca243acd8ae18e2ff94338))
- **deps:** update @vercel/next (major) ([#3663](https://github.com/SocialGouv/code-du-travail-numerique/issues/3663)) ([e31a171](https://github.com/SocialGouv/code-du-travail-numerique/commit/e31a171b1618917526485b190d3867bb41fe9914))
- **deps:** update all dependencies ([#3700](https://github.com/SocialGouv/code-du-travail-numerique/issues/3700)) ([1ae3000](https://github.com/SocialGouv/code-du-travail-numerique/commit/1ae3000d23d1288bb4a3fddda673caed55d03d04))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.181.0 ([#3638](https://github.com/SocialGouv/code-du-travail-numerique/issues/3638)) ([6a97857](https://github.com/SocialGouv/code-du-travail-numerique/commit/6a97857d35b493b11ab98fffe990c6087c471de3))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.182.0 ([#3691](https://github.com/SocialGouv/code-du-travail-numerique/issues/3691)) ([833bf0f](https://github.com/SocialGouv/code-du-travail-numerique/commit/833bf0fbdeae32fb63464c65afa334b8e5458ed3))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.184.0 ([#3692](https://github.com/SocialGouv/code-du-travail-numerique/issues/3692)) ([9a9cdaf](https://github.com/SocialGouv/code-du-travail-numerique/commit/9a9cdafadec690d293f23d22656e58a222a6c8d0))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.187.0 ([#3704](https://github.com/SocialGouv/code-du-travail-numerique/issues/3704)) ([2dc9562](https://github.com/SocialGouv/code-du-travail-numerique/commit/2dc9562748f0444187b72488d9b58e9802b3cc8c))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.190.0 ([#3710](https://github.com/SocialGouv/code-du-travail-numerique/issues/3710)) ([e345969](https://github.com/SocialGouv/code-du-travail-numerique/commit/e34596951888eefbe4e59dd6f876a51f239d8e50))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.191.0 ([#3729](https://github.com/SocialGouv/code-du-travail-numerique/issues/3729)) ([f904a07](https://github.com/SocialGouv/code-du-travail-numerique/commit/f904a07bdce31f39c227378d5e422218ff3ad5ba))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.192.0 ([#3731](https://github.com/SocialGouv/code-du-travail-numerique/issues/3731)) ([7e2c4bc](https://github.com/SocialGouv/code-du-travail-numerique/commit/7e2c4bc1a382334ab2dfca9b6370b395dcfbd9c5))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.193.0 ([#3734](https://github.com/SocialGouv/code-du-travail-numerique/issues/3734)) ([661977b](https://github.com/SocialGouv/code-du-travail-numerique/commit/661977b49a8f8eb1e9f582c5f9a37f0104e33688))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.194.0 ([#3736](https://github.com/SocialGouv/code-du-travail-numerique/issues/3736)) ([341388a](https://github.com/SocialGouv/code-du-travail-numerique/commit/341388ad895e89eb9433545a10eab2c21726dfa1))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.195.0 ([#3741](https://github.com/SocialGouv/code-du-travail-numerique/issues/3741)) ([8723911](https://github.com/SocialGouv/code-du-travail-numerique/commit/8723911126f9d3269fe459b7821abbaecdf4f6ee))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.197.0 ([#3744](https://github.com/SocialGouv/code-du-travail-numerique/issues/3744)) ([4e17417](https://github.com/SocialGouv/code-du-travail-numerique/commit/4e1741722110ea9f5ecb8c2dc4942f6f51eed4cd))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.198.0 ([#3745](https://github.com/SocialGouv/code-du-travail-numerique/issues/3745)) ([2596d26](https://github.com/SocialGouv/code-du-travail-numerique/commit/2596d266d8f3c0f66032f8468e33f57af42a486e))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.199.0 ([#3746](https://github.com/SocialGouv/code-du-travail-numerique/issues/3746)) ([f71eb01](https://github.com/SocialGouv/code-du-travail-numerique/commit/f71eb013c19405482e956b644b93c44a63e2b5ce))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.200.0 ([#3750](https://github.com/SocialGouv/code-du-travail-numerique/issues/3750)) ([93a1669](https://github.com/SocialGouv/code-du-travail-numerique/commit/93a166919462418dc8d1e370ae0a0623660f7f56))
- **deps:** update dependency @socialgouv/kosko-charts to v9 ([#3697](https://github.com/SocialGouv/code-du-travail-numerique/issues/3697)) ([6ee8a94](https://github.com/SocialGouv/code-du-travail-numerique/commit/6ee8a94358331aee8d3838cb7267230d6091a69e))
- **deps:** update dependency @types/jest to v27 ([#3711](https://github.com/SocialGouv/code-du-travail-numerique/issues/3711)) ([503b9e8](https://github.com/SocialGouv/code-du-travail-numerique/commit/503b9e85c4284d09fb4ad4819a4993b9cd8a964e))
- **deps:** update dependency fuzzball to v2 ([#3665](https://github.com/SocialGouv/code-du-travail-numerique/issues/3665)) ([3425aca](https://github.com/SocialGouv/code-du-travail-numerique/commit/3425aca50ec1661612fc1e94ff9bc277a2ed43e3))
- **deps:** update dependency husky to v7 ([#3666](https://github.com/SocialGouv/code-du-travail-numerique/issues/3666)) ([8e3e588](https://github.com/SocialGouv/code-du-travail-numerique/commit/8e3e588383f5a058c7211cb3cd15b1e30dac7f14))
- **deps:** update dependency js-cookie to v3 ([#3667](https://github.com/SocialGouv/code-du-travail-numerique/issues/3667)) ([71bc0ea](https://github.com/SocialGouv/code-du-travail-numerique/commit/71bc0eac068e5ee865855f1cb6e504e5e315435f))
- **deps:** update dependency rehype-parse to v8 ([#3715](https://github.com/SocialGouv/code-du-travail-numerique/issues/3715)) ([c714ef0](https://github.com/SocialGouv/code-du-travail-numerique/commit/c714ef07360f6260a0523e63eb59d30c9562daa7))
- **deps:** update socialgouv deployment tools ([#3698](https://github.com/SocialGouv/code-du-travail-numerique/issues/3698)) ([dea3e7b](https://github.com/SocialGouv/code-du-travail-numerique/commit/dea3e7b247d39bc3bd25d23373d3652273d527d5))
- **frontend:** 11.1 p13 + max 4 input for input date ([#3742](https://github.com/SocialGouv/code-du-travail-numerique/issues/3742)) ([fe0bf40](https://github.com/SocialGouv/code-du-travail-numerique/commit/fe0bf4040dd031669847ec5f5f9968043e90c5c6))
- **frontend:** add default label for floarting search ([#3709](https://github.com/SocialGouv/code-du-travail-numerique/issues/3709)) ([2b38185](https://github.com/SocialGouv/code-du-travail-numerique/commit/2b381852cb9bc3b1fc49d7130a0c7cdaf8200adb))
- **frontend:** fix trailing comma ([#3673](https://github.com/SocialGouv/code-du-travail-numerique/issues/3673)) ([2a2cca3](https://github.com/SocialGouv/code-du-travail-numerique/commit/2a2cca370418fa702cc9eb18a733d8ab57a3b801))
- **simulator:** see more on CC search go to the next simulator step ([#3705](https://github.com/SocialGouv/code-du-travail-numerique/issues/3705)) ([eb6b9b5](https://github.com/SocialGouv/code-du-travail-numerique/commit/eb6b9b5ddd6f883b5cbf59425aca3050fc1989ed))

### Features

- **accessibility:** add a title on active tab during a simulation for screen reader ([#3689](https://github.com/SocialGouv/code-du-travail-numerique/issues/3689)) ([72444b4](https://github.com/SocialGouv/code-du-travail-numerique/commit/72444b4594ddc4588c0197de67a6e390fdf0ad7a))
- **anaytics:** add AT Internet tracker ([#3732](https://github.com/SocialGouv/code-du-travail-numerique/issues/3732)) ([3d0b2df](https://github.com/SocialGouv/code-du-travail-numerique/commit/3d0b2df5e1a5f13bd4b993a95b16237aa426261c))
- **frontend:** add canonical link to contributions ([#3735](https://github.com/SocialGouv/code-du-travail-numerique/issues/3735)) ([33b74e8](https://github.com/SocialGouv/code-du-travail-numerique/commit/33b74e8f926a32ab7af43a726c6dfa674351202e))
- **frontend:** add new feedback form ([#3657](https://github.com/SocialGouv/code-du-travail-numerique/issues/3657)) ([334ffc1](https://github.com/SocialGouv/code-du-travail-numerique/commit/334ffc17f2b89eb3d3d95386b4e00d7c699a8199))
- **frontend:** add rgaa 9.3 ([#3725](https://github.com/SocialGouv/code-du-travail-numerique/issues/3725)) ([c2ec576](https://github.com/SocialGouv/code-du-travail-numerique/commit/c2ec5764384224c9ff7e3e6e23ee6b6fe381d696))
- **frontend:** image zoom ([#3727](https://github.com/SocialGouv/code-du-travail-numerique/issues/3727)) ([f2ed921](https://github.com/SocialGouv/code-du-travail-numerique/commit/f2ed921493890bbce51498d04c6b80430b0f04bb))
- **frontend:** rgaa 9.2 ([#3722](https://github.com/SocialGouv/code-du-travail-numerique/issues/3722)) ([5918c7f](https://github.com/SocialGouv/code-du-travail-numerique/commit/5918c7fcef60e663f3c18e2efe08b094c774f410))
- **frontend:** update label 11.9 RGAA4.1 + add command to package.json ([#3719](https://github.com/SocialGouv/code-du-travail-numerique/issues/3719)) ([42fa384](https://github.com/SocialGouv/code-du-travail-numerique/commit/42fa384253ea2c9a637eb813773f37d0e85db146))
- add a github action to update gitlab ([#3726](https://github.com/SocialGouv/code-du-travail-numerique/issues/3726)) ([179b34f](https://github.com/SocialGouv/code-du-travail-numerique/commit/179b34f5574ef99249e40984ed7347c305972548))

## [4.52.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.52.1...v4.52.2) (2021-08-02)

### Bug Fixes

- **ci:** fix PROJECT_PATH in release ([7c2b33d](https://github.com/SocialGouv/code-du-travail-numerique/commit/7c2b33d59f2d7849e2284adfdb5a1d15c2197902))
- **ci:** force PROJET_PATH for GH notifications ([#3671](https://github.com/SocialGouv/code-du-travail-numerique/issues/3671)) ([47fda50](https://github.com/SocialGouv/code-du-travail-numerique/commit/47fda50498162e349a5b8f0eeff6b926feab6509))
- **data:** update services-de-renseignement with new redirections ([#3643](https://github.com/SocialGouv/code-du-travail-numerique/issues/3643)) ([2151a72](https://github.com/SocialGouv/code-du-travail-numerique/commit/2151a724016e42e660dfe41af5d8a0ed42996836))
- **frontend:** remove survey ([#3651](https://github.com/SocialGouv/code-du-travail-numerique/issues/3651)) ([d7a1097](https://github.com/SocialGouv/code-du-travail-numerique/commit/d7a10973e1532fbca3245eca83eebfcf35f44503))
- dev2-dev urls ([#3645](https://github.com/SocialGouv/code-du-travail-numerique/issues/3645)) ([a9a0808](https://github.com/SocialGouv/code-du-travail-numerique/commit/a9a0808c5e95a32fa1d643e86de1aff5f2eb1ce3))
- update secret ([#3640](https://github.com/SocialGouv/code-du-travail-numerique/issues/3640)) ([9e2a8eb](https://github.com/SocialGouv/code-du-travail-numerique/commit/9e2a8ebcc93981d6c1762c30019a2c4ac0f6f985))
- **k8s:** update api secrets ([2a4b46d](https://github.com/SocialGouv/code-du-travail-numerique/commit/2a4b46dfa00c0b423144f5cd48da68296ca019df))

## [4.52.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.52.0...v4.52.1) (2021-07-20)

### Bug Fixes

- **deps:** update all dependencies ([#3570](https://github.com/SocialGouv/code-du-travail-numerique/issues/3570)) ([e45f56e](https://github.com/SocialGouv/code-du-travail-numerique/commit/e45f56e51b11a620a652c96334390b0069080c2f))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.163.0 ([#3632](https://github.com/SocialGouv/code-du-travail-numerique/issues/3632)) ([63a2777](https://github.com/SocialGouv/code-du-travail-numerique/commit/63a2777f0e20bbc9be4d79a42bde358a71d5ff8f))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.164.0 ([#3634](https://github.com/SocialGouv/code-du-travail-numerique/issues/3634)) ([3b77f13](https://github.com/SocialGouv/code-du-travail-numerique/commit/3b77f130cc8e0bbe4048d2c81f002105d06cf2cf))

# [4.52.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.51.3...v4.52.0) (2021-07-15)

### Bug Fixes

- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.157.0 ([#3601](https://github.com/SocialGouv/code-du-travail-numerique/issues/3601)) ([23eb69c](https://github.com/SocialGouv/code-du-travail-numerique/commit/23eb69c50224297026a503f1633b6019f8cc6b70))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.161.0 ([#3611](https://github.com/SocialGouv/code-du-travail-numerique/issues/3611)) ([c2c8587](https://github.com/SocialGouv/code-du-travail-numerique/commit/c2c8587d85987a25d94e102af2ad5e4990dc46c7))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.162.0 ([#3631](https://github.com/SocialGouv/code-du-travail-numerique/issues/3631)) ([d0944a3](https://github.com/SocialGouv/code-du-travail-numerique/commit/d0944a3d96efee0fd3f834382b89d787241bd431))
- azure storage cdtn url ([#3615](https://github.com/SocialGouv/code-du-travail-numerique/issues/3615)) ([09a6d00](https://github.com/SocialGouv/code-du-travail-numerique/commit/09a6d00dcf9791cc209fdee22a14fd7e126b33c5))

### Features

- **simulator:** show a message when the CC is not supported ([#3583](https://github.com/SocialGouv/code-du-travail-numerique/issues/3583)) ([c4ba1ac](https://github.com/SocialGouv/code-du-travail-numerique/commit/c4ba1ac5d16cfbf99b8f45b05147429cb6e1473b))

## [4.51.3](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.51.2...v4.51.3) (2021-06-29)

### Bug Fixes

- **ci:** fix FRONTEND_HOST and prod variables ([#3600](https://github.com/SocialGouv/code-du-travail-numerique/issues/3600)) ([2f3d0d7](https://github.com/SocialGouv/code-du-travail-numerique/commit/2f3d0d747a412d4eb5ea84410f76d27f57b3fa0e))
- use real prod hostnames and redirections ([#3599](https://github.com/SocialGouv/code-du-travail-numerique/issues/3599)) ([2bc15c0](https://github.com/SocialGouv/code-du-travail-numerique/commit/2bc15c0998612a13bdcdb2621e03707ca429115a))

## [4.51.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.51.1...v4.51.2) (2021-06-29)

### Bug Fixes

- force production namespace ([#3596](https://github.com/SocialGouv/code-du-travail-numerique/issues/3596)) ([02ced3e](https://github.com/SocialGouv/code-du-travail-numerique/commit/02ced3ead91ac2c58f8b8fb2583320db6202a839))
- force release ([#3598](https://github.com/SocialGouv/code-du-travail-numerique/issues/3598)) ([742de02](https://github.com/SocialGouv/code-du-travail-numerique/commit/742de02cee4174ac786d6e3a2f022c612219a1f9))

## [4.51.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.51.0...v4.51.1) (2021-06-29)

### Bug Fixes

- **accessibility:** add a button to search the service de renseignements ([#3572](https://github.com/SocialGouv/code-du-travail-numerique/issues/3572)) ([d1b0bfa](https://github.com/SocialGouv/code-du-travail-numerique/commit/d1b0bfa81d6a248028a421c7524d7461ecbfc953))
- **ci:** force ES_INDEX_PREFIX ([#3594](https://github.com/SocialGouv/code-du-travail-numerique/issues/3594)) ([c8d2247](https://github.com/SocialGouv/code-du-travail-numerique/commit/c8d2247f2cc94935a23ca95121cdef2798ba86da))
- **ci:** remove delete namespace ([#3593](https://github.com/SocialGouv/code-du-travail-numerique/issues/3593)) ([6bde22c](https://github.com/SocialGouv/code-du-travail-numerique/commit/6bde22c037f3173bfb1e7c48e39f638bc5a8f34d))

# [4.51.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.50.0...v4.51.0) (2021-06-29)

### Bug Fixes

- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.150.0 ([#3557](https://github.com/SocialGouv/code-du-travail-numerique/issues/3557)) ([0f8213c](https://github.com/SocialGouv/code-du-travail-numerique/commit/0f8213cc0f9559f4ceb27d2e72f802067f9241ab))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.151.0 ([#3567](https://github.com/SocialGouv/code-du-travail-numerique/issues/3567)) ([3583e60](https://github.com/SocialGouv/code-du-travail-numerique/commit/3583e6050581d5a320c77e490e13ecd737e7e46b))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.152.0 ([#3569](https://github.com/SocialGouv/code-du-travail-numerique/issues/3569)) ([f2d7e78](https://github.com/SocialGouv/code-du-travail-numerique/commit/f2d7e7897d6ac7c0f17003efdccd1e592bc1156e))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.153.0 ([#3576](https://github.com/SocialGouv/code-du-travail-numerique/issues/3576)) ([770d656](https://github.com/SocialGouv/code-du-travail-numerique/commit/770d656c2aa28c12ea7a336d676da0168c710795))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.154.0 ([#3580](https://github.com/SocialGouv/code-du-travail-numerique/issues/3580)) ([09068e0](https://github.com/SocialGouv/code-du-travail-numerique/commit/09068e0f23deec2ef67aada2dc4abb2dda6586ea))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.155.0 ([#3592](https://github.com/SocialGouv/code-du-travail-numerique/issues/3592)) ([eda7aba](https://github.com/SocialGouv/code-du-travail-numerique/commit/eda7aba36e75e0748849b8bbfcef0097b202e900))
- **frontend:** add new ccn tool ([#3490](https://github.com/SocialGouv/code-du-travail-numerique/issues/3490)) ([8e11520](https://github.com/SocialGouv/code-du-travail-numerique/commit/8e11520a2da10c44ab31009ad49eba8acfe3da77))
- **frontend:** fix a11y images criteria ([#3586](https://github.com/SocialGouv/code-du-travail-numerique/issues/3586)) ([4eef9fa](https://github.com/SocialGouv/code-du-travail-numerique/commit/4eef9fabcc79d6a86845222f0c1170931b4982f6))
- **frontend:** udpate a11y policy ([#3579](https://github.com/SocialGouv/code-du-travail-numerique/issues/3579)) ([ff168fc](https://github.com/SocialGouv/code-du-travail-numerique/commit/ff168fc7b0c73ec2c5e584e2da7457e2ceb26d7e))
- **simulator:** bring fixes follow the tests ([#3547](https://github.com/SocialGouv/code-du-travail-numerique/issues/3547)) ([cd509bd](https://github.com/SocialGouv/code-du-travail-numerique/commit/cd509bd461ac0d7f796cc2670ef966da5abf92b4))
- typofix ([#3558](https://github.com/SocialGouv/code-du-travail-numerique/issues/3558)) ([918c1c4](https://github.com/SocialGouv/code-du-travail-numerique/commit/918c1c447f9e7b3070d67b62dff77610861c176c))
- upgrade ci ([#3541](https://github.com/SocialGouv/code-du-travail-numerique/issues/3541)) ([0d1372c](https://github.com/SocialGouv/code-du-travail-numerique/commit/0d1372c952596702fc2e61221c34ed116946dbe5))

### Features

- **ci:** kosko deploy ([#3581](https://github.com/SocialGouv/code-du-travail-numerique/issues/3581)) ([0fd98c3](https://github.com/SocialGouv/code-du-travail-numerique/commit/0fd98c368d9da49b3cda170a04e10144e893955d))
- **meta:** use the theme and CC to build title for contribution pages ([#3540](https://github.com/SocialGouv/code-du-travail-numerique/issues/3540)) ([4486678](https://github.com/SocialGouv/code-du-travail-numerique/commit/4486678c926bf8444acb9d41749a5388f8869421))
- **search:** identify article search [#3471](https://github.com/SocialGouv/code-du-travail-numerique/issues/3471) ([#3548](https://github.com/SocialGouv/code-du-travail-numerique/issues/3548)) ([3bdc12e](https://github.com/SocialGouv/code-du-travail-numerique/commit/3bdc12ed1cd693401b5b856538837395ff95787a))
- **simulator:** add question about the handicap ([#3585](https://github.com/SocialGouv/code-du-travail-numerique/issues/3585)) ([ed8970b](https://github.com/SocialGouv/code-du-travail-numerique/commit/ed8970b4423ec4b61921207ec42385f0de2fcdb6))
- **simulator:** improve retirement simulator ([#3508](https://github.com/SocialGouv/code-du-travail-numerique/issues/3508)) ([abfd929](https://github.com/SocialGouv/code-du-travail-numerique/commit/abfd929522808afefad2bc8c20aaa95d9c3d909d))
- **simulator:** improve the UX of the origin step ([#3587](https://github.com/SocialGouv/code-du-travail-numerique/issues/3587)) ([bd4e4f1](https://github.com/SocialGouv/code-du-travail-numerique/commit/bd4e4f1dcfe903b52813000554a9e8119139503d))
- **simulator:** show user input detail on retirement notice ([#3510](https://github.com/SocialGouv/code-du-travail-numerique/issues/3510)) ([8a744ab](https://github.com/SocialGouv/code-du-travail-numerique/commit/8a744ab6942116e8e943380ffc3cb2715cd46da0))

# [4.50.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.49.0...v4.50.0) (2021-05-31)

### Bug Fixes

- packages/code-du-travail-frontend/package.json to reduce vulnerabilities ([#3495](https://github.com/SocialGouv/code-du-travail-numerique/issues/3495)) ([43dc43a](https://github.com/SocialGouv/code-du-travail-numerique/commit/43dc43ade611fb7535b1f89ed4f389c335e41362))

### Features

- **google:** add Google Search Console validation file for Virginie ([#3524](https://github.com/SocialGouv/code-du-travail-numerique/issues/3524)) ([c5973be](https://github.com/SocialGouv/code-du-travail-numerique/commit/c5973be3d44a5fd008ba8831fcb4fb8e486ec202))
- **simulateur:** add retirement for ccn 413 ([#3491](https://github.com/SocialGouv/code-du-travail-numerique/issues/3491)) ([6cac343](https://github.com/SocialGouv/code-du-travail-numerique/commit/6cac3431d89540f29755984cc3ef34ba7edfa9b8))
- **simulator:** add CC 275 to retirement notice simulator ([#3498](https://github.com/SocialGouv/code-du-travail-numerique/issues/3498)) ([f440e46](https://github.com/SocialGouv/code-du-travail-numerique/commit/f440e462c919e6f43444f3db02bea7f98bb9ffc0))
- **simulator:** add CC 44 to retirement notice simulator ([#3488](https://github.com/SocialGouv/code-du-travail-numerique/issues/3488)) ([cb79899](https://github.com/SocialGouv/code-du-travail-numerique/commit/cb79899c279816e94a1268e8d71c1224888acf66))
- **simulator:** add CC 54 to retirement notice simulator ([#3489](https://github.com/SocialGouv/code-du-travail-numerique/issues/3489)) ([be5b878](https://github.com/SocialGouv/code-du-travail-numerique/commit/be5b878392538abdb3469844b69fa04625d4061c))
- **simulator:** add CC 573 to retirement notice simulator ([#3500](https://github.com/SocialGouv/code-du-travail-numerique/issues/3500)) ([95fd1ce](https://github.com/SocialGouv/code-du-travail-numerique/commit/95fd1cecdfd3924cc214217dca500ee5f5c4ee05))
- **simulator:** add CC 675 to retirement notice simulator ([#3501](https://github.com/SocialGouv/code-du-travail-numerique/issues/3501)) ([2792208](https://github.com/SocialGouv/code-du-travail-numerique/commit/279220823259adb13c51bc21ca653e9fc7059a84))
- **simulator:** add retirement for CC 650 ([#3499](https://github.com/SocialGouv/code-du-travail-numerique/issues/3499)) ([e95aead](https://github.com/SocialGouv/code-du-travail-numerique/commit/e95aead28d2df2e747736a397a91ae74848a2013))
- **simulator:** show references on retirement notice simulator ([#3494](https://github.com/SocialGouv/code-du-travail-numerique/issues/3494)) ([87032ad](https://github.com/SocialGouv/code-du-travail-numerique/commit/87032ad68a0cf46cca6504b510965807020763a0))

# [4.49.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.48.1...v4.49.0) (2021-05-17)

### Bug Fixes

- **docker:** sed registry.gitlab.factory.social.gouv.fr ([#3477](https://github.com/SocialGouv/code-du-travail-numerique/issues/3477)) ([9c9194a](https://github.com/SocialGouv/code-du-travail-numerique/commit/9c9194a3919edb7aa06cdae6f12981dae26a24e6))
- **frontend:** button hover animation on firefox ([#3476](https://github.com/SocialGouv/code-du-travail-numerique/issues/3476)) ([dd44d23](https://github.com/SocialGouv/code-du-travail-numerique/commit/dd44d23a4d0d38338ffac13c0969a9a440e5b964))
- packages/code-du-travail-frontend/package.json to reduce vulnerabilities ([#3457](https://github.com/SocialGouv/code-du-travail-numerique/issues/3457)) ([e1786ff](https://github.com/SocialGouv/code-du-travail-numerique/commit/e1786ff71cb55ee969bee6f5adabfbaa10e21baf))

### Features

- **accessibility:** add (obligatoire) on mandatory field ([#3474](https://github.com/SocialGouv/code-du-travail-numerique/issues/3474)) ([1fd3d27](https://github.com/SocialGouv/code-du-travail-numerique/commit/1fd3d27d8239257036be03320ebeffa68047b12c))
- **ci:** use kaniko build ([#3461](https://github.com/SocialGouv/code-du-travail-numerique/issues/3461)) ([936b12c](https://github.com/SocialGouv/code-du-travail-numerique/commit/936b12c3db364a79473be860bbd9d073edbaed0a))
- **frontend:** add new search cc tool ([#3469](https://github.com/SocialGouv/code-du-travail-numerique/issues/3469)) ([ca59da1](https://github.com/SocialGouv/code-du-travail-numerique/commit/ca59da196a7743069f115a09dce55880fc5a6c1c))
- **search:** complete prequalified results ([#3459](https://github.com/SocialGouv/code-du-travail-numerique/issues/3459)) ([04e2284](https://github.com/SocialGouv/code-du-travail-numerique/commit/04e2284f2d87fc7d06023b15173aa7588d85fdb9)), closes [#2037](https://github.com/SocialGouv/code-du-travail-numerique/issues/2037)
- **simulator:** add industrie pharmaceutique labor agreement to seniority notice ([#3470](https://github.com/SocialGouv/code-du-travail-numerique/issues/3470)) ([6b7bab1](https://github.com/SocialGouv/code-du-travail-numerique/commit/6b7bab11b7c12b267639f2c55c1582ebe3b9bb0c))

### Reverts

- **frontend:** remove search ccn tool ([#3486](https://github.com/SocialGouv/code-du-travail-numerique/issues/3486)) ([e587b31](https://github.com/SocialGouv/code-du-travail-numerique/commit/e587b3101fadc3ba5c5c37f7db34a4b606db296f))

## [4.48.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.48.0...v4.48.1) (2021-04-28)

### Bug Fixes

- **cdtn-ui:** add code into published package ([#3456](https://github.com/SocialGouv/code-du-travail-numerique/issues/3456)) ([372a04f](https://github.com/SocialGouv/code-du-travail-numerique/commit/372a04f5f6ddcc9fe6569c57e0483c4f938a6a9e))
- **cdtn-ui:** dummy change ([9d499e8](https://github.com/SocialGouv/code-du-travail-numerique/commit/9d499e8f12d7e76827c8999247dfb0f668eed678))
- **react-ui:** add code into published package ([#3456](https://github.com/SocialGouv/code-du-travail-numerique/issues/3456)) ([3769735](https://github.com/SocialGouv/code-du-travail-numerique/commit/37697350204fd3917409d09144246dc8202b7936))

# [4.48.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.47.0...v4.48.0) (2021-04-28)

### Bug Fixes

- **a11y:** inform user when links open a new window ([#3444](https://github.com/SocialGouv/code-du-travail-numerique/issues/3444)) ([80ef852](https://github.com/SocialGouv/code-du-travail-numerique/commit/80ef85283f5cfdde5dea4283eaba19260e52007b))
- **accessibility:** fix focus on CC tooltip ([#3451](https://github.com/SocialGouv/code-du-travail-numerique/issues/3451)) ([eb6cfeb](https://github.com/SocialGouv/code-du-travail-numerique/commit/eb6cfeb9b8209ddc1546fd5e8d0431476e6269eb))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.120.0 ([#3437](https://github.com/SocialGouv/code-du-travail-numerique/issues/3437)) ([86df679](https://github.com/SocialGouv/code-du-travail-numerique/commit/86df6792ee904ffbd98f1668d7528e5d0d833943))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.123.0 ([#3447](https://github.com/SocialGouv/code-du-travail-numerique/issues/3447)) ([e080133](https://github.com/SocialGouv/code-du-travail-numerique/commit/e080133b1daa1953a1b20a583f510f1496befca6))

### Features

- **react-ui:** add new svg icons ([#3454](https://github.com/SocialGouv/code-du-travail-numerique/issues/3454)) ([3fcb55e](https://github.com/SocialGouv/code-du-travail-numerique/commit/3fcb55e3cbf47e2fd41d0073801b7555e3196fd8))
- **simulator:** add publicodes to handle simulators ([#3432](https://github.com/SocialGouv/code-du-travail-numerique/issues/3432)) ([c38aa4b](https://github.com/SocialGouv/code-du-travail-numerique/commit/c38aa4b4af8d92175a553248ea5acb77f137b0c5))
- **simulator:** add strong types thank typescrypt and eslint ([#3445](https://github.com/SocialGouv/code-du-travail-numerique/issues/3445)) ([edcdce9](https://github.com/SocialGouv/code-du-travail-numerique/commit/edcdce99ec0cf2cb5af6522910824acab3b79361))
- **simulator:** add the labor agreement for plasturgie ([#3446](https://github.com/SocialGouv/code-du-travail-numerique/issues/3446)) ([837aeb1](https://github.com/SocialGouv/code-du-travail-numerique/commit/837aeb19fcd9b35fe6be893d6abfe3e30da66d07))
- **simulator:** add the step to ask the labor agreement to the user ([#3448](https://github.com/SocialGouv/code-du-travail-numerique/issues/3448)) ([cba9e8f](https://github.com/SocialGouv/code-du-travail-numerique/commit/cba9e8f3435f0ad8cc332cb702cddd96b3fbd022))

# [4.47.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.46.0...v4.47.0) (2021-04-15)

### Bug Fixes

- **frontend:** fix safari tooltip display bug ([#3433](https://github.com/SocialGouv/code-du-travail-numerique/issues/3433)) ([15526e9](https://github.com/SocialGouv/code-du-travail-numerique/commit/15526e91664c6b813129dd7e04880b4f7af6e8bb)), closes [#3351](https://github.com/SocialGouv/code-du-travail-numerique/issues/3351)
- **frontend:** replace getStaticPath with getServerSideProps ([#3438](https://github.com/SocialGouv/code-du-travail-numerique/issues/3438)) ([849446b](https://github.com/SocialGouv/code-du-travail-numerique/commit/849446b30b422c61a8cefe56900aa6966491e862))
- **frontend:** use getStaticPath for /api/simulateur endpoint ([#3435](https://github.com/SocialGouv/code-du-travail-numerique/issues/3435)) ([8a1db26](https://github.com/SocialGouv/code-du-travail-numerique/commit/8a1db2694eabbcbe81d7ed5ca5a8e8488401d0ab))
- **k8s:** use code.travail.gouv.fr as default ([#3436](https://github.com/SocialGouv/code-du-travail-numerique/issues/3436)) ([953281b](https://github.com/SocialGouv/code-du-travail-numerique/commit/953281b6f06f76115636825c92424a2487a8cdd2))

### Features

- **frontend:** add a11y navigation skip link ([#3426](https://github.com/SocialGouv/code-du-travail-numerique/issues/3426)) ([b3d5a80](https://github.com/SocialGouv/code-du-travail-numerique/commit/b3d5a80b7f5187cbe18f183b3656bde97aa78642)), closes [#3403](https://github.com/SocialGouv/code-du-travail-numerique/issues/3403)

# [4.46.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.45.2...v4.46.0) (2021-04-13)

### Bug Fixes

- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.112.0 ([#3306](https://github.com/SocialGouv/code-du-travail-numerique/issues/3306)) ([1f4fb47](https://github.com/SocialGouv/code-du-travail-numerique/commit/1f4fb47da34c96836b0c77d3ed0ee98722b70972))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.113.0 ([#3424](https://github.com/SocialGouv/code-du-travail-numerique/issues/3424)) ([34903fe](https://github.com/SocialGouv/code-du-travail-numerique/commit/34903feaf87428fb2741e128f2a33589e1c87d21))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.116.0 ([#3431](https://github.com/SocialGouv/code-du-travail-numerique/issues/3431)) ([0b0d0f6](https://github.com/SocialGouv/code-du-travail-numerique/commit/0b0d0f6c9932494bab3459f0ba59eff4d9971116))
- **deps:** update dependency @socialgouv/kosko-charts to v5 ([#3412](https://github.com/SocialGouv/code-du-travail-numerique/issues/3412)) ([21b9bd0](https://github.com/SocialGouv/code-du-travail-numerique/commit/21b9bd00639c92c7c3d424f51d5caa00aad60b80))
- **deps:** update dependency husky to v6 ([#3413](https://github.com/SocialGouv/code-du-travail-numerique/issues/3413)) ([e08f2b7](https://github.com/SocialGouv/code-du-travail-numerique/commit/e08f2b77b49dd07b57c091b049d366868da25cb7))
- **deps:** update socialgouv ([#3409](https://github.com/SocialGouv/code-du-travail-numerique/issues/3409)) ([261889b](https://github.com/SocialGouv/code-du-travail-numerique/commit/261889bb21d55e2ee6a3d3bf496888246d001269))

### Features

- **accessibility:** add the accessibility status of the website ([#3430](https://github.com/SocialGouv/code-du-travail-numerique/issues/3430)) ([99585d0](https://github.com/SocialGouv/code-du-travail-numerique/commit/99585d0ae5c7cd87cab7b31cbb6ec88aae76b573))
- **simulator:** add an endpoint to get publicodes for a simulator ([#3418](https://github.com/SocialGouv/code-du-travail-numerique/issues/3418)) ([c8a85ce](https://github.com/SocialGouv/code-du-travail-numerique/commit/c8a85ce966293f0c51ae5a4e76902ccc0f7b029f))
- **simulator:** add origine, anciennete and result steps for business retirement simulator ([#3425](https://github.com/SocialGouv/code-du-travail-numerique/issues/3425)) ([78b216d](https://github.com/SocialGouv/code-du-travail-numerique/commit/78b216d78f570804f7884297f9007de450e2aa5a))
- **simulator:** init folder for publicode models ([#3416](https://github.com/SocialGouv/code-du-travail-numerique/issues/3416)) ([71f7503](https://github.com/SocialGouv/code-du-travail-numerique/commit/71f7503cdc230751c152f317723ed750edf41a7f))
- **simulator:** initialise business retirement simulator ([#3423](https://github.com/SocialGouv/code-du-travail-numerique/issues/3423)) ([0d677ff](https://github.com/SocialGouv/code-du-travail-numerique/commit/0d677ff3bee260a99508d896f380719b34c8d6bf))

## [4.45.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.45.1...v4.45.2) (2021-04-01)

**Note:** Version bump only for package @socialgouv/code-du-travail

## [4.45.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.45.0...v4.45.1) (2021-03-31)

### Bug Fixes

- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.105.0 ([#3378](https://github.com/SocialGouv/code-du-travail-numerique/issues/3378)) ([8bc37a0](https://github.com/SocialGouv/code-du-travail-numerique/commit/8bc37a0403c30f1b5e8982e3c183655b762b4ea9))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.106.0 ([#3397](https://github.com/SocialGouv/code-du-travail-numerique/issues/3397)) ([94e588f](https://github.com/SocialGouv/code-du-travail-numerique/commit/94e588f4d4cde0e7dc05832bca9796f6bdde6979))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.110.0 ([#3399](https://github.com/SocialGouv/code-du-travail-numerique/issues/3399)) ([69e7030](https://github.com/SocialGouv/code-du-travail-numerique/commit/69e7030f82c3ff26f9b24479e12aa3654de41c0d))
- **frontend:** don't use beta for legifrance url ([#3395](https://github.com/SocialGouv/code-du-travail-numerique/issues/3395)) ([6b38da1](https://github.com/SocialGouv/code-du-travail-numerique/commit/6b38da178289988434fbe2c12d22f4f12b235150))
- **frontend:** fix external tools url ([#3402](https://github.com/SocialGouv/code-du-travail-numerique/issues/3402)) ([4697d10](https://github.com/SocialGouv/code-du-travail-numerique/commit/4697d10184908fd3ed381a13d0b15ebfffb21799))
- **frontend:** use strong over h3 ([#3393](https://github.com/SocialGouv/code-du-travail-numerique/issues/3393)) ([0e935ce](https://github.com/SocialGouv/code-du-travail-numerique/commit/0e935ce32532cee397487efa2bbcb88fe1f43c4a))

### Reverts

- fix(deps): update all dependencies ([#3339](https://github.com/SocialGouv/code-du-travail-numerique/issues/3339)) ([6822e08](https://github.com/SocialGouv/code-du-travail-numerique/commit/6822e08fccfb574a40399918e2390945a5d36c2c))

# [4.45.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.44.1...v4.45.0) (2021-03-18)

### Bug Fixes

- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.100.0 ([#3357](https://github.com/SocialGouv/code-du-travail-numerique/issues/3357)) ([d31a831](https://github.com/SocialGouv/code-du-travail-numerique/commit/d31a8315be1f0aa1ee529c5dd05f718c24f67f16))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.101.0 ([#3373](https://github.com/SocialGouv/code-du-travail-numerique/issues/3373)) ([82b38df](https://github.com/SocialGouv/code-du-travail-numerique/commit/82b38dff4247c715aa15126d23bc8409284697ab))
- **frontend:** remove non semantic h3([#3369](https://github.com/SocialGouv/code-du-travail-numerique/issues/3369)) ([711da5e](https://github.com/SocialGouv/code-du-travail-numerique/commit/711da5e50541f89476beb423646bf969280b55bc))
- doug stuff ([#3365](https://github.com/SocialGouv/code-du-travail-numerique/issues/3365)) ([9bab1ca](https://github.com/SocialGouv/code-du-travail-numerique/commit/9bab1cab18d87c8808fde37b97ac66caf717fd04))
- lionel stuff ([7d39282](https://github.com/SocialGouv/code-du-travail-numerique/commit/7d392824b09cd37f9624a34badfc601b8315e6b7))
- update socialgouv lint config ([#3371](https://github.com/SocialGouv/code-du-travail-numerique/issues/3371)) ([2928d21](https://github.com/SocialGouv/code-du-travail-numerique/commit/2928d21a997cc015dbd8e6a1834f999cb87549dc))
- **api:** specify index while counting prequalified ([#3341](https://github.com/SocialGouv/code-du-travail-numerique/issues/3341)) ([72dd8b7](https://github.com/SocialGouv/code-du-travail-numerique/commit/72dd8b7662f6c5ddcba877db4d6a8c185fff4e61))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#3342](https://github.com/SocialGouv/code-du-travail-numerique/issues/3342)) ([d62ffca](https://github.com/SocialGouv/code-du-travail-numerique/commit/d62ffca4178c1f41fbfef0d10e4c7b549db7b237))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#3345](https://github.com/SocialGouv/code-du-travail-numerique/issues/3345)) ([716f4e1](https://github.com/SocialGouv/code-du-travail-numerique/commit/716f4e11dd58cfd49959a1def6ee5454da0007b6))
- **deps:** update all dependencies ([#3339](https://github.com/SocialGouv/code-du-travail-numerique/issues/3339)) ([c8fb673](https://github.com/SocialGouv/code-du-travail-numerique/commit/c8fb673b908a9e62a180ab25dd532c50b6aeb2eb))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.88.0 ([#3321](https://github.com/SocialGouv/code-du-travail-numerique/issues/3321)) ([38b84fc](https://github.com/SocialGouv/code-du-travail-numerique/commit/38b84fcbfbafcccd366aff1a2b2e33def8031917))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.99.0 ([#3350](https://github.com/SocialGouv/code-du-travail-numerique/issues/3350)) ([d25bfe1](https://github.com/SocialGouv/code-du-travail-numerique/commit/d25bfe1984a8c946e976debb54613d12d49090c0))
- **deps:** update dependency puppeteer to v8 ([#3335](https://github.com/SocialGouv/code-du-travail-numerique/issues/3335)) ([8b8a258](https://github.com/SocialGouv/code-du-travail-numerique/commit/8b8a25851e51c49a1cdc145661813badb53814f8))
- **deps:** update sentry monorepo to v6 ([#3282](https://github.com/SocialGouv/code-du-travail-numerique/issues/3282)) ([d9c401f](https://github.com/SocialGouv/code-du-travail-numerique/commit/d9c401fcca5aa40cb5f67e239ed29858453ff477))
- **front:** add overflow on document models ([#3324](https://github.com/SocialGouv/code-du-travail-numerique/issues/3324)) ([095f12f](https://github.com/SocialGouv/code-du-travail-numerique/commit/095f12faa6d8568c1e3aab041e05d012f88ac0e4))
- **front:** mobile tool survey ([#3323](https://github.com/SocialGouv/code-du-travail-numerique/issues/3323)) ([587748c](https://github.com/SocialGouv/code-du-travail-numerique/commit/587748c4352820490579c2525a3d11dbc2b08f35))
- **frontend:** add references on contribution generic answer ([#3328](https://github.com/SocialGouv/code-du-travail-numerique/issues/3328)) ([99a1b04](https://github.com/SocialGouv/code-du-travail-numerique/commit/99a1b04913f4747c72dc67e5bf304ca057b26e2a))
- **frontend:** use reference component in contribution page ([#3349](https://github.com/SocialGouv/code-du-travail-numerique/issues/3349)) ([aa50a42](https://github.com/SocialGouv/code-du-travail-numerique/commit/aa50a426628947737186d9c3524269b70b446772))

### Features

- **frontend:** add partners sites on home ([#3372](https://github.com/SocialGouv/code-du-travail-numerique/issues/3372)) ([f725c5d](https://github.com/SocialGouv/code-du-travail-numerique/commit/f725c5d327efaedf714f74b7601680bc599f3ccb))

## [4.44.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.44.0...v4.44.1) (2021-02-18)

### Bug Fixes

- **data:** add breadcrumbs to editorial content ([#3315](https://github.com/SocialGouv/code-du-travail-numerique/issues/3315)) ([b8f1fc1](https://github.com/SocialGouv/code-du-travail-numerique/commit/b8f1fc16a363028bc85adb51c751f6ed47269070))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#3314](https://github.com/SocialGouv/code-du-travail-numerique/issues/3314)) ([00d2903](https://github.com/SocialGouv/code-du-travail-numerique/commit/00d2903bb64648925569e53bec2173df8f123240))
- **frontend:** improve source ui on mobile for contibutions ([#3318](https://github.com/SocialGouv/code-du-travail-numerique/issues/3318)) ([9d53b41](https://github.com/SocialGouv/code-du-travail-numerique/commit/9d53b418efd6b438077814866ebba63ecc184935))

# [4.44.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.43.0...v4.44.0) (2021-02-17)

### Bug Fixes

- **data:** get the breadcrumbs from the generic contribution ([#3313](https://github.com/SocialGouv/code-du-travail-numerique/issues/3313)) ([20c28d6](https://github.com/SocialGouv/code-du-travail-numerique/commit/20c28d6633c9d61f4d176df2527854fcc262d798))
- **data:** update fetchCDtnDocuments ([#3289](https://github.com/SocialGouv/code-du-travail-numerique/issues/3289)) ([4185e62](https://github.com/SocialGouv/code-du-travail-numerique/commit/4185e62397762b9a44ec4296d9934e514b83ad83))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#3286](https://github.com/SocialGouv/code-du-travail-numerique/issues/3286)) ([aec2e58](https://github.com/SocialGouv/code-du-travail-numerique/commit/aec2e580ef169b09c3bd388920998d0b18363de8))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#3290](https://github.com/SocialGouv/code-du-travail-numerique/issues/3290)) ([eb6ed58](https://github.com/SocialGouv/code-du-travail-numerique/commit/eb6ed58a5f709482617abf3f35a7479c56e662e8))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#3307](https://github.com/SocialGouv/code-du-travail-numerique/issues/3307)) ([9c2dc3c](https://github.com/SocialGouv/code-du-travail-numerique/commit/9c2dc3cfca21a5c06b864b2d92197fbd5034c4e2))
- **deps:** update all non-major dependencies (minor) ([#3279](https://github.com/SocialGouv/code-du-travail-numerique/issues/3279)) ([cf34cd8](https://github.com/SocialGouv/code-du-travail-numerique/commit/cf34cd8ced0ae1215fc927678288cc132e74bc21))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^4.61.0 ([#3287](https://github.com/SocialGouv/code-du-travail-numerique/issues/3287)) ([4d5576c](https://github.com/SocialGouv/code-du-travail-numerique/commit/4d5576cbe71b7ff9a2bf516f70182de9cb91a1f2))

### Features

- **api:** add a root endpoint ([#3296](https://github.com/SocialGouv/code-du-travail-numerique/issues/3296)) ([d7edc78](https://github.com/SocialGouv/code-du-travail-numerique/commit/d7edc78fcb6f84cc84e172ba41fcf2be30f39825)), closes [#3295](https://github.com/SocialGouv/code-du-travail-numerique/issues/3295)
- **frontend:** add canonical link on service-public and travail-emploi document ([#3312](https://github.com/SocialGouv/code-du-travail-numerique/issues/3312)) ([bf6baa9](https://github.com/SocialGouv/code-du-travail-numerique/commit/bf6baa94975ce3dfa5ca1f22a45cf77d88b31e7f))
- **frontend:** add contribution generic answer source ([#3311](https://github.com/SocialGouv/code-du-travail-numerique/issues/3311)) ([267fd8b](https://github.com/SocialGouv/code-du-travail-numerique/commit/267fd8b2b18f6f7eb728b1627bf03991d37a5bdf)), closes [#3300](https://github.com/SocialGouv/code-du-travail-numerique/issues/3300)

# [4.43.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.42.0...v4.43.0) (2021-02-04)

### Bug Fixes

- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#3272](https://github.com/SocialGouv/code-du-travail-numerique/issues/3272)) ([11a3411](https://github.com/SocialGouv/code-du-travail-numerique/commit/11a3411101fee8264150c8b17844cbf9acf81a5c))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#3275](https://github.com/SocialGouv/code-du-travail-numerique/issues/3275)) ([063e0b5](https://github.com/SocialGouv/code-du-travail-numerique/commit/063e0b5910307ea524126162a710274bb899864f))
- **frontend:** handle branch sitemap ([#3267](https://github.com/SocialGouv/code-du-travail-numerique/issues/3267)) ([7dad854](https://github.com/SocialGouv/code-du-travail-numerique/commit/7dad854eda2127aee8165f89ee7fb81843a01dca))

### Features

- prequalifieds from admin ([#3273](https://github.com/SocialGouv/code-du-travail-numerique/issues/3273)) ([8f5b1fc](https://github.com/SocialGouv/code-du-travail-numerique/commit/8f5b1fc5ceaa7c45105d7198ad96b1994fd63b11))
- **front:** add relatedItems to tools ([#3276](https://github.com/SocialGouv/code-du-travail-numerique/issues/3276)) ([fce2d77](https://github.com/SocialGouv/code-du-travail-numerique/commit/fce2d77fbf139c7b12f9b666d2cabf23fecee3a8))
- **front:** add suptitle to cdt articles ([#3277](https://github.com/SocialGouv/code-du-travail-numerique/issues/3277)) ([06fd791](https://github.com/SocialGouv/code-du-travail-numerique/commit/06fd791582603cea70b0a94016aab7c8969fbde8))

# [4.42.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.41.0...v4.42.0) (2021-01-21)

### Bug Fixes

- **data:** use slug to find contrib ([#3265](https://github.com/SocialGouv/code-du-travail-numerique/issues/3265)) ([4e5daa4](https://github.com/SocialGouv/code-du-travail-numerique/commit/4e5daa4bfc838cd935ae6debf73d3df29221c83e))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#3255](https://github.com/SocialGouv/code-du-travail-numerique/issues/3255)) ([03a1aea](https://github.com/SocialGouv/code-du-travail-numerique/commit/03a1aeaa99aa7b04252627daa04c901bb806fcab))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#3269](https://github.com/SocialGouv/code-du-travail-numerique/issues/3269)) ([7a19925](https://github.com/SocialGouv/code-du-travail-numerique/commit/7a199257c72613d0665f41fc1ab96a132db8d08d))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#3271](https://github.com/SocialGouv/code-du-travail-numerique/issues/3271)) ([72875dc](https://github.com/SocialGouv/code-du-travail-numerique/commit/72875dc1482289f64c1c1f08177389d5840e05d5))
- **deps:** update all dependencies ([#3261](https://github.com/SocialGouv/code-du-travail-numerique/issues/3261)) ([911ce2c](https://github.com/SocialGouv/code-du-travail-numerique/commit/911ce2c62a7ccdf2174bed8f64e6cc0f4b9f9718))
- **front:** linterfail ([#3254](https://github.com/SocialGouv/code-du-travail-numerique/issues/3254)) ([494c715](https://github.com/SocialGouv/code-du-travail-numerique/commit/494c7155a28004d487ede8b207e11ac3114d6daf))
- **frontend:** remove source in cc if there no legifrance url ([#3263](https://github.com/SocialGouv/code-du-travail-numerique/issues/3263)) ([ff6f60a](https://github.com/SocialGouv/code-du-travail-numerique/commit/ff6f60a8bc11399ef34d27b79a272445a5cf303d))

### Features

- **ccns:** CCNs with contribs can be found using main search - WIP ([#3228](https://github.com/SocialGouv/code-du-travail-numerique/issues/3228)) ([b637249](https://github.com/SocialGouv/code-du-travail-numerique/commit/b637249979521638e0bb3c9b414502b1fd5e35bd))
- highlights from admin ([#3236](https://github.com/SocialGouv/code-du-travail-numerique/issues/3236)) ([5e82e36](https://github.com/SocialGouv/code-du-travail-numerique/commit/5e82e36dd0408c5e523356d74e2b270e2d18bc10))

# [4.41.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.40.0...v4.41.0) (2021-01-14)

### Bug Fixes

- **api:** allow 3 characters prequalifieds ([#3247](https://github.com/SocialGouv/code-du-travail-numerique/issues/3247)) ([6cf911c](https://github.com/SocialGouv/code-du-travail-numerique/commit/6cf911c31a1768152602904ec4d7d1d92da2f928))
- **ci:** fix helm stable charts repo ([#3224](https://github.com/SocialGouv/code-du-travail-numerique/issues/3224)) ([e39744d](https://github.com/SocialGouv/code-du-travail-numerique/commit/e39744d0b1b18d86c4537d26edd1e8a3e10cc259))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#3213](https://github.com/SocialGouv/code-du-travail-numerique/issues/3213)) ([61dd9c5](https://github.com/SocialGouv/code-du-travail-numerique/commit/61dd9c5cb30eef0958e16f49d92cbd7a5cd6d494))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#3233](https://github.com/SocialGouv/code-du-travail-numerique/issues/3233)) ([4e88ecf](https://github.com/SocialGouv/code-du-travail-numerique/commit/4e88ecf85c370d6ebabbe3770310d1a9b02a3dd6))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#3239](https://github.com/SocialGouv/code-du-travail-numerique/issues/3239)) ([02ffc51](https://github.com/SocialGouv/code-du-travail-numerique/commit/02ffc51e4cdfa97015c321e8463b55813e6fffc9))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#3246](https://github.com/SocialGouv/code-du-travail-numerique/issues/3246)) ([61429b7](https://github.com/SocialGouv/code-du-travail-numerique/commit/61429b75b072b81cb483270b7713426b746d9703))
- **deps:** update all dependencies ([#3240](https://github.com/SocialGouv/code-du-travail-numerique/issues/3240)) ([a3fdbc1](https://github.com/SocialGouv/code-du-travail-numerique/commit/a3fdbc1f25b0a460cec09cdbe137f41615481642))
- **deps:** update all non-major dependencies (minor) ([#3219](https://github.com/SocialGouv/code-du-travail-numerique/issues/3219)) ([b8dfacb](https://github.com/SocialGouv/code-du-travail-numerique/commit/b8dfacb5563d69ad8643a16ba908901313f8dc5e))
- **deps:** update dependency next-transpile-modules to v6 ([#3223](https://github.com/SocialGouv/code-du-travail-numerique/issues/3223)) ([d56fece](https://github.com/SocialGouv/code-du-travail-numerique/commit/d56fece2f127e238a4fef69dba328cda29dba331))
- **frontend:** fix ccn breadcrumbs ([#3238](https://github.com/SocialGouv/code-du-travail-numerique/issues/3238)) ([09a0ab1](https://github.com/SocialGouv/code-du-travail-numerique/commit/09a0ab1f5520cf3b5a8016180060257d77622001)), closes [#3187](https://github.com/SocialGouv/code-du-travail-numerique/issues/3187)
- **frontend:** remove attestation redir ([#3252](https://github.com/SocialGouv/code-du-travail-numerique/issues/3252)) ([952d0bc](https://github.com/SocialGouv/code-du-travail-numerique/commit/952d0bcadbdd083faf65a254570a780693f13026))
- **frontend:** use static sitemap ([#3251](https://github.com/SocialGouv/code-du-travail-numerique/issues/3251)) ([32a9d49](https://github.com/SocialGouv/code-du-travail-numerique/commit/32a9d49ea872e8dfd050bade48bef2761fcc19ff))
- **k8s:** use 301 at nginx level ([#3129](https://github.com/SocialGouv/code-du-travail-numerique/issues/3129)) ([4bfbe6d](https://github.com/SocialGouv/code-du-travail-numerique/commit/4bfbe6d6df3fa147355c31ac2aefadc65d075854))
- **stats:** remove old satisfaction rate ([#3241](https://github.com/SocialGouv/code-du-travail-numerique/issues/3241)) ([96e49ba](https://github.com/SocialGouv/code-du-travail-numerique/commit/96e49bafe3446851447659b34dc3bfdc5c0adfd6))
- add plan de contenu ([#3168](https://github.com/SocialGouv/code-du-travail-numerique/issues/3168)) ([9cea92e](https://github.com/SocialGouv/code-du-travail-numerique/commit/9cea92ec0ffba36e230cce516f0ebb8d2fb67a1a))

### Features

- **frontend:** expose ccn contribution answers ([#3230](https://github.com/SocialGouv/code-du-travail-numerique/issues/3230)) ([3a99a18](https://github.com/SocialGouv/code-du-travail-numerique/commit/3a99a18dfe9aca3949db34732be052d0f55c548a))
- new folder structure ([#3250](https://github.com/SocialGouv/code-du-travail-numerique/issues/3250)) ([d13fc1c](https://github.com/SocialGouv/code-du-travail-numerique/commit/d13fc1c9269732a3416e003575c8888d2b456905))
- **ci:** add storage containers copy ([#3211](https://github.com/SocialGouv/code-du-travail-numerique/issues/3211)) ([c460c0d](https://github.com/SocialGouv/code-du-travail-numerique/commit/c460c0d7f75625ec1289eac2f60eafe7f1d88f5a))
- **front:** update social preview ([#3234](https://github.com/SocialGouv/code-du-travail-numerique/issues/3234)) ([b157a68](https://github.com/SocialGouv/code-du-travail-numerique/commit/b157a68f66dc2e4ff05da1553fb480518febd990))

# [4.40.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.39.0...v4.40.0) (2020-12-17)

### Bug Fixes

- **data:** dont delete cdtnId before generating breadcrumbs... ([#3199](https://github.com/SocialGouv/code-du-travail-numerique/issues/3199)) ([8f16406](https://github.com/SocialGouv/code-du-travail-numerique/commit/8f164068e6fda6a73ff7967ca9615b3a624d0943))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#3208](https://github.com/SocialGouv/code-du-travail-numerique/issues/3208)) ([fdac3c0](https://github.com/SocialGouv/code-du-travail-numerique/commit/fdac3c084c9d68f7efdd9512eaaa06ab4260663c))
- **idl:** use dateNotification for ask for previous salaries ([#3206](https://github.com/SocialGouv/code-du-travail-numerique/issues/3206)) ([2885d5e](https://github.com/SocialGouv/code-du-travail-numerique/commit/2885d5e82968629a5e9a75b09a71f7e7f42e0e7e)), closes [#1880](https://github.com/SocialGouv/code-du-travail-numerique/issues/1880)
- **k8s:** auto-import cdtn-secret variables ([#3209](https://github.com/SocialGouv/code-du-travail-numerique/issues/3209)) ([9c25638](https://github.com/SocialGouv/code-du-travail-numerique/commit/9c25638a691014247b385defebc8df42ae3af685))

### Features

- **data:** synonymes convention collectives [#3063](https://github.com/SocialGouv/code-du-travail-numerique/issues/3063) ([#3123](https://github.com/SocialGouv/code-du-travail-numerique/issues/3123)) ([4301878](https://github.com/SocialGouv/code-du-travail-numerique/commit/43018780401dbfdaa422527f66c16bd187ba8a19))

# [4.39.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.38.0...v4.39.0) (2020-12-09)

### Bug Fixes

- **ci:** allow manual web trigger ([#3190](https://github.com/SocialGouv/code-du-travail-numerique/issues/3190)) ([86963b1](https://github.com/SocialGouv/code-du-travail-numerique/commit/86963b1cd361be6816345f60279478e28b11b8d7))
- **data:** useless stuff ([#3177](https://github.com/SocialGouv/code-du-travail-numerique/issues/3177)) ([ae3b6f6](https://github.com/SocialGouv/code-du-travail-numerique/commit/ae3b6f64fba8a75fc6399d289c68e596dd4e2f3c))
- **frontend:** minor sitemap issues ([#3180](https://github.com/SocialGouv/code-du-travail-numerique/issues/3180)) ([23c7476](https://github.com/SocialGouv/code-du-travail-numerique/commit/23c747618cc9002c4bfc0f920e23c296293d6510))
- **frontend:** pretty print documents ([#3172](https://github.com/SocialGouv/code-du-travail-numerique/issues/3172)) ([5854776](https://github.com/SocialGouv/code-du-travail-numerique/commit/58547767d05e45a8c670ec9f65fb8703d54472a2))
- **frontend:** remove nofollow relatedContent ([#3195](https://github.com/SocialGouv/code-du-travail-numerique/issues/3195)) ([657c80e](https://github.com/SocialGouv/code-du-travail-numerique/commit/657c80ef6cd8f708432984c0b143fbe1e536ab91))
- **frontend:** udpate indemniteprecarite question label ([#3193](https://github.com/SocialGouv/code-du-travail-numerique/issues/3193)) ([#3196](https://github.com/SocialGouv/code-du-travail-numerique/issues/3196)) ([4c9a910](https://github.com/SocialGouv/code-du-travail-numerique/commit/4c9a91034e4f2c646c2e6ab272b4ea611934dbd5))

### Features

- **frontend:** add share to tools and cc search ([#3175](https://github.com/SocialGouv/code-du-travail-numerique/issues/3175)) ([17658c8](https://github.com/SocialGouv/code-du-travail-numerique/commit/17658c858592cabf653db1b742f1665aedb5baeb))
- **frontend:** add survey prompt in tools ([#3167](https://github.com/SocialGouv/code-du-travail-numerique/issues/3167)) ([de78d38](https://github.com/SocialGouv/code-du-travail-numerique/commit/de78d389ede530635ca13f3c52f6b485542413c3))

# [4.38.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.37.0...v4.38.0) (2020-11-26)

### Bug Fixes

- glossaire ([#3170](https://github.com/SocialGouv/code-du-travail-numerique/issues/3170)) ([6206dfb](https://github.com/SocialGouv/code-du-travail-numerique/commit/6206dfba63a339c64170148606f3cd7ee54cd059))
- only publish in sitemap ([#3166](https://github.com/SocialGouv/code-du-travail-numerique/issues/3166)) ([cf82239](https://github.com/SocialGouv/code-du-travail-numerique/commit/cf822394cfb91b1aac02a2c6a3e05123cc684bde))
- **data:** forward isPublished to fiche travail-emploi ([#3156](https://github.com/SocialGouv/code-du-travail-numerique/issues/3156)) ([a006836](https://github.com/SocialGouv/code-du-travail-numerique/commit/a0068362b9843ae03f3552d20773fc02ba8948d1))
- **frontend:** allow code-du-travail for robot ([#3154](https://github.com/SocialGouv/code-du-travail-numerique/issues/3154)) ([bc19f68](https://github.com/SocialGouv/code-du-travail-numerique/commit/bc19f687f853f0f57e8a9b7e6018af49d0fea0b4)), closes [#3137](https://github.com/SocialGouv/code-du-travail-numerique/issues/3137)
- **frontend:** typo on ccn pages ([#3153](https://github.com/SocialGouv/code-du-travail-numerique/issues/3153)) ([2bedd44](https://github.com/SocialGouv/code-du-travail-numerique/commit/2bedd443fb36287272f86192ab6f93d55ebb92cb)), closes [#3143](https://github.com/SocialGouv/code-du-travail-numerique/issues/3143)
- **frontend:** update mention-légale page ([#3155](https://github.com/SocialGouv/code-du-travail-numerique/issues/3155)) ([910819d](https://github.com/SocialGouv/code-du-travail-numerique/commit/910819d051380badf253ce964c9ad109d819506f))
- **sitemap:** add missign separator between source and slug ([#3165](https://github.com/SocialGouv/code-du-travail-numerique/issues/3165)) ([7052939](https://github.com/SocialGouv/code-du-travail-numerique/commit/7052939b35e6149fd28f198b3e71f28eae3afb39))
- disable glossary on for initial dump used in frontend ([#3149](https://github.com/SocialGouv/code-du-travail-numerique/issues/3149)) ([e546a85](https://github.com/SocialGouv/code-du-travail-numerique/commit/e546a85ce414dbd78078c2fc3f89141086d30f98))

### Features

- **data:** filter document using is_published ([#3140](https://github.com/SocialGouv/code-du-travail-numerique/issues/3140)) ([8d810c9](https://github.com/SocialGouv/code-du-travail-numerique/commit/8d810c9b05f0c21bf61fa078788a53e2c4a51cc2))
- **data:** indexing use admin/kali_blocks ([#3147](https://github.com/SocialGouv/code-du-travail-numerique/issues/3147)) ([145a2a4](https://github.com/SocialGouv/code-du-travail-numerique/commit/145a2a4e5c08779a9623ab355bb1f6273d9aba55))
- **front:** display survery after 5 secs ([#3171](https://github.com/SocialGouv/code-du-travail-numerique/issues/3171)) ([012892a](https://github.com/SocialGouv/code-du-travail-numerique/commit/012892a24f791472aecb99c25ac86e37e2935237))

# [4.37.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.36.0...v4.37.0) (2020-11-17)

### Bug Fixes

- **k8s:** disable APM ([#3130](https://github.com/SocialGouv/code-du-travail-numerique/issues/3130)) ([9fd64ad](https://github.com/SocialGouv/code-du-travail-numerique/commit/9fd64ad337b94a482ed9acdd1576dbfc0e856a8e))

### Features

- replace local document hosting with distant storage ([#3138](https://github.com/SocialGouv/code-du-travail-numerique/issues/3138)) ([f43b199](https://github.com/SocialGouv/code-du-travail-numerique/commit/f43b199b91bf4f70bf6ff27b1092f9e6c73013de))
- **data:** use cdtn-admin to fetch documents ([#3004](https://github.com/SocialGouv/code-du-travail-numerique/issues/3004)) ([67ee1f0](https://github.com/SocialGouv/code-du-travail-numerique/commit/67ee1f086aff805052c2a8205c90bce4254b42b3))

# [4.36.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.35.0...v4.36.0) (2020-11-10)

### Features

- **frontend:** survey ([#3110](https://github.com/SocialGouv/code-du-travail-numerique/issues/3110)) ([7a3e290](https://github.com/SocialGouv/code-du-travail-numerique/commit/7a3e2908ef00f65b595cdb7da543d953eead5667))
- **related items:** remove covisite A/B testing + add log on non article related selection + remove tiles ([#3065](https://github.com/SocialGouv/code-du-travail-numerique/issues/3065)) ([de0c522](https://github.com/SocialGouv/code-du-travail-numerique/commit/de0c5228b1c96f0e8bda56785f599a262f7ba080))

# [4.35.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.34.0...v4.35.0) (2020-11-03)

### Bug Fixes

- **api:** issue where same slug causes duplicate content ([#3072](https://github.com/SocialGouv/code-du-travail-numerique/issues/3072)) ([d9abc39](https://github.com/SocialGouv/code-du-travail-numerique/commit/d9abc39e73be0e71885803335d3b25e57198d4f6))
- **api:** use same logic to avoid bugs and reduce complexity ([#3081](https://github.com/SocialGouv/code-du-travail-numerique/issues/3081)) ([44bbc41](https://github.com/SocialGouv/code-du-travail-numerique/commit/44bbc416317664abb821e91f90064ec6b1af9d05))
- **frontend:** change viewmore default size ([#3103](https://github.com/SocialGouv/code-du-travail-numerique/issues/3103)) ([3bbf309](https://github.com/SocialGouv/code-du-travail-numerique/commit/3bbf3090ec769ee844c6f4c5eca967e5decef8bc))
- **frontend:** remove unsuported IE regexp features ([#3071](https://github.com/SocialGouv/code-du-travail-numerique/issues/3071)) ([9491372](https://github.com/SocialGouv/code-du-travail-numerique/commit/9491372951a807d8e0683889d6f777193fdc6807))
- **frontend:** wrong id for matomo tracking ([#3077](https://github.com/SocialGouv/code-du-travail-numerique/issues/3077)) ([d90bb15](https://github.com/SocialGouv/code-du-travail-numerique/commit/d90bb15b8fe9f4edc28d3edd5ca7b2b82919f3ab))
- **sources:** put back usefull sources ([#3080](https://github.com/SocialGouv/code-du-travail-numerique/issues/3080)) ([8c4bf77](https://github.com/SocialGouv/code-du-travail-numerique/commit/8c4bf77639afe6eed512f71071e7a78ceec6fd52))

### Features

- **data:** add new external tool ([#3079](https://github.com/SocialGouv/code-du-travail-numerique/issues/3079)) ([f6c0b9b](https://github.com/SocialGouv/code-du-travail-numerique/commit/f6c0b9b1aea34f25eea1706d1bd0e38fb5bf3133))
- **ui:** manage localstorage when third party cookies are disabled in chrome ([#3074](https://github.com/SocialGouv/code-du-travail-numerique/issues/3074)) ([912e402](https://github.com/SocialGouv/code-du-travail-numerique/commit/912e4022520725f79fb0e8d4937ad1bff1f9d640))

# [4.34.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.33.0...v4.34.0) (2020-10-23)

### Bug Fixes

- **frontend:** prefix code-du-trvail relatives link ([#3060](https://github.com/SocialGouv/code-du-travail-numerique/issues/3060)) ([8f12410](https://github.com/SocialGouv/code-du-travail-numerique/commit/8f12410e4ead7e80f629044ccb08fc2380507e2d)), closes [#3059](https://github.com/SocialGouv/code-du-travail-numerique/issues/3059)
- **frontend:** site-map ([#3055](https://github.com/SocialGouv/code-du-travail-numerique/issues/3055)) ([90597d8](https://github.com/SocialGouv/code-du-travail-numerique/commit/90597d8c666f433dc77b400a02366822e26257d2))

### Features

- **ccn:** allow ccn tool to be searchable ([#3062](https://github.com/SocialGouv/code-du-travail-numerique/issues/3062)) ([942b9cd](https://github.com/SocialGouv/code-du-travail-numerique/commit/942b9cdd08295b68713f582f0a7f1a8169c9e5d8))
- **data:** update dossier ([#3067](https://github.com/SocialGouv/code-du-travail-numerique/issues/3067)) ([ec67b71](https://github.com/SocialGouv/code-du-travail-numerique/commit/ec67b719ac5fa1dd5514944840409211c9e8f7a4))

# [4.33.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.32.0...v4.33.0) (2020-10-16)

### Bug Fixes

- **sources:** fix typings ([#3050](https://github.com/SocialGouv/code-du-travail-numerique/issues/3050)) ([1cdc9d4](https://github.com/SocialGouv/code-du-travail-numerique/commit/1cdc9d4e85cbeb9da16eb091378272365a1f93e1))
- **sources:** update typings ([#3044](https://github.com/SocialGouv/code-du-travail-numerique/issues/3044)) ([90dd892](https://github.com/SocialGouv/code-du-travail-numerique/commit/90dd8924e863d080591c9567ac7852e40498c92b))

### Features

- **data:** remove outdated link ([#3052](https://github.com/SocialGouv/code-du-travail-numerique/issues/3052)) ([9ad5f0a](https://github.com/SocialGouv/code-du-travail-numerique/commit/9ad5f0a4205e31559723ccece9d01193bb29f969))
- **frontend:** add share buttons ([#3046](https://github.com/SocialGouv/code-du-travail-numerique/issues/3046)) ([2bfe444](https://github.com/SocialGouv/code-du-travail-numerique/commit/2bfe4441e7db490d1dd9cbdc3d0dad8fea328c8b))

# [4.32.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.31.1...v4.32.0) (2020-10-12)

### Bug Fixes

- **data:** remove removed fiche-sp ([#3036](https://github.com/SocialGouv/code-du-travail-numerique/issues/3036)) ([53fb492](https://github.com/SocialGouv/code-du-travail-numerique/commit/53fb492b43c6fee56e6a111156dc076c708d8405))
- **sources:** updates typings definitions ([#3035](https://github.com/SocialGouv/code-du-travail-numerique/issues/3035)) ([6e1659e](https://github.com/SocialGouv/code-du-travail-numerique/commit/6e1659ef8b758c3c81f4612840924577b185225d))

### Features

- **data:** update covid data ([#3037](https://github.com/SocialGouv/code-du-travail-numerique/issues/3037)) ([5475085](https://github.com/SocialGouv/code-du-travail-numerique/commit/5475085cd046fc673f56734affb077c2eec1152c))
- **front:** update landing ([#3034](https://github.com/SocialGouv/code-du-travail-numerique/issues/3034)) ([befb431](https://github.com/SocialGouv/code-du-travail-numerique/commit/befb43138715fa33d2215aadd990daed6a005653))

## [4.31.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.31.1-alpha.3...v4.31.1) (2020-09-29)

**Note:** Version bump only for package @socialgouv/code-du-travail

## [4.31.1-alpha.3](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.31.1-alpha.2...v4.31.1-alpha.3) (2020-09-29)

**Note:** Version bump only for package @socialgouv/code-du-travail

## [4.31.1-alpha.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.31.1-alpha.1...v4.31.1-alpha.2) (2020-09-29)

### Bug Fixes

- **ci:** yet another missing env name ([#3016](https://github.com/SocialGouv/code-du-travail-numerique/issues/3016)) ([804c3c7](https://github.com/SocialGouv/code-du-travail-numerique/commit/804c3c7b83724f240d31760a02c437ce942ea28d))

## [4.31.1-alpha.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.31.1-alpha.0...v4.31.1-alpha.1) (2020-09-29)

**Note:** Version bump only for package @socialgouv/code-du-travail

## [4.31.1-alpha.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.31.0...v4.31.1-alpha.0) (2020-09-29)

### Bug Fixes

- seo ([#3009](https://github.com/SocialGouv/code-du-travail-numerique/issues/3009)) ([213c327](https://github.com/SocialGouv/code-du-travail-numerique/commit/213c32757c5acb1a21b06b928f74906bfa819c88))

# [4.31.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.30.1-alpha.0...v4.31.0) (2020-09-24)

### Bug Fixes

- **ci:** notify on prod2 ([#2986](https://github.com/SocialGouv/code-du-travail-numerique/issues/2986)) ([dd8b0f6](https://github.com/SocialGouv/code-du-travail-numerique/commit/dd8b0f61c20439989de5394bcc98b5fdb74beb71))
- **data:** add a check ensure service-public content ([#2956](https://github.com/SocialGouv/code-du-travail-numerique/issues/2956)) ([f6e9b6c](https://github.com/SocialGouv/code-du-travail-numerique/commit/f6e9b6cff585020f0e62b0a52da290d6b113f7fb)), closes [#2042](https://github.com/SocialGouv/code-du-travail-numerique/issues/2042)
- **front:** logs in tests ([#2998](https://github.com/SocialGouv/code-du-travail-numerique/issues/2998)) ([8d5c534](https://github.com/SocialGouv/code-du-travail-numerique/commit/8d5c53492d9975b0ad0bcc60b664910d36481a93))
- **front:** stats ([#3011](https://github.com/SocialGouv/code-du-travail-numerique/issues/3011)) ([a3b7269](https://github.com/SocialGouv/code-du-travail-numerique/commit/a3b726932628987dfa79dece71f7309f5f37c547))
- **frontend:** add searchbar on header when not scrolling ([#2989](https://github.com/SocialGouv/code-du-travail-numerique/issues/2989)) ([60b03f2](https://github.com/SocialGouv/code-du-travail-numerique/commit/60b03f24d0f69bdfe43df0abdf0dc83dd2319103))
- **tooltip:** sanitize tootltip content ([#2997](https://github.com/SocialGouv/code-du-travail-numerique/issues/2997)) ([f4d39d8](https://github.com/SocialGouv/code-du-travail-numerique/commit/f4d39d8a269aeadd3a7be4b8abec193c9ec6d133))
- rename incubateur->fabrique ([#2994](https://github.com/SocialGouv/code-du-travail-numerique/issues/2994)) ([ae0dd7f](https://github.com/SocialGouv/code-du-travail-numerique/commit/ae0dd7fbf3b048e1f34102c83a9499b943339989))
- **frontend:** prevent localstorage error on write ([#2991](https://github.com/SocialGouv/code-du-travail-numerique/issues/2991)) ([c459871](https://github.com/SocialGouv/code-du-travail-numerique/commit/c459871adec6bde0ea8857ad3dd3b0bbefa535b3))

### Features

- **data:** add new courriers ([#3005](https://github.com/SocialGouv/code-du-travail-numerique/issues/3005)) ([9113924](https://github.com/SocialGouv/code-du-travail-numerique/commit/9113924be07578b9a61401bc873aaa48c17bbce6))
- **data:** remove obsolete content ([#3007](https://github.com/SocialGouv/code-du-travail-numerique/issues/3007)) ([944d9ec](https://github.com/SocialGouv/code-du-travail-numerique/commit/944d9ecd7abe7406aedca5e63b5edb59e3eace99))
- **frontend:** add help to cc search ([#2990](https://github.com/SocialGouv/code-du-travail-numerique/issues/2990)) ([d473ec6](https://github.com/SocialGouv/code-du-travail-numerique/commit/d473ec68e4e9eb04109c251b54843613ae002f59))

## [4.30.1-alpha.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.30.0...v4.30.1-alpha.0) (2020-09-07)

### Bug Fixes

- force release ([#2985](https://github.com/SocialGouv/code-du-travail-numerique/issues/2985)) ([fde7886](https://github.com/SocialGouv/code-du-travail-numerique/commit/fde7886135846756ffedfd5e745ddd491b21f794))

# [4.30.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.29.2...v4.30.0) (2020-09-03)

### Bug Fixes

- **frontend:** simplify social meta url ([#2958](https://github.com/SocialGouv/code-du-travail-numerique/issues/2958)) ([ec05d85](https://github.com/SocialGouv/code-du-travail-numerique/commit/ec05d85d13ee653176963783a4fc775aded9e0ba)), closes [#2818](https://github.com/SocialGouv/code-du-travail-numerique/issues/2818)

### Features

- **data:** update dossier covid ([#2981](https://github.com/SocialGouv/code-du-travail-numerique/issues/2981)) ([99566a8](https://github.com/SocialGouv/code-du-travail-numerique/commit/99566a819242261bd359ac5cd2059ff085e2f97a))
- **frontend:** add ccn 1090 in idl ([#2957](https://github.com/SocialGouv/code-du-travail-numerique/issues/2957)) ([460533c](https://github.com/SocialGouv/code-du-travail-numerique/commit/460533c573b5fa57d0933d410906ad2a54463b0b)), closes [#886](https://github.com/SocialGouv/code-du-travail-numerique/issues/886)
- **frontend:** add new official ministry logo ([#2960](https://github.com/SocialGouv/code-du-travail-numerique/issues/2960)) ([cea9dca](https://github.com/SocialGouv/code-du-travail-numerique/commit/cea9dca403ae884fda900e0c08dad5c2df08c1fe))
- **sdr:** small improvment for [#2153](https://github.com/SocialGouv/code-du-travail-numerique/issues/2153) ([#2952](https://github.com/SocialGouv/code-du-travail-numerique/issues/2952)) ([73c44f7](https://github.com/SocialGouv/code-du-travail-numerique/commit/73c44f7d13a3dbf21263b43e79ac110834a48052))

## [4.29.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.29.1...v4.29.2) (2020-08-27)

### Bug Fixes

- **dossier:** remove deprecated covid related cse content ([#2954](https://github.com/SocialGouv/code-du-travail-numerique/issues/2954)) ([6bfc36f](https://github.com/SocialGouv/code-du-travail-numerique/commit/6bfc36fbfb5a54d9ee4235b8366dab7f4801a127)), closes [#2948](https://github.com/SocialGouv/code-du-travail-numerique/issues/2948)
- **fiches-service-public:** prevent error with malformed accordions fix [#2946](https://github.com/SocialGouv/code-du-travail-numerique/issues/2946) ([#2950](https://github.com/SocialGouv/code-du-travail-numerique/issues/2950)) ([68be7e9](https://github.com/SocialGouv/code-du-travail-numerique/commit/68be7e9a6f9d542bb4d1c81acc72888289633af2))
- **rollup:** fix rollup config for fiche-sp components ([#2953](https://github.com/SocialGouv/code-du-travail-numerique/issues/2953)) ([3788115](https://github.com/SocialGouv/code-du-travail-numerique/commit/37881154e88d0d94fe5a69d40f6bb290f823ff0a))
- wording attestation déplacement pro ([#2951](https://github.com/SocialGouv/code-du-travail-numerique/issues/2951)) ([a4d987f](https://github.com/SocialGouv/code-du-travail-numerique/commit/a4d987f31f199e535fceb2890461b31a24b3da0c)), closes [#2774](https://github.com/SocialGouv/code-du-travail-numerique/issues/2774)

## [4.29.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.29.1-alpha.0...v4.29.1) (2020-08-14)

**Note:** Version bump only for package @socialgouv/code-du-travail

## [4.29.1-alpha.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.29.0...v4.29.1-alpha.0) (2020-08-14)

**Note:** Version bump only for package @socialgouv/code-du-travail

# [4.29.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.28.0...v4.29.0) (2020-08-05)

### Features

- **data:** update dossier ([#2932](https://github.com/SocialGouv/code-du-travail-numerique/issues/2932)) ([5aa07f2](https://github.com/SocialGouv/code-du-travail-numerique/commit/5aa07f2559e687147e2a1e88e2bacf8b8b712ffd))

# [4.28.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.27.0...v4.28.0) (2020-07-30)

### Features

- **data:** add unique cdtnId field to contents [#2816](https://github.com/SocialGouv/code-du-travail-numerique/issues/2816) ([d7ea2ab](https://github.com/SocialGouv/code-du-travail-numerique/commit/d7ea2ab2d13fa3889a628f44c106896caec39ce1))
- **data:** update covid dossier ([#2918](https://github.com/SocialGouv/code-du-travail-numerique/issues/2918)) ([3a1e4d0](https://github.com/SocialGouv/code-du-travail-numerique/commit/3a1e4d013034fda05adf8efecf9b8aa48b7890dc))
- **related items:** covisits - update "get related items" based on Monolog reports(+ A/B testing) ([f19b780](https://github.com/SocialGouv/code-du-travail-numerique/commit/f19b7803a51ff5907ae16181312d922f8d9ef588)), closes [#2613](https://github.com/SocialGouv/code-du-travail-numerique/issues/2613)

# [4.27.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.26.1...v4.27.0) (2020-07-24)

### Bug Fixes

- **api:** get MT_SHEET or MT_SHEET_PAGE documents ([#2912](https://github.com/SocialGouv/code-du-travail-numerique/issues/2912)) ([24e61a9](https://github.com/SocialGouv/code-du-travail-numerique/commit/24e61a938496c11088a06ddb2666ccad16ab6605))
- **data:** distinction bewteen full sheet mt and partial ones ([#2910](https://github.com/SocialGouv/code-du-travail-numerique/issues/2910)) ([f327940](https://github.com/SocialGouv/code-du-travail-numerique/commit/f32794083d5660f828876d1d0ebb0e05dc9d8851))

### Features

- mock NLP in tests ([#2909](https://github.com/SocialGouv/code-du-travail-numerique/issues/2909)) ([f0f20fe](https://github.com/SocialGouv/code-du-travail-numerique/commit/f0f20fec242dd7cece31beec9ad6952ed6ca9b30))
- **data:** make possible to have same ref on different theme ([#2898](https://github.com/SocialGouv/code-du-travail-numerique/issues/2898)) ([b047dd4](https://github.com/SocialGouv/code-du-travail-numerique/commit/b047dd47524b21f10d86fc461c4bd35b777b8629))
- **data:** update covid data ([#2904](https://github.com/SocialGouv/code-du-travail-numerique/issues/2904)) ([141e389](https://github.com/SocialGouv/code-du-travail-numerique/commit/141e389f87e61eebf5d77e3d8383477186acde1f))
- **data:** update infographies ([#2906](https://github.com/SocialGouv/code-du-travail-numerique/issues/2906)) ([48dcd79](https://github.com/SocialGouv/code-du-travail-numerique/commit/48dcd797723e2ad0e5c15a4de363d4fc6ab583f0))
- **front:** change contact wording ([#2903](https://github.com/SocialGouv/code-du-travail-numerique/issues/2903)) ([0384e8f](https://github.com/SocialGouv/code-du-travail-numerique/commit/0384e8f086d019887c0832e012edcfefd4c2d1c1))

## [4.26.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.26.0...v4.26.1) (2020-07-10)

### Bug Fixes

- **front:** transpile slugify ([#2888](https://github.com/SocialGouv/code-du-travail-numerique/issues/2888)) ([a7dd9d4](https://github.com/SocialGouv/code-du-travail-numerique/commit/a7dd9d4ccfa0db7304b37f064e73995b46210185))

# [4.26.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.25.0...v4.26.0) (2020-07-09)

### Bug Fixes

- **front:** allow dailymotion videos and fix wrong date fromat ([#2855](https://github.com/SocialGouv/code-du-travail-numerique/issues/2855)) ([883ed22](https://github.com/SocialGouv/code-du-travail-numerique/commit/883ed2236dade60a9996aa0b29212b1a08fe43be))
- **front:** date mock ([#2869](https://github.com/SocialGouv/code-du-travail-numerique/issues/2869)) ([fbb5731](https://github.com/SocialGouv/code-du-travail-numerique/commit/fbb57316bb05b75060b5ddc0be431831b544d43e))

### Features

- **data:** add infographies ([#2884](https://github.com/SocialGouv/code-du-travail-numerique/issues/2884)) ([f886be7](https://github.com/SocialGouv/code-du-travail-numerique/commit/f886be7db2133a7be8f272d87dbd53dd499bee83))
- **data:** update election CSE ([#2856](https://github.com/SocialGouv/code-du-travail-numerique/issues/2856)) ([404a1c9](https://github.com/SocialGouv/code-du-travail-numerique/commit/404a1c9405b81efc7ecfaa64be0818be3ce2ea1e))
- **front:** change cc search tracking ([#2880](https://github.com/SocialGouv/code-du-travail-numerique/issues/2880)) ([c7bf99a](https://github.com/SocialGouv/code-du-travail-numerique/commit/c7bf99a9cdd745b4a2fa48756c4f945dc5481efe))
- **search:** replace NLP API to external TF Serve service ([#2809](https://github.com/SocialGouv/code-du-travail-numerique/issues/2809)) ([bdd00be](https://github.com/SocialGouv/code-du-travail-numerique/commit/bdd00be84c788d104ec68ba16b3b0e1bc2f35a66))
- **tools:** add hre tool ([#2773](https://github.com/SocialGouv/code-du-travail-numerique/issues/2773)) ([9119f10](https://github.com/SocialGouv/code-du-travail-numerique/commit/9119f10042ab3fdd6c9ace806410c1099beb217d)), closes [#2808](https://github.com/SocialGouv/code-du-travail-numerique/issues/2808)
- **ui:** auto-fix accordions ([#2882](https://github.com/SocialGouv/code-du-travail-numerique/issues/2882)) ([5608b5b](https://github.com/SocialGouv/code-du-travail-numerique/commit/5608b5be8e98b884191a6d0e5ac2a31358351fa3))

# [4.25.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.24.0...v4.25.0) (2020-06-29)

### Bug Fixes

- remove nextjs telemetry ([#2841](https://github.com/SocialGouv/code-du-travail-numerique/issues/2841)) ([ed47c2e](https://github.com/SocialGouv/code-du-travail-numerique/commit/ed47c2e2e9b8ba6b77c6c423cccea54ed1e03c0d)), closes [#1441](https://github.com/SocialGouv/code-du-travail-numerique/issues/1441)

### Features

- **front:** add cdtn logo to widget ([#2833](https://github.com/SocialGouv/code-du-travail-numerique/issues/2833)) ([878c5e8](https://github.com/SocialGouv/code-du-travail-numerique/commit/878c5e8b2f847d15634f4f5674657d5250027056))
- **front:** try to see clearer with dynamic imports ([#2829](https://github.com/SocialGouv/code-du-travail-numerique/issues/2829)) ([9a86de2](https://github.com/SocialGouv/code-du-travail-numerique/commit/9a86de2438ba2159b8e01fdce391a192e946f403))
- **front:** update wording ([#2828](https://github.com/SocialGouv/code-du-travail-numerique/issues/2828)) ([bec49d9](https://github.com/SocialGouv/code-du-travail-numerique/commit/bec49d98325a949e1ac2c1fde55c4f6c81ce13fa))
- **front:** wording ([#2836](https://github.com/SocialGouv/code-du-travail-numerique/issues/2836)) ([7a41a84](https://github.com/SocialGouv/code-du-travail-numerique/commit/7a41a84d6b21a50c8da338bc113b96361afdebfb))
- **tools:** add simulateur-emabauche ([#2840](https://github.com/SocialGouv/code-du-travail-numerique/issues/2840)) ([f5a06ad](https://github.com/SocialGouv/code-du-travail-numerique/commit/f5a06adec785138f5c7520dba73a6c08e6a8bfea)), closes [#2821](https://github.com/SocialGouv/code-du-travail-numerique/issues/2821)

# [4.24.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.23.0...v4.24.0) (2020-06-12)

### Bug Fixes

- **front:** update formulaes ([#2752](https://github.com/SocialGouv/code-du-travail-numerique/issues/2752)) ([e2c82e7](https://github.com/SocialGouv/code-du-travail-numerique/commit/e2c82e74327a951a50e34b44ab918f34e7263a90))
- robots.txt ([#2807](https://github.com/SocialGouv/code-du-travail-numerique/issues/2807)) ([76ded32](https://github.com/SocialGouv/code-du-travail-numerique/commit/76ded32eeae5a9efb07e218cae1ad1661f97dd20))

### Features

- **chore:** Shiny tooltips from webcomponents to manage glossary entries ! ([#2687](https://github.com/SocialGouv/code-du-travail-numerique/issues/2687)) ([0d4d75a](https://github.com/SocialGouv/code-du-travail-numerique/commit/0d4d75ae292de91c5a9c626ab5e217be556fbd3f))
- **front:** track CC page ([#2814](https://github.com/SocialGouv/code-du-travail-numerique/issues/2814)) ([879f881](https://github.com/SocialGouv/code-du-travail-numerique/commit/879f881f6315e2c8f05ba50e8eb5f6bc0d6a46d1))

# [4.23.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.22.0...v4.23.0) (2020-06-05)

### Bug Fixes

- **chore:** no more wildcard ([#2798](https://github.com/SocialGouv/code-du-travail-numerique/issues/2798)) ([43b1a04](https://github.com/SocialGouv/code-du-travail-numerique/commit/43b1a046f00a2936c357797d410937095e30bd3d))
- **mail:** update docx file ([#2784](https://github.com/SocialGouv/code-du-travail-numerique/issues/2784)) ([b363d2e](https://github.com/SocialGouv/code-du-travail-numerique/commit/b363d2eafd5923de5c61792010ab5edcc147b5ed))
- **widget:** fix size on ie ([#2787](https://github.com/SocialGouv/code-du-travail-numerique/issues/2787)) ([dea6a6a](https://github.com/SocialGouv/code-du-travail-numerique/commit/dea6a6a136eb8664243a14efb84f485eb5ba96d3))

### Features

- **data:** update covid 19 files ([#2802](https://github.com/SocialGouv/code-du-travail-numerique/issues/2802)) ([2b22945](https://github.com/SocialGouv/code-du-travail-numerique/commit/2b2294593aa65d5619a679dd15bc07fcdc2a5f94))
- **widget:** improve small size ([#2804](https://github.com/SocialGouv/code-du-travail-numerique/issues/2804)) ([be45c49](https://github.com/SocialGouv/code-du-travail-numerique/commit/be45c49414b4a401ac1871e696a1b88a48127313))

# [4.22.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.22.0-alpha.0...v4.22.0) (2020-05-28)

**Note:** Version bump only for package @socialgouv/code-du-travail

# [4.22.0-alpha.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.21.0...v4.22.0-alpha.0) (2020-05-28)

### Bug Fixes

- **integration:** full url for iframe ([#2778](https://github.com/SocialGouv/code-du-travail-numerique/issues/2778)) ([9551854](https://github.com/SocialGouv/code-du-travail-numerique/commit/95518547844ac88d01c860118896d3e056b0391a))
- **widget:** fix widget init code ([#2772](https://github.com/SocialGouv/code-du-travail-numerique/issues/2772)) ([d064694](https://github.com/SocialGouv/code-du-travail-numerique/commit/d064694ae4128b597e5b40122bceffcf6c4898e6))
- typo + wording ([#2766](https://github.com/SocialGouv/code-du-travail-numerique/issues/2766)) ([aa55e97](https://github.com/SocialGouv/code-du-travail-numerique/commit/aa55e976eaa905f81eafe119ea8c1ccccf570355))

### Features

- add source param to widget search ([#2781](https://github.com/SocialGouv/code-du-travail-numerique/issues/2781)) ([19d4afb](https://github.com/SocialGouv/code-du-travail-numerique/commit/19d4afb0b9b5b44738e20785b9882f37c9db7b92))
- update data ([#2782](https://github.com/SocialGouv/code-du-travail-numerique/issues/2782)) ([6599c2c](https://github.com/SocialGouv/code-du-travail-numerique/commit/6599c2c6d8f08297d9a5a4aeb468fbdc46392941))
- **chore:** editorial content ([#2769](https://github.com/SocialGouv/code-du-travail-numerique/issues/2769)) ([9dc9ccb](https://github.com/SocialGouv/code-du-travail-numerique/commit/9dc9ccba7298aaf96e727ee5ee77d7a625dc95a9)), closes [#2777](https://github.com/SocialGouv/code-du-travail-numerique/issues/2777)

# [4.21.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.20.0...v4.21.0) (2020-05-20)

### Bug Fixes

- **deps:** update all non-major dependencies ([#2727](https://github.com/SocialGouv/code-du-travail-numerique/issues/2727)) ([d9ed531](https://github.com/SocialGouv/code-du-travail-numerique/commit/d9ed531434fcd664364fe3f20c06ad1c97665bc1))
- **deps:** update dependency remark-rehype to v7 ([#2758](https://github.com/SocialGouv/code-du-travail-numerique/issues/2758)) ([6b43384](https://github.com/SocialGouv/code-du-travail-numerique/commit/6b433844cafddcfbb16ccef3c67bef320162ffb9))
- **front:** dumb mistake ([#2748](https://github.com/SocialGouv/code-du-travail-numerique/issues/2748)) ([b05b089](https://github.com/SocialGouv/code-du-travail-numerique/commit/b05b089532e6c97376b6b290657702b715aac5f0))

### Features

- **data:** new model ([#2757](https://github.com/SocialGouv/code-du-travail-numerique/issues/2757)) ([4b4b51f](https://github.com/SocialGouv/code-du-travail-numerique/commit/4b4b51f46877b4a3e094d842172325c10f58d48d))
- **front:** add entretien pro ([#2754](https://github.com/SocialGouv/code-du-travail-numerique/issues/2754)) ([f63d45d](https://github.com/SocialGouv/code-du-travail-numerique/commit/f63d45d4adbcb3a5f7b597937ab1ec21ba503ea9))
- **widget:** create a widget to allow js search integration ([#2744](https://github.com/SocialGouv/code-du-travail-numerique/issues/2744)) ([b09cfab](https://github.com/SocialGouv/code-du-travail-numerique/commit/b09cfab130269da4ac95eb4151b0b47124d0e388))

# [4.20.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.19.0...v4.20.0) (2020-05-15)

### Bug Fixes

- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#2723](https://github.com/SocialGouv/code-du-travail-numerique/issues/2723)) ([c63bc4f](https://github.com/SocialGouv/code-du-travail-numerique/commit/c63bc4f6f0da42b4c074caacd83e1a3022e047da))
- **front:** broken link ([#2743](https://github.com/SocialGouv/code-du-travail-numerique/issues/2743)) ([8c76361](https://github.com/SocialGouv/code-du-travail-numerique/commit/8c7636131172171bdb9282c44214296087217d05))
- **front:** ie issue ([#2729](https://github.com/SocialGouv/code-du-travail-numerique/issues/2729)) ([5fa46ed](https://github.com/SocialGouv/code-du-travail-numerique/commit/5fa46ed88aeeca7786183fdad0b971ae35615c5b))

### Features

- **front:** 404 ([#2738](https://github.com/SocialGouv/code-du-travail-numerique/issues/2738)) ([a04e9a1](https://github.com/SocialGouv/code-du-travail-numerique/commit/a04e9a1d02c1364c45cc0127f9cf73ad103fdf85))
- **front:** new header ([#2733](https://github.com/SocialGouv/code-du-travail-numerique/issues/2733)) ([430e95c](https://github.com/SocialGouv/code-du-travail-numerique/commit/430e95cadf1cf35b892b7fcbc71b4b4bcf20c0a6))
- **front:** new tab in thematic file ([#2736](https://github.com/SocialGouv/code-du-travail-numerique/issues/2736)) ([2cc23a5](https://github.com/SocialGouv/code-du-travail-numerique/commit/2cc23a5b6f7749311deaa552b7f6a60f9bab7446))
- **front:** new tab in themeatic subfolder ([#2739](https://github.com/SocialGouv/code-du-travail-numerique/issues/2739)) ([7512f8b](https://github.com/SocialGouv/code-du-travail-numerique/commit/7512f8ba7873278889f5be7f16138411c7e97813))
- **front:** new tabs ([#2741](https://github.com/SocialGouv/code-du-travail-numerique/issues/2741)) ([160345a](https://github.com/SocialGouv/code-du-travail-numerique/commit/160345a8274adb0092f8233722d47fa9db873eac))

# [4.19.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.18.0...v4.19.0) (2020-05-12)

### Bug Fixes

- **contrib:** use getRouteBySource to match slug ([#2677](https://github.com/SocialGouv/code-du-travail-numerique/issues/2677)) ([eb15c5b](https://github.com/SocialGouv/code-du-travail-numerique/commit/eb15c5bdb4be68518c10837c1e3a6b3047e45aed))
- **data:** add production flag to deploy on production ([#2667](https://github.com/SocialGouv/code-du-travail-numerique/issues/2667)) ([5bd570b](https://github.com/SocialGouv/code-du-travail-numerique/commit/5bd570b47ec38ff3736a66f1ddb5f942224072e4))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#2695](https://github.com/SocialGouv/code-du-travail-numerique/issues/2695)) ([9f26c04](https://github.com/SocialGouv/code-du-travail-numerique/commit/9f26c048b0a32ac1d83dc15eb44c8f4d3d0d0cae))
- **deps:** update [@socialgouv](https://github.com/socialgouv) data packages ([#2710](https://github.com/SocialGouv/code-du-travail-numerique/issues/2710)) ([59106aa](https://github.com/SocialGouv/code-du-travail-numerique/commit/59106aa548b2d3bfadb55be327256daa17c1a8b8))
- **deps:** update all non-major dependencies ([#2661](https://github.com/SocialGouv/code-du-travail-numerique/issues/2661)) ([e0afa5e](https://github.com/SocialGouv/code-du-travail-numerique/commit/e0afa5e8c0c504d65ccd5b7041182141f173b7c7))
- **deps:** update all non-major dependencies ([#2666](https://github.com/SocialGouv/code-du-travail-numerique/issues/2666)) ([d0b8b6e](https://github.com/SocialGouv/code-du-travail-numerique/commit/d0b8b6e89baf6ca2c3f662d899724a938872a046))
- **deps:** update all non-major dependencies ([#2669](https://github.com/SocialGouv/code-du-travail-numerique/issues/2669)) ([379f951](https://github.com/SocialGouv/code-du-travail-numerique/commit/379f9519ca466c5e5bd7828553c9bc94af935762))
- **deps:** update all non-major dependencies ([#2696](https://github.com/SocialGouv/code-du-travail-numerique/issues/2696)) ([4bfd854](https://github.com/SocialGouv/code-du-travail-numerique/commit/4bfd8548635f21522c57c7c658ab71320506496f))
- **deps:** update all non-major dependencies ([#2702](https://github.com/SocialGouv/code-du-travail-numerique/issues/2702)) ([28e24ac](https://github.com/SocialGouv/code-du-travail-numerique/commit/28e24ac9a3d8d6406ef9274d45e0ca1a1bebd324))
- **deps:** update non-major dependencies ([#2675](https://github.com/SocialGouv/code-du-travail-numerique/issues/2675)) ([57338c2](https://github.com/SocialGouv/code-du-travail-numerique/commit/57338c2f6906aa1b8f33d911009fedfa9b57dbb2))
- **sitemap:** remove duplicate content ([#2676](https://github.com/SocialGouv/code-du-travail-numerique/issues/2676)) ([3b66c3f](https://github.com/SocialGouv/code-du-travail-numerique/commit/3b66c3fe5baef484014c127dacc599ec69a0808d))

### Features

- **chore:** add new dossier layout ([#2691](https://github.com/SocialGouv/code-du-travail-numerique/issues/2691)) ([1e19d44](https://github.com/SocialGouv/code-du-travail-numerique/commit/1e19d4457d5d02684f4226cdb032657ded43b311))
- **data:** add covid synonym ([#2664](https://github.com/SocialGouv/code-du-travail-numerique/issues/2664)) ([b48d9ef](https://github.com/SocialGouv/code-du-travail-numerique/commit/b48d9efc945ba9a915da73caee7e6eff8c9d8f3a)), closes [#2611](https://github.com/SocialGouv/code-du-travail-numerique/issues/2611)
- **data:** update social gouv data and minor data change for covid thematic file ([#2721](https://github.com/SocialGouv/code-du-travail-numerique/issues/2721)) ([73090dd](https://github.com/SocialGouv/code-du-travail-numerique/commit/73090ddc3bfb06dd44c2021f1adddba2b402d37b))
- **e2e:** adds some tests, CI setups and so ([#2484](https://github.com/SocialGouv/code-du-travail-numerique/issues/2484)) ([dd46537](https://github.com/SocialGouv/code-du-travail-numerique/commit/dd4653781728bc6d73ab343b1c49a37dd5627e97))
- **front:** add version check in /api ([#2668](https://github.com/SocialGouv/code-du-travail-numerique/issues/2668)) ([559e4f6](https://github.com/SocialGouv/code-du-travail-numerique/commit/559e4f6212ace5c464c75c0c36ef3d50621686dd))
- **front:** minor theme page ui changes ([#2671](https://github.com/SocialGouv/code-du-travail-numerique/issues/2671)) ([78440d0](https://github.com/SocialGouv/code-du-travail-numerique/commit/78440d003048e8d454fe00649fb9706ae9ecc926))
- **frontend:** he's back ([#2701](https://github.com/SocialGouv/code-du-travail-numerique/issues/2701)) ([8da1e86](https://github.com/SocialGouv/code-du-travail-numerique/commit/8da1e865c91eb3d6087898913c920df7207d1fd9))
- **ui:** add TOC component ([#2689](https://github.com/SocialGouv/code-du-travail-numerique/issues/2689)) ([e550f90](https://github.com/SocialGouv/code-du-travail-numerique/commit/e550f90d212f109e1d6a2c8cbf76940fd1288495))

# [4.18.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.18.0-alpha.1...v4.18.0) (2020-04-24)

### Bug Fixes

- **deps:** update all non-major dependencies ([#2654](https://github.com/SocialGouv/code-du-travail-numerique/issues/2654)) ([cbf04ea](https://github.com/SocialGouv/code-du-travail-numerique/commit/cbf04eab88acd484ef30f61bb0177484859588dd))

### Features

- **front:** add prime to ordonnances ([#2660](https://github.com/SocialGouv/code-du-travail-numerique/issues/2660)) ([6c9bf74](https://github.com/SocialGouv/code-du-travail-numerique/commit/6c9bf74de0c1c1daa6c1502abfd47df3581355c2))

# [4.18.0-alpha.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.18.0-alpha.0...v4.18.0-alpha.1) (2020-04-23)

### Features

- **data:** update datafiller data ([#2659](https://github.com/SocialGouv/code-du-travail-numerique/issues/2659)) ([21b3d59](https://github.com/SocialGouv/code-du-travail-numerique/commit/21b3d59e8d0e23952e4643a4de2eec21fdf5c2f9))
- **front:** disable GA and remove tarte au citron ([#2568](https://github.com/SocialGouv/code-du-travail-numerique/issues/2568)) ([151be65](https://github.com/SocialGouv/code-du-travail-numerique/commit/151be656d96d458e223c94e0ead7a3e48e2f320f))

# [4.18.0-alpha.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.17.2...v4.18.0-alpha.0) (2020-04-23)

### Bug Fixes

- automerge [@socialgouv](https://github.com/socialgouv) ([#2655](https://github.com/SocialGouv/code-du-travail-numerique/issues/2655)) ([cdf2058](https://github.com/SocialGouv/code-du-travail-numerique/commit/cdf20583601a506d6bc62ed72675511dc99274c1))
- **api:** add theme for search ([#2650](https://github.com/SocialGouv/code-du-travail-numerique/issues/2650)) ([131d0df](https://github.com/SocialGouv/code-du-travail-numerique/commit/131d0df1a3e21131c3af1e5c2a63aee3f13a5e43))
- **deps:** update all non-major dependencies ([#2640](https://github.com/SocialGouv/code-du-travail-numerique/issues/2640)) ([1619fa5](https://github.com/SocialGouv/code-du-travail-numerique/commit/1619fa55591c0ec39fd448b8861916fd28c65499))
- **deps:** update all non-major dependencies ([#2646](https://github.com/SocialGouv/code-du-travail-numerique/issues/2646)) ([e9ed29a](https://github.com/SocialGouv/code-du-travail-numerique/commit/e9ed29a72e8e0db7ff3515a46a31124a2796c49b))
- **deps:** update dependency @socialgouv/fiches-travail-data to ^1.27.0 ([#2644](https://github.com/SocialGouv/code-du-travail-numerique/issues/2644)) ([9dc06de](https://github.com/SocialGouv/code-du-travail-numerique/commit/9dc06def6b63e46a870dec55c1d83adadc9b3da1))
- **tools:** bug ([#2614](https://github.com/SocialGouv/code-du-travail-numerique/issues/2614)) ([7f28909](https://github.com/SocialGouv/code-du-travail-numerique/commit/7f289097dbb4114d6144bdda80909173e933591a))
- remove headband on print ([#2643](https://github.com/SocialGouv/code-du-travail-numerique/issues/2643)) ([5bd984f](https://github.com/SocialGouv/code-du-travail-numerique/commit/5bd984f0da84d52a4e7cec7363d136c94a399ace))

### Features

- **api:** add socialgouv data packages version ([#2651](https://github.com/SocialGouv/code-du-travail-numerique/issues/2651)) ([366f5fd](https://github.com/SocialGouv/code-du-travail-numerique/commit/366f5fdaffa05bd8ac3bdb84e6f30676376815bb))
- **data:** bump packages ([#2653](https://github.com/SocialGouv/code-du-travail-numerique/issues/2653)) ([0936d7c](https://github.com/SocialGouv/code-du-travail-numerique/commit/0936d7c499f0f55cce6162fc69cc0da517dfc914))
- **front:** minor layout changes ([#2647](https://github.com/SocialGouv/code-du-travail-numerique/issues/2647)) ([e1fd6c5](https://github.com/SocialGouv/code-du-travail-numerique/commit/e1fd6c5f86a10d13cc8e0f1142b447f349504a08))

## [4.17.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.17.1...v4.17.2) (2020-04-18)

### Bug Fixes

- **theme:** add missing route in slug ([#2641](https://github.com/SocialGouv/code-du-travail-numerique/issues/2641)) ([509434d](https://github.com/SocialGouv/code-du-travail-numerique/commit/509434d2580bae2bf6350aeb079d5325723e36a7))

## [4.17.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.17.0...v4.17.1) (2020-04-17)

### Bug Fixes

- **deps:** update all non-major dependencies ([#2616](https://github.com/SocialGouv/code-du-travail-numerique/issues/2616)) ([a384c2b](https://github.com/SocialGouv/code-du-travail-numerique/commit/a384c2bdbaa926a0d81b454b1e7ed27c4ac09385))
- **deps:** update all non-major dependencies ([#2626](https://github.com/SocialGouv/code-du-travail-numerique/issues/2626)) ([a59bd19](https://github.com/SocialGouv/code-du-travail-numerique/commit/a59bd196e7434bbb77cff64816020da08fb5c483))
- **deps:** update all non-major dependencies ([#2632](https://github.com/SocialGouv/code-du-travail-numerique/issues/2632)) ([89630ec](https://github.com/SocialGouv/code-du-travail-numerique/commit/89630ecf0a3eff800518d3e202c59ab8453a8985))
- **deps:** update dependency @socialgouv/contributions-data to ^1.11.0 ([#2637](https://github.com/SocialGouv/code-du-travail-numerique/issues/2637)) ([1377080](https://github.com/SocialGouv/code-du-travail-numerique/commit/1377080eb2bc79ab206cfcfd1da6a6c824357644))
- **deps:** update dependency puppeteer to v3 ([#2627](https://github.com/SocialGouv/code-du-travail-numerique/issues/2627)) ([f57e187](https://github.com/SocialGouv/code-du-travail-numerique/commit/f57e187e8d1caef404aebad817875b8a2e207e67))
- **deps:** update dependency react-autosuggest to v10 ([#2590](https://github.com/SocialGouv/code-du-travail-numerique/issues/2590)) ([86b0236](https://github.com/SocialGouv/code-du-travail-numerique/commit/86b0236d225b158d87480a2074ba5f54c289078f))
- **deps:** update dependency unified to v9 ([#2591](https://github.com/SocialGouv/code-du-travail-numerique/issues/2591)) ([8eeafde](https://github.com/SocialGouv/code-du-travail-numerique/commit/8eeafdea9978dd30b4dbf5a7bde2a89c9ad7ebd8))
- **deps:** update remark monorepo ([#2592](https://github.com/SocialGouv/code-du-travail-numerique/issues/2592)) ([317e7d7](https://github.com/SocialGouv/code-du-travail-numerique/commit/317e7d7d319c2f8741d20f402e96231807b0ccec))
- **frontend:** fix title for theme page ([#2634](https://github.com/SocialGouv/code-du-travail-numerique/issues/2634)) ([b3fad95](https://github.com/SocialGouv/code-du-travail-numerique/commit/b3fad959e8115a4d07cba7155bf11414cec8027c))
- **nlp:** fix abort missing import ([#2609](https://github.com/SocialGouv/code-du-travail-numerique/issues/2609)) ([f530c6f](https://github.com/SocialGouv/code-du-travail-numerique/commit/f530c6f75dacb21904bfcfc4bf23d3cff991ade0))
- **ui:** homepage link ([#2603](https://github.com/SocialGouv/code-du-travail-numerique/issues/2603)) ([602ed62](https://github.com/SocialGouv/code-du-travail-numerique/commit/602ed62fe25ccf54906fc8f4516708a6a9b6b030))

# [4.17.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.16.0...v4.17.0) (2020-04-10)

### Bug Fixes

- **front:** small issues ([#2600](https://github.com/SocialGouv/code-du-travail-numerique/issues/2600)) ([edbadc8](https://github.com/SocialGouv/code-du-travail-numerique/commit/edbadc8973b901ee8d985a381f4d47dce1c33228))

### Features

- **data:** update-data ([#2599](https://github.com/SocialGouv/code-du-travail-numerique/issues/2599)) ([9ef4bc2](https://github.com/SocialGouv/code-du-travail-numerique/commit/9ef4bc27ffd6f4631b55fc92a71b7538583d9de7))
- **front:** add sub folder to corona dossier ([#2598](https://github.com/SocialGouv/code-du-travail-numerique/issues/2598)) ([097a331](https://github.com/SocialGouv/code-du-travail-numerique/commit/097a331d0ecc22e822c709c17dff3bca1727bcf8))
- **frontend:** change CSP restruction to allow \*.social.gouv.fr ([#2595](https://github.com/SocialGouv/code-du-travail-numerique/issues/2595)) ([cfd0ed0](https://github.com/SocialGouv/code-du-travail-numerique/commit/cfd0ed0e156f8f2b46f434d4139c58b6d3cd7403))
- **outils:** use css grids for multi line fields ([#2563](https://github.com/SocialGouv/code-du-travail-numerique/issues/2563)) ([1850442](https://github.com/SocialGouv/code-du-travail-numerique/commit/1850442ac49c78c322025837764b3bde97a1bd18))
- **ui:** add burger nav to UI ([#2584](https://github.com/SocialGouv/code-du-travail-numerique/issues/2584)) ([7f4e584](https://github.com/SocialGouv/code-du-travail-numerique/commit/7f4e58417bdb825baba34fe117e612cb41ab15d7))
- **ui:** embed cool features into ui and update readme ([#2583](https://github.com/SocialGouv/code-du-travail-numerique/issues/2583)) ([e97765a](https://github.com/SocialGouv/code-du-travail-numerique/commit/e97765a8b2416e6c17751d50572943c50ad98512))

# [4.16.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.15.1...v4.16.0) (2020-04-06)

### Bug Fixes

- **front:** typo ([#2569](https://github.com/SocialGouv/code-du-travail-numerique/issues/2569)) ([29983bb](https://github.com/SocialGouv/code-du-travail-numerique/commit/29983bbacb55cb096a511d127f7b786a88260299))

### Features

- **data:** add external tool and update data ([#2580](https://github.com/SocialGouv/code-du-travail-numerique/issues/2580)) ([d02eed4](https://github.com/SocialGouv/code-du-travail-numerique/commit/d02eed47f8045c46ab7ec10d5da9141f9c18115a))
- **data:** update data ([#2582](https://github.com/SocialGouv/code-du-travail-numerique/issues/2582)) ([f10d9be](https://github.com/SocialGouv/code-du-travail-numerique/commit/f10d9be034eaa21081f7b0f7793e24597ff027c3))

## [4.15.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.15.0...v4.15.1) (2020-04-03)

### Bug Fixes

- **api:** remove memory leak from closure([#2566](https://github.com/SocialGouv/code-du-travail-numerique/issues/2566)) ([b91977c](https://github.com/SocialGouv/code-du-travail-numerique/commit/b91977cdbb5abf5a82cc68ecabc652764090b5aa))
- contact modal wording fix [#2533](https://github.com/SocialGouv/code-du-travail-numerique/issues/2533) ([#2553](https://github.com/SocialGouv/code-du-travail-numerique/issues/2553)) ([cc1b9c5](https://github.com/SocialGouv/code-du-travail-numerique/commit/cc1b9c55326f0cd3bc20a1b6744898799c40ba69))

# [4.15.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.14.0...v4.15.0) (2020-04-03)

### Bug Fixes

- **api:** improve api log + update doc ([#2556](https://github.com/SocialGouv/code-du-travail-numerique/issues/2556)) ([dcf83de](https://github.com/SocialGouv/code-du-travail-numerique/commit/dcf83dec93a57aade9d19ef4ec41f99943484bd2))
- ccn picker fix [#2538](https://github.com/SocialGouv/code-du-travail-numerique/issues/2538) ([#2554](https://github.com/SocialGouv/code-du-travail-numerique/issues/2554)) ([3606208](https://github.com/SocialGouv/code-du-travail-numerique/commit/3606208eea51c438fca91a9bb2efd21a3af06a0e))

### Features

- **data:** update data ([#2565](https://github.com/SocialGouv/code-du-travail-numerique/issues/2565)) ([06a8a10](https://github.com/SocialGouv/code-du-travail-numerique/commit/06a8a10a43b817a49148f64820b6429e7c926a38))

# [4.14.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.13.0...v4.14.0) (2020-03-31)

### Bug Fixes

- **data:** bug in fiche mt ([#2547](https://github.com/SocialGouv/code-du-travail-numerique/issues/2547)) ([2e88a4e](https://github.com/SocialGouv/code-du-travail-numerique/commit/2e88a4e9a24c7219ee6e621a450c7af0fb4edc98))

### Features

- **data:** add date to Avertissement element ([#2551](https://github.com/SocialGouv/code-du-travail-numerique/issues/2551)) ([415dab0](https://github.com/SocialGouv/code-du-travail-numerique/commit/415dab037b8fd6da32b3864ea898577e74b604d2))

# [4.13.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.12.0...v4.13.0) (2020-03-30)

### Features

- **data:** update data ([#2545](https://github.com/SocialGouv/code-du-travail-numerique/issues/2545)) ([f7c350d](https://github.com/SocialGouv/code-du-travail-numerique/commit/f7c350d7da970963ad9fabd28954b69b4f87fdb8))
- **data:** update fiche mt themes ([#2546](https://github.com/SocialGouv/code-du-travail-numerique/issues/2546)) ([fe43992](https://github.com/SocialGouv/code-du-travail-numerique/commit/fe43992ca563a6a399140fe8b66d144374b519a6))

# [4.12.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.11.0...v4.12.0) (2020-03-27)

### Features

- **data:** update ([#2541](https://github.com/SocialGouv/code-du-travail-numerique/issues/2541)) ([e14ca3b](https://github.com/SocialGouv/code-du-travail-numerique/commit/e14ca3b16eb0781b03070f74c30f2633823bf451))
- **data:** update-data and hide simulateur ([#2542](https://github.com/SocialGouv/code-du-travail-numerique/issues/2542)) ([205eb15](https://github.com/SocialGouv/code-du-travail-numerique/commit/205eb151e8b8f924a0bd737fb1c9bda65a0c9360))

# [4.11.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.11.0-alpha.1...v4.11.0) (2020-03-27)

**Note:** Version bump only for package @socialgouv/code-du-travail

# [4.11.0-alpha.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.11.0-alpha.0...v4.11.0-alpha.1) (2020-03-27)

**Note:** Version bump only for package @socialgouv/code-du-travail

# [4.11.0-alpha.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.10.0...v4.11.0-alpha.0) (2020-03-27)

### Bug Fixes

- packages/code-du-travail-frontend/package.json to reduce vulnerabilities ([#2540](https://github.com/SocialGouv/code-du-travail-numerique/issues/2540)) ([36fdf05](https://github.com/SocialGouv/code-du-travail-numerique/commit/36fdf05dd1fc77ec56089479dbe3e1b255273f84))
- **api:** disable apm in dev env ([#2532](https://github.com/SocialGouv/code-du-travail-numerique/issues/2532)) ([47dcafc](https://github.com/SocialGouv/code-du-travail-numerique/commit/47dcafc33635d4ff64f0fadf832e68ce2697c7b1))
- **deps:** update all non-major dependencies ([#2525](https://github.com/SocialGouv/code-du-travail-numerique/issues/2525)) ([3b4f256](https://github.com/SocialGouv/code-du-travail-numerique/commit/3b4f2561609d08133d7a014be847b013a1eefedc))

### Features

- **chore:** update dossier ([#2537](https://github.com/SocialGouv/code-du-travail-numerique/issues/2537)) ([e7df6f5](https://github.com/SocialGouv/code-du-travail-numerique/commit/e7df6f5b4a526e309e7afb3dffbf5f1227219144))
- **chore:** update fiches mt and fix images too large ([#2536](https://github.com/SocialGouv/code-du-travail-numerique/issues/2536)) ([c10699f](https://github.com/SocialGouv/code-du-travail-numerique/commit/c10699fbcaf99496cafd6dd9aeffda0672307c05))
- **fiche-sp:** add new element ([#2530](https://github.com/SocialGouv/code-du-travail-numerique/issues/2530)) ([f752f52](https://github.com/SocialGouv/code-du-travail-numerique/commit/f752f525f6a4d004efb4677b4dbc1b823b37c55e))

# [4.10.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.9.0...v4.10.0) (2020-03-24)

### Bug Fixes

- **ccn:** reset scroll position on select cc and fix ui ([#2506](https://github.com/SocialGouv/code-du-travail-numerique/issues/2506)) ([d0b898c](https://github.com/SocialGouv/code-du-travail-numerique/commit/d0b898ce0a2a0ac966e07ed2055dd6a741630cbb))
- **deps:** update all non-major dependencies ([#2521](https://github.com/SocialGouv/code-du-travail-numerique/issues/2521)) ([d038881](https://github.com/SocialGouv/code-du-travail-numerique/commit/d038881e38f1c926eac299ae65ef57aebaca22a3))
- **deps:** update remark monorepo ([#2517](https://github.com/SocialGouv/code-du-travail-numerique/issues/2517)) ([ddd56a3](https://github.com/SocialGouv/code-du-travail-numerique/commit/ddd56a377e93876427b2edaadc49228d44065a4f))
- **tools:** remove icon ([#2507](https://github.com/SocialGouv/code-du-travail-numerique/issues/2507)) ([09dfe9b](https://github.com/SocialGouv/code-du-travail-numerique/commit/09dfe9bae09e5246be459195e26292a3bfa19966))
- **ui:** wrong svg attributes ([#2513](https://github.com/SocialGouv/code-du-travail-numerique/issues/2513)) ([4bacbb7](https://github.com/SocialGouv/code-du-travail-numerique/commit/4bacbb77dd0b4168d00e8bd61468089bc923ffe3))

### Features

- **chore:** update dossier corona ([#2523](https://github.com/SocialGouv/code-du-travail-numerique/issues/2523)) ([aec020e](https://github.com/SocialGouv/code-du-travail-numerique/commit/aec020ef4ce1a131d8df15780facea9b98e513b1))
- **front:** apply ViewMore component everywhere it's used ([#2516](https://github.com/SocialGouv/code-du-travail-numerique/issues/2516)) ([fe07e1b](https://github.com/SocialGouv/code-du-travail-numerique/commit/fe07e1b2afd44b61fc8d9dee9af06bb4c75f79e3))

# [4.9.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.8.0...v4.9.0) (2020-03-20)

### Bug Fixes

- **deps:** update all non-major dependencies ([#2502](https://github.com/SocialGouv/code-du-travail-numerique/issues/2502)) ([f37df0b](https://github.com/SocialGouv/code-du-travail-numerique/commit/f37df0bf17015a43c99d95966b8a178b10ce24c6))
- **deps:** update all non-major dependencies ([#2509](https://github.com/SocialGouv/code-du-travail-numerique/issues/2509)) ([d32f0dd](https://github.com/SocialGouv/code-du-travail-numerique/commit/d32f0dd7e1e242c7f62bc210b283b4fdbcd0d007))

### Features

- **data:** mise à jour modèle ([#2510](https://github.com/SocialGouv/code-du-travail-numerique/issues/2510)) ([28deb5e](https://github.com/SocialGouv/code-du-travail-numerique/commit/28deb5e549209fa090e926f37617ced7a0f41ea6))
- **frontend:** add feather icon compatibility to IconStripe ([#2500](https://github.com/SocialGouv/code-du-travail-numerique/issues/2500)) ([e36e4ae](https://github.com/SocialGouv/code-du-travail-numerique/commit/e36e4ae94c541f48d9efa86633552728fa35937c))

# [4.8.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.7.0...v4.8.0) (2020-03-18)

### Bug Fixes

- **a11y:** prevent accessing page without h1 ([#2497](https://github.com/SocialGouv/code-du-travail-numerique/issues/2497)) ([02a06a4](https://github.com/SocialGouv/code-du-travail-numerique/commit/02a06a4393f26a4807ca36e3557616459bb532ca))
- **deps:** update all non-major dependencies ([#2468](https://github.com/SocialGouv/code-du-travail-numerique/issues/2468)) ([9aced61](https://github.com/SocialGouv/code-du-travail-numerique/commit/9aced616faefade1e7f37695ffb236f7ed25b32e))
- **deps:** update all non-major dependencies ([#2486](https://github.com/SocialGouv/code-du-travail-numerique/issues/2486)) ([3e2282d](https://github.com/SocialGouv/code-du-travail-numerique/commit/3e2282dfe5f391446bd83a8b0fa8c24c29e948dd))
- **deps:** update dependency rehype-react to v5 ([#2478](https://github.com/SocialGouv/code-du-travail-numerique/issues/2478)) ([55c53b3](https://github.com/SocialGouv/code-du-travail-numerique/commit/55c53b379823477c66d8d924716d0aead63d72ed))
- **e2e:** fix typo ([#2487](https://github.com/SocialGouv/code-du-travail-numerique/issues/2487)) ([849153c](https://github.com/SocialGouv/code-du-travail-numerique/commit/849153caf4dc52070da8914165f29e632cc87677))
- **frontend:** ugly style ([#2495](https://github.com/SocialGouv/code-du-travail-numerique/issues/2495)) ([35ea26f](https://github.com/SocialGouv/code-du-travail-numerique/commit/35ea26f20131728346666e26059d8eef429493dc))

### Features

- **data:** add new courrier ([#2491](https://github.com/SocialGouv/code-du-travail-numerique/issues/2491)) ([9aa3600](https://github.com/SocialGouv/code-du-travail-numerique/commit/9aa3600e20a122711043e8e039a892801f8486a8))
- **data:** update dataset ([#2496](https://github.com/SocialGouv/code-du-travail-numerique/issues/2496)) ([7750969](https://github.com/SocialGouv/code-du-travail-numerique/commit/77509690d6f77604de40d4c32366b80dafff7f4f))
- **frontend:** add headband ([#2492](https://github.com/SocialGouv/code-du-travail-numerique/issues/2492)) ([48a52b0](https://github.com/SocialGouv/code-du-travail-numerique/commit/48a52b03c751bfd7ffb93cb82588877e1dea2286))

# [4.7.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.5.0...v4.7.0) (2020-03-14)

### Bug Fixes

- **courrier:** add default theme ([#2476](https://github.com/SocialGouv/code-du-travail-numerique/issues/2476)) ([311965e](https://github.com/SocialGouv/code-du-travail-numerique/commit/311965eacdb54fdaaae0145aa04806c2170c3483))
- **data:** requetes DF : order by position ([#2460](https://github.com/SocialGouv/code-du-travail-numerique/issues/2460)) ([a9b8a38](https://github.com/SocialGouv/code-du-travail-numerique/commit/a9b8a389f7639219b8958483bf73c430a5b6ba83))
- **deps:** update all non-major dependencies ([#2425](https://github.com/SocialGouv/code-du-travail-numerique/issues/2425)) ([33ee415](https://github.com/SocialGouv/code-du-travail-numerique/commit/33ee415e33a2b942230a384656ff95262e04fe0d))
- **deps:** update all non-major dependencies ([#2433](https://github.com/SocialGouv/code-du-travail-numerique/issues/2433)) ([6a27d87](https://github.com/SocialGouv/code-du-travail-numerique/commit/6a27d87e8d075a260e8a08b21313a33e584ac832))
- **deps:** update all non-major dependencies ([#2444](https://github.com/SocialGouv/code-du-travail-numerique/issues/2444)) ([b6ddeb1](https://github.com/SocialGouv/code-du-travail-numerique/commit/b6ddeb16781fb9cab21cec42c3897f6415700f51))
- **deps:** update all non-major dependencies ([#2449](https://github.com/SocialGouv/code-du-travail-numerique/issues/2449)) ([2f818ad](https://github.com/SocialGouv/code-du-travail-numerique/commit/2f818adca09789bfd715b25a21a5db9edf98e321))
- **deps:** update all non-major dependencies ([#2456](https://github.com/SocialGouv/code-du-travail-numerique/issues/2456)) ([72c820b](https://github.com/SocialGouv/code-du-travail-numerique/commit/72c820b66eb1e627d9ee1af764d7c51a19f59ead))
- **deps:** update dependency elastic-apm-node to ^3.5.0 ([#2452](https://github.com/SocialGouv/code-du-travail-numerique/issues/2452)) ([1360107](https://github.com/SocialGouv/code-du-travail-numerique/commit/136010761cf7fbf03488b4439abe239a07ff635d))
- **deps:** update dependency query-string to ^6.11.1 ([#2429](https://github.com/SocialGouv/code-du-travail-numerique/issues/2429)) ([e959a9a](https://github.com/SocialGouv/code-du-travail-numerique/commit/e959a9a75f24ce1206b153289735003e821d9767))
- **search CC:** fix search by siret ([#2461](https://github.com/SocialGouv/code-du-travail-numerique/issues/2461)) ([f35cac2](https://github.com/SocialGouv/code-du-travail-numerique/commit/f35cac24049a0a941259c46557178f1e971c000f))
- **ui:** add linebreak in contrib ([#2451](https://github.com/SocialGouv/code-du-travail-numerique/issues/2451)) ([ea367f9](https://github.com/SocialGouv/code-du-travail-numerique/commit/ea367f9a07c1568d3f4321479b9119a09d72c89e)), closes [#2436](https://github.com/SocialGouv/code-du-travail-numerique/issues/2436)

### Features

- **chore:** add suggested content ([#2465](https://github.com/SocialGouv/code-du-travail-numerique/issues/2465)) ([c9b058c](https://github.com/SocialGouv/code-du-travail-numerique/commit/c9b058cd9e510cd49afa955634202c0b77b189a8))
- **data:** update ([#2448](https://github.com/SocialGouv/code-du-travail-numerique/issues/2448)) ([085bc77](https://github.com/SocialGouv/code-du-travail-numerique/commit/085bc77023668e5c13345b2f25749dc5b03b1e12))
- **data:** update courriers.json ([#2472](https://github.com/SocialGouv/code-du-travail-numerique/issues/2472)) ([9e8da0c](https://github.com/SocialGouv/code-du-travail-numerique/commit/9e8da0cd89b55d79bb21a8b6b21f2c176b0f8104)), closes [#2473](https://github.com/SocialGouv/code-du-travail-numerique/issues/2473)
- **frontend:** change home meta ([#2432](https://github.com/SocialGouv/code-du-travail-numerique/issues/2432)) ([183b517](https://github.com/SocialGouv/code-du-travail-numerique/commit/183b517304f79b51295a0ed4b09f0367f829c4d9))
- **frontend:** remove ambassador link ([#2431](https://github.com/SocialGouv/code-du-travail-numerique/issues/2431)) ([22129c9](https://github.com/SocialGouv/code-du-travail-numerique/commit/22129c9525255c0b4788c32f8a4be33913bef8ee))
- **tools:** move link from intro to result ([#2470](https://github.com/SocialGouv/code-du-travail-numerique/issues/2470)) ([e4814db](https://github.com/SocialGouv/code-du-travail-numerique/commit/e4814db7c0e0498e57b83ef11dfb1dd4bfc8396b))
- **tracking:** udpate tools tracking name ([#2454](https://github.com/SocialGouv/code-du-travail-numerique/issues/2454)) ([9ee5f8c](https://github.com/SocialGouv/code-du-travail-numerique/commit/9ee5f8c4e94f156ff3435fd15a787f47432f9030))
- Update_liste_fiche_Ministère ([#2438](https://github.com/SocialGouv/code-du-travail-numerique/issues/2438)) ([416030b](https://github.com/SocialGouv/code-du-travail-numerique/commit/416030bcd3db2c77e073ab3c05f8ec9c71506598))

# [4.6.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.5.0...v4.6.0) (2020-03-13)

### Bug Fixes

- **data:** requetes DF : order by position ([#2460](https://github.com/SocialGouv/code-du-travail-numerique/issues/2460)) ([a9b8a38](https://github.com/SocialGouv/code-du-travail-numerique/commit/a9b8a389f7639219b8958483bf73c430a5b6ba83))
- **deps:** update all non-major dependencies ([#2425](https://github.com/SocialGouv/code-du-travail-numerique/issues/2425)) ([33ee415](https://github.com/SocialGouv/code-du-travail-numerique/commit/33ee415e33a2b942230a384656ff95262e04fe0d))
- **deps:** update all non-major dependencies ([#2433](https://github.com/SocialGouv/code-du-travail-numerique/issues/2433)) ([6a27d87](https://github.com/SocialGouv/code-du-travail-numerique/commit/6a27d87e8d075a260e8a08b21313a33e584ac832))
- **deps:** update all non-major dependencies ([#2444](https://github.com/SocialGouv/code-du-travail-numerique/issues/2444)) ([b6ddeb1](https://github.com/SocialGouv/code-du-travail-numerique/commit/b6ddeb16781fb9cab21cec42c3897f6415700f51))
- **deps:** update all non-major dependencies ([#2449](https://github.com/SocialGouv/code-du-travail-numerique/issues/2449)) ([2f818ad](https://github.com/SocialGouv/code-du-travail-numerique/commit/2f818adca09789bfd715b25a21a5db9edf98e321))
- **deps:** update all non-major dependencies ([#2456](https://github.com/SocialGouv/code-du-travail-numerique/issues/2456)) ([72c820b](https://github.com/SocialGouv/code-du-travail-numerique/commit/72c820b66eb1e627d9ee1af764d7c51a19f59ead))
- **deps:** update dependency elastic-apm-node to ^3.5.0 ([#2452](https://github.com/SocialGouv/code-du-travail-numerique/issues/2452)) ([1360107](https://github.com/SocialGouv/code-du-travail-numerique/commit/136010761cf7fbf03488b4439abe239a07ff635d))
- **deps:** update dependency query-string to ^6.11.1 ([#2429](https://github.com/SocialGouv/code-du-travail-numerique/issues/2429)) ([e959a9a](https://github.com/SocialGouv/code-du-travail-numerique/commit/e959a9a75f24ce1206b153289735003e821d9767))
- **search CC:** fix search by siret ([#2461](https://github.com/SocialGouv/code-du-travail-numerique/issues/2461)) ([f35cac2](https://github.com/SocialGouv/code-du-travail-numerique/commit/f35cac24049a0a941259c46557178f1e971c000f))
- **ui:** add linebreak in contrib ([#2451](https://github.com/SocialGouv/code-du-travail-numerique/issues/2451)) ([ea367f9](https://github.com/SocialGouv/code-du-travail-numerique/commit/ea367f9a07c1568d3f4321479b9119a09d72c89e)), closes [#2436](https://github.com/SocialGouv/code-du-travail-numerique/issues/2436)

### Features

- **chore:** add suggested content ([#2465](https://github.com/SocialGouv/code-du-travail-numerique/issues/2465)) ([c9b058c](https://github.com/SocialGouv/code-du-travail-numerique/commit/c9b058cd9e510cd49afa955634202c0b77b189a8))
- **data:** update ([#2448](https://github.com/SocialGouv/code-du-travail-numerique/issues/2448)) ([085bc77](https://github.com/SocialGouv/code-du-travail-numerique/commit/085bc77023668e5c13345b2f25749dc5b03b1e12))
- **data:** update courriers.json ([#2472](https://github.com/SocialGouv/code-du-travail-numerique/issues/2472)) ([9e8da0c](https://github.com/SocialGouv/code-du-travail-numerique/commit/9e8da0cd89b55d79bb21a8b6b21f2c176b0f8104)), closes [#2473](https://github.com/SocialGouv/code-du-travail-numerique/issues/2473)
- **frontend:** change home meta ([#2432](https://github.com/SocialGouv/code-du-travail-numerique/issues/2432)) ([183b517](https://github.com/SocialGouv/code-du-travail-numerique/commit/183b517304f79b51295a0ed4b09f0367f829c4d9))
- **frontend:** remove ambassador link ([#2431](https://github.com/SocialGouv/code-du-travail-numerique/issues/2431)) ([22129c9](https://github.com/SocialGouv/code-du-travail-numerique/commit/22129c9525255c0b4788c32f8a4be33913bef8ee))
- **tools:** move link from intro to result ([#2470](https://github.com/SocialGouv/code-du-travail-numerique/issues/2470)) ([e4814db](https://github.com/SocialGouv/code-du-travail-numerique/commit/e4814db7c0e0498e57b83ef11dfb1dd4bfc8396b))
- **tracking:** udpate tools tracking name ([#2454](https://github.com/SocialGouv/code-du-travail-numerique/issues/2454)) ([9ee5f8c](https://github.com/SocialGouv/code-du-travail-numerique/commit/9ee5f8c4e94f156ff3435fd15a787f47432f9030))
- Update_liste_fiche_Ministère ([#2438](https://github.com/SocialGouv/code-du-travail-numerique/issues/2438)) ([416030b](https://github.com/SocialGouv/code-du-travail-numerique/commit/416030bcd3db2c77e073ab3c05f8ec9c71506598))

# [4.5.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.4.1...v4.5.0) (2020-02-28)

### Bug Fixes

- **data:** use a boolean flag to hide content ([#2419](https://github.com/SocialGouv/code-du-travail-numerique/issues/2419)) ([ec461d6](https://github.com/SocialGouv/code-du-travail-numerique/commit/ec461d6d91fd5d6289e4de48d54a23e12a583f26))
- **deps:** update all non-major dependencies ([#2409](https://github.com/SocialGouv/code-du-travail-numerique/issues/2409)) ([8d41430](https://github.com/SocialGouv/code-du-travail-numerique/commit/8d41430733d158ba81ccb302f275454c069e9377))
- **deps:** update all non-major dependencies ([#2424](https://github.com/SocialGouv/code-du-travail-numerique/issues/2424)) ([7d69965](https://github.com/SocialGouv/code-du-travail-numerique/commit/7d699656f8ef4d7846419e9bc1fd9592776bd409))
- **front:** Remove tarteaucitron banner on print ([#2418](https://github.com/SocialGouv/code-du-travail-numerique/issues/2418)) ([0bc290d](https://github.com/SocialGouv/code-du-travail-numerique/commit/0bc290df18e458d3379ac701ff5251e4bf8c3e59))
- **frontend:** better uuid generator ([#2420](https://github.com/SocialGouv/code-du-travail-numerique/issues/2420)) ([71904e5](https://github.com/SocialGouv/code-du-travail-numerique/commit/71904e5bec77330a894a56eaf30885b264f3e390))
- **frontend:** ie issues ([#2421](https://github.com/SocialGouv/code-du-travail-numerique/issues/2421)) ([f071649](https://github.com/SocialGouv/code-du-travail-numerique/commit/f0716499759a52984440488a48a33f51afb0a23b))

### Features

- **frontend:** new convention search layout ([#2395](https://github.com/SocialGouv/code-du-travail-numerique/issues/2395)) ([e310841](https://github.com/SocialGouv/code-du-travail-numerique/commit/e310841a300d557ac4bdffa1e29458b96058940d))

## [4.4.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.4.0...v4.4.1) (2020-02-25)

### Bug Fixes

- **frontend:** fix middleware chain on prod ([#2406](https://github.com/SocialGouv/code-du-travail-numerique/issues/2406)) ([e6dc054](https://github.com/SocialGouv/code-du-travail-numerique/commit/e6dc054479b643a59875e2b91754fd05d1de9c35))

# [4.4.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.4.0-alpha.1...v4.4.0) (2020-02-25)

**Note:** Version bump only for package @socialgouv/code-du-travail

# [4.4.0-alpha.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.4.0-alpha.0...v4.4.0-alpha.1) (2020-02-25)

**Note:** Version bump only for package @socialgouv/code-du-travail

# 4.4.0-alpha.0 (2020-02-25)

### Bug Fixes

- **backend:** missing url in csp frame src ([#2396](https://github.com/SocialGouv/code-du-travail-numerique/issues/2396)) ([766e144](https://github.com/SocialGouv/code-du-travail-numerique/commit/766e14473a8deb2762edf865f8a375f02d28691e))
- **csp:** add matomo to allowed image url ([#2382](https://github.com/SocialGouv/code-du-travail-numerique/issues/2382)) ([e1479fd](https://github.com/SocialGouv/code-du-travail-numerique/commit/e1479fdd4d5a9acf04e8a967130842ea4a627685))
- **csp:** fix sentry url ([#2387](https://github.com/SocialGouv/code-du-travail-numerique/issues/2387)) ([2752cd1](https://github.com/SocialGouv/code-du-travail-numerique/commit/2752cd161e12d1ddbad901768801f55d36309afd))
- **deps:** update all non-major dependencies ([#2330](https://github.com/SocialGouv/code-du-travail-numerique/issues/2330)) ([ccb96a7](https://github.com/SocialGouv/code-du-travail-numerique/commit/ccb96a75b2f2fef401e5f913e90d80a2ea84bca5))
- **deps:** update all non-major dependencies ([#2348](https://github.com/SocialGouv/code-du-travail-numerique/issues/2348)) ([19f0dcf](https://github.com/SocialGouv/code-du-travail-numerique/commit/19f0dcf10d81e8b187ed14dafaa4aa3480686f9e))
- **deps:** update all non-major dependencies ([#2352](https://github.com/SocialGouv/code-du-travail-numerique/issues/2352)) ([e2371c0](https://github.com/SocialGouv/code-du-travail-numerique/commit/e2371c0d1eefffab4ad1e8cffd449ffdf4443e3e))
- **deps:** update all non-major dependencies ([#2357](https://github.com/SocialGouv/code-du-travail-numerique/issues/2357)) ([d06647f](https://github.com/SocialGouv/code-du-travail-numerique/commit/d06647f7cd2e63cfed12437eed1788edd88be9ec))
- **deps:** update all non-major dependencies ([#2360](https://github.com/SocialGouv/code-du-travail-numerique/issues/2360)) ([0ef49b7](https://github.com/SocialGouv/code-du-travail-numerique/commit/0ef49b7a4c5da7914656f76b5dedb32a26a1153a))
- **deps:** update all non-major dependencies ([#2363](https://github.com/SocialGouv/code-du-travail-numerique/issues/2363)) ([984a960](https://github.com/SocialGouv/code-du-travail-numerique/commit/984a960a2d44404bcd239c91c4d26d7ac6e9fe11))
- **deps:** update all non-major dependencies ([#2386](https://github.com/SocialGouv/code-du-travail-numerique/issues/2386)) ([a41f4d7](https://github.com/SocialGouv/code-du-travail-numerique/commit/a41f4d7d467e2a3b11abb66d58b22a714be36287))
- **deps:** update all non-major dependencies ([#2397](https://github.com/SocialGouv/code-du-travail-numerique/issues/2397)) ([9864b99](https://github.com/SocialGouv/code-du-travail-numerique/commit/9864b99a1fccf8bb9d6e9f08c5e92796d4fadda7))
- **front:** closes [#2241](https://github.com/SocialGouv/code-du-travail-numerique/issues/2241) [#2297](https://github.com/SocialGouv/code-du-travail-numerique/issues/2297) ([#2347](https://github.com/SocialGouv/code-du-travail-numerique/issues/2347)) ([312e655](https://github.com/SocialGouv/code-du-travail-numerique/commit/312e655094e31ff67a657376ca6860e783b0a178))
- **frontend:** incorrect react key and prop types ([#2404](https://github.com/SocialGouv/code-du-travail-numerique/issues/2404)) ([1a94e03](https://github.com/SocialGouv/code-du-travail-numerique/commit/1a94e037f7229adb1e3911e038705948b4c556e3))
- **frontend:** prevent contact link exception ([#2394](https://github.com/SocialGouv/code-du-travail-numerique/issues/2394)) ([fb36cac](https://github.com/SocialGouv/code-du-travail-numerique/commit/fb36cac03a5cbd244d7a0ae165f050194fa889a5))
- **frontend:** query is not a regexp ([#2393](https://github.com/SocialGouv/code-du-travail-numerique/issues/2393)) ([845e59c](https://github.com/SocialGouv/code-du-travail-numerique/commit/845e59cf0b7a65971b2c8503d342a229c12095dc))
- **frontend:** remove export keyword in server ([#2359](https://github.com/SocialGouv/code-du-travail-numerique/issues/2359)) ([d4a2f5f](https://github.com/SocialGouv/code-du-travail-numerique/commit/d4a2f5fd6bd487eea63457cd081f889c5c7bae6b))
- **precarite:** handle disclaimer ([#2310](https://github.com/SocialGouv/code-du-travail-numerique/issues/2310)) ([ba49055](https://github.com/SocialGouv/code-du-travail-numerique/commit/ba49055300367f069205190fcd2c35c0326bc16f))
- **results:** add theme in contribution and tools ([#2374](https://github.com/SocialGouv/code-du-travail-numerique/issues/2374)) ([66e8764](https://github.com/SocialGouv/code-du-travail-numerique/commit/66e876434839e9e7b08bcab2c8604bfd503e93b4))

### Features

- **ccn:** allow keyboard navigation when searching ccn ([#2383](https://github.com/SocialGouv/code-du-travail-numerique/issues/2383)) ([d1e3068](https://github.com/SocialGouv/code-du-travail-numerique/commit/d1e3068f21170859b89d727846e81d9a41861a0c)), closes [#2265](https://github.com/SocialGouv/code-du-travail-numerique/issues/2265)
- **chore:** update breadcrumbs ([#2362](https://github.com/SocialGouv/code-du-travail-numerique/issues/2362)) ([e4d5287](https://github.com/SocialGouv/code-du-travail-numerique/commit/e4d5287126e02a2f46b1cd3afdaaf878dd217ed2))
- **contact:** add tracking on sr and contact popup ([#2390](https://github.com/SocialGouv/code-du-travail-numerique/issues/2390)) ([5784438](https://github.com/SocialGouv/code-du-travail-numerique/commit/578443852bb0f5df701c35d3362db93b55538f8f)), closes [#2349](https://github.com/SocialGouv/code-du-travail-numerique/issues/2349)
- **data:** add nota and dateDebut to cdt page ([#2384](https://github.com/SocialGouv/code-du-travail-numerique/issues/2384)) ([07cf388](https://github.com/SocialGouv/code-du-travail-numerique/commit/07cf3886ef8b5824f5eb37e67666fa94fe9f336d)), closes [#499](https://github.com/SocialGouv/code-du-travail-numerique/issues/499)
- **data:** remove duplicate fiche sp referenced in contributions ([#2380](https://github.com/SocialGouv/code-du-travail-numerique/issues/2380)) ([6ba133e](https://github.com/SocialGouv/code-du-travail-numerique/commit/6ba133e4c6be21bff69e874e2dce9f60f0ae74e6))
- **frontend:** new cc layout ([#2379](https://github.com/SocialGouv/code-du-travail-numerique/issues/2379)) ([6d93cb2](https://github.com/SocialGouv/code-du-travail-numerique/commit/6d93cb284185cb53ac6f4e90e86fdfa8615a8335))
- **frontend:** use koa + koa-helmet ([#2311](https://github.com/SocialGouv/code-du-travail-numerique/issues/2311)) ([234e08a](https://github.com/SocialGouv/code-du-travail-numerique/commit/234e08a4e58137dc730b78f3535d190579a1d151))
- **hre:** remove hre tool before release ([#2400](https://github.com/SocialGouv/code-du-travail-numerique/issues/2400)) ([afc4ff2](https://github.com/SocialGouv/code-du-travail-numerique/commit/afc4ff23b1f97ade8aa5cc1b96e094fea629fb29))
- **mail:** update templates ([#2401](https://github.com/SocialGouv/code-du-travail-numerique/issues/2401)) ([ceae61d](https://github.com/SocialGouv/code-du-travail-numerique/commit/ceae61d3f92d0ab30342f4d6507845b7594a2e0c))
- **search:** add tracking for ccn search ([#2392](https://github.com/SocialGouv/code-du-travail-numerique/issues/2392)) ([c7bbd7d](https://github.com/SocialGouv/code-du-travail-numerique/commit/c7bbd7dc2fd5148e15009296047f13e8b04c108b)), closes [#2319](https://github.com/SocialGouv/code-du-travail-numerique/issues/2319)
- **simulator:** update data ([#2375](https://github.com/SocialGouv/code-du-travail-numerique/issues/2375)) ([280512c](https://github.com/SocialGouv/code-du-travail-numerique/commit/280512c2ef6750018c3da8553fb2aed139c268f6))
- **tools:** track tools usage ([#2381](https://github.com/SocialGouv/code-du-travail-numerique/issues/2381)) ([0a2fa42](https://github.com/SocialGouv/code-du-travail-numerique/commit/0a2fa426e96e82f5c32014393e5ce373822eaa4c)), closes [#2368](https://github.com/SocialGouv/code-du-travail-numerique/issues/2368)
- update contributions + DF data ([#2339](https://github.com/SocialGouv/code-du-travail-numerique/issues/2339)) ([6c1ab68](https://github.com/SocialGouv/code-du-travail-numerique/commit/6c1ab683e53f94efa99fa7960d6b4258c5a30e07))
- **ui:** reset scroll after search action ([#2350](https://github.com/SocialGouv/code-du-travail-numerique/issues/2350)) ([2631ebb](https://github.com/SocialGouv/code-du-travail-numerique/commit/2631ebb83ff27a1910680e32bfa1fd68661b5435))
- scale nlp, frontend and api if RAM is above 80% ([#2342](https://github.com/SocialGouv/code-du-travail-numerique/issues/2342)) ([f097d40](https://github.com/SocialGouv/code-du-travail-numerique/commit/f097d406f16c559391eecd3d78ba1710841c7fe3))

# [4.3.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.2.1...v4.3.0) (2020-01-27)

### Bug Fixes

- **babel:** update babel resolutions ([#2291](https://github.com/SocialGouv/code-du-travail-numerique/issues/2291)) ([cc5b980](https://github.com/SocialGouv/code-du-travail-numerique/commit/cc5b9805ce398a32dbb24a7b9237a2c6891c180d))
- **deps:** update dependency koa-router to v8 ([#2284](https://github.com/SocialGouv/code-du-travail-numerique/issues/2284)) ([2ec908a](https://github.com/SocialGouv/code-du-travail-numerique/commit/2ec908ace041a2622b68b75f0ed300e7eb5294ca))
- **deps:** update dependency next-transpile-modules to v3 ([#2267](https://github.com/SocialGouv/code-du-travail-numerique/issues/2267)) ([ac87007](https://github.com/SocialGouv/code-du-travail-numerique/commit/ac87007592c721e4e04781fcd0a3c0fe2201b811))
- **front:** Titles margins, accordion/tabs fixes and prevent content from going behind header when having anchors plus minor typos ([#2242](https://github.com/SocialGouv/code-du-travail-numerique/issues/2242)) ([b6c3f13](https://github.com/SocialGouv/code-du-travail-numerique/commit/b6c3f13764ebfeb95b27e242b477efd18ae13572))

### Features

- **cookie:** add a cookie policy page ([#2294](https://github.com/SocialGouv/code-du-travail-numerique/issues/2294)) ([effb634](https://github.com/SocialGouv/code-du-travail-numerique/commit/effb63474236768ad6535bad22ea4e3a63892401)), closes [#2293](https://github.com/SocialGouv/code-du-travail-numerique/issues/2293) [#2292](https://github.com/SocialGouv/code-du-travail-numerique/issues/2292)
- **courrier:** add breadcrumbs to doc template ([#2286](https://github.com/SocialGouv/code-du-travail-numerique/issues/2286)) ([cb7dc5a](https://github.com/SocialGouv/code-du-travail-numerique/commit/cb7dc5a38fdf141d3ece64e4d4983bcfad4f8e41))
- **stat:** use dynamic value from matomo and es ([#2278](https://github.com/SocialGouv/code-du-travail-numerique/issues/2278)) ([7a0827c](https://github.com/SocialGouv/code-du-travail-numerique/commit/7a0827cd79577b0c0bad25a1c202fdd57e3a0fcd))
- **ui:** add text component ([#2287](https://github.com/SocialGouv/code-du-travail-numerique/issues/2287)) ([61c06eb](https://github.com/SocialGouv/code-du-travail-numerique/commit/61c06eb1d976f405f64439b28bf727c0c7389630))

## [4.2.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.2.0...v4.2.1) (2020-01-23)

### Bug Fixes

- **ie:** add new module transpile-module for contribution ([#2282](https://github.com/SocialGouv/code-du-travail-numerique/issues/2282)) ([6571e2a](https://github.com/SocialGouv/code-du-travail-numerique/commit/6571e2a1d33c618edb5f416eab5f4822f04bc903)), closes [#2281](https://github.com/SocialGouv/code-du-travail-numerique/issues/2281)

# [4.2.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.1.1...v4.2.0) (2020-01-22)

### Bug Fixes

- **ccn:** remove empty article bloc ([#2280](https://github.com/SocialGouv/code-du-travail-numerique/issues/2280)) ([e0c3668](https://github.com/SocialGouv/code-du-travail-numerique/commit/e0c3668a4e913e31a2abb9bfed75af8ec7b91beb))

### Features

- **contrib:** add breadcrumbs ([#2269](https://github.com/SocialGouv/code-du-travail-numerique/issues/2269)) ([d267625](https://github.com/SocialGouv/code-du-travail-numerique/commit/d267625c371111f6ce4e0cff37f7c864246b63e1))
- **modele:** update template mail + add filesize ([#2271](https://github.com/SocialGouv/code-du-travail-numerique/issues/2271)) ([8bb30c6](https://github.com/SocialGouv/code-du-travail-numerique/commit/8bb30c699fb3f4e13fa9a28439c94c13512a6911))

## [4.1.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.1.0...v4.1.1) (2020-01-17)

### Bug Fixes

- **idl:** update result wording ([#2258](https://github.com/SocialGouv/code-du-travail-numerique/issues/2258)) ([46d72f4](https://github.com/SocialGouv/code-du-travail-numerique/commit/46d72f42677f92ded171c386cfef1403fe05bd5b))

# [4.1.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.1.0-alpha.2...v4.1.0) (2020-01-16)

### Features

- **frontend:** use local polyfill ([#2253](https://github.com/SocialGouv/code-du-travail-numerique/issues/2253)) ([0215336](https://github.com/SocialGouv/code-du-travail-numerique/commit/0215336e23e21c7c097d06e6de919294a8f8c795))

# [4.1.0-alpha.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.1.0-alpha.1...v4.1.0-alpha.2) (2020-01-15)

### Bug Fixes

- update data : contribs, DF, fiches-MT ([#2251](https://github.com/SocialGouv/code-du-travail-numerique/issues/2251)) ([5472ce2](https://github.com/SocialGouv/code-du-travail-numerique/commit/5472ce288d682117f272ceda8257ba6083d64978))
- **deps:** update dependency jsdom to v16 ([#2238](https://github.com/SocialGouv/code-du-travail-numerique/issues/2238)) ([0af3113](https://github.com/SocialGouv/code-du-travail-numerique/commit/0af31135817260e39a11fdf09dd4831bd5875bf1))
- **frontend:** fix travail-emploi.gouv url ([#2240](https://github.com/SocialGouv/code-du-travail-numerique/issues/2240)) ([e1bcf84](https://github.com/SocialGouv/code-du-travail-numerique/commit/e1bcf841430ccc1e586a0f64ff137bc4552d1997))
- **mail:** update docx template ([#2229](https://github.com/SocialGouv/code-du-travail-numerique/issues/2229)) ([5ee70bb](https://github.com/SocialGouv/code-du-travail-numerique/commit/5ee70bbf82e7bb069b2caae1efad80e385ee97df))
- **modeles:** fix month in filename ([#2225](https://github.com/SocialGouv/code-du-travail-numerique/issues/2225)) ([7b9f12b](https://github.com/SocialGouv/code-du-travail-numerique/commit/7b9f12b942bd3c75e1738e639dd78bcff3bfc39f))
- **tools:** add disclaimer on salaire net / brut ([#2250](https://github.com/SocialGouv/code-du-travail-numerique/issues/2250)) ([c44ae76](https://github.com/SocialGouv/code-du-travail-numerique/commit/c44ae76bf8f6b14a85b4d04c6ef63a054134084c))
- update rancher project id ([#2232](https://github.com/SocialGouv/code-du-travail-numerique/issues/2232)) ([f9e3edb](https://github.com/SocialGouv/code-du-travail-numerique/commit/f9e3edb5eb841f22a9c6d49925fbd6add494e607))

### Features

- **header:** add new logo ([#2247](https://github.com/SocialGouv/code-du-travail-numerique/issues/2247)) ([cf42568](https://github.com/SocialGouv/code-du-travail-numerique/commit/cf42568979ca49eb8447c072e925610da32a0287))

# [4.1.0-alpha.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.1.0-alpha.0...v4.1.0-alpha.1) (2020-01-13)

### Bug Fixes

- another stab at [#1928](https://github.com/SocialGouv/code-du-travail-numerique/issues/1928) ([#2205](https://github.com/SocialGouv/code-du-travail-numerique/issues/2205)) ([318e7d4](https://github.com/SocialGouv/code-du-travail-numerique/commit/318e7d4dbfa701e5d49646411d9d40791112122d))
- change h2 to h3 in à propos page ([#2214](https://github.com/SocialGouv/code-du-travail-numerique/issues/2214)) ([5b15953](https://github.com/SocialGouv/code-du-travail-numerique/commit/5b159532f942cfd22be21e303291fcf3bda3f71a))
- wrong url in intro step IDL tool ([#2219](https://github.com/SocialGouv/code-du-travail-numerique/issues/2219)) ([34fb965](https://github.com/SocialGouv/code-du-travail-numerique/commit/34fb96582b2156901539b8e82815e038d91ebbbf))
- **data:** udpate courrier docx ([#2204](https://github.com/SocialGouv/code-du-travail-numerique/issues/2204)) ([ebfcc6e](https://github.com/SocialGouv/code-du-travail-numerique/commit/ebfcc6eb3c9f799c2da37d7ac117a49f667cd77b))
- **deps:** update all non-major dependencies ([#2109](https://github.com/SocialGouv/code-du-travail-numerique/issues/2109)) ([dc5638b](https://github.com/SocialGouv/code-du-travail-numerique/commit/dc5638b5f4a9fb8556fbcf878e9d1ee4ca2e826f))
- **frontend:** fix line-height on agreement page ([#2201](https://github.com/SocialGouv/code-du-travail-numerique/issues/2201)) ([47e2a17](https://github.com/SocialGouv/code-du-travail-numerique/commit/47e2a176daffd1d8197a0003771b759fc29c2631)), closes [#2116](https://github.com/SocialGouv/code-du-travail-numerique/issues/2116)
- **react-fiche-service-public:** react and prop-types are real devDependencies ([#2181](https://github.com/SocialGouv/code-du-travail-numerique/issues/2181)) ([f752a1e](https://github.com/SocialGouv/code-du-travail-numerique/commit/f752a1e98ce63bfb096d852c8090c8de63aad406))
- **search:** fix "%" encoding fix [#2196](https://github.com/SocialGouv/code-du-travail-numerique/issues/2196) ([#2216](https://github.com/SocialGouv/code-du-travail-numerique/issues/2216)) ([24eb2a9](https://github.com/SocialGouv/code-du-travail-numerique/commit/24eb2a97cf6af9939a96f71c1e328c844afce7fa))

### Features

- **ccn:** save ccn when navigate to ccn page ([#2208](https://github.com/SocialGouv/code-du-travail-numerique/issues/2208)) ([24cdd78](https://github.com/SocialGouv/code-du-travail-numerique/commit/24cdd7846b907ace44b89aa8cd2870841412c1aa))
- **data:** add fiche prime-pouvoir-achat ([#2207](https://github.com/SocialGouv/code-du-travail-numerique/issues/2207)) ([148c390](https://github.com/SocialGouv/code-du-travail-numerique/commit/148c390734f5b9bbbc61c2ed6fd1f151b42b5a05))
- **frontend:** implementing UI ([#2218](https://github.com/SocialGouv/code-du-travail-numerique/issues/2218)) ([1606408](https://github.com/SocialGouv/code-du-travail-numerique/commit/1606408b989046fd33c16f9cee51f785a1faa228))
- **frontend:** keep implementing new ui ([#2209](https://github.com/SocialGouv/code-du-travail-numerique/issues/2209)) ([b5e697d](https://github.com/SocialGouv/code-du-travail-numerique/commit/b5e697d1d884ecba2a15f0494decd56733b8b2e1))
- **frontend:** minor changes in tool list ([#2210](https://github.com/SocialGouv/code-du-travail-numerique/issues/2210)) ([fb4a8e1](https://github.com/SocialGouv/code-du-travail-numerique/commit/fb4a8e162ca2d4265d741c77e480c3a904b381c4))
- **wizzard:** allow to skip steps ([#2191](https://github.com/SocialGouv/code-du-travail-numerique/issues/2191)) ([2e574e0](https://github.com/SocialGouv/code-du-travail-numerique/commit/2e574e0e1b7b1c437253e99b7c1fd6ab3693a8cd))

### Reverts

- Revert "feat(CI): automate fiches-MT fetch (#2171)" (#2206) ([63366b2](https://github.com/SocialGouv/code-du-travail-numerique/commit/63366b2f44ac3068a75686631545e9c3d735c4dc)), closes [#2171](https://github.com/SocialGouv/code-du-travail-numerique/issues/2171) [#2206](https://github.com/SocialGouv/code-du-travail-numerique/issues/2206)

# [4.1.0-alpha.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.0.0...v4.1.0-alpha.0) (2020-01-08)

### Bug Fixes

- **frontend:** home theme icon displayed on black and white mode ([#2193](https://github.com/SocialGouv/code-du-travail-numerique/issues/2193)) ([97aecdc](https://github.com/SocialGouv/code-du-travail-numerique/commit/97aecdc83069e0bdb2943af55869f1845d22a936))

### Features

- **CI:** automate fiches-MT fetch ([#2171](https://github.com/SocialGouv/code-du-travail-numerique/issues/2171)) ([8371c29](https://github.com/SocialGouv/code-du-travail-numerique/commit/8371c29415ebf5e2496b441af9646f5f5e7dcbb1)), closes [#2163](https://github.com/SocialGouv/code-du-travail-numerique/issues/2163) [#2188](https://github.com/SocialGouv/code-du-travail-numerique/issues/2188)
- **frontend:** add bundle analyzer ([#2091](https://github.com/SocialGouv/code-du-travail-numerique/issues/2091)) ([c17f7fd](https://github.com/SocialGouv/code-du-travail-numerique/commit/c17f7fdc987411bc740b2c5975a9550011175b32))

# [4.0.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.0.0-gamma.4...v4.0.0) (2020-01-07)

### Bug Fixes

- **deps:** update dependency husky to v4 ([#2186](https://github.com/SocialGouv/code-du-travail-numerique/issues/2186)) ([a6853a1](https://github.com/SocialGouv/code-du-travail-numerique/commit/a6853a1c9cd9b0f790d0e35f1c696acd0b99d062))

# [4.0.0-gamma.4](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.0.0-gamma.3...v4.0.0-gamma.4) (2020-01-06)

### Bug Fixes

- **api:** preserve order when merging semantic and fulltext results ([#2107](https://github.com/SocialGouv/code-du-travail-numerique/issues/2107)) ([246b40f](https://github.com/SocialGouv/code-du-travail-numerique/commit/246b40f6159cb70482ef84c211d4be4d1b034d17)), closes [#2095](https://github.com/SocialGouv/code-du-travail-numerique/issues/2095) [#2152](https://github.com/SocialGouv/code-du-travail-numerique/issues/2152)
- Last updates descriptions modèle ([#2169](https://github.com/SocialGouv/code-du-travail-numerique/issues/2169)) ([d974600](https://github.com/SocialGouv/code-du-travail-numerique/commit/d9746005b8cfdd4b025662172d4ee88167cb9772))
- **frontend:** react-burger-menu is a real dependency ([#2172](https://github.com/SocialGouv/code-du-travail-numerique/issues/2172)) ([3333d40](https://github.com/SocialGouv/code-du-travail-numerique/commit/3333d402dbdbc19e91cbc95ed02d10f6ed823d51))
- fix articles links in CDT for [#1928](https://github.com/SocialGouv/code-du-travail-numerique/issues/1928) ([#2167](https://github.com/SocialGouv/code-du-travail-numerique/issues/2167)) ([decb14a](https://github.com/SocialGouv/code-du-travail-numerique/commit/decb14aa4be91b22cc3996ef9f00f768671617a7))

### Features

- **e2e:** add search-ccn ([#2176](https://github.com/SocialGouv/code-du-travail-numerique/issues/2176)) ([fe1f424](https://github.com/SocialGouv/code-du-travail-numerique/commit/fe1f424fcef2bfda216f32367147c3d78e000301))
- **frontend:** home stair tiles ([#2180](https://github.com/SocialGouv/code-du-travail-numerique/issues/2180)) ([d1ab489](https://github.com/SocialGouv/code-du-travail-numerique/commit/d1ab489ced6c6409b729ba01367c6ab185e3c836))
- **frontend:** inline idcc in convention search ([#2178](https://github.com/SocialGouv/code-du-travail-numerique/issues/2178)) ([5a2d30b](https://github.com/SocialGouv/code-du-travail-numerique/commit/5a2d30bf448054566086b0f7faef1ba373db2bc4)), closes [#2118](https://github.com/SocialGouv/code-du-travail-numerique/issues/2118)
- **ui:** refactor grid ([#2158](https://github.com/SocialGouv/code-du-travail-numerique/issues/2158)) ([f9daa7b](https://github.com/SocialGouv/code-du-travail-numerique/commit/f9daa7bbfceaf8d4e870e187d56d07a7aa33fa87))

# [4.0.0-gamma.3](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.0.0-gamma.2...v4.0.0-gamma.3) (2020-01-03)

### Bug Fixes

- typo modele ([#2154](https://github.com/SocialGouv/code-du-travail-numerique/issues/2154)) ([15f17e1](https://github.com/SocialGouv/code-du-travail-numerique/commit/15f17e1191ce95f1b5b658dffa6378be84742c05))
- Update fiches-MT ([#2161](https://github.com/SocialGouv/code-du-travail-numerique/issues/2161)) ([c6574f1](https://github.com/SocialGouv/code-du-travail-numerique/commit/c6574f1a63bc72df5d591c563f40ecc5a52fd6b5))

# [4.0.0-gamma.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.0.0-gamma.1...v4.0.0-gamma.2) (2020-01-02)

### Bug Fixes

- fix typo in PIWIK_URL secret ([#2146](https://github.com/SocialGouv/code-du-travail-numerique/issues/2146)) ([a633d30](https://github.com/SocialGouv/code-du-travail-numerique/commit/a633d306f2b1e6a8a7bcb84894d151cf52dbae46))
- **fiches-MT:** fix sections data ([#2142](https://github.com/SocialGouv/code-du-travail-numerique/issues/2142)) ([a66e86c](https://github.com/SocialGouv/code-du-travail-numerique/commit/a66e86c592d80da149ef182cf3bd143b96d57992))
- **frontend:** chrome mobile issue ([#2139](https://github.com/SocialGouv/code-du-travail-numerique/issues/2139)) ([75f5acf](https://github.com/SocialGouv/code-du-travail-numerique/commit/75f5acf27d9ac39d7b379b5357072ff5f00e62ac))
- fix fiches MT sections ([#2136](https://github.com/SocialGouv/code-du-travail-numerique/issues/2136)) ([cbe2754](https://github.com/SocialGouv/code-du-travail-numerique/commit/cbe2754bc0a9c014d09723847c61098b3cb54dc9)), closes [#2135](https://github.com/SocialGouv/code-du-travail-numerique/issues/2135)
- update data ([#2137](https://github.com/SocialGouv/code-du-travail-numerique/issues/2137)) ([172d6de](https://github.com/SocialGouv/code-du-travail-numerique/commit/172d6dece33f6a99fc18290583bdb902c0a5bd09))

### Features

- **frontend:** impl some of the home design ([#2138](https://github.com/SocialGouv/code-du-travail-numerique/issues/2138)) ([32170d8](https://github.com/SocialGouv/code-du-travail-numerique/commit/32170d86692d4274da8ee4231a742d38dd5f3172))

# [4.0.0-gamma.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.0.0-gamma.0...v4.0.0-gamma.1) (2019-12-31)

### Bug Fixes

- **modeles:** fix wording fix [#2128](https://github.com/SocialGouv/code-du-travail-numerique/issues/2128) ([#2134](https://github.com/SocialGouv/code-du-travail-numerique/issues/2134)) ([a13ed85](https://github.com/SocialGouv/code-du-travail-numerique/commit/a13ed85b1cd80420f80c8d92084ca9ff727df0e6))

# [4.0.0-gamma.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v4.0.0-alpha.1...v4.0.0-gamma.0) (2019-12-31)

### Bug Fixes

- **ingress:** add prod appGW hosts ([#2126](https://github.com/SocialGouv/code-du-travail-numerique/issues/2126)) ([db8b716](https://github.com/SocialGouv/code-du-travail-numerique/commit/db8b71616752d3db1b904f0f54ddf1b22faae310))
- fix frontend probes delays ([#2127](https://github.com/SocialGouv/code-du-travail-numerique/issues/2127)) ([0d59c1b](https://github.com/SocialGouv/code-du-travail-numerique/commit/0d59c1b5ddffc1de4b24a29099fa840f84391af7))

# 4.0.0-alpha.1 (2019-12-31)

### Bug Fixes

- **cc:** fix link to contributions fix [#2101](https://github.com/SocialGouv/code-du-travail-numerique/issues/2101) ([#2102](https://github.com/SocialGouv/code-du-travail-numerique/issues/2102)) ([c037da8](https://github.com/SocialGouv/code-du-travail-numerique/commit/c037da897600ae11e748d6b7b3485ddf40ad3fe0))
- **cc:** some CC cosmetics for [#2035](https://github.com/SocialGouv/code-du-travail-numerique/issues/2035) ([#2073](https://github.com/SocialGouv/code-du-travail-numerique/issues/2073)) ([26ae21e](https://github.com/SocialGouv/code-du-travail-numerique/commit/26ae21e808c2704b8cc3fd3eed619e7822df9149))
- **ci:** dont deploy renovate PRs, some cleanup ([#2089](https://github.com/SocialGouv/code-du-travail-numerique/issues/2089)) ([bef1e0f](https://github.com/SocialGouv/code-du-travail-numerique/commit/bef1e0faa2ab39ceea827798e8ab31975bf8c44d))
- **ci:** rename nlp-nodejs -> nlp-python ([#2094](https://github.com/SocialGouv/code-du-travail-numerique/issues/2094)) ([4786250](https://github.com/SocialGouv/code-du-travail-numerique/commit/47862508e93b2b8691864ce2902688573c593f81))
- **contrib:** wrap <content> into a div ([#2087](https://github.com/SocialGouv/code-du-travail-numerique/issues/2087)) ([91c9bd2](https://github.com/SocialGouv/code-du-travail-numerique/commit/91c9bd2eaf34ed85e514ca083b4edae0ebbb370b))
- **CookieConsent:** fix mentions legales link ([#2060](https://github.com/SocialGouv/code-du-travail-numerique/issues/2060)) ([813cb64](https://github.com/SocialGouv/code-du-travail-numerique/commit/813cb643943fdd38a90d9df99ab48675025c93d5))
- **data:** update Contribs and DF ([#2113](https://github.com/SocialGouv/code-du-travail-numerique/issues/2113)) ([3f596f6](https://github.com/SocialGouv/code-du-travail-numerique/commit/3f596f6a7ed94e09c59654e5766ee07e78cc4202))
- **data:** update datafiller, contributions ([#2119](https://github.com/SocialGouv/code-du-travail-numerique/issues/2119)) ([d6e58bf](https://github.com/SocialGouv/code-du-travail-numerique/commit/d6e58bfead80fb4e67abaf62fd11f29d161f1364))
- **deps:** update all non-major dependencies ([#2066](https://github.com/SocialGouv/code-du-travail-numerique/issues/2066)) ([26d3429](https://github.com/SocialGouv/code-du-travail-numerique/commit/26d34292bd69727f57c5305b969c1cf7eb3b2564))
- **fiches-SP:** fix CC and cdt refs ([#2099](https://github.com/SocialGouv/code-du-travail-numerique/issues/2099)) ([d589d07](https://github.com/SocialGouv/code-du-travail-numerique/commit/d589d07bcb2a83edf42a8910ab8737831c7333c3))
- **frontend:** remove duplicate relatedItems ([#2098](https://github.com/SocialGouv/code-du-travail-numerique/issues/2098)) ([6dd2253](https://github.com/SocialGouv/code-du-travail-numerique/commit/6dd22533e474a00036b0b8edef38164f1039bc5c)), closes [#2078](https://github.com/SocialGouv/code-du-travail-numerique/issues/2078)
- change contribution message position ([#2105](https://github.com/SocialGouv/code-du-travail-numerique/issues/2105)) ([6e2d702](https://github.com/SocialGouv/code-du-travail-numerique/commit/6e2d7028eb8a4beb821e9857bddd95af790ce044))
- fix CPF action ([#2071](https://github.com/SocialGouv/code-du-travail-numerique/issues/2071)) ([eec192b](https://github.com/SocialGouv/code-du-travail-numerique/commit/eec192b1533cfd80dbc396db2bada5ede3e07e86))
- handle API error on CCN picker ([#2080](https://github.com/SocialGouv/code-du-travail-numerique/issues/2080)) ([bd2d1dc](https://github.com/SocialGouv/code-du-travail-numerique/commit/bd2d1dcbd8ab9f0cb9ce4a3f0073523da5c10f10))
- SDR cosmetics fix [#2072](https://github.com/SocialGouv/code-du-travail-numerique/issues/2072) ([#2077](https://github.com/SocialGouv/code-du-travail-numerique/issues/2077)) ([1a3f69b](https://github.com/SocialGouv/code-du-travail-numerique/commit/1a3f69b21648f0d9ec16982483c2a7bd9ade3724))
- typo in setup env script ([#2097](https://github.com/SocialGouv/code-du-travail-numerique/issues/2097)) ([180ca82](https://github.com/SocialGouv/code-du-travail-numerique/commit/180ca82aee31fe28514129b857d8b94b1fcb0b24))
- update contributions data ([#2068](https://github.com/SocialGouv/code-du-travail-numerique/issues/2068)) ([d29d4ab](https://github.com/SocialGouv/code-du-travail-numerique/commit/d29d4abe339d7ecc9a086b3e48f8727b717ae161))
- update df data ([#2090](https://github.com/SocialGouv/code-du-travail-numerique/issues/2090)) ([9db0fdc](https://github.com/SocialGouv/code-du-travail-numerique/commit/9db0fdcc21c4dcef9bdad999eb68e2d5b647c724))
- update document descriptions ([#2085](https://github.com/SocialGouv/code-du-travail-numerique/issues/2085)) ([1905908](https://github.com/SocialGouv/code-du-travail-numerique/commit/1905908f0ee58af6d6bfc7ea561f6eaaa44dd6ae))
- update fiches-MT data ([#2079](https://github.com/SocialGouv/code-du-travail-numerique/issues/2079)) ([6e2b883](https://github.com/SocialGouv/code-du-travail-numerique/commit/6e2b883a7effce0bb13ee5fd5573188434dcb06f))
- **idcc:** support new kali-data number format for idcc ([#2049](https://github.com/SocialGouv/code-du-travail-numerique/issues/2049)) ([12a8c2b](https://github.com/SocialGouv/code-du-travail-numerique/commit/12a8c2b61f8816354f8f53e26e099508459a0897)), closes [#2041](https://github.com/SocialGouv/code-du-travail-numerique/issues/2041)

### Code Refactoring

- use elastic cloud ([#1753](https://github.com/SocialGouv/code-du-travail-numerique/issues/1753)) ([3291662](https://github.com/SocialGouv/code-du-travail-numerique/commit/32916621914475874ffc538691c17188fcd83001)), closes [#1741](https://github.com/SocialGouv/code-du-travail-numerique/issues/1741) [#1987](https://github.com/SocialGouv/code-du-travail-numerique/issues/1987)

### Features

- **ui:** add new section ([#2048](https://github.com/SocialGouv/code-du-travail-numerique/issues/2048)) ([d5456dd](https://github.com/SocialGouv/code-du-travail-numerique/commit/d5456dd0ffe95f819480bcedd6bdc06b7ea64ae9))
- MAJ modèles de docs ([#2020](https://github.com/SocialGouv/code-du-travail-numerique/issues/2020)) ([cea11c1](https://github.com/SocialGouv/code-du-travail-numerique/commit/cea11c17bd60d159b58519ffd6be3ed0870313ed)), closes [#2014](https://github.com/SocialGouv/code-du-travail-numerique/issues/2014) [#2019](https://github.com/SocialGouv/code-du-travail-numerique/issues/2019) [#1837](https://github.com/SocialGouv/code-du-travail-numerique/issues/1837) [#2014](https://github.com/SocialGouv/code-du-travail-numerique/issues/2014)
- **frontend:** add icons to theme ([#2043](https://github.com/SocialGouv/code-du-travail-numerique/issues/2043)) ([284d33d](https://github.com/SocialGouv/code-du-travail-numerique/commit/284d33d5082f2c8cda6eaa924311109ea102ad96))
- **frontend:** remove externals tools ([#2039](https://github.com/SocialGouv/code-du-travail-numerique/issues/2039)) ([a9dca3e](https://github.com/SocialGouv/code-du-travail-numerique/commit/a9dca3e310cadba4133b9f0b37a975272913fbc0)), closes [#2034](https://github.com/SocialGouv/code-du-travail-numerique/issues/2034)
- **home:** change selectedTools ([#2040](https://github.com/SocialGouv/code-du-travail-numerique/issues/2040)) ([829e7fa](https://github.com/SocialGouv/code-du-travail-numerique/commit/829e7faea1f551909fb3c347e2eb9919900403c0))
- use ccn shortitle as slug ([#2038](https://github.com/SocialGouv/code-du-travail-numerique/issues/2038)) ([714709f](https://github.com/SocialGouv/code-du-travail-numerique/commit/714709fc11a5204fce5fba3e030f9719b77db451)), closes [#1830](https://github.com/SocialGouv/code-du-travail-numerique/issues/1830)

### BREAKING CHANGES

- refactor: use elastic cloud
  - We are now using an external elastic cloud service
  - We are deploying to azure to `master-code-travail.dev.fabrique.social.gouv.fr`
  - We are using shared https://github.com/SocialGouv/gitlab-ci-yml

# 4.0.0-alpha.0 (2019-12-31)

### Bug Fixes

- **cc:** fix link to contributions fix [#2101](https://github.com/SocialGouv/code-du-travail-numerique/issues/2101) ([#2102](https://github.com/SocialGouv/code-du-travail-numerique/issues/2102)) ([c037da8](https://github.com/SocialGouv/code-du-travail-numerique/commit/c037da897600ae11e748d6b7b3485ddf40ad3fe0))
- **cc:** some CC cosmetics for [#2035](https://github.com/SocialGouv/code-du-travail-numerique/issues/2035) ([#2073](https://github.com/SocialGouv/code-du-travail-numerique/issues/2073)) ([26ae21e](https://github.com/SocialGouv/code-du-travail-numerique/commit/26ae21e808c2704b8cc3fd3eed619e7822df9149))
- **ci:** dont deploy renovate PRs, some cleanup ([#2089](https://github.com/SocialGouv/code-du-travail-numerique/issues/2089)) ([bef1e0f](https://github.com/SocialGouv/code-du-travail-numerique/commit/bef1e0faa2ab39ceea827798e8ab31975bf8c44d))
- **ci:** rename nlp-nodejs -> nlp-python ([#2094](https://github.com/SocialGouv/code-du-travail-numerique/issues/2094)) ([4786250](https://github.com/SocialGouv/code-du-travail-numerique/commit/47862508e93b2b8691864ce2902688573c593f81))
- **contrib:** wrap <content> into a div ([#2087](https://github.com/SocialGouv/code-du-travail-numerique/issues/2087)) ([91c9bd2](https://github.com/SocialGouv/code-du-travail-numerique/commit/91c9bd2eaf34ed85e514ca083b4edae0ebbb370b))
- **CookieConsent:** fix mentions legales link ([#2060](https://github.com/SocialGouv/code-du-travail-numerique/issues/2060)) ([813cb64](https://github.com/SocialGouv/code-du-travail-numerique/commit/813cb643943fdd38a90d9df99ab48675025c93d5))
- **data:** update Contribs and DF ([#2113](https://github.com/SocialGouv/code-du-travail-numerique/issues/2113)) ([3f596f6](https://github.com/SocialGouv/code-du-travail-numerique/commit/3f596f6a7ed94e09c59654e5766ee07e78cc4202))
- **data:** update datafiller, contributions ([#2119](https://github.com/SocialGouv/code-du-travail-numerique/issues/2119)) ([d6e58bf](https://github.com/SocialGouv/code-du-travail-numerique/commit/d6e58bfead80fb4e67abaf62fd11f29d161f1364))
- **deps:** update all non-major dependencies ([#2066](https://github.com/SocialGouv/code-du-travail-numerique/issues/2066)) ([26d3429](https://github.com/SocialGouv/code-du-travail-numerique/commit/26d34292bd69727f57c5305b969c1cf7eb3b2564))
- **fiches-SP:** fix CC and cdt refs ([#2099](https://github.com/SocialGouv/code-du-travail-numerique/issues/2099)) ([d589d07](https://github.com/SocialGouv/code-du-travail-numerique/commit/d589d07bcb2a83edf42a8910ab8737831c7333c3))
- **frontend:** remove duplicate relatedItems ([#2098](https://github.com/SocialGouv/code-du-travail-numerique/issues/2098)) ([6dd2253](https://github.com/SocialGouv/code-du-travail-numerique/commit/6dd22533e474a00036b0b8edef38164f1039bc5c)), closes [#2078](https://github.com/SocialGouv/code-du-travail-numerique/issues/2078)
- change contribution message position ([#2105](https://github.com/SocialGouv/code-du-travail-numerique/issues/2105)) ([6e2d702](https://github.com/SocialGouv/code-du-travail-numerique/commit/6e2d7028eb8a4beb821e9857bddd95af790ce044))
- fix CPF action ([#2071](https://github.com/SocialGouv/code-du-travail-numerique/issues/2071)) ([eec192b](https://github.com/SocialGouv/code-du-travail-numerique/commit/eec192b1533cfd80dbc396db2bada5ede3e07e86))
- handle API error on CCN picker ([#2080](https://github.com/SocialGouv/code-du-travail-numerique/issues/2080)) ([bd2d1dc](https://github.com/SocialGouv/code-du-travail-numerique/commit/bd2d1dcbd8ab9f0cb9ce4a3f0073523da5c10f10))
- SDR cosmetics fix [#2072](https://github.com/SocialGouv/code-du-travail-numerique/issues/2072) ([#2077](https://github.com/SocialGouv/code-du-travail-numerique/issues/2077)) ([1a3f69b](https://github.com/SocialGouv/code-du-travail-numerique/commit/1a3f69b21648f0d9ec16982483c2a7bd9ade3724))
- typo in setup env script ([#2097](https://github.com/SocialGouv/code-du-travail-numerique/issues/2097)) ([180ca82](https://github.com/SocialGouv/code-du-travail-numerique/commit/180ca82aee31fe28514129b857d8b94b1fcb0b24))
- update contributions data ([#2068](https://github.com/SocialGouv/code-du-travail-numerique/issues/2068)) ([d29d4ab](https://github.com/SocialGouv/code-du-travail-numerique/commit/d29d4abe339d7ecc9a086b3e48f8727b717ae161))
- update df data ([#2090](https://github.com/SocialGouv/code-du-travail-numerique/issues/2090)) ([9db0fdc](https://github.com/SocialGouv/code-du-travail-numerique/commit/9db0fdcc21c4dcef9bdad999eb68e2d5b647c724))
- update document descriptions ([#2085](https://github.com/SocialGouv/code-du-travail-numerique/issues/2085)) ([1905908](https://github.com/SocialGouv/code-du-travail-numerique/commit/1905908f0ee58af6d6bfc7ea561f6eaaa44dd6ae))
- update fiches-MT data ([#2079](https://github.com/SocialGouv/code-du-travail-numerique/issues/2079)) ([6e2b883](https://github.com/SocialGouv/code-du-travail-numerique/commit/6e2b883a7effce0bb13ee5fd5573188434dcb06f))
- **idcc:** support new kali-data number format for idcc ([#2049](https://github.com/SocialGouv/code-du-travail-numerique/issues/2049)) ([12a8c2b](https://github.com/SocialGouv/code-du-travail-numerique/commit/12a8c2b61f8816354f8f53e26e099508459a0897)), closes [#2041](https://github.com/SocialGouv/code-du-travail-numerique/issues/2041)

### Code Refactoring

- use elastic cloud ([#1753](https://github.com/SocialGouv/code-du-travail-numerique/issues/1753)) ([3291662](https://github.com/SocialGouv/code-du-travail-numerique/commit/32916621914475874ffc538691c17188fcd83001)), closes [#1741](https://github.com/SocialGouv/code-du-travail-numerique/issues/1741) [#1987](https://github.com/SocialGouv/code-du-travail-numerique/issues/1987)

### Features

- **ui:** add new section ([#2048](https://github.com/SocialGouv/code-du-travail-numerique/issues/2048)) ([d5456dd](https://github.com/SocialGouv/code-du-travail-numerique/commit/d5456dd0ffe95f819480bcedd6bdc06b7ea64ae9))
- MAJ modèles de docs ([#2020](https://github.com/SocialGouv/code-du-travail-numerique/issues/2020)) ([cea11c1](https://github.com/SocialGouv/code-du-travail-numerique/commit/cea11c17bd60d159b58519ffd6be3ed0870313ed)), closes [#2014](https://github.com/SocialGouv/code-du-travail-numerique/issues/2014) [#2019](https://github.com/SocialGouv/code-du-travail-numerique/issues/2019) [#1837](https://github.com/SocialGouv/code-du-travail-numerique/issues/1837) [#2014](https://github.com/SocialGouv/code-du-travail-numerique/issues/2014)
- **frontend:** add icons to theme ([#2043](https://github.com/SocialGouv/code-du-travail-numerique/issues/2043)) ([284d33d](https://github.com/SocialGouv/code-du-travail-numerique/commit/284d33d5082f2c8cda6eaa924311109ea102ad96))
- **frontend:** remove externals tools ([#2039](https://github.com/SocialGouv/code-du-travail-numerique/issues/2039)) ([a9dca3e](https://github.com/SocialGouv/code-du-travail-numerique/commit/a9dca3e310cadba4133b9f0b37a975272913fbc0)), closes [#2034](https://github.com/SocialGouv/code-du-travail-numerique/issues/2034)
- **home:** change selectedTools ([#2040](https://github.com/SocialGouv/code-du-travail-numerique/issues/2040)) ([829e7fa](https://github.com/SocialGouv/code-du-travail-numerique/commit/829e7faea1f551909fb3c347e2eb9919900403c0))
- use ccn shortitle as slug ([#2038](https://github.com/SocialGouv/code-du-travail-numerique/issues/2038)) ([714709f](https://github.com/SocialGouv/code-du-travail-numerique/commit/714709fc11a5204fce5fba3e030f9719b77db451)), closes [#1830](https://github.com/SocialGouv/code-du-travail-numerique/issues/1830)

### BREAKING CHANGES

- refactor: use elastic cloud
  - We are now using an external elastic cloud service
  - We are deploying to azure to `master-code-travail.dev.fabrique.social.gouv.fr`
  - We are using shared https://github.com/SocialGouv/gitlab-ci-yml

# [3.10.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.9.0...v3.10.0) (2019-12-20)

### Bug Fixes

- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.62 ([#2013](https://github.com/SocialGouv/code-du-travail-numerique/issues/2013)) ([c4633e5](https://github.com/SocialGouv/code-du-travail-numerique/commit/c4633e580b68953530f26338e17d7186e8c16568))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.63 ([#2028](https://github.com/SocialGouv/code-du-travail-numerique/issues/2028)) ([18e9dde](https://github.com/SocialGouv/code-du-travail-numerique/commit/18e9dde21d12b005210cb9f24634123618627cef))
- **frontend:** don't break url with tooltip ([#2026](https://github.com/SocialGouv/code-du-travail-numerique/issues/2026)) ([01cbea8](https://github.com/SocialGouv/code-du-travail-numerique/commit/01cbea84970c742ec9c4bcb19a6b84feb354d8f6))
- **frontend:** fix related item wrong object ([#2018](https://github.com/SocialGouv/code-du-travail-numerique/issues/2018)) ([21f1e5e](https://github.com/SocialGouv/code-du-travail-numerique/commit/21f1e5e8cfdd0570d77860c81702ab91b599605e))
- **glossary:** remove unsupported lookbehind ([#2017](https://github.com/SocialGouv/code-du-travail-numerique/issues/2017)) ([5bb5e2d](https://github.com/SocialGouv/code-du-travail-numerique/commit/5bb5e2d9317c58df89a0d4dd351de2698bb1c689))

### Features

- **ccn:** update ccn definition ([#2009](https://github.com/SocialGouv/code-du-travail-numerique/issues/2009)) ([136e554](https://github.com/SocialGouv/code-du-travail-numerique/commit/136e55427d0ad9c2ce2bc6d05185c65929cc9472)), closes [#1984](https://github.com/SocialGouv/code-du-travail-numerique/issues/1984)
- **external:** add external tools ([#1999](https://github.com/SocialGouv/code-du-travail-numerique/issues/1999)) ([7ed9007](https://github.com/SocialGouv/code-du-travail-numerique/commit/7ed9007dca02dbf986fdbd64c166279c7fece9b4)), closes [#1833](https://github.com/SocialGouv/code-du-travail-numerique/issues/1833)
- **frontend:** add color switch ([#2003](https://github.com/SocialGouv/code-du-travail-numerique/issues/2003)) ([66ce399](https://github.com/SocialGouv/code-du-travail-numerique/commit/66ce39940c4a03072b5b37317b5ffbff1535f6b9))
- **frontend:** update droit-du-travail page ([#2008](https://github.com/SocialGouv/code-du-travail-numerique/issues/2008)) ([9e6ae2c](https://github.com/SocialGouv/code-du-travail-numerique/commit/9e6ae2c7c306110c92e6f88340336f0c8441f8b2)), closes [#1914](https://github.com/SocialGouv/code-du-travail-numerique/issues/1914)
- **ui:** update fields ([#2015](https://github.com/SocialGouv/code-du-travail-numerique/issues/2015)) ([04109e0](https://github.com/SocialGouv/code-du-travail-numerique/commit/04109e0d6be98809ce4ec16d3c27f3a4e0127304))
- index fiches SP directly ([#1993](https://github.com/SocialGouv/code-du-travail-numerique/issues/1993)) ([fdcf28f](https://github.com/SocialGouv/code-du-travail-numerique/commit/fdcf28f36e14d2a25d28bac9eb4c7a5066d83be1))

### Reverts

- Revert "Unrevert "feat(ui): update fields" (#2023)" (#2025) ([78980ee](https://github.com/SocialGouv/code-du-travail-numerique/commit/78980ee0b4c00a62fb904051dc7fdb98bff96468)), closes [#2023](https://github.com/SocialGouv/code-du-travail-numerique/issues/2023) [#2025](https://github.com/SocialGouv/code-du-travail-numerique/issues/2025)
- Revert "feat(ui): update fields (#2015)" (#2022) ([1e20b12](https://github.com/SocialGouv/code-du-travail-numerique/commit/1e20b1259b122f12bc8d46190b6ee30098805339)), closes [#2015](https://github.com/SocialGouv/code-du-travail-numerique/issues/2015) [#2022](https://github.com/SocialGouv/code-du-travail-numerique/issues/2022)

# 3.9.0 (2019-12-18)

### Bug Fixes

- **api:** remove current item from relatedItems ([#2000](https://github.com/SocialGouv/code-du-travail-numerique/issues/2000)) ([eb34bb7](https://github.com/SocialGouv/code-du-travail-numerique/commit/eb34bb7e2afcf968238ace9a6012d71401baa9b7)), closes [#1874](https://github.com/SocialGouv/code-du-travail-numerique/issues/1874)
- **ccn-picker:** fix endless loop in IE11 ([#1936](https://github.com/SocialGouv/code-du-travail-numerique/issues/1936)) ([99f2c9d](https://github.com/SocialGouv/code-du-travail-numerique/commit/99f2c9daac401f60e15712aa9e8962f6a8ac2c3a)), closes [#1749](https://github.com/SocialGouv/code-du-travail-numerique/issues/1749)
- **contribution:** fix ccn matching when using siret2idcc ([#1932](https://github.com/SocialGouv/code-du-travail-numerique/issues/1932)) ([ec0a64b](https://github.com/SocialGouv/code-du-travail-numerique/commit/ec0a64b7c4bf8c1afb407b518d80b133d24acc81)), closes [#1901](https://github.com/SocialGouv/code-du-travail-numerique/issues/1901)
- **data:** add title to titleless sections ([#1972](https://github.com/SocialGouv/code-du-travail-numerique/issues/1972)) ([f9b0118](https://github.com/SocialGouv/code-du-travail-numerique/commit/f9b0118ae7c180282e23c06cc0a6567310249bdc)), closes [#1971](https://github.com/SocialGouv/code-du-travail-numerique/issues/1971)
- **deps:** update dependency @reach/dialog to ^0.6.4 ([#1934](https://github.com/SocialGouv/code-du-travail-numerique/issues/1934)) ([6c0f9da](https://github.com/SocialGouv/code-du-travail-numerique/commit/6c0f9dadae61bb5aef0f411e4216f03fbbd54605))
- **deps:** update dependency @reach/tooltip to ^0.6.4 ([#1935](https://github.com/SocialGouv/code-du-travail-numerique/issues/1935)) ([2dfbdd8](https://github.com/SocialGouv/code-du-travail-numerique/commit/2dfbdd861f01142f647873156e5cc87552661379))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.53 ([#1927](https://github.com/SocialGouv/code-du-travail-numerique/issues/1927)) ([9e36b4b](https://github.com/SocialGouv/code-du-travail-numerique/commit/9e36b4bad475aa17054cef1fae3c61db2d758228))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.54 ([#1937](https://github.com/SocialGouv/code-du-travail-numerique/issues/1937)) ([f2a6978](https://github.com/SocialGouv/code-du-travail-numerique/commit/f2a6978e0c9127443fa303bd0e6d0c56d9bcbac5))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.55 ([#1951](https://github.com/SocialGouv/code-du-travail-numerique/issues/1951)) ([72193a3](https://github.com/SocialGouv/code-du-travail-numerique/commit/72193a36eb84f9a7ecebb595c85c8171a22928d9))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.56 ([#1957](https://github.com/SocialGouv/code-du-travail-numerique/issues/1957)) ([bd1dde4](https://github.com/SocialGouv/code-du-travail-numerique/commit/bd1dde4af7b585508709565515046f54680d5646))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.59 ([#1963](https://github.com/SocialGouv/code-du-travail-numerique/issues/1963)) ([2baecce](https://github.com/SocialGouv/code-du-travail-numerique/commit/2baecce717d35b151bf54c567547e2916d363009))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.60 ([#1992](https://github.com/SocialGouv/code-du-travail-numerique/issues/1992)) ([dfdaf2c](https://github.com/SocialGouv/code-du-travail-numerique/commit/dfdaf2cd868c099ff98893b23149e647da6e6c64))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.61 ([#2001](https://github.com/SocialGouv/code-du-travail-numerique/issues/2001)) ([74684e3](https://github.com/SocialGouv/code-du-travail-numerique/commit/74684e3aa67fbaecc2efb05afe32daef4c75cfaf))
- courriers indexation ([#1943](https://github.com/SocialGouv/code-du-travail-numerique/issues/1943)) ([903a280](https://github.com/SocialGouv/code-du-travail-numerique/commit/903a280276285fe8f40d6713c70c9945ec791846))
- **deps:** update dependency @socialgouv/kali-data to ^1.2.98 ([#1959](https://github.com/SocialGouv/code-du-travail-numerique/issues/1959)) ([bfe5ad2](https://github.com/SocialGouv/code-du-travail-numerique/commit/bfe5ad25d7ec6694997bc90bae15243d74535713))
- **deps:** update dependency next to ^9.1.5 ([#1925](https://github.com/SocialGouv/code-du-travail-numerique/issues/1925)) ([c1aa17e](https://github.com/SocialGouv/code-du-travail-numerique/commit/c1aa17e12a296851194f3d709ec9d1c8e7b1e720))
- **deps:** update dependency next to ^9.1.6 ([#1994](https://github.com/SocialGouv/code-du-travail-numerique/issues/1994)) ([97ac031](https://github.com/SocialGouv/code-du-travail-numerique/commit/97ac03102b384b69b90bad9b0423408d51aa3e4c))
- **deps:** update dependency react-tabs to ^3.1.0 ([#1956](https://github.com/SocialGouv/code-du-travail-numerique/issues/1956)) ([0da96a9](https://github.com/SocialGouv/code-du-travail-numerique/commit/0da96a9d7eea3c35be3c31337ebbf922ba57db6c)), closes [#1958](https://github.com/SocialGouv/code-du-travail-numerique/issues/1958) [#1957](https://github.com/SocialGouv/code-du-travail-numerique/issues/1957)
- **es:** re-make slug a keyword ([#1969](https://github.com/SocialGouv/code-du-travail-numerique/issues/1969)) ([447ebfc](https://github.com/SocialGouv/code-du-travail-numerique/commit/447ebfcd1a05df60856d30ea6ac2b6cb097994e7))
- **fiches-MT:** deeper sectionification ([#1921](https://github.com/SocialGouv/code-du-travail-numerique/issues/1921)) ([5a636b0](https://github.com/SocialGouv/code-du-travail-numerique/commit/5a636b0d3aa87e64667e10497ca7d2cb82d2d90d)), closes [#1898](https://github.com/SocialGouv/code-du-travail-numerique/issues/1898) [#1929](https://github.com/SocialGouv/code-du-travail-numerique/issues/1929)
- **fiches-sp:** update data ([#1930](https://github.com/SocialGouv/code-du-travail-numerique/issues/1930)) ([f8a3a25](https://github.com/SocialGouv/code-du-travail-numerique/commit/f8a3a25487c80ad617c7c89bfc9385cfc495b0ac))
- **idl:** hide ccn paragraph ([#1990](https://github.com/SocialGouv/code-du-travail-numerique/issues/1990)) ([13a5136](https://github.com/SocialGouv/code-du-travail-numerique/commit/13a51368d87f531924876d63298fd365bcb84f16))
- **outils:** rename wrong html entity ([#1926](https://github.com/SocialGouv/code-du-travail-numerique/issues/1926)) ([d205acf](https://github.com/SocialGouv/code-du-travail-numerique/commit/d205acf535d50c008b18c1a1b331de33bd6fe12c)), closes [#1808](https://github.com/SocialGouv/code-du-travail-numerique/issues/1808)
- **simulator:** udpate disclaimer messages ([#1997](https://github.com/SocialGouv/code-du-travail-numerique/issues/1997)) ([e2cfdab](https://github.com/SocialGouv/code-du-travail-numerique/commit/e2cfdab2307780a5085a35f764fe8df52b4f5aac)), closes [#1960](https://github.com/SocialGouv/code-du-travail-numerique/issues/1960)

### Features

- **agreement:** add new agreement page ([#1840](https://github.com/SocialGouv/code-du-travail-numerique/issues/1840)) ([97ec7ad](https://github.com/SocialGouv/code-du-travail-numerique/commit/97ec7ad5790d569ad705d9825df4c521a4136319)), closes [#1398](https://github.com/SocialGouv/code-du-travail-numerique/issues/1398) [#1871](https://github.com/SocialGouv/code-du-travail-numerique/issues/1871)
- **frontend:** CustomTiles and related items ([#1933](https://github.com/SocialGouv/code-du-travail-numerique/issues/1933)) ([7d03762](https://github.com/SocialGouv/code-du-travail-numerique/commit/7d03762ea76006586aea64140a41b79ac17c45b9))
- **frontend:** update about page ([#1942](https://github.com/SocialGouv/code-du-travail-numerique/issues/1942)) ([b3863d8](https://github.com/SocialGouv/code-du-travail-numerique/commit/b3863d8a3364c8ce836281999d3f6ce912f0f9db)), closes [#1835](https://github.com/SocialGouv/code-du-travail-numerique/issues/1835)
- **idl:** update references and remove ccn support ([#1947](https://github.com/SocialGouv/code-du-travail-numerique/issues/1947)) ([f7f372c](https://github.com/SocialGouv/code-du-travail-numerique/commit/f7f372cb8579802d78e581f4b06967e2d9a943d2)), closes [#1870](https://github.com/SocialGouv/code-du-travail-numerique/issues/1870) [#1860](https://github.com/SocialGouv/code-du-travail-numerique/issues/1860)
- ajout fiche SP "Avantages en nature" ([#1953](https://github.com/SocialGouv/code-du-travail-numerique/issues/1953)) ([6c33f31](https://github.com/SocialGouv/code-du-travail-numerique/commit/6c33f319c4a8ddbefc38b0c82e99cae31bc8a552))
- **template:** add date of day in filename when download file ([#1996](https://github.com/SocialGouv/code-du-travail-numerique/issues/1996)) ([f9c6a69](https://github.com/SocialGouv/code-du-travail-numerique/commit/f9c6a691775ec7e8925b02c0d5f58e8a76967b30)), closes [#1810](https://github.com/SocialGouv/code-du-travail-numerique/issues/1810)

# 3.8.0 (2019-12-03)

### Bug Fixes

- **contributions:** remove contribution without generic answer ([#1824](https://github.com/SocialGouv/code-du-travail-numerique/issues/1824)) ([1c0430e](https://github.com/SocialGouv/code-du-travail-numerique/commit/1c0430e))
- **data:** update fiches-MT fix [#1742](https://github.com/SocialGouv/code-du-travail-numerique/issues/1742) ([#1776](https://github.com/SocialGouv/code-du-travail-numerique/issues/1776)) ([0468002](https://github.com/SocialGouv/code-du-travail-numerique/commit/0468002))
- **deps:** update dependency @reach/dialog to ^0.6.2 ([#1797](https://github.com/SocialGouv/code-du-travail-numerique/issues/1797)) ([6c57b16](https://github.com/SocialGouv/code-du-travail-numerique/commit/6c57b16))
- **deps:** update dependency @reach/tooltip to ^0.6.2 ([#1798](https://github.com/SocialGouv/code-du-travail-numerique/issues/1798)) ([c2a464e](https://github.com/SocialGouv/code-du-travail-numerique/commit/c2a464e))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.36 ([#1786](https://github.com/SocialGouv/code-du-travail-numerique/issues/1786)) ([74fd053](https://github.com/SocialGouv/code-du-travail-numerique/commit/74fd053))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.38 ([#1800](https://github.com/SocialGouv/code-du-travail-numerique/issues/1800)) ([dfadffa](https://github.com/SocialGouv/code-du-travail-numerique/commit/dfadffa))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.40 ([#1818](https://github.com/SocialGouv/code-du-travail-numerique/issues/1818)) ([ab12ef1](https://github.com/SocialGouv/code-du-travail-numerique/commit/ab12ef1))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.41 ([#1822](https://github.com/SocialGouv/code-du-travail-numerique/issues/1822)) ([7233599](https://github.com/SocialGouv/code-du-travail-numerique/commit/7233599))
- **deps:** update dependency date-fns to ^2.8.1 ([#1787](https://github.com/SocialGouv/code-du-travail-numerique/issues/1787)) ([5f3833f](https://github.com/SocialGouv/code-du-travail-numerique/commit/5f3833f))
- **deps:** update dependency superagent to ^5.1.1 ([#1785](https://github.com/SocialGouv/code-du-travail-numerique/issues/1785)) ([25f393b](https://github.com/SocialGouv/code-du-travail-numerique/commit/25f393b))
- **deps:** update dependency superagent to ^5.1.2 ([#1845](https://github.com/SocialGouv/code-du-travail-numerique/issues/1845)) ([1ab348b](https://github.com/SocialGouv/code-du-travail-numerique/commit/1ab348b))
- **deps:** update socialgouv ([#1814](https://github.com/SocialGouv/code-du-travail-numerique/issues/1814)) ([5d682f3](https://github.com/SocialGouv/code-du-travail-numerique/commit/5d682f3))
- **deps:** update socialgouv ([#1829](https://github.com/SocialGouv/code-du-travail-numerique/issues/1829)) ([d2b7d5f](https://github.com/SocialGouv/code-du-travail-numerique/commit/d2b7d5f))
- **deps:** update socialgouv ([#1841](https://github.com/SocialGouv/code-du-travail-numerique/issues/1841)) ([c74fd00](https://github.com/SocialGouv/code-du-travail-numerique/commit/c74fd00))
- **deps:** update socialgouv ([#1868](https://github.com/SocialGouv/code-du-travail-numerique/issues/1868)) ([72e02b9](https://github.com/SocialGouv/code-du-travail-numerique/commit/72e02b9))
- **wording:** hot fix [#1866](https://github.com/SocialGouv/code-du-travail-numerique/issues/1866) ([64d8333](https://github.com/SocialGouv/code-du-travail-numerique/commit/64d8333))
- remove fiche SP F22553 fix [#1732](https://github.com/SocialGouv/code-du-travail-numerique/issues/1732) ([#1853](https://github.com/SocialGouv/code-du-travail-numerique/issues/1853)) ([d9f37fd](https://github.com/SocialGouv/code-du-travail-numerique/commit/d9f37fd))
- remove two fiches-SP fix [#1557](https://github.com/SocialGouv/code-du-travail-numerique/issues/1557) ([#1852](https://github.com/SocialGouv/code-du-travail-numerique/issues/1852)) ([fdf0a2d](https://github.com/SocialGouv/code-du-travail-numerique/commit/fdf0a2d))
- use local fonts ([#1803](https://github.com/SocialGouv/code-du-travail-numerique/issues/1803)) ([881cc5a](https://github.com/SocialGouv/code-du-travail-numerique/commit/881cc5a))

### Features

- **chore:** ui new step ([#1811](https://github.com/SocialGouv/code-du-travail-numerique/issues/1811)) ([c8e9901](https://github.com/SocialGouv/code-du-travail-numerique/commit/c8e9901))
- **frontend:** gorgeous layout ([#1828](https://github.com/SocialGouv/code-du-travail-numerique/issues/1828)) ([238be0c](https://github.com/SocialGouv/code-du-travail-numerique/commit/238be0c))
- **frontend:** new-ui-setup ([#1760](https://github.com/SocialGouv/code-du-travail-numerique/issues/1760)) ([eb6f032](https://github.com/SocialGouv/code-du-travail-numerique/commit/eb6f032))
- **frontend:** tons of improvements ([#1867](https://github.com/SocialGouv/code-du-travail-numerique/issues/1867)) ([6132e5e](https://github.com/SocialGouv/code-du-travail-numerique/commit/6132e5e))
- **simulator:** add external link in new window ([#1805](https://github.com/SocialGouv/code-du-travail-numerique/issues/1805)) ([0d9a8c3](https://github.com/SocialGouv/code-du-travail-numerique/commit/0d9a8c3)), closes [#1688](https://github.com/SocialGouv/code-du-travail-numerique/issues/1688)
- **simulator:** add loading / error feedback ([#1804](https://github.com/SocialGouv/code-du-travail-numerique/issues/1804)) ([51f0232](https://github.com/SocialGouv/code-du-travail-numerique/commit/51f0232)), closes [#1576](https://github.com/SocialGouv/code-du-travail-numerique/issues/1576)

# [3.7.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.6.2...v3.7.0) (2019-11-21)

### Bug Fixes

- **deps:** update dependency @sentry/browser to ^5.9.1 ([#1727](https://github.com/SocialGouv/code-du-travail-numerique/issues/1727)) ([5c8014a](https://github.com/SocialGouv/code-du-travail-numerique/commit/5c8014a))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.34 ([#1739](https://github.com/SocialGouv/code-du-travail-numerique/issues/1739)) ([e4abb58](https://github.com/SocialGouv/code-du-travail-numerique/commit/e4abb58))
- **deps:** update dependency @socialgouv/kali-data to ^1.2.32 ([#1740](https://github.com/SocialGouv/code-du-travail-numerique/issues/1740)) ([87922b9](https://github.com/SocialGouv/code-du-travail-numerique/commit/87922b9))
- **deps:** update dependency @socialgouv/legi-data to ^1.1.10 ([#1757](https://github.com/SocialGouv/code-du-travail-numerique/issues/1757)) ([29a4095](https://github.com/SocialGouv/code-du-travail-numerique/commit/29a4095))
- **deps:** update dependency date-fns to ^2.8.0 ([#1743](https://github.com/SocialGouv/code-du-travail-numerique/issues/1743)) ([9940a0d](https://github.com/SocialGouv/code-du-travail-numerique/commit/9940a0d))
- **deps:** update dependency final-form-arrays to ^3.0.2 ([#1758](https://github.com/SocialGouv/code-du-travail-numerique/issues/1758)) ([e6ed933](https://github.com/SocialGouv/code-du-travail-numerique/commit/e6ed933))
- **deps:** update dependency husky to ^3.1.0 ([#1736](https://github.com/SocialGouv/code-du-travail-numerique/issues/1736)) ([c252245](https://github.com/SocialGouv/code-du-travail-numerique/commit/c252245))
- **deps:** update dependency lerna to ^3.19.0 ([#1756](https://github.com/SocialGouv/code-du-travail-numerique/issues/1756)) ([1429f9d](https://github.com/SocialGouv/code-du-travail-numerique/commit/1429f9d))
- **deps:** update dependency next to ^9.1.4 ([#1737](https://github.com/SocialGouv/code-du-travail-numerique/issues/1737)) ([a0c9e07](https://github.com/SocialGouv/code-du-travail-numerique/commit/a0c9e07))
- **deps:** update dependency react-final-form to ^6.3.3 ([#1738](https://github.com/SocialGouv/code-du-travail-numerique/issues/1738)) ([f248856](https://github.com/SocialGouv/code-du-travail-numerique/commit/f248856))

### Features

- **contrib:** add description in search results ([#1734](https://github.com/SocialGouv/code-du-travail-numerique/issues/1734)) ([6e31c3d](https://github.com/SocialGouv/code-du-travail-numerique/commit/6e31c3d)), closes [#1665](https://github.com/SocialGouv/code-du-travail-numerique/issues/1665)
- **data:** update datafiller, contribution, sitemap ([#1769](https://github.com/SocialGouv/code-du-travail-numerique/issues/1769)) ([6086d5b](https://github.com/SocialGouv/code-du-travail-numerique/commit/6086d5b))

## [3.6.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.6.1...v3.6.2) (2019-11-18)

### Bug Fixes

- **deps:** update dependency @reach/tooltip to ^0.6.1 ([#1718](https://github.com/SocialGouv/code-du-travail-numerique/issues/1718)) ([b9d470b](https://github.com/SocialGouv/code-du-travail-numerique/commit/b9d470b))
- **deps:** update dependency @socialgouv/kali-data to ^1.2.31 ([#1720](https://github.com/SocialGouv/code-du-travail-numerique/issues/1720)) ([0fb8402](https://github.com/SocialGouv/code-du-travail-numerique/commit/0fb8402))

## [3.6.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.6.0...v3.6.1) (2019-11-18)

**Note:** Version bump only for package @socialgouv/code-du-travail

# 3.6.0 (2019-11-18)

### Bug Fixes

- **deps:** update dependency @reach/dialog to ^0.6.1 ([#1717](https://github.com/SocialGouv/code-du-travail-numerique/issues/1717)) ([2421efe](https://github.com/SocialGouv/code-du-travail-numerique/commit/2421efe))
- **deps:** update dependency @sentry/browser to ^5.8.0 ([#1685](https://github.com/SocialGouv/code-du-travail-numerique/issues/1685)) ([36fc670](https://github.com/SocialGouv/code-du-travail-numerique/commit/36fc670))
- **deps:** update dependency @sentry/browser to ^5.9.0 ([#1701](https://github.com/SocialGouv/code-du-travail-numerique/issues/1701)) ([9de4a7e](https://github.com/SocialGouv/code-du-travail-numerique/commit/9de4a7e))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.22 ([#1668](https://github.com/SocialGouv/code-du-travail-numerique/issues/1668)) ([e5afa2a](https://github.com/SocialGouv/code-du-travail-numerique/commit/e5afa2a))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.26 ([#1679](https://github.com/SocialGouv/code-du-travail-numerique/issues/1679)) ([4ab5e38](https://github.com/SocialGouv/code-du-travail-numerique/commit/4ab5e38))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.27 ([#1695](https://github.com/SocialGouv/code-du-travail-numerique/issues/1695)) ([3ba1b4f](https://github.com/SocialGouv/code-du-travail-numerique/commit/3ba1b4f))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.28 ([#1704](https://github.com/SocialGouv/code-du-travail-numerique/issues/1704)) ([fa2c902](https://github.com/SocialGouv/code-du-travail-numerique/commit/fa2c902))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.29 ([#1711](https://github.com/SocialGouv/code-du-travail-numerique/issues/1711)) ([9b0cc15](https://github.com/SocialGouv/code-du-travail-numerique/commit/9b0cc15))
- **deps:** update dependency @socialgouv/fiches-vdd to ^1.0.32 ([#1719](https://github.com/SocialGouv/code-du-travail-numerique/issues/1719)) ([0510c47](https://github.com/SocialGouv/code-du-travail-numerique/commit/0510c47))
- **deps:** update dependency @socialgouv/kali-data to ^1.2.27 ([#1678](https://github.com/SocialGouv/code-du-travail-numerique/issues/1678)) ([860c3bc](https://github.com/SocialGouv/code-du-travail-numerique/commit/860c3bc))
- **deps:** update dependency @socialgouv/kali-data to ^1.2.28 ([#1696](https://github.com/SocialGouv/code-du-travail-numerique/issues/1696)) ([9925327](https://github.com/SocialGouv/code-du-travail-numerique/commit/9925327))
- **deps:** update dependency @socialgouv/kali-data to ^1.2.29 ([#1705](https://github.com/SocialGouv/code-du-travail-numerique/issues/1705)) ([3e90dab](https://github.com/SocialGouv/code-du-travail-numerique/commit/3e90dab))
- **deps:** update dependency @socialgouv/kali-data to ^1.2.30 ([#1712](https://github.com/SocialGouv/code-du-travail-numerique/issues/1712)) ([e60d2bd](https://github.com/SocialGouv/code-du-travail-numerique/commit/e60d2bd))
- **deps:** update dependency @socialgouv/legi-data to ^1.1.7 ([#1677](https://github.com/SocialGouv/code-du-travail-numerique/issues/1677)) ([7edd102](https://github.com/SocialGouv/code-du-travail-numerique/commit/7edd102))
- **deps:** update dependency @socialgouv/legi-data to ^1.1.8 ([#1694](https://github.com/SocialGouv/code-du-travail-numerique/issues/1694)) ([b97092d](https://github.com/SocialGouv/code-du-travail-numerique/commit/b97092d))
- **deps:** update dependency @socialgouv/legi-data to ^1.1.9 ([#1703](https://github.com/SocialGouv/code-du-travail-numerique/issues/1703)) ([2f99991](https://github.com/SocialGouv/code-du-travail-numerique/commit/2f99991))
- **deps:** update dependency date-fns to ^2.7.0 ([#1662](https://github.com/SocialGouv/code-du-travail-numerique/issues/1662)) ([c77414c](https://github.com/SocialGouv/code-du-travail-numerique/commit/c77414c))
- **deps:** update dependency final-form to ^4.18.6 ([#1661](https://github.com/SocialGouv/code-du-travail-numerique/issues/1661)) ([1834140](https://github.com/SocialGouv/code-du-travail-numerique/commit/1834140))
- **deps:** update dependency lerna to ^3.18.4 ([#1666](https://github.com/SocialGouv/code-du-travail-numerique/issues/1666)) ([8c56413](https://github.com/SocialGouv/code-du-travail-numerique/commit/8c56413))
- **deps:** update dependency ora to ^4.0.3 ([#1698](https://github.com/SocialGouv/code-du-travail-numerique/issues/1698)) ([31e2bf6](https://github.com/SocialGouv/code-du-travail-numerique/commit/31e2bf6))
- **deps:** update dependency query-string to ^6.9.0 ([#1697](https://github.com/SocialGouv/code-du-travail-numerique/issues/1697)) ([b5dce1b](https://github.com/SocialGouv/code-du-travail-numerique/commit/b5dce1b))
- **deps:** update dependency react-accessible-accordion to ^3.0.1 ([#1702](https://github.com/SocialGouv/code-du-travail-numerique/issues/1702)) ([41f12ce](https://github.com/SocialGouv/code-du-travail-numerique/commit/41f12ce))
- **deps:** update dependency unified to ^8.4.2 ([#1683](https://github.com/SocialGouv/code-du-travail-numerique/issues/1683)) ([5e1b412](https://github.com/SocialGouv/code-du-travail-numerique/commit/5e1b412))
- **deps:** update remark monorepo ([#1682](https://github.com/SocialGouv/code-du-travail-numerique/issues/1682)) ([eac11ba](https://github.com/SocialGouv/code-du-travail-numerique/commit/eac11ba))
- **suggester:** update suggestions list ([#1714](https://github.com/SocialGouv/code-du-travail-numerique/issues/1714)) ([b86cd3f](https://github.com/SocialGouv/code-du-travail-numerique/commit/b86cd3f))
- **ui:** allow Button to forwardRef ([#1707](https://github.com/SocialGouv/code-du-travail-numerique/issues/1707)) ([a24080e](https://github.com/SocialGouv/code-du-travail-numerique/commit/a24080e))

### Features

- **api:** add score and algo key in search results ([#1709](https://github.com/SocialGouv/code-du-travail-numerique/issues/1709)) ([8064aef](https://github.com/SocialGouv/code-du-travail-numerique/commit/8064aef))
- **courrier-types:** remove manual script step on docs update ([#1699](https://github.com/SocialGouv/code-du-travail-numerique/issues/1699)) ([bd420bf](https://github.com/SocialGouv/code-du-travail-numerique/commit/bd420bf))
- **data:** unsplit fiches-mt ([#1657](https://github.com/SocialGouv/code-du-travail-numerique/issues/1657)) ([65f31f2](https://github.com/SocialGouv/code-du-travail-numerique/commit/65f31f2)), closes [#1394](https://github.com/SocialGouv/code-du-travail-numerique/issues/1394)
- **matomo:** add suggestionCandidate and resultsCandidate in matomo ([#1708](https://github.com/SocialGouv/code-du-travail-numerique/issues/1708)) ([d3dd21a](https://github.com/SocialGouv/code-du-travail-numerique/commit/d3dd21a))
- **sitemap:** add glossary, documents and static pages ([#1700](https://github.com/SocialGouv/code-du-travail-numerique/issues/1700)) ([3efb11a](https://github.com/SocialGouv/code-du-travail-numerique/commit/3efb11a)), closes [#1569](https://github.com/SocialGouv/code-du-travail-numerique/issues/1569)
- **suggester:** Suggestions supported by Elastic Search ([#1549](https://github.com/SocialGouv/code-du-travail-numerique/issues/1549)) ([080744b](https://github.com/SocialGouv/code-du-travail-numerique/commit/080744b))

# [3.5.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.4.2...v3.5.0) (2019-11-06)

### Bug Fixes

- **deps:** update dependency @reach/tooltip to ^0.5.4 ([#1647](https://github.com/SocialGouv/code-du-travail-numerique/issues/1647)) ([3f90868](https://github.com/SocialGouv/code-du-travail-numerique/commit/3f90868))

### Features

- **frontend:** add health check url ([#1649](https://github.com/SocialGouv/code-du-travail-numerique/issues/1649)) ([0421309](https://github.com/SocialGouv/code-du-travail-numerique/commit/0421309))

## [3.4.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.4.1...v3.4.2) (2019-11-05)

### Bug Fixes

- **data:** prevent aliases from pointing to different indices ([#1638](https://github.com/SocialGouv/code-du-travail-numerique/issues/1638)) ([f42b9de](https://github.com/SocialGouv/code-du-travail-numerique/commit/f42b9de))
- **deps:** update dependency mammoth to ^1.4.9 ([#1614](https://github.com/SocialGouv/code-du-travail-numerique/issues/1614)) ([82eb676](https://github.com/SocialGouv/code-du-travail-numerique/commit/82eb676))

## [3.4.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.4.0...v3.4.1) (2019-11-05)

**Note:** Version bump only for package @socialgouv/code-du-travail

# 3.4.0 (2019-11-05)

### Bug Fixes

- **api:** case where description was not returned ([#1539](https://github.com/SocialGouv/code-du-travail-numerique/issues/1539)) ([b8b7172](https://github.com/SocialGouv/code-du-travail-numerique/commit/b8b7172))
- **ci:** add --org to snyk scan ([#1629](https://github.com/SocialGouv/code-du-travail-numerique/issues/1629)) ([04657f9](https://github.com/SocialGouv/code-du-travail-numerique/commit/04657f9))
- **ci:** add missing quotes ([dda6834](https://github.com/SocialGouv/code-du-travail-numerique/commit/dda6834))
- **ci:** cd /app ([5bdaaea](https://github.com/SocialGouv/code-du-travail-numerique/commit/5bdaaea))
- **data:** update courriers.json ([#1565](https://github.com/SocialGouv/code-du-travail-numerique/issues/1565)) ([facc702](https://github.com/SocialGouv/code-du-travail-numerique/commit/facc702)), closes [#1524](https://github.com/SocialGouv/code-du-travail-numerique/issues/1524)
- **deps:** update dependency @reach/dialog to ^0.4.0 ([#1553](https://github.com/SocialGouv/code-du-travail-numerique/issues/1553)) ([42ca7d8](https://github.com/SocialGouv/code-du-travail-numerique/commit/42ca7d8))
- **deps:** update dependency @reach/dialog to ^0.5.0 ([#1608](https://github.com/SocialGouv/code-du-travail-numerique/issues/1608)) ([4dfb3a1](https://github.com/SocialGouv/code-du-travail-numerique/commit/4dfb3a1))
- **deps:** update dependency @reach/dialog to ^0.5.3 ([#1634](https://github.com/SocialGouv/code-du-travail-numerique/issues/1634)) ([5faf2e3](https://github.com/SocialGouv/code-du-travail-numerique/commit/5faf2e3))
- **deps:** update dependency @reach/tooltip to ^0.5.3 ([#1609](https://github.com/SocialGouv/code-du-travail-numerique/issues/1609)) ([080a8ce](https://github.com/SocialGouv/code-du-travail-numerique/commit/080a8ce))
- **deps:** update dependency @socialgouv/fiches-vdd to v1.0.11 ([#1562](https://github.com/SocialGouv/code-du-travail-numerique/issues/1562)) ([6f5efb7](https://github.com/SocialGouv/code-du-travail-numerique/commit/6f5efb7))
- **deps:** update dependency @socialgouv/fiches-vdd to v1.0.12 ([#1583](https://github.com/SocialGouv/code-du-travail-numerique/issues/1583)) ([a60d9ba](https://github.com/SocialGouv/code-du-travail-numerique/commit/a60d9ba))
- **deps:** update dependency @socialgouv/fiches-vdd to v1.0.13 ([#1596](https://github.com/SocialGouv/code-du-travail-numerique/issues/1596)) ([48373b3](https://github.com/SocialGouv/code-du-travail-numerique/commit/48373b3))
- **deps:** update dependency @socialgouv/fiches-vdd to v1.0.14 ([#1599](https://github.com/SocialGouv/code-du-travail-numerique/issues/1599)) ([a2c634e](https://github.com/SocialGouv/code-du-travail-numerique/commit/a2c634e))
- **deps:** update dependency @socialgouv/fiches-vdd to v1.0.15 ([#1611](https://github.com/SocialGouv/code-du-travail-numerique/issues/1611)) ([b047b75](https://github.com/SocialGouv/code-du-travail-numerique/commit/b047b75))
- **deps:** update dependency @socialgouv/fiches-vdd to v1.0.18 ([#1612](https://github.com/SocialGouv/code-du-travail-numerique/issues/1612)) ([bc66dcd](https://github.com/SocialGouv/code-du-travail-numerique/commit/bc66dcd))
- **deps:** update dependency @socialgouv/fiches-vdd to v1.0.19 ([#1635](https://github.com/SocialGouv/code-du-travail-numerique/issues/1635)) ([d38e5f6](https://github.com/SocialGouv/code-du-travail-numerique/commit/d38e5f6))
- **deps:** update dependency @socialgouv/legi-data to ^1.1.5 ([#1574](https://github.com/SocialGouv/code-du-travail-numerique/issues/1574)) ([4e3488d](https://github.com/SocialGouv/code-du-travail-numerique/commit/4e3488d))
- **deps:** update dependency jsdom to ^15.2.1 ([#1615](https://github.com/SocialGouv/code-du-travail-numerique/issues/1615)) ([7f4783d](https://github.com/SocialGouv/code-du-travail-numerique/commit/7f4783d))
- **deps:** update dependency koa to ^2.11.0 ([#1573](https://github.com/SocialGouv/code-du-travail-numerique/issues/1573)) ([fdc65e4](https://github.com/SocialGouv/code-du-travail-numerique/commit/fdc65e4))
- **deps:** update dependency next to ^9.1.2 ([#1592](https://github.com/SocialGouv/code-du-travail-numerique/issues/1592)) ([344b3e2](https://github.com/SocialGouv/code-du-travail-numerique/commit/344b3e2))
- **deps:** update dependency polished to ^3.4.2 ([#1595](https://github.com/SocialGouv/code-du-travail-numerique/issues/1595)) ([92244ca](https://github.com/SocialGouv/code-du-travail-numerique/commit/92244ca))
- **deps:** update dependency unist-util-select to v3 ([#1575](https://github.com/SocialGouv/code-du-travail-numerique/issues/1575)) ([6758c33](https://github.com/SocialGouv/code-du-travail-numerique/commit/6758c33))
- **indemniteLicenciement:** update results ui ([#1594](https://github.com/SocialGouv/code-du-travail-numerique/issues/1594)) ([21a0bd5](https://github.com/SocialGouv/code-du-travail-numerique/commit/21a0bd5))
- **preavis:** update data ([#1593](https://github.com/SocialGouv/code-du-travail-numerique/issues/1593)) ([ed9abb2](https://github.com/SocialGouv/code-du-travail-numerique/commit/ed9abb2)), closes [#1590](https://github.com/SocialGouv/code-du-travail-numerique/issues/1590)
- **precarite:** fix cdd for unhandeld ccn ([#1587](https://github.com/SocialGouv/code-du-travail-numerique/issues/1587)) ([b63460f](https://github.com/SocialGouv/code-du-travail-numerique/commit/b63460f))
- **tools:** display error / question label on validate ([#1581](https://github.com/SocialGouv/code-du-travail-numerique/issues/1581)) ([d3cb221](https://github.com/SocialGouv/code-du-travail-numerique/commit/d3cb221))

### Features

- **frontend:** add related content to letters and add tools and letters to related contents ([#1550](https://github.com/SocialGouv/code-du-travail-numerique/issues/1550)) ([8e46db8](https://github.com/SocialGouv/code-du-travail-numerique/commit/8e46db8))
- **frontend:** Added cookie consent toast to all pages ([#1588](https://github.com/SocialGouv/code-du-travail-numerique/issues/1588)) ([fbc6aaa](https://github.com/SocialGouv/code-du-travail-numerique/commit/fbc6aaa))
- **server:** force 301 to main hostname in production ([#1591](https://github.com/SocialGouv/code-du-travail-numerique/issues/1591)) ([59a032c](https://github.com/SocialGouv/code-du-travail-numerique/commit/59a032c)), closes [#1577](https://github.com/SocialGouv/code-du-travail-numerique/issues/1577)
- **server:** remove next.js x-powered-by ([#1586](https://github.com/SocialGouv/code-du-travail-numerique/issues/1586)) ([760c975](https://github.com/SocialGouv/code-du-travail-numerique/commit/760c975))
- scan docker containers with snyk ([#1580](https://github.com/SocialGouv/code-du-travail-numerique/issues/1580)) ([7c71372](https://github.com/SocialGouv/code-du-travail-numerique/commit/7c71372))

## [3.3.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.3.0...v3.3.1) (2019-10-08)

### Bug Fixes

- **deploy:** set ENVIRONMENT var on frontend ([79a8fa1](https://github.com/SocialGouv/code-du-travail-numerique/commit/79a8fa1))

# [3.3.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.2.0...v3.3.0) (2019-10-04)

### Bug Fixes

- **api:** refine npm lint script glob ([#1313](https://github.com/SocialGouv/code-du-travail-numerique/issues/1313)) ([f0ed124](https://github.com/SocialGouv/code-du-travail-numerique/commit/f0ed124))
- **ci:** use base_register_stage so we can use branch names too ([#1375](https://github.com/SocialGouv/code-du-travail-numerique/issues/1375)) ([2f4e5b8](https://github.com/SocialGouv/code-du-travail-numerique/commit/2f4e5b8))
- **deps:** update dependency @socialgouv/legi-data to ^1.1.1 ([#1301](https://github.com/SocialGouv/code-du-travail-numerique/issues/1301)) ([ddeeef4](https://github.com/SocialGouv/code-du-travail-numerique/commit/ddeeef4))
- **deps:** update dependency date-fns to ^2.3.0 ([#1315](https://github.com/SocialGouv/code-du-travail-numerique/issues/1315)) ([39cf467](https://github.com/SocialGouv/code-du-travail-numerique/commit/39cf467))
- **deps:** update dependency libxmljs to ^0.19.7 ([#1297](https://github.com/SocialGouv/code-du-travail-numerique/issues/1297)) ([219b1fa](https://github.com/SocialGouv/code-du-travail-numerique/commit/219b1fa))
- **deps:** update dependency ora to v4 ([#1298](https://github.com/SocialGouv/code-du-travail-numerique/issues/1298)) ([34472c8](https://github.com/SocialGouv/code-du-travail-numerique/commit/34472c8))
- **docker:** update docker-compose config ([#1312](https://github.com/SocialGouv/code-du-travail-numerique/issues/1312)) ([786dd5c](https://github.com/SocialGouv/code-du-travail-numerique/commit/786dd5c))
- **frontend:** backlink ([#1339](https://github.com/SocialGouv/code-du-travail-numerique/issues/1339)) ([830187a](https://github.com/SocialGouv/code-du-travail-numerique/commit/830187a))
- **frontend:** missing coma ([#1325](https://github.com/SocialGouv/code-du-travail-numerique/issues/1325)) ([4903562](https://github.com/SocialGouv/code-du-travail-numerique/commit/4903562))
- **nlp:** update nlp docker config ([#1324](https://github.com/SocialGouv/code-du-travail-numerique/issues/1324)) ([1d1785a](https://github.com/SocialGouv/code-du-travail-numerique/commit/1d1785a))
- **tooltip:** fix matchRegexp for startwith pattern ([#1340](https://github.com/SocialGouv/code-du-travail-numerique/issues/1340)) ([9588ae0](https://github.com/SocialGouv/code-du-travail-numerique/commit/9588ae0))
- **tooltip:** update pattern matching code ([#1334](https://github.com/SocialGouv/code-du-travail-numerique/issues/1334)) ([6c9c2e2](https://github.com/SocialGouv/code-du-travail-numerique/commit/6c9c2e2)), closes [#1305](https://github.com/SocialGouv/code-du-travail-numerique/issues/1305)

### Features

- **data:** add new fiches MT ([#1306](https://github.com/SocialGouv/code-du-travail-numerique/issues/1306)) ([99b1039](https://github.com/SocialGouv/code-du-travail-numerique/commit/99b1039))
- **data:** use new fiches vdd package ([#1316](https://github.com/SocialGouv/code-du-travail-numerique/issues/1316)) ([b93aa51](https://github.com/SocialGouv/code-du-travail-numerique/commit/b93aa51))
- **frontend:** add search into header ([#1338](https://github.com/SocialGouv/code-du-travail-numerique/issues/1338)) ([9a4bd5e](https://github.com/SocialGouv/code-du-travail-numerique/commit/9a4bd5e))
- **frontend:** new search ux ([#1291](https://github.com/SocialGouv/code-du-travail-numerique/issues/1291)) ([2eb33b1](https://github.com/SocialGouv/code-du-travail-numerique/commit/2eb33b1))
- **nlp:** load api sync ([#1330](https://github.com/SocialGouv/code-du-travail-numerique/issues/1330)) ([0bd93ce](https://github.com/SocialGouv/code-du-travail-numerique/commit/0bd93ce))

# [3.2.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.1.1...v3.2.0) (2019-09-23)

### Bug Fixes

- **api:** make size work as expected ([#1218](https://github.com/SocialGouv/code-du-travail-numerique/issues/1218)) ([44f9f40](https://github.com/SocialGouv/code-du-travail-numerique/commit/44f9f40))
- **api:** return direct results for getSavedResult ([#1288](https://github.com/SocialGouv/code-du-travail-numerique/issues/1288)) ([05e5a67](https://github.com/SocialGouv/code-du-travail-numerique/commit/05e5a67))
- **data:** add title to cdt documents ([#1220](https://github.com/SocialGouv/code-du-travail-numerique/issues/1220)) ([8a85ab0](https://github.com/SocialGouv/code-du-travail-numerique/commit/8a85ab0))
- **data:** fix cdt indexed text filed name ([#1219](https://github.com/SocialGouv/code-du-travail-numerique/issues/1219)) ([c1ecba9](https://github.com/SocialGouv/code-du-travail-numerique/commit/c1ecba9))
- **data:** use @cdt/sources package ([#1275](https://github.com/SocialGouv/code-du-travail-numerique/issues/1275)) ([ad263d1](https://github.com/SocialGouv/code-du-travail-numerique/commit/ad263d1))
- **demission:** udpate data format ([#1210](https://github.com/SocialGouv/code-du-travail-numerique/issues/1210)) ([af15e15](https://github.com/SocialGouv/code-du-travail-numerique/commit/af15e15))
- **deps:** update dependency @sentry/browser to ^5.6.3 ([#1209](https://github.com/SocialGouv/code-du-travail-numerique/issues/1209)) ([2ea07c4](https://github.com/SocialGouv/code-du-travail-numerique/commit/2ea07c4))
- **deps:** update dependency date-fns to ^2.2.1 ([#1234](https://github.com/SocialGouv/code-du-travail-numerique/issues/1234)) ([00c6c63](https://github.com/SocialGouv/code-du-travail-numerique/commit/00c6c63))
- **deps:** update dependency elastic-apm-node to ^2.16.0 ([#1191](https://github.com/SocialGouv/code-du-travail-numerique/issues/1191)) ([06a8482](https://github.com/SocialGouv/code-du-travail-numerique/commit/06a8482))
- **deps:** update dependency elastic-apm-node to ^2.16.1 ([#1204](https://github.com/SocialGouv/code-du-travail-numerique/issues/1204)) ([46ddeec](https://github.com/SocialGouv/code-du-travail-numerique/commit/46ddeec))
- **deps:** update dependency husky to ^3.0.5 ([#1217](https://github.com/SocialGouv/code-du-travail-numerique/issues/1217)) ([220d9d4](https://github.com/SocialGouv/code-du-travail-numerique/commit/220d9d4))
- **deps:** update dependency next to ^9.0.6 ([#1273](https://github.com/SocialGouv/code-du-travail-numerique/issues/1273)) ([19ab795](https://github.com/SocialGouv/code-du-travail-numerique/commit/19ab795))
- **deps:** update dependency next to v9 ([#1175](https://github.com/SocialGouv/code-du-travail-numerique/issues/1175)) ([63a277c](https://github.com/SocialGouv/code-du-travail-numerique/commit/63a277c))
- **deps:** update dependency query-string to ^6.8.3 ([#1216](https://github.com/SocialGouv/code-du-travail-numerique/issues/1216)) ([26e1e5c](https://github.com/SocialGouv/code-du-travail-numerique/commit/26e1e5c))
- **deps:** update dependency react-feather to v2 ([#1177](https://github.com/SocialGouv/code-du-travail-numerique/issues/1177)) ([49aacc5](https://github.com/SocialGouv/code-du-travail-numerique/commit/49aacc5))
- **deps:** update dependency react-final-form to v6 ([#1178](https://github.com/SocialGouv/code-du-travail-numerique/issues/1178)) ([27249d4](https://github.com/SocialGouv/code-du-travail-numerique/commit/27249d4))
- **deps:** update dependency react-mathjax-preview to ^0.1.13 ([#1153](https://github.com/SocialGouv/code-du-travail-numerique/issues/1153)) ([592b9e7](https://github.com/SocialGouv/code-du-travail-numerique/commit/592b9e7))
- **deps:** update dependency react-mathjax-preview to ^0.1.15 ([#1247](https://github.com/SocialGouv/code-du-travail-numerique/issues/1247)) ([8251f7c](https://github.com/SocialGouv/code-du-travail-numerique/commit/8251f7c))
- **deps:** update dependency react-mathjax-preview to ^0.1.16 ([#1270](https://github.com/SocialGouv/code-du-travail-numerique/issues/1270)) ([21850cf](https://github.com/SocialGouv/code-du-travail-numerique/commit/21850cf))
- **deps:** update dependency slugify to ^1.3.5 ([#1238](https://github.com/SocialGouv/code-du-travail-numerique/issues/1238)) ([2ab4a5f](https://github.com/SocialGouv/code-du-travail-numerique/commit/2ab4a5f))
- **finalform:** rename subscribe prop into subscription ([#1187](https://github.com/SocialGouv/code-du-travail-numerique/issues/1187)) ([a4839b2](https://github.com/SocialGouv/code-du-travail-numerique/commit/a4839b2))
- **frontend:** @sentry/browser does not contain a default export ([#1188](https://github.com/SocialGouv/code-du-travail-numerique/issues/1188)) ([2e9ec2e](https://github.com/SocialGouv/code-du-travail-numerique/commit/2e9ec2e))
- **frontend:** fix courrier slug name ([#1261](https://github.com/SocialGouv/code-du-travail-numerique/issues/1261)) ([df81795](https://github.com/SocialGouv/code-du-travail-numerique/commit/df81795))
- **frontend:** remove empty files ([#1266](https://github.com/SocialGouv/code-du-travail-numerique/issues/1266)) ([5839a3e](https://github.com/SocialGouv/code-du-travail-numerique/commit/5839a3e))
- **frontend:** typo in modal SDR ([#1285](https://github.com/SocialGouv/code-du-travail-numerique/issues/1285)) ([e6c620c](https://github.com/SocialGouv/code-du-travail-numerique/commit/e6c620c))
- **gitlab:** use CI_COMMIT_SHA as elasticsearch custom image version ([#1185](https://github.com/SocialGouv/code-du-travail-numerique/issues/1185)) ([1a2e16b](https://github.com/SocialGouv/code-du-travail-numerique/commit/1a2e16b))
- **k8s:** increase ES-dev probes delays ([#1253](https://github.com/SocialGouv/code-du-travail-numerique/issues/1253)) ([fdf69eb](https://github.com/SocialGouv/code-du-travail-numerique/commit/fdf69eb))
- **polyfill:** use k8s version ([#1284](https://github.com/SocialGouv/code-du-travail-numerique/issues/1284)) ([7e486f9](https://github.com/SocialGouv/code-du-travail-numerique/commit/7e486f9))
- **search-ccn:** fix missing id for search by cc ([#1228](https://github.com/SocialGouv/code-du-travail-numerique/issues/1228)) ([8719c12](https://github.com/SocialGouv/code-du-travail-numerique/commit/8719c12))

### Features

- add packages/sources to centralize shared data ([#1265](https://github.com/SocialGouv/code-du-travail-numerique/issues/1265)) ([ed10207](https://github.com/SocialGouv/code-du-travail-numerique/commit/ed10207))
- search CCN ([#1077](https://github.com/SocialGouv/code-du-travail-numerique/issues/1077)) ([563dc82](https://github.com/SocialGouv/code-du-travail-numerique/commit/563dc82))
- **data:** add description to outils ([#1286](https://github.com/SocialGouv/code-du-travail-numerique/issues/1286)) ([949d841](https://github.com/SocialGouv/code-du-travail-numerique/commit/949d841))
- themes indexation ([#1263](https://github.com/SocialGouv/code-du-travail-numerique/issues/1263)) ([557e184](https://github.com/SocialGouv/code-du-travail-numerique/commit/557e184))
- **glossaire:** add glossary page and tooltip([#1269](https://github.com/SocialGouv/code-du-travail-numerique/issues/1269)) ([7defed9](https://github.com/SocialGouv/code-du-travail-numerique/commit/7defed9)), closes [#1186](https://github.com/SocialGouv/code-du-travail-numerique/issues/1186)

## [3.1.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.1.0...v3.1.1) (2019-08-26)

### Bug Fixes

- **api:** manualy add missing elastic-apm-node instrumentation modules ([edc9191](https://github.com/SocialGouv/code-du-travail-numerique/commit/edc9191))
- **deps:** update dependency @koa/cors to v3 ([#1166](https://github.com/SocialGouv/code-du-travail-numerique/issues/1166)) ([d3d1656](https://github.com/SocialGouv/code-du-travail-numerique/commit/d3d1656))
- **deps:** update dependency @reach/dialog to ^0.2.9 ([#1133](https://github.com/SocialGouv/code-du-travail-numerique/issues/1133)) ([2c08992](https://github.com/SocialGouv/code-du-travail-numerique/commit/2c08992))
- **deps:** update dependency @sentry/browser to v5 ([#1167](https://github.com/SocialGouv/code-du-travail-numerique/issues/1167)) ([5122e60](https://github.com/SocialGouv/code-du-travail-numerique/commit/5122e60))
- **deps:** update dependency axios to ^0.19.0 ([#1134](https://github.com/SocialGouv/code-du-travail-numerique/issues/1134)) ([1fe54d2](https://github.com/SocialGouv/code-du-travail-numerique/commit/1fe54d2))
- **deps:** update dependency commander to v3 ([#1168](https://github.com/SocialGouv/code-du-travail-numerique/issues/1168)) ([23be96a](https://github.com/SocialGouv/code-du-travail-numerique/commit/23be96a))
- **deps:** update dependency csvtojson to ^2.0.10 ([#1135](https://github.com/SocialGouv/code-du-travail-numerique/issues/1135)) ([c001a04](https://github.com/SocialGouv/code-du-travail-numerique/commit/c001a04))
- **deps:** update dependency date-fns to ^2.0.1 ([#1156](https://github.com/SocialGouv/code-du-travail-numerique/issues/1156)) ([2f228e3](https://github.com/SocialGouv/code-du-travail-numerique/commit/2f228e3))
- **deps:** update dependency date-fns to v2.0.0 ([#1136](https://github.com/SocialGouv/code-du-travail-numerique/issues/1136)) ([8e0029e](https://github.com/SocialGouv/code-du-travail-numerique/commit/8e0029e))
- **deps:** update dependency dotenv to v8 ([#1169](https://github.com/SocialGouv/code-du-travail-numerique/issues/1169)) ([136fe82](https://github.com/SocialGouv/code-du-travail-numerique/commit/136fe82))
- **deps:** update dependency elastic-apm-node to ^2.15.0 ([#1137](https://github.com/SocialGouv/code-du-travail-numerique/issues/1137)) ([0a94189](https://github.com/SocialGouv/code-du-travail-numerique/commit/0a94189))
- **deps:** update dependency express to ^4.17.1 ([#1138](https://github.com/SocialGouv/code-du-travail-numerique/issues/1138)) ([9ba2b9e](https://github.com/SocialGouv/code-du-travail-numerique/commit/9ba2b9e))
- **deps:** update dependency final-form to ^4.18.5 ([#1139](https://github.com/SocialGouv/code-du-travail-numerique/issues/1139)) ([2085152](https://github.com/SocialGouv/code-du-travail-numerique/commit/2085152))
- **deps:** update dependency final-form-arrays to v3 ([#1170](https://github.com/SocialGouv/code-du-travail-numerique/issues/1170)) ([ab6a150](https://github.com/SocialGouv/code-du-travail-numerique/commit/ab6a150))
- **deps:** update dependency fuse.js to v3.4.5 ([#1140](https://github.com/SocialGouv/code-du-travail-numerique/issues/1140)) ([a940ae1](https://github.com/SocialGouv/code-du-travail-numerique/commit/a940ae1))
- **deps:** update dependency husky to v3 ([#1171](https://github.com/SocialGouv/code-du-travail-numerique/issues/1171)) ([39b3255](https://github.com/SocialGouv/code-du-travail-numerique/commit/39b3255))
- **deps:** update dependency isomorphic-unfetch to v3 ([#1172](https://github.com/SocialGouv/code-du-travail-numerique/issues/1172)) ([76e3dc9](https://github.com/SocialGouv/code-du-travail-numerique/commit/76e3dc9))
- **deps:** update dependency jest to v24 ([#1173](https://github.com/SocialGouv/code-du-travail-numerique/issues/1173)) ([7ad4a36](https://github.com/SocialGouv/code-du-travail-numerique/commit/7ad4a36))
- **deps:** update dependency jsdom to v15 ([#1174](https://github.com/SocialGouv/code-du-travail-numerique/issues/1174)) ([8983090](https://github.com/SocialGouv/code-du-travail-numerique/commit/8983090))
- **deps:** update dependency koa to ^2.8.1 ([#1141](https://github.com/SocialGouv/code-du-travail-numerique/issues/1141)) ([495e106](https://github.com/SocialGouv/code-du-travail-numerique/commit/495e106))
- **deps:** update dependency mammoth to ^1.4.8 ([#1142](https://github.com/SocialGouv/code-du-travail-numerique/issues/1142)) ([365c5e1](https://github.com/SocialGouv/code-du-travail-numerique/commit/365c5e1))
- **deps:** update dependency node-fetch to ^2.6.0 ([#1143](https://github.com/SocialGouv/code-du-travail-numerique/issues/1143)) ([2214335](https://github.com/SocialGouv/code-du-travail-numerique/commit/2214335))
- **deps:** update dependency ora to ^3.4.0 ([#1144](https://github.com/SocialGouv/code-du-travail-numerique/issues/1144)) ([239a5df](https://github.com/SocialGouv/code-du-travail-numerique/commit/239a5df))
- **deps:** update dependency p-limit to ^2.2.1 ([#1145](https://github.com/SocialGouv/code-du-travail-numerique/issues/1145)) ([44b268a](https://github.com/SocialGouv/code-du-travail-numerique/commit/44b268a))
- **deps:** update dependency polished to ^3.4.1 ([#1146](https://github.com/SocialGouv/code-du-travail-numerique/issues/1146)) ([65c5d3d](https://github.com/SocialGouv/code-du-travail-numerique/commit/65c5d3d))
- **deps:** update dependency query-string to ^6.8.2 ([#1150](https://github.com/SocialGouv/code-du-travail-numerique/issues/1150)) ([3fa54e2](https://github.com/SocialGouv/code-du-travail-numerique/commit/3fa54e2))
- **deps:** update dependency react-autosuggest to v9.4.3 ([#1151](https://github.com/SocialGouv/code-du-travail-numerique/issues/1151)) ([6a7b390](https://github.com/SocialGouv/code-du-travail-numerique/commit/6a7b390))
- **deps:** update dependency react-github-fork-ribbon to v0.6.0 ([#1152](https://github.com/SocialGouv/code-du-travail-numerique/issues/1152)) ([2e643d5](https://github.com/SocialGouv/code-du-travail-numerique/commit/2e643d5))
- **deps:** update dependency react-uid to ^2.2.0 ([#1154](https://github.com/SocialGouv/code-du-travail-numerique/issues/1154)) ([3aaab83](https://github.com/SocialGouv/code-du-travail-numerique/commit/3aaab83))
- **deps:** update dependency superagent to v5 ([#1181](https://github.com/SocialGouv/code-du-travail-numerique/issues/1181)) ([d34b91a](https://github.com/SocialGouv/code-du-travail-numerique/commit/d34b91a))
- **deps:** update dependency tocbot to ^4.7.1 ([#1157](https://github.com/SocialGouv/code-du-travail-numerique/issues/1157)) ([0871911](https://github.com/SocialGouv/code-du-travail-numerique/commit/0871911))
- **deps:** update dependency unist-util-parents to ^1.0.2 ([#1158](https://github.com/SocialGouv/code-du-travail-numerique/issues/1158)) ([a01ff77](https://github.com/SocialGouv/code-du-travail-numerique/commit/a01ff77))
- **deps:** update dependency winston to ^3.2.1 ([#1159](https://github.com/SocialGouv/code-du-travail-numerique/issues/1159)) ([d6ca9ba](https://github.com/SocialGouv/code-du-travail-numerique/commit/d6ca9ba))
- **docker-compose:** auto-restart elastic service ([#1101](https://github.com/SocialGouv/code-du-travail-numerique/issues/1101)) ([3bd5b1e](https://github.com/SocialGouv/code-du-travail-numerique/commit/3bd5b1e))
- **frontend:** console warns & FOUT ([#1098](https://github.com/SocialGouv/code-du-travail-numerique/issues/1098)) ([6dd9d73](https://github.com/SocialGouv/code-du-travail-numerique/commit/6dd9d73)), closes [#1082](https://github.com/SocialGouv/code-du-travail-numerique/issues/1082)
- **frontend:** detect preprod from hostname ([#1103](https://github.com/SocialGouv/code-du-travail-numerique/issues/1103)) ([91d01b6](https://github.com/SocialGouv/code-du-travail-numerique/commit/91d01b6))
- **frontend:** display issue in fiche mt ([#1099](https://github.com/SocialGouv/code-du-travail-numerique/issues/1099)) ([3c787e5](https://github.com/SocialGouv/code-du-travail-numerique/commit/3c787e5)), closes [#1076](https://github.com/SocialGouv/code-du-travail-numerique/issues/1076) [#1073](https://github.com/SocialGouv/code-du-travail-numerique/issues/1073)

# [3.1.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.0.4...v3.1.0) (2019-08-20)

### Features

- **frontend:** use new matomo :sparkles: ([#1102](https://github.com/SocialGouv/code-du-travail-numerique/issues/1102)) ([853d7cf](https://github.com/SocialGouv/code-du-travail-numerique/commit/853d7cf))
- **frontend:** use new sentry :sparkles: ([#1096](https://github.com/SocialGouv/code-du-travail-numerique/issues/1096)) ([016ce6c](https://github.com/SocialGouv/code-du-travail-numerique/commit/016ce6c))

## [3.0.4](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.0.3...v3.0.4) (2019-08-14)

**Note:** Version bump only for package @socialgouv/code-du-travail

## [3.0.3](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.0.2...v3.0.3) (2019-08-14)

**Note:** Version bump only for package @socialgouv/code-du-travail

## [3.0.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.0.1...v3.0.2) (2019-08-14)

**Note:** Version bump only for package @socialgouv/code-du-travail

## [3.0.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.0.0...v3.0.1) (2019-08-13)

**Note:** Version bump only for package @socialgouv/code-du-travail

# [3.0.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.0.0-next.4...v3.0.0) (2019-08-13)

**Note:** Version bump only for package @socialgouv/code-du-travail

# [3.0.0-next.4](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.0.0-next.3...v3.0.0-next.4) (2019-08-12)

**Note:** Version bump only for package @socialgouv/code-du-travail

# [3.0.0-next.3](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.0.0-next.2...v3.0.0-next.3) (2019-08-12)

**Note:** Version bump only for package @socialgouv/code-du-travail

# [3.0.0-next.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.0.0-next.1...v3.0.0-next.2) (2019-08-12)

**Note:** Version bump only for package @socialgouv/code-du-travail

# [3.0.0-next.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v3.0.0-next.0...v3.0.0-next.1) (2019-08-11)

### Features

- **api:** make the api use env var as version ([728996e](https://github.com/SocialGouv/code-du-travail-numerique/commit/728996e))
- **frontend:** make the frontend use env var as version ([#1093](https://github.com/SocialGouv/code-du-travail-numerique/issues/1093)) ([3b39872](https://github.com/SocialGouv/code-du-travail-numerique/commit/3b39872))
- **react-fiche-service-public:** is depending on @cdt/ui ([#1092](https://github.com/SocialGouv/code-du-travail-numerique/issues/1092)) ([ac8f4c0](https://github.com/SocialGouv/code-du-travail-numerique/commit/ac8f4c0))

# [3.0.0-next.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v2.5.1...v3.0.0-next.0) (2019-08-09)

### Bug Fixes

- **data:** update fiches sp following [#1075](https://github.com/SocialGouv/code-du-travail-numerique/issues/1075) ([#1081](https://github.com/SocialGouv/code-du-travail-numerique/issues/1081)) ([cfb2f2c](https://github.com/SocialGouv/code-du-travail-numerique/commit/cfb2f2c))
- **k8s:** fix production env vars ([#1078](https://github.com/SocialGouv/code-du-travail-numerique/issues/1078)) ([c9200f9](https://github.com/SocialGouv/code-du-travail-numerique/commit/c9200f9))
- **k8s:** increase nlp startup time ([#1079](https://github.com/SocialGouv/code-du-travail-numerique/issues/1079)) ([041f6f0](https://github.com/SocialGouv/code-du-travail-numerique/commit/041f6f0))

## [2.5.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v2.5.0...v2.5.1) (2019-07-25)

**Note:** Version bump only for package @socialgouv/code-du-travail

# [2.5.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v2.3.2-spring...v2.5.0) (2019-07-25)

### Bug Fixes

- **api:** add a boost to article_id match ([#970](https://github.com/SocialGouv/code-du-travail-numerique/issues/970)) ([7b2ab7f](https://github.com/SocialGouv/code-du-travail-numerique/commit/7b2ab7f)), closes [#936](https://github.com/SocialGouv/code-du-travail-numerique/issues/936)
- **data:** FAQ : remove invalid answer in ([#1029](https://github.com/SocialGouv/code-du-travail-numerique/issues/1029)) ([f88e006](https://github.com/SocialGouv/code-du-travail-numerique/commit/f88e006))
- **data:** fix french indexing ([#983](https://github.com/SocialGouv/code-du-travail-numerique/issues/983)) ([00e4e13](https://github.com/SocialGouv/code-du-travail-numerique/commit/00e4e13))
- **data:** fix typo in cdtn mapping ([#995](https://github.com/SocialGouv/code-du-travail-numerique/issues/995)) ([2031ba3](https://github.com/SocialGouv/code-du-travail-numerique/commit/2031ba3))
- **data:** fix typo in synonyms ([#1018](https://github.com/SocialGouv/code-du-travail-numerique/issues/1018)) ([876e9f3](https://github.com/SocialGouv/code-du-travail-numerique/commit/876e9f3))
- **data:** improve cdtn synonyms syntax ([#982](https://github.com/SocialGouv/code-du-travail-numerique/issues/982)) ([bec2c3b](https://github.com/SocialGouv/code-du-travail-numerique/commit/bec2c3b))
- **data:** typo in modele lettre ([#974](https://github.com/SocialGouv/code-du-travail-numerique/issues/974)) ([92509af](https://github.com/SocialGouv/code-du-travail-numerique/commit/92509af)), closes [#975](https://github.com/SocialGouv/code-du-travail-numerique/issues/975)
- **data:** update fiches Mt data with and internal ID to track fiche ID ([#1033](https://github.com/SocialGouv/code-du-travail-numerique/issues/1033)) ([0c7777a](https://github.com/SocialGouv/code-du-travail-numerique/commit/0c7777a))
- **fiche-sp:** add support of Expression element ([#1045](https://github.com/SocialGouv/code-du-travail-numerique/issues/1045)) ([9f50028](https://github.com/SocialGouv/code-du-travail-numerique/commit/9f50028))
- **frontend:** disallow web crawlers for dev / staging deployment ([#1008](https://github.com/SocialGouv/code-du-travail-numerique/issues/1008)) ([a14be3e](https://github.com/SocialGouv/code-du-travail-numerique/commit/a14be3e)), closes [#985](https://github.com/SocialGouv/code-du-travail-numerique/issues/985)
- **frontend:** display error message in ccn infos ([#961](https://github.com/SocialGouv/code-du-travail-numerique/issues/961)) ([0730a0f](https://github.com/SocialGouv/code-du-travail-numerique/commit/0730a0f)), closes [#960](https://github.com/SocialGouv/code-du-travail-numerique/issues/960)
- **frontend:** fix idl anciennete ([#1032](https://github.com/SocialGouv/code-du-travail-numerique/issues/1032)) ([1226cf5](https://github.com/SocialGouv/code-du-travail-numerique/commit/1226cf5)), closes [#1025](https://github.com/SocialGouv/code-du-travail-numerique/issues/1025)
- **frontend:** fix key warning when render modeles list ([#1007](https://github.com/SocialGouv/code-du-travail-numerique/issues/1007)) ([a493342](https://github.com/SocialGouv/code-du-travail-numerique/commit/a493342))
- **frontend:** fix source blur in search ([#958](https://github.com/SocialGouv/code-du-travail-numerique/issues/958)) ([7a1d139](https://github.com/SocialGouv/code-du-travail-numerique/commit/7a1d139))
- **frontend:** fix undefined meta ([#990](https://github.com/SocialGouv/code-du-travail-numerique/issues/990)) ([a417e1e](https://github.com/SocialGouv/code-du-travail-numerique/commit/a417e1e))
- **frontend:** fix wrong link styles ([#1001](https://github.com/SocialGouv/code-du-travail-numerique/issues/1001)) ([85140d1](https://github.com/SocialGouv/code-du-travail-numerique/commit/85140d1))
- **frontend:** handle http error properly for modeles page ([#993](https://github.com/SocialGouv/code-du-travail-numerique/issues/993)) ([8baa5d5](https://github.com/SocialGouv/code-du-travail-numerique/commit/8baa5d5))
- **frontend:** improve CCN explanation text ([#1034](https://github.com/SocialGouv/code-du-travail-numerique/issues/1034)) ([a3e3cab](https://github.com/SocialGouv/code-du-travail-numerique/commit/a3e3cab)), closes [#1011](https://github.com/SocialGouv/code-du-travail-numerique/issues/1011)
- **frontend:** intempestive re-render of form ([#1019](https://github.com/SocialGouv/code-du-travail-numerique/issues/1019)) ([35e4da5](https://github.com/SocialGouv/code-du-travail-numerique/commit/35e4da5))
- **frontend:** make search bar consistent ([#969](https://github.com/SocialGouv/code-du-travail-numerique/issues/969)) ([e202e36](https://github.com/SocialGouv/code-du-travail-numerique/commit/e202e36))
- **frontend:** show age question on ccn 44 ([#950](https://github.com/SocialGouv/code-du-travail-numerique/issues/950)) ([00ff373](https://github.com/SocialGouv/code-du-travail-numerique/commit/00ff373)), closes [#943](https://github.com/SocialGouv/code-du-travail-numerique/issues/943)
- **frontend:** typo in filename ([#1000](https://github.com/SocialGouv/code-du-travail-numerique/issues/1000)) ([923b21d](https://github.com/SocialGouv/code-du-travail-numerique/commit/923b21d))
- **frontend:** update matomo tracking ([#1041](https://github.com/SocialGouv/code-du-travail-numerique/issues/1041)) ([b8c9064](https://github.com/SocialGouv/code-du-travail-numerique/commit/b8c9064))
- **idl:** fix regression [#986](https://github.com/SocialGouv/code-du-travail-numerique/issues/986) + add snapshot ([#989](https://github.com/SocialGouv/code-du-travail-numerique/issues/989)) ([4f99625](https://github.com/SocialGouv/code-du-travail-numerique/commit/4f99625))

### Features

- **api:** add qs.skipSavedResults to bypass datafiller results ([#1004](https://github.com/SocialGouv/code-du-travail-numerique/issues/1004)) ([12c1cd4](https://github.com/SocialGouv/code-du-travail-numerique/commit/12c1cd4))
- **api:** boost document sources ([#1017](https://github.com/SocialGouv/code-du-travail-numerique/issues/1017)) ([4836103](https://github.com/SocialGouv/code-du-travail-numerique/commit/4836103))
- **api:** improve searching for conventions by IDCC prefixes ([1e2aa84](https://github.com/SocialGouv/code-du-travail-numerique/commit/1e2aa84))
- **data:** add datafiller results to api ([#906](https://github.com/SocialGouv/code-du-travail-numerique/issues/906)) ([c4f5810](https://github.com/SocialGouv/code-du-travail-numerique/commit/c4f5810)), closes [#887](https://github.com/SocialGouv/code-du-travail-numerique/issues/887)
- **data:** add glossary terms to dataset ([#977](https://github.com/SocialGouv/code-du-travail-numerique/issues/977)) ([330748c](https://github.com/SocialGouv/code-du-travail-numerique/commit/330748c)), closes [#976](https://github.com/SocialGouv/code-du-travail-numerique/issues/976)
- **frontend:** add ccn 2120 to idl ([#966](https://github.com/SocialGouv/code-du-travail-numerique/issues/966)) ([cc0bcc2](https://github.com/SocialGouv/code-du-travail-numerique/commit/cc0bcc2)), closes [#931](https://github.com/SocialGouv/code-du-travail-numerique/issues/931)
- **frontend:** add page /stats for ([#895](https://github.com/SocialGouv/code-du-travail-numerique/issues/895)) ([8f87f27](https://github.com/SocialGouv/code-du-travail-numerique/commit/8f87f27)), closes [#873](https://github.com/SocialGouv/code-du-travail-numerique/issues/873) [#873](https://github.com/SocialGouv/code-du-travail-numerique/issues/873)
- **frontend:** add simulateur indemnite precarite ([#1023](https://github.com/SocialGouv/code-du-travail-numerique/issues/1023)) ([f6327bc](https://github.com/SocialGouv/code-du-travail-numerique/commit/f6327bc)), closes [#933](https://github.com/SocialGouv/code-du-travail-numerique/issues/933)
- **frontend:** add syntech to calculateur ([#1026](https://github.com/SocialGouv/code-du-travail-numerique/issues/1026)) ([3cfdb0c](https://github.com/SocialGouv/code-du-travail-numerique/commit/3cfdb0c))
- **frontend:** bootstrap sitemap.xml ([#1009](https://github.com/SocialGouv/code-du-travail-numerique/issues/1009)) ([34a3374](https://github.com/SocialGouv/code-du-travail-numerique/commit/34a3374))
- **frontend:** conventions publish date wording update + remove extensions textes ([749c891](https://github.com/SocialGouv/code-du-travail-numerique/commit/749c891))
- **home:** promote outil precarite ([#1046](https://github.com/SocialGouv/code-du-travail-numerique/issues/1046)) ([206bfa0](https://github.com/SocialGouv/code-du-travail-numerique/commit/206bfa0))
- **outil-idl:** exclude some CCNS, fix [#886](https://github.com/SocialGouv/code-du-travail-numerique/issues/886) ([#893](https://github.com/SocialGouv/code-du-travail-numerique/issues/893)) ([89e8c53](https://github.com/SocialGouv/code-du-travail-numerique/commit/89e8c53))
- **styleguide:** expose theme colors ([#1003](https://github.com/SocialGouv/code-du-travail-numerique/issues/1003)) ([3f05515](https://github.com/SocialGouv/code-du-travail-numerique/commit/3f05515))

### Reverts

- **frontend:** remove canonical metas ([#1010](https://github.com/SocialGouv/code-du-travail-numerique/issues/1010)) ([623fead](https://github.com/SocialGouv/code-du-travail-numerique/commit/623fead))

# [2.4.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v2.3.2-spring...v2.4.0) (2019-07-24)

### Bug Fixes

- **api:** add a boost to article_id match ([#970](https://github.com/SocialGouv/code-du-travail-numerique/issues/970)) ([7b2ab7f](https://github.com/SocialGouv/code-du-travail-numerique/commit/7b2ab7f)), closes [#936](https://github.com/SocialGouv/code-du-travail-numerique/issues/936)
- **data:** FAQ : remove invalid answer in ([#1029](https://github.com/SocialGouv/code-du-travail-numerique/issues/1029)) ([f88e006](https://github.com/SocialGouv/code-du-travail-numerique/commit/f88e006))
- **data:** fix french indexing ([#983](https://github.com/SocialGouv/code-du-travail-numerique/issues/983)) ([00e4e13](https://github.com/SocialGouv/code-du-travail-numerique/commit/00e4e13))
- **data:** fix typo in cdtn mapping ([#995](https://github.com/SocialGouv/code-du-travail-numerique/issues/995)) ([2031ba3](https://github.com/SocialGouv/code-du-travail-numerique/commit/2031ba3))
- **data:** fix typo in synonyms ([#1018](https://github.com/SocialGouv/code-du-travail-numerique/issues/1018)) ([876e9f3](https://github.com/SocialGouv/code-du-travail-numerique/commit/876e9f3))
- **data:** improve cdtn synonyms syntax ([#982](https://github.com/SocialGouv/code-du-travail-numerique/issues/982)) ([bec2c3b](https://github.com/SocialGouv/code-du-travail-numerique/commit/bec2c3b))
- **data:** typo in modele lettre ([#974](https://github.com/SocialGouv/code-du-travail-numerique/issues/974)) ([92509af](https://github.com/SocialGouv/code-du-travail-numerique/commit/92509af)), closes [#975](https://github.com/SocialGouv/code-du-travail-numerique/issues/975)
- **data:** update fiches Mt data with and internal ID to track fiche ID ([#1033](https://github.com/SocialGouv/code-du-travail-numerique/issues/1033)) ([0c7777a](https://github.com/SocialGouv/code-du-travail-numerique/commit/0c7777a))
- **frontend:** disallow web crawlers for dev / staging deployment ([#1008](https://github.com/SocialGouv/code-du-travail-numerique/issues/1008)) ([a14be3e](https://github.com/SocialGouv/code-du-travail-numerique/commit/a14be3e)), closes [#985](https://github.com/SocialGouv/code-du-travail-numerique/issues/985)
- **frontend:** display error message in ccn infos ([#961](https://github.com/SocialGouv/code-du-travail-numerique/issues/961)) ([0730a0f](https://github.com/SocialGouv/code-du-travail-numerique/commit/0730a0f)), closes [#960](https://github.com/SocialGouv/code-du-travail-numerique/issues/960)
- **frontend:** fix idl anciennete ([#1032](https://github.com/SocialGouv/code-du-travail-numerique/issues/1032)) ([1226cf5](https://github.com/SocialGouv/code-du-travail-numerique/commit/1226cf5)), closes [#1025](https://github.com/SocialGouv/code-du-travail-numerique/issues/1025)
- **frontend:** fix key warning when render modeles list ([#1007](https://github.com/SocialGouv/code-du-travail-numerique/issues/1007)) ([a493342](https://github.com/SocialGouv/code-du-travail-numerique/commit/a493342))
- **frontend:** fix source blur in search ([#958](https://github.com/SocialGouv/code-du-travail-numerique/issues/958)) ([7a1d139](https://github.com/SocialGouv/code-du-travail-numerique/commit/7a1d139))
- **frontend:** fix undefined meta ([#990](https://github.com/SocialGouv/code-du-travail-numerique/issues/990)) ([a417e1e](https://github.com/SocialGouv/code-du-travail-numerique/commit/a417e1e))
- **frontend:** fix wrong link styles ([#1001](https://github.com/SocialGouv/code-du-travail-numerique/issues/1001)) ([85140d1](https://github.com/SocialGouv/code-du-travail-numerique/commit/85140d1))
- **frontend:** handle http error properly for modeles page ([#993](https://github.com/SocialGouv/code-du-travail-numerique/issues/993)) ([8baa5d5](https://github.com/SocialGouv/code-du-travail-numerique/commit/8baa5d5))
- **frontend:** improve CCN explanation text ([#1034](https://github.com/SocialGouv/code-du-travail-numerique/issues/1034)) ([a3e3cab](https://github.com/SocialGouv/code-du-travail-numerique/commit/a3e3cab)), closes [#1011](https://github.com/SocialGouv/code-du-travail-numerique/issues/1011)
- **frontend:** intempestive re-render of form ([#1019](https://github.com/SocialGouv/code-du-travail-numerique/issues/1019)) ([35e4da5](https://github.com/SocialGouv/code-du-travail-numerique/commit/35e4da5))
- **frontend:** make search bar consistent ([#969](https://github.com/SocialGouv/code-du-travail-numerique/issues/969)) ([e202e36](https://github.com/SocialGouv/code-du-travail-numerique/commit/e202e36))
- **frontend:** show age question on ccn 44 ([#950](https://github.com/SocialGouv/code-du-travail-numerique/issues/950)) ([00ff373](https://github.com/SocialGouv/code-du-travail-numerique/commit/00ff373)), closes [#943](https://github.com/SocialGouv/code-du-travail-numerique/issues/943)
- **frontend:** typo in filename ([#1000](https://github.com/SocialGouv/code-du-travail-numerique/issues/1000)) ([923b21d](https://github.com/SocialGouv/code-du-travail-numerique/commit/923b21d))
- **frontend:** update matomo tracking ([#1041](https://github.com/SocialGouv/code-du-travail-numerique/issues/1041)) ([b8c9064](https://github.com/SocialGouv/code-du-travail-numerique/commit/b8c9064))
- **idl:** fix regression [#986](https://github.com/SocialGouv/code-du-travail-numerique/issues/986) + add snapshot ([#989](https://github.com/SocialGouv/code-du-travail-numerique/issues/989)) ([4f99625](https://github.com/SocialGouv/code-du-travail-numerique/commit/4f99625))

### Features

- **api:** add qs.skipSavedResults to bypass datafiller results ([#1004](https://github.com/SocialGouv/code-du-travail-numerique/issues/1004)) ([12c1cd4](https://github.com/SocialGouv/code-du-travail-numerique/commit/12c1cd4))
- **api:** boost document sources ([#1017](https://github.com/SocialGouv/code-du-travail-numerique/issues/1017)) ([4836103](https://github.com/SocialGouv/code-du-travail-numerique/commit/4836103))
- **api:** improve searching for conventions by IDCC prefixes ([1e2aa84](https://github.com/SocialGouv/code-du-travail-numerique/commit/1e2aa84))
- **data:** add datafiller results to api ([#906](https://github.com/SocialGouv/code-du-travail-numerique/issues/906)) ([c4f5810](https://github.com/SocialGouv/code-du-travail-numerique/commit/c4f5810)), closes [#887](https://github.com/SocialGouv/code-du-travail-numerique/issues/887)
- **data:** add glossary terms to dataset ([#977](https://github.com/SocialGouv/code-du-travail-numerique/issues/977)) ([330748c](https://github.com/SocialGouv/code-du-travail-numerique/commit/330748c)), closes [#976](https://github.com/SocialGouv/code-du-travail-numerique/issues/976)
- **frontend:** add ccn 2120 to idl ([#966](https://github.com/SocialGouv/code-du-travail-numerique/issues/966)) ([cc0bcc2](https://github.com/SocialGouv/code-du-travail-numerique/commit/cc0bcc2)), closes [#931](https://github.com/SocialGouv/code-du-travail-numerique/issues/931)
- **frontend:** add page /stats for ([#895](https://github.com/SocialGouv/code-du-travail-numerique/issues/895)) ([8f87f27](https://github.com/SocialGouv/code-du-travail-numerique/commit/8f87f27)), closes [#873](https://github.com/SocialGouv/code-du-travail-numerique/issues/873) [#873](https://github.com/SocialGouv/code-du-travail-numerique/issues/873)
- **frontend:** add simulateur indemnite precarite ([#1023](https://github.com/SocialGouv/code-du-travail-numerique/issues/1023)) ([f6327bc](https://github.com/SocialGouv/code-du-travail-numerique/commit/f6327bc)), closes [#933](https://github.com/SocialGouv/code-du-travail-numerique/issues/933)
- **frontend:** add syntech to calculateur ([#1026](https://github.com/SocialGouv/code-du-travail-numerique/issues/1026)) ([3cfdb0c](https://github.com/SocialGouv/code-du-travail-numerique/commit/3cfdb0c))
- **frontend:** bootstrap sitemap.xml ([#1009](https://github.com/SocialGouv/code-du-travail-numerique/issues/1009)) ([34a3374](https://github.com/SocialGouv/code-du-travail-numerique/commit/34a3374))
- **frontend:** conventions publish date wording update + remove extensions textes ([749c891](https://github.com/SocialGouv/code-du-travail-numerique/commit/749c891))
- **home:** promote outil precarite ([#1046](https://github.com/SocialGouv/code-du-travail-numerique/issues/1046)) ([206bfa0](https://github.com/SocialGouv/code-du-travail-numerique/commit/206bfa0))
- **outil-idl:** exclude some CCNS, fix [#886](https://github.com/SocialGouv/code-du-travail-numerique/issues/886) ([#893](https://github.com/SocialGouv/code-du-travail-numerique/issues/893)) ([89e8c53](https://github.com/SocialGouv/code-du-travail-numerique/commit/89e8c53))
- **styleguide:** expose theme colors ([#1003](https://github.com/SocialGouv/code-du-travail-numerique/issues/1003)) ([3f05515](https://github.com/SocialGouv/code-du-travail-numerique/commit/3f05515))

### Reverts

- **frontend:** remove canonical metas ([#1010](https://github.com/SocialGouv/code-du-travail-numerique/issues/1010)) ([623fead](https://github.com/SocialGouv/code-du-travail-numerique/commit/623fead))

## [2.3.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v2.3.0...v2.3.1) (2019-04-11)

### Bug Fixes

- **frontend:** update matomo tracking for suggested searches ([#714](https://github.com/SocialGouv/code-du-travail-numerique/issues/714)) ([be865d5](https://github.com/SocialGouv/code-du-travail-numerique/commit/be865d5))

# [2.3.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v2.2.0...v2.3.0) (2019-04-10)

### Bug Fixes

- correction typo dans la page "A propos" ([ecc9c22](https://github.com/SocialGouv/code-du-travail-numerique/commit/ecc9c22))
- **data:** fix typo & html markup in faq.json ([#690](https://github.com/SocialGouv/code-du-travail-numerique/issues/690)) ([39f215a](https://github.com/SocialGouv/code-du-travail-numerique/commit/39f215a))
- **frontend:** remove liens et outils from footer ([#694](https://github.com/SocialGouv/code-du-travail-numerique/issues/694)) ([478c53f](https://github.com/SocialGouv/code-du-travail-numerique/commit/478c53f)), closes [#692](https://github.com/SocialGouv/code-du-travail-numerique/issues/692)
- update package.json path of react-fiche-service-public ([#705](https://github.com/SocialGouv/code-du-travail-numerique/issues/705)) ([72d70ba](https://github.com/SocialGouv/code-du-travail-numerique/commit/72d70ba))

### Features

- **frontend:** add hotjar script tag ([#701](https://github.com/SocialGouv/code-du-travail-numerique/issues/701)) ([0440bd2](https://github.com/SocialGouv/code-du-travail-numerique/commit/0440bd2)), closes [#700](https://github.com/SocialGouv/code-du-travail-numerique/issues/700)
- **frontend:** add tracking on search ([#704](https://github.com/SocialGouv/code-du-travail-numerique/issues/704)) ([c41ca5d](https://github.com/SocialGouv/code-du-travail-numerique/commit/c41ca5d))
- **frontend:** improve hierarchie des normes ui ([#698](https://github.com/SocialGouv/code-du-travail-numerique/issues/698)) ([2683491](https://github.com/SocialGouv/code-du-travail-numerique/commit/2683491))

# [2.2.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v2.1.0...v2.2.0) (2019-04-09)

### Bug Fixes

- **api:** add match phrase prefix to idcc search ([#662](https://github.com/SocialGouv/code-du-travail-numerique/issues/662)) ([e1ad3f1](https://github.com/SocialGouv/code-du-travail-numerique/commit/e1ad3f1)), closes [#622](https://github.com/SocialGouv/code-du-travail-numerique/issues/622)
- **api:** add missing matcher in faceting request ([#665](https://github.com/SocialGouv/code-du-travail-numerique/issues/665)) ([093fd0c](https://github.com/SocialGouv/code-du-travail-numerique/commit/093fd0c)), closes [#645](https://github.com/SocialGouv/code-du-travail-numerique/issues/645)
- **frontend:** fix theme links and use a single route for themes ([#672](https://github.com/SocialGouv/code-du-travail-numerique/issues/672)) ([089c53a](https://github.com/SocialGouv/code-du-travail-numerique/commit/089c53a))
- **frontend:** udpate search input when higlighting suggestion ([#666](https://github.com/SocialGouv/code-du-travail-numerique/issues/666)) ([e39d7ba](https://github.com/SocialGouv/code-du-travail-numerique/commit/e39d7ba)), closes [#646](https://github.com/SocialGouv/code-du-travail-numerique/issues/646)
- **frontend:** unify outils styles ([#639](https://github.com/SocialGouv/code-du-travail-numerique/issues/639)) ([2a6c7ae](https://github.com/SocialGouv/code-du-travail-numerique/commit/2a6c7ae)), closes [#495](https://github.com/SocialGouv/code-du-travail-numerique/issues/495)
- **frontend:** update search results page design ([#644](https://github.com/SocialGouv/code-du-travail-numerique/issues/644)) ([ffae740](https://github.com/SocialGouv/code-du-travail-numerique/commit/ffae740)), closes [#529](https://github.com/SocialGouv/code-du-travail-numerique/issues/529)
- **frontend:** wrong articles in references juridiques ([#663](https://github.com/SocialGouv/code-du-travail-numerique/issues/663)) ([2cc92da](https://github.com/SocialGouv/code-du-travail-numerique/commit/2cc92da))
- **nlp:** pin autosuggest version ([#640](https://github.com/SocialGouv/code-du-travail-numerique/issues/640)) ([5d074d7](https://github.com/SocialGouv/code-du-travail-numerique/commit/5d074d7))
- **search:** fix enlarge your results link ([#671](https://github.com/SocialGouv/code-du-travail-numerique/issues/671)) ([03e2e33](https://github.com/SocialGouv/code-du-travail-numerique/commit/03e2e33))

### Features

- **frontend:** replace feedback modal with inline form ([#677](https://github.com/SocialGouv/code-du-travail-numerique/issues/677)) ([2c6ddc3](https://github.com/SocialGouv/code-du-travail-numerique/commit/2c6ddc3)), closes [#682](https://github.com/SocialGouv/code-du-travail-numerique/issues/682) [#683](https://github.com/SocialGouv/code-du-travail-numerique/issues/683)
- **frontend:** underline active source in facets ([#670](https://github.com/SocialGouv/code-du-travail-numerique/issues/670)) ([5c354e3](https://github.com/SocialGouv/code-du-travail-numerique/commit/5c354e3))

# 2.1.0 (2019-03-26)

### Bug Fixes

- **frontend:** styled-components-classnames ([#633](https://github.com/SocialGouv/code-du-travail-numerique/issues/633)) ([32e9911](https://github.com/SocialGouv/code-du-travail-numerique/commit/32e9911))

### Features

- **frontend:** add Company Suggester to find the CCN with a SIRET number - fixes [#49](https://github.com/SocialGouv/code-du-travail-numerique/issues/49) ([d4d440f](https://github.com/SocialGouv/code-du-travail-numerique/commit/d4d440f))
- **frontend:** use docker nlp suggest for suggesting search request ([#617](https://github.com/SocialGouv/code-du-travail-numerique/issues/617)) ([2223541](https://github.com/SocialGouv/code-du-travail-numerique/commit/2223541))
- **nlp:** add suggester endpoint to nlp api ([#608](https://github.com/SocialGouv/code-du-travail-numerique/issues/608)) ([c90f825](https://github.com/SocialGouv/code-du-travail-numerique/commit/c90f825))

# [2.0.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v1.8.0...v2.0.0) (2019-03-08)

### Bug Fixes

- **data:** add vlep in synonyms ([#571](https://github.com/SocialGouv/code-du-travail-numerique/issues/571)) ([6420d8f](https://github.com/SocialGouv/code-du-travail-numerique/commit/6420d8f))
- **data:** make unique slugs for faqs ([#500](https://github.com/SocialGouv/code-du-travail-numerique/issues/500)) ([2fcb7f8](https://github.com/SocialGouv/code-du-travail-numerique/commit/2fcb7f8))
- **data:** update elastic configuration ([#566](https://github.com/SocialGouv/code-du-travail-numerique/issues/566)) ([09e0b96](https://github.com/SocialGouv/code-du-travail-numerique/commit/09e0b96)), closes [#537](https://github.com/SocialGouv/code-du-travail-numerique/issues/537) [#498](https://github.com/SocialGouv/code-du-travail-numerique/issues/498) [#112](https://github.com/SocialGouv/code-du-travail-numerique/issues/112)
- **data:** update stopwords ([#580](https://github.com/SocialGouv/code-du-travail-numerique/issues/580)) ([b19543d](https://github.com/SocialGouv/code-du-travail-numerique/commit/b19543d))
- **data:** update synonyms.json ([#572](https://github.com/SocialGouv/code-du-travail-numerique/issues/572)) ([868b9f6](https://github.com/SocialGouv/code-du-travail-numerique/commit/868b9f6))
- **frontend:** change lib mathjax ([#525](https://github.com/SocialGouv/code-du-travail-numerique/issues/525)) ([e1162f3](https://github.com/SocialGouv/code-du-travail-numerique/commit/e1162f3))
- **frontend:** improve metadata for calcul-indemnité-licenciement ([#557](https://github.com/SocialGouv/code-du-travail-numerique/issues/557)) ([f1da00d](https://github.com/SocialGouv/code-du-travail-numerique/commit/f1da00d)), closes [#474](https://github.com/SocialGouv/code-du-travail-numerique/issues/474)
- **frontend:** update snapshots ([8632485](https://github.com/SocialGouv/code-du-travail-numerique/commit/8632485))

### Features

- **css:** prune some additional files ([9f159a8](https://github.com/SocialGouv/code-du-travail-numerique/commit/9f159a8))
- **data:** refactor KALI data to use legixplore API ([e6ae16c](https://github.com/SocialGouv/code-du-travail-numerique/commit/e6ae16c)), closes [#533](https://github.com/SocialGouv/code-du-travail-numerique/issues/533)
- **data:** update code-du-travail au 1er Janvier 2019 ([#558](https://github.com/SocialGouv/code-du-travail-numerique/issues/558)) ([4b8ad48](https://github.com/SocialGouv/code-du-travail-numerique/commit/4b8ad48))
- **data:** update fiche-service public ([#560](https://github.com/SocialGouv/code-du-travail-numerique/issues/560)) ([fcf5e6a](https://github.com/SocialGouv/code-du-travail-numerique/commit/fcf5e6a))
- **frontend:** add a back to results link ([#542](https://github.com/SocialGouv/code-du-travail-numerique/issues/542)) ([a245875](https://github.com/SocialGouv/code-du-travail-numerique/commit/a245875))
- **frontend:** add faceting in search results ([#579](https://github.com/SocialGouv/code-du-travail-numerique/issues/579)) ([772e18d](https://github.com/SocialGouv/code-du-travail-numerique/commit/772e18d))
- **frontend:** add snippet answers ([#518](https://github.com/SocialGouv/code-du-travail-numerique/issues/518)) ([5c91a40](https://github.com/SocialGouv/code-du-travail-numerique/commit/5c91a40)), closes [#409](https://github.com/SocialGouv/code-du-travail-numerique/issues/409)
- **frontend:** improve search suggestion readability ([aea3b72](https://github.com/SocialGouv/code-du-travail-numerique/commit/aea3b72))
- **frontend:** search-ui-changes ([2e1d1b2](https://github.com/SocialGouv/code-du-travail-numerique/commit/2e1d1b2))
- **frontend:** use spreadsheet for elastic tests ([#575](https://github.com/SocialGouv/code-du-travail-numerique/issues/575)) ([d343e98](https://github.com/SocialGouv/code-du-travail-numerique/commit/d343e98))
- **nlp:** add autogenerated files to gitignore ([#540](https://github.com/SocialGouv/code-du-travail-numerique/issues/540)) ([9024f93](https://github.com/SocialGouv/code-du-travail-numerique/commit/9024f93))
- **nlp:** add nlp project for eig ([#516](https://github.com/SocialGouv/code-du-travail-numerique/issues/516)) ([b4cb274](https://github.com/SocialGouv/code-du-travail-numerique/commit/b4cb274))

### BREAKING CHANGES

- **data:** json payload updated for KALI

* removed deprecated data files
* removed NAF information
* refactored kali dataset to hit the new legixplore API.

# [1.8.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v1.7.4...v1.8.0) (2019-02-12)

### Bug Fixes

- **annuaire:** add feedback from last GT meeting ([#478](https://github.com/SocialGouv/code-du-travail-numerique/issues/478)) ([8c28f01](https://github.com/SocialGouv/code-du-travail-numerique/commit/8c28f01)), closes [#464](https://github.com/SocialGouv/code-du-travail-numerique/issues/464)
- **data:** add template for releve d'heures sup ([#503](https://github.com/SocialGouv/code-du-travail-numerique/issues/503)) ([3cec00c](https://github.com/SocialGouv/code-du-travail-numerique/commit/3cec00c)), closes [#363](https://github.com/SocialGouv/code-du-travail-numerique/issues/363)
- **data:** udpate typo in courriers ([#511](https://github.com/SocialGouv/code-du-travail-numerique/issues/511)) ([b892c9a](https://github.com/SocialGouv/code-du-travail-numerique/commit/b892c9a))
- **data:** update fiches ministere url ([#505](https://github.com/SocialGouv/code-du-travail-numerique/issues/505)) ([405892c](https://github.com/SocialGouv/code-du-travail-numerique/commit/405892c))
- **frontend:** a a-propos page, remove disclaimer ([#517](https://github.com/SocialGouv/code-du-travail-numerique/issues/517)) ([7adaf2b](https://github.com/SocialGouv/code-du-travail-numerique/commit/7adaf2b)), closes [#513](https://github.com/SocialGouv/code-du-travail-numerique/issues/513) [#512](https://github.com/SocialGouv/code-du-travail-numerique/issues/512)
- **frontend:** add fiche url when submiting feedback ([#479](https://github.com/SocialGouv/code-du-travail-numerique/issues/479)) ([965a743](https://github.com/SocialGouv/code-du-travail-numerique/commit/965a743))
- **frontend:** make my logo bigger ([#488](https://github.com/SocialGouv/code-du-travail-numerique/issues/488)) ([2b87b24](https://github.com/SocialGouv/code-du-travail-numerique/commit/2b87b24))
- **frontend:** scroll up after url change ([#473](https://github.com/SocialGouv/code-du-travail-numerique/issues/473)) ([e2d9f9d](https://github.com/SocialGouv/code-du-travail-numerique/commit/e2d9f9d)), closes [#467](https://github.com/SocialGouv/code-du-travail-numerique/issues/467)
- **frontend:** update calculateur wording ([#486](https://github.com/SocialGouv/code-du-travail-numerique/issues/486)) ([d5d3455](https://github.com/SocialGouv/code-du-travail-numerique/commit/d5d3455)), closes [#463](https://github.com/SocialGouv/code-du-travail-numerique/issues/463)
- **scrap:** add ariane+tags for fiches ministere-travail ([#510](https://github.com/SocialGouv/code-du-travail-numerique/issues/510)) ([ddc2c02](https://github.com/SocialGouv/code-du-travail-numerique/commit/ddc2c02))

### Features

- **data:** add a tag extractor script ([#489](https://github.com/SocialGouv/code-du-travail-numerique/issues/489)) ([7261a0c](https://github.com/SocialGouv/code-du-travail-numerique/commit/7261a0c))
- **frontend:** allow user to extends search to all documents ([#497](https://github.com/SocialGouv/code-du-travail-numerique/issues/497)) ([6212ae9](https://github.com/SocialGouv/code-du-travail-numerique/commit/6212ae9)), closes [#299](https://github.com/SocialGouv/code-du-travail-numerique/issues/299)
- **frontend:** improve feedback thumbs ([#501](https://github.com/SocialGouv/code-du-travail-numerique/issues/501)) ([b38dcc8](https://github.com/SocialGouv/code-du-travail-numerique/commit/b38dcc8)), closes [#458](https://github.com/SocialGouv/code-du-travail-numerique/issues/458) [#496](https://github.com/SocialGouv/code-du-travail-numerique/issues/496)

## [1.7.4](https://github.com/SocialGouv/code-du-travail-numerique/compare/v1.7.3...v1.7.4) (2019-01-30)

### Bug Fixes

- **docker:** fix yaml indentation and deploy script ([#476](https://github.com/SocialGouv/code-du-travail-numerique/issues/476)) ([efe4572](https://github.com/SocialGouv/code-du-travail-numerique/commit/efe4572))

## [1.7.3](https://github.com/SocialGouv/code-du-travail-numerique/compare/v1.7.2...v1.7.3) (2019-01-29)

### Bug Fixes

- **api:** update test after mapping change ([#461](https://github.com/SocialGouv/code-du-travail-numerique/issues/461)) ([59d6b43](https://github.com/SocialGouv/code-du-travail-numerique/commit/59d6b43)), closes [#330](https://github.com/SocialGouv/code-du-travail-numerique/issues/330) [#116](https://github.com/SocialGouv/code-du-travail-numerique/issues/116) [#416](https://github.com/SocialGouv/code-du-travail-numerique/issues/416)
- **data:** mise à jour des metadata des courrier ([#431](https://github.com/SocialGouv/code-du-travail-numerique/issues/431)) ([bc4c9e7](https://github.com/SocialGouv/code-du-travail-numerique/commit/bc4c9e7)), closes [#429](https://github.com/SocialGouv/code-du-travail-numerique/issues/429)
- **data:** update faq.json ([#438](https://github.com/SocialGouv/code-du-travail-numerique/issues/438)) ([5979aa0](https://github.com/SocialGouv/code-du-travail-numerique/commit/5979aa0))
- **frontend:** fix calcul indemnité for ccn ([#448](https://github.com/SocialGouv/code-du-travail-numerique/issues/448)) ([34f3dc6](https://github.com/SocialGouv/code-du-travail-numerique/commit/34f3dc6))
- **frontend:** focus search input on initial load ([#472](https://github.com/SocialGouv/code-du-travail-numerique/issues/472)) ([d001b4e](https://github.com/SocialGouv/code-du-travail-numerique/commit/d001b4e)), closes [#462](https://github.com/SocialGouv/code-du-travail-numerique/issues/462)
- **frontend:** use a new formspree endpoint to handle prod+dev feedback ([#466](https://github.com/SocialGouv/code-du-travail-numerique/issues/466)) ([67f95a5](https://github.com/SocialGouv/code-du-travail-numerique/commit/67f95a5))

## [1.7.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v1.7.1...v1.7.2) (2019-01-21)

**Note:** Version bump only for package @socialgouv/code-du-travail

## [1.7.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v1.7.0...v1.7.1) (2019-01-18)

### Bug Fixes

- **frontend:** update wording on calculateur indemnité ([#441](https://github.com/SocialGouv/code-du-travail-numerique/issues/441)) ([a83e1d4](https://github.com/SocialGouv/code-du-travail-numerique/commit/a83e1d4))
- update docker api image to access document from api ([#432](https://github.com/SocialGouv/code-du-travail-numerique/issues/432)) ([f5905c1](https://github.com/SocialGouv/code-du-travail-numerique/commit/f5905c1))
- **frontend:** update next config to support IE10 - IE11 ([12fbaa5](https://github.com/SocialGouv/code-du-travail-numerique/commit/12fbaa5)), closes [#229](https://github.com/SocialGouv/code-du-travail-numerique/issues/229) [#88](https://github.com/SocialGouv/code-du-travail-numerique/issues/88)

# [1.7.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v1.6.2...v1.7.0) (2019-01-15)

### Bug Fixes

- **frontend:** change trackEvent value for feedback ([#404](https://github.com/SocialGouv/code-du-travail-numerique/issues/404)) ([26b664b](https://github.com/SocialGouv/code-du-travail-numerique/commit/26b664b))
- **outils:** add wording for indeminite speciale ([#419](https://github.com/SocialGouv/code-du-travail-numerique/issues/419)) ([2fae3ce](https://github.com/SocialGouv/code-du-travail-numerique/commit/2fae3ce))

### Features

- **api:** add version endpoint ([#402](https://github.com/SocialGouv/code-du-travail-numerique/issues/402)) ([cf4556a](https://github.com/SocialGouv/code-du-travail-numerique/commit/cf4556a)), closes [#391](https://github.com/SocialGouv/code-du-travail-numerique/issues/391)
- **data:** index one question only from fiche ministere travail ([#423](https://github.com/SocialGouv/code-du-travail-numerique/issues/423)) ([1416995](https://github.com/SocialGouv/code-du-travail-numerique/commit/1416995)), closes [#270](https://github.com/SocialGouv/code-du-travail-numerique/issues/270)
- **frontend:** indemnite licenciement temps partiel ([#410](https://github.com/SocialGouv/code-du-travail-numerique/issues/410)) ([be52dc3](https://github.com/SocialGouv/code-du-travail-numerique/commit/be52dc3)), closes [#411](https://github.com/SocialGouv/code-du-travail-numerique/issues/411) [#131](https://github.com/SocialGouv/code-du-travail-numerique/issues/131) [#310](https://github.com/SocialGouv/code-du-travail-numerique/issues/310)
- **ui:** update search result ui ([#420](https://github.com/SocialGouv/code-du-travail-numerique/issues/420)) ([3750882](https://github.com/SocialGouv/code-du-travail-numerique/commit/3750882))

## [1.6.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v1.6.1...v1.6.2) (2018-12-19)

### Bug Fixes

- **frontend:** allow access to faq / outils ([#392](https://github.com/SocialGouv/code-du-travail-numerique/issues/392)) ([e3115a9](https://github.com/SocialGouv/code-du-travail-numerique/commit/e3115a9))
- **frontend:** correct footer github link ([#393](https://github.com/SocialGouv/code-du-travail-numerique/issues/393)) ([ae83c05](https://github.com/SocialGouv/code-du-travail-numerique/commit/ae83c05))

## [1.6.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/v1.6.0...v1.6.1) (2018-12-18)

### Bug Fixes

- reactivate branch/tag build for 1.6.0 ([#390](https://github.com/SocialGouv/code-du-travail-numerique/issues/390)) ([911a638](https://github.com/SocialGouv/code-du-travail-numerique/commit/911a638))

# [1.6.0](https://github.com/SocialGouv/code-du-travail-numerique/compare/v1.5.2...v1.6.0) (2018-12-18)

### Bug Fixes

- **api:** better error handling in getsingleitem response ([#388](https://github.com/SocialGouv/code-du-travail-numerique/issues/388)) ([1fd83c2](https://github.com/SocialGouv/code-du-travail-numerique/commit/1fd83c2))
- **api:** return slug property when retrieving a single item ([#377](https://github.com/SocialGouv/code-du-travail-numerique/issues/377)) ([f2a764d](https://github.com/SocialGouv/code-du-travail-numerique/commit/f2a764d)), closes [#379](https://github.com/SocialGouv/code-du-travail-numerique/issues/379)
- **api:** update getSingleItem and node-fetch import ([#373](https://github.com/SocialGouv/code-du-travail-numerique/issues/373)) ([f367b0f](https://github.com/SocialGouv/code-du-travail-numerique/commit/f367b0f))
- **data:** fix indexing fiches-ministere ([#383](https://github.com/SocialGouv/code-du-travail-numerique/issues/383)) ([0413175](https://github.com/SocialGouv/code-du-travail-numerique/commit/0413175))
- remove warning in development ([#389](https://github.com/SocialGouv/code-du-travail-numerique/issues/389)) ([f259f8c](https://github.com/SocialGouv/code-du-travail-numerique/commit/f259f8c)), closes [#375](https://github.com/SocialGouv/code-du-travail-numerique/issues/375)
- **css:** update facet background-color ([#381](https://github.com/SocialGouv/code-du-travail-numerique/issues/381)) ([926186c](https://github.com/SocialGouv/code-du-travail-numerique/commit/926186c))
- **data:** remove faq-convention-collective from index ([#378](https://github.com/SocialGouv/code-du-travail-numerique/issues/378)) ([bc1d6d8](https://github.com/SocialGouv/code-du-travail-numerique/commit/bc1d6d8))
- **frontend:** fix theme navigation ([#376](https://github.com/SocialGouv/code-du-travail-numerique/issues/376)) ([2bf4582](https://github.com/SocialGouv/code-du-travail-numerique/commit/2bf4582)), closes [#372](https://github.com/SocialGouv/code-du-travail-numerique/issues/372)
- **frontend:** update wording on calcul indemnité ([#380](https://github.com/SocialGouv/code-du-travail-numerique/issues/380)) ([bb2c7e6](https://github.com/SocialGouv/code-du-travail-numerique/commit/bb2c7e6)), closes [#338](https://github.com/SocialGouv/code-du-travail-numerique/issues/338)

### Features

- add related content for faq ([#370](https://github.com/SocialGouv/code-du-travail-numerique/issues/370)) ([853ae51](https://github.com/SocialGouv/code-du-travail-numerique/commit/853ae51))
- **data:** add faq contribution ([#337](https://github.com/SocialGouv/code-du-travail-numerique/issues/337)) ([945726d](https://github.com/SocialGouv/code-du-travail-numerique/commit/945726d))
- **data:** ajout de nouveaux courriers ([#367](https://github.com/SocialGouv/code-du-travail-numerique/issues/367)) ([e60779f](https://github.com/SocialGouv/code-du-travail-numerique/commit/e60779f)), closes [#318](https://github.com/SocialGouv/code-du-travail-numerique/issues/318)
- **data:** ajout des fiches santé ministere-travail ([#366](https://github.com/SocialGouv/code-du-travail-numerique/issues/366)) ([572f62a](https://github.com/SocialGouv/code-du-travail-numerique/commit/572f62a)), closes [#121](https://github.com/SocialGouv/code-du-travail-numerique/issues/121)

## [1.5.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v1.5.1...v1.5.2) (2018-12-12)

**Note:** Version bump only for package @socialgouv/code-du-travail

## [1.5.1](https://github.com/SocialGouv/code-du-travail-numerique/compare/3c0d8eb...v1.5.1) (2018-12-11)

### Bug Fixes

- **api:** getSingleItem only throw if no results found ([#352](https://github.com/SocialGouv/code-du-travail-numerique/issues/352)) ([54fd3a0](https://github.com/SocialGouv/code-du-travail-numerique/commit/54fd3a0))
- **api:** smaller api response for search request ([#361](https://github.com/SocialGouv/code-du-travail-numerique/issues/361)) ([f6f11f1](https://github.com/SocialGouv/code-du-travail-numerique/commit/f6f11f1))
- **api:** use process.env.API_PORT ([#364](https://github.com/SocialGouv/code-du-travail-numerique/issues/364)) ([263e012](https://github.com/SocialGouv/code-du-travail-numerique/commit/263e012))
- **build:** dont embed static files ([55bcaa9](https://github.com/SocialGouv/code-du-travail-numerique/commit/55bcaa9))
- **category:** accept additional props ([12c5b8d](https://github.com/SocialGouv/code-du-travail-numerique/commit/12c5b8d))
- **css:** add color-mod function ([#238](https://github.com/SocialGouv/code-du-travail-numerique/issues/238)) ([3a94302](https://github.com/SocialGouv/code-du-travail-numerique/commit/3a94302))
- **data:** [@jrduscher](https://github.com/jrduscher) fixes from old repo ([bfe58fa](https://github.com/SocialGouv/code-du-travail-numerique/commit/bfe58fa))
- **data:** add date in fiche ministere ([#288](https://github.com/SocialGouv/code-du-travail-numerique/issues/288)) ([212b94c](https://github.com/SocialGouv/code-du-travail-numerique/commit/212b94c))
- **data:** add date on fiche minisitere ([#304](https://github.com/SocialGouv/code-du-travail-numerique/issues/304)) ([0cb0338](https://github.com/SocialGouv/code-du-travail-numerique/commit/0cb0338))
- **data:** add date to fiche service public ([#303](https://github.com/SocialGouv/code-du-travail-numerique/issues/303)) ([4c62d76](https://github.com/SocialGouv/code-du-travail-numerique/commit/4c62d76)), closes [#273](https://github.com/SocialGouv/code-du-travail-numerique/issues/273)
- **data:** add Q/R on ass-mat to faq ([#329](https://github.com/SocialGouv/code-du-travail-numerique/issues/329)) ([f943a73](https://github.com/SocialGouv/code-du-travail-numerique/commit/f943a73))
- **data:** better warnings ([58ad37f](https://github.com/SocialGouv/code-du-travail-numerique/commit/58ad37f))
- **data:** faq: use nested tags property ([#205](https://github.com/SocialGouv/code-du-travail-numerique/issues/205)) ([e8e27be](https://github.com/SocialGouv/code-du-travail-numerique/commit/e8e27be))
- **data:** fiches s-p : restore old data but add html ([6f8694d](https://github.com/SocialGouv/code-du-travail-numerique/commit/6f8694d))
- **data:** fix python indexing ([#342](https://github.com/SocialGouv/code-du-travail-numerique/issues/342)) ([73afc30](https://github.com/SocialGouv/code-du-travail-numerique/commit/73afc30))
- **data:** remove convention-collective 2121 from ES ([#289](https://github.com/SocialGouv/code-du-travail-numerique/issues/289)) ([d8c9225](https://github.com/SocialGouv/code-du-travail-numerique/commit/d8c9225))
- **data:** update faq.json ([#240](https://github.com/SocialGouv/code-du-travail-numerique/issues/240)) ([5788716](https://github.com/SocialGouv/code-du-travail-numerique/commit/5788716))
- **data:** update fiches service public ([#268](https://github.com/SocialGouv/code-du-travail-numerique/issues/268)) ([7548ae2](https://github.com/SocialGouv/code-du-travail-numerique/commit/7548ae2))
- **data:** update themes.csv ([#320](https://github.com/SocialGouv/code-du-travail-numerique/issues/320)) ([c285f05](https://github.com/SocialGouv/code-du-travail-numerique/commit/c285f05))
- **dev:** update dev in npm run script ([a34ee9a](https://github.com/SocialGouv/code-du-travail-numerique/commit/a34ee9a))
- **docker:** dont use absolute container names ([1d27c09](https://github.com/SocialGouv/code-du-travail-numerique/commit/1d27c09))
- **docker:** fix ES_PORT, move data docker scripts to data ([850dc5b](https://github.com/SocialGouv/code-du-travail-numerique/commit/850dc5b))
- **docker:** mount code-du-travail-data ([9f0867f](https://github.com/SocialGouv/code-du-travail-numerique/commit/9f0867f))
- **docker:** restore docker setup ([a9526da](https://github.com/SocialGouv/code-du-travail-numerique/commit/a9526da))
- **docker:** restore docker setup ([ea229e5](https://github.com/SocialGouv/code-du-travail-numerique/commit/ea229e5))
- **dockerify:** add missing .env ([c612762](https://github.com/SocialGouv/code-du-travail-numerique/commit/c612762))
- **faq:** add info provider(DGT, DIRRECTE) to faq ([#188](https://github.com/SocialGouv/code-du-travail-numerique/issues/188)) ([d287852](https://github.com/SocialGouv/code-du-travail-numerique/commit/d287852))
- **frontend:** fix ccn search for idcc id ([#358](https://github.com/SocialGouv/code-du-travail-numerique/issues/358)) ([5a97e02](https://github.com/SocialGouv/code-du-travail-numerique/commit/5a97e02))
- **frontend:** return mock of return data on outils fetch error ([#313](https://github.com/SocialGouv/code-du-travail-numerique/issues/313)) ([7096b6b](https://github.com/SocialGouv/code-du-travail-numerique/commit/7096b6b))
- **frontend:** update convention modal to request elastic search ([#319](https://github.com/SocialGouv/code-du-travail-numerique/issues/319)) ([0c91820](https://github.com/SocialGouv/code-du-travail-numerique/commit/0c91820))
- **frontend:** update memoize settings ([5b63bed](https://github.com/SocialGouv/code-du-travail-numerique/commit/5b63bed))
- remove runtime error on modeles-courriers ([#261](https://github.com/SocialGouv/code-du-travail-numerique/issues/261)) ([b72564c](https://github.com/SocialGouv/code-du-travail-numerique/commit/b72564c)), closes [#260](https://github.com/SocialGouv/code-du-travail-numerique/issues/260)
- use correct next-routes version ([34102fe](https://github.com/SocialGouv/code-du-travail-numerique/commit/34102fe))
- **frontend:** update wording on indeminité ccn ([#345](https://github.com/SocialGouv/code-du-travail-numerique/issues/345)) ([0aa785b](https://github.com/SocialGouv/code-du-travail-numerique/commit/0aa785b))
- prise en compte de la durée minimale indemnite à 8 mois ([#259](https://github.com/SocialGouv/code-du-travail-numerique/issues/259)) ([869f25e](https://github.com/SocialGouv/code-du-travail-numerique/commit/869f25e))
- use fixed next-routes for anchor links ([#334](https://github.com/SocialGouv/code-du-travail-numerique/issues/334)) ([419c054](https://github.com/SocialGouv/code-du-travail-numerique/commit/419c054))
- **frontend:** acronyme non expliqué ([#343](https://github.com/SocialGouv/code-du-travail-numerique/issues/343)) ([8f4fcc6](https://github.com/SocialGouv/code-du-travail-numerique/commit/8f4fcc6))
- **SearchResults:** add missing / ([#222](https://github.com/SocialGouv/code-du-travail-numerique/issues/222)) ([ede82c8](https://github.com/SocialGouv/code-du-travail-numerique/commit/ede82c8))
- **themes:** use themes from dataset ([#293](https://github.com/SocialGouv/code-du-travail-numerique/issues/293)) ([6af7442](https://github.com/SocialGouv/code-du-travail-numerique/commit/6af7442)), closes [#192](https://github.com/SocialGouv/code-du-travail-numerique/issues/192)
- **ui:** force update to npm-run-all@4.1.5 ([#321](https://github.com/SocialGouv/code-du-travail-numerique/issues/321)) ([3fdcb63](https://github.com/SocialGouv/code-du-travail-numerique/commit/3fdcb63))
- add prev button when asking anciennete ([#282](https://github.com/SocialGouv/code-du-travail-numerique/issues/282)) ([fbeda71](https://github.com/SocialGouv/code-du-travail-numerique/commit/fbeda71))
- remove outils until fix bug ([#248](https://github.com/SocialGouv/code-du-travail-numerique/issues/248)) ([e089999](https://github.com/SocialGouv/code-du-travail-numerique/commit/e089999))
- typos in outils.json ([#292](https://github.com/SocialGouv/code-du-travail-numerique/issues/292)) ([013cbc6](https://github.com/SocialGouv/code-du-travail-numerique/commit/013cbc6))
- **piwik:** fix process.env typo ([#224](https://github.com/SocialGouv/code-du-travail-numerique/issues/224)) ([9287300](https://github.com/SocialGouv/code-du-travail-numerique/commit/9287300))
- **routes:** fix ccns routes ([#223](https://github.com/SocialGouv/code-du-travail-numerique/issues/223)) ([d604e44](https://github.com/SocialGouv/code-du-travail-numerique/commit/d604e44))
- **suggest:** dont restrict sources ([39f0424](https://github.com/SocialGouv/code-du-travail-numerique/commit/39f0424))
- exclude videos from npm ([8edfa76](https://github.com/SocialGouv/code-du-travail-numerique/commit/8edfa76))
- show disclaimer on all answers ([24e27b5](https://github.com/SocialGouv/code-du-travail-numerique/commit/24e27b5))
- un-disable assets ([906b05f](https://github.com/SocialGouv/code-du-travail-numerique/commit/906b05f))
- wording intro search ([e9a1bb4](https://github.com/SocialGouv/code-du-travail-numerique/commit/e9a1bb4))
- **Article:** left-align ([f3a9a33](https://github.com/SocialGouv/code-du-travail-numerique/commit/f3a9a33))
- **categories:** fix default style ([8554a61](https://github.com/SocialGouv/code-du-travail-numerique/commit/8554a61))
- **categories:** fix root/child themes styles ([caea169](https://github.com/SocialGouv/code-du-travail-numerique/commit/caea169))
- **categories:** rupture en 1er ([78fa335](https://github.com/SocialGouv/code-du-travail-numerique/commit/78fa335))
- **Categories:** left-align blocs ([402a5de](https://github.com/SocialGouv/code-du-travail-numerique/commit/402a5de))
- **ccn:** ajout aide ds modale selection CCN fix [#37](https://github.com/SocialGouv/code-du-travail-numerique/issues/37) ([6ae14eb](https://github.com/SocialGouv/code-du-travail-numerique/commit/6ae14eb))
- **css:** protocol-less imports ([401d835](https://github.com/SocialGouv/code-du-travail-numerique/commit/401d835))
- **css:** use live git version atm ([ceb6e3d](https://github.com/SocialGouv/code-du-travail-numerique/commit/ceb6e3d))
- **docker:** add missing env.API_URL ([5d4f171](https://github.com/SocialGouv/code-du-travail-numerique/commit/5d4f171))
- **docker:** dont use absolute container names ([ce4e040](https://github.com/SocialGouv/code-du-travail-numerique/commit/ce4e040))
- **docker:** pass env vars at build time ([fd65003](https://github.com/SocialGouv/code-du-travail-numerique/commit/fd65003))
- **faq:** mise en forme for [#98](https://github.com/SocialGouv/code-du-travail-numerique/issues/98) ([fe815e5](https://github.com/SocialGouv/code-du-travail-numerique/commit/fe815e5))
- **FeedbackForm:** handle errors gracefully for [#104](https://github.com/SocialGouv/code-du-travail-numerique/issues/104) ([486284b](https://github.com/SocialGouv/code-du-travail-numerique/commit/486284b))
- **fiche-dgt:** mise en forme for [#97](https://github.com/SocialGouv/code-du-travail-numerique/issues/97) ([54fdfc0](https://github.com/SocialGouv/code-du-travail-numerique/commit/54fdfc0))
- **fiche-sp:** mise en forme for [#96](https://github.com/SocialGouv/code-du-travail-numerique/issues/96) ([69d2fb8](https://github.com/SocialGouv/code-du-travail-numerique/commit/69d2fb8))
- **home:** update welcome message fix [#107](https://github.com/SocialGouv/code-du-travail-numerique/issues/107) ([f1c0145](https://github.com/SocialGouv/code-du-travail-numerique/commit/f1c0145))
- **markup:** class -> className ([da29e9d](https://github.com/SocialGouv/code-du-travail-numerique/commit/da29e9d))
- **markup:** update with jeremie fixes ([b138ed6](https://github.com/SocialGouv/code-du-travail-numerique/commit/b138ed6))
- **nav:** fix [#120](https://github.com/SocialGouv/code-du-travail-numerique/issues/120) : keep question ([4b9cdb6](https://github.com/SocialGouv/code-du-travail-numerique/commit/4b9cdb6))
- **nav:** fix [#127](https://github.com/SocialGouv/code-du-travail-numerique/issues/127) link logo home ([c7e313d](https://github.com/SocialGouv/code-du-travail-numerique/commit/c7e313d))
- **polyfill:** dont restrict polyfills ([2b77b3b](https://github.com/SocialGouv/code-du-travail-numerique/commit/2b77b3b))
- **polyfill:** yet another try ([57a3bf3](https://github.com/SocialGouv/code-du-travail-numerique/commit/57a3bf3))
- **Search:** dont query below 3 chars ([10d9893](https://github.com/SocialGouv/code-du-travail-numerique/commit/10d9893))
- **Search:** show warning message, fix [#108](https://github.com/SocialGouv/code-du-travail-numerique/issues/108) ([fa9f293](https://github.com/SocialGouv/code-du-travail-numerique/commit/fa9f293))
- **SerchButton:** remove custom css ([c1243b6](https://github.com/SocialGouv/code-du-travail-numerique/commit/c1243b6))
- add missing deps ([69ceb88](https://github.com/SocialGouv/code-du-travail-numerique/commit/69ceb88))
- better page titles ([c4ea72e](https://github.com/SocialGouv/code-du-travail-numerique/commit/c4ea72e))
- breadcrumbs duplicate keys ([3c0d8eb](https://github.com/SocialGouv/code-du-travail-numerique/commit/3c0d8eb))
- put disclaimer in FAQ+Fiches answers only fix [#114](https://github.com/SocialGouv/code-du-travail-numerique/issues/114) ([24fe8d6](https://github.com/SocialGouv/code-du-travail-numerique/commit/24fe8d6))
- restore feedback forms ([d1a07f9](https://github.com/SocialGouv/code-du-travail-numerique/commit/d1a07f9))
- restore SeeAlso ([e294296](https://github.com/SocialGouv/code-du-travail-numerique/commit/e294296))
- **Search:** restore initial style ([6aef785](https://github.com/SocialGouv/code-du-travail-numerique/commit/6aef785))
- **suggester:** fix client-side navigation ([91b307a](https://github.com/SocialGouv/code-du-travail-numerique/commit/91b307a))
- **ui:** backport ghost commits ([abf4c77](https://github.com/SocialGouv/code-du-travail-numerique/commit/abf4c77))
- server routing ([907c019](https://github.com/SocialGouv/code-du-travail-numerique/commit/907c019))

### Features

- **categories:** use jeremie categories and extract component ([94acf60](https://github.com/SocialGouv/code-du-travail-numerique/commit/94acf60))
- **code-du-travail:** show article content [#95](https://github.com/SocialGouv/code-du-travail-numerique/issues/95) ([ac91946](https://github.com/SocialGouv/code-du-travail-numerique/commit/ac91946))
- **courrier-type:** add page and search for standard mail ([#147](https://github.com/SocialGouv/code-du-travail-numerique/issues/147)) ([#173](https://github.com/SocialGouv/code-du-travail-numerique/issues/173)) ([24b8175](https://github.com/SocialGouv/code-du-travail-numerique/commit/24b8175))
- **courrier-type:** index standart mail ([bf94971](https://github.com/SocialGouv/code-du-travail-numerique/commit/bf94971))
- **data:** add faq conventions collectives ([1d303d4](https://github.com/SocialGouv/code-du-travail-numerique/commit/1d303d4))
- **data:** add sub dataset module to the monorepo ([#295](https://github.com/SocialGouv/code-du-travail-numerique/issues/295)) ([3288499](https://github.com/SocialGouv/code-du-travail-numerique/commit/3288499))
- **frontend:** add annuaire search ([#357](https://github.com/SocialGouv/code-du-travail-numerique/issues/357)) ([dc7b5db](https://github.com/SocialGouv/code-du-travail-numerique/commit/dc7b5db))
- **frontend:** track tag feedback form in matomo ([#360](https://github.com/SocialGouv/code-du-travail-numerique/issues/360)) ([a0e7ad2](https://github.com/SocialGouv/code-du-travail-numerique/commit/a0e7ad2))
- **print:** add basic support for printing pages ([#307](https://github.com/SocialGouv/code-du-travail-numerique/issues/307)) ([7f88b62](https://github.com/SocialGouv/code-du-travail-numerique/commit/7f88b62))
- add popup feedback form ([#264](https://github.com/SocialGouv/code-du-travail-numerique/issues/264)) ([82dc160](https://github.com/SocialGouv/code-du-travail-numerique/commit/82dc160))
- **piwik:** add piwik tracker fix [#113](https://github.com/SocialGouv/code-du-travail-numerique/issues/113) ([3c49dde](https://github.com/SocialGouv/code-du-travail-numerique/commit/3c49dde))
- **search:** ajout conventions collectives fix [#99](https://github.com/SocialGouv/code-du-travail-numerique/issues/99) : ([204c08d](https://github.com/SocialGouv/code-du-travail-numerique/commit/204c08d))
- add /suggest route ([9a67c7c](https://github.com/SocialGouv/code-du-travail-numerique/commit/9a67c7c))
- add Article component ([f147530](https://github.com/SocialGouv/code-du-travail-numerique/commit/f147530))
- **Support:** more inclusive avatar ([1e64ffd](https://github.com/SocialGouv/code-du-travail-numerique/commit/1e64ffd))
- add Article ([502d689](https://github.com/SocialGouv/code-du-travail-numerique/commit/502d689))
- add client-side sentry ([12e8965](https://github.com/SocialGouv/code-du-travail-numerique/commit/12e8965))
- add process.env.API_URL ([d22f364](https://github.com/SocialGouv/code-du-travail-numerique/commit/d22f364))
- add tag class ([675c39e](https://github.com/SocialGouv/code-du-travail-numerique/commit/675c39e))
- **code-du-travail:** show path and date ([7cd0603](https://github.com/SocialGouv/code-du-travail-numerique/commit/7cd0603))
- **themes:** show results while navigating themes ([dd4f3c9](https://github.com/SocialGouv/code-du-travail-numerique/commit/dd4f3c9))
- integrate autocomplete + search ([0fa1e8a](https://github.com/SocialGouv/code-du-travail-numerique/commit/0fa1e8a))
- use ui/Article layout for [#92](https://github.com/SocialGouv/code-du-travail-numerique/issues/92) ([4c40b11](https://github.com/SocialGouv/code-du-travail-numerique/commit/4c40b11))
- **fiches-ministere-travail:** add server routing ([53fe763](https://github.com/SocialGouv/code-du-travail-numerique/commit/53fe763))
- **fiches-service-public:** add server routing ([4736e17](https://github.com/SocialGouv/code-du-travail-numerique/commit/4736e17))
- **search:** add basic autocomplete ([86f83a1](https://github.com/SocialGouv/code-du-travail-numerique/commit/86f83a1))
- add default error page ([9e104ac](https://github.com/SocialGouv/code-du-travail-numerique/commit/9e104ac))
- add server-side routing ([8eb9bcd](https://github.com/SocialGouv/code-du-travail-numerique/commit/8eb9bcd))

### Reverts

- **css:** add watch on start ([#156](https://github.com/SocialGouv/code-du-travail-numerique/issues/156)) ([7a79d4a](https://github.com/SocialGouv/code-du-travail-numerique/commit/7a79d4a))

### BREAKING CHANGES

- **data:** add sub dataset module to the monorepo

This might impact the build script as the newest in range dependencies are used now.

- ci: ignore @cdt/data\* packages when testing
