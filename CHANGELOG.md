# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
