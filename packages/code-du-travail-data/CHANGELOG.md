# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 1.5.1 (2018-12-11)


### Bug Fixes

* **data:** [@jrduscher](https://github.com/jrduscher) fixes from old repo ([bfe58fa](https://github.com/SocialGouv/code-du-travail-numerique/commit/bfe58fa))
* **data:** add date in fiche ministere ([#288](https://github.com/SocialGouv/code-du-travail-numerique/issues/288)) ([212b94c](https://github.com/SocialGouv/code-du-travail-numerique/commit/212b94c))
* **data:** add date on  fiche minisitere ([#304](https://github.com/SocialGouv/code-du-travail-numerique/issues/304)) ([0cb0338](https://github.com/SocialGouv/code-du-travail-numerique/commit/0cb0338))
* **data:** add date to fiche service public ([#303](https://github.com/SocialGouv/code-du-travail-numerique/issues/303)) ([4c62d76](https://github.com/SocialGouv/code-du-travail-numerique/commit/4c62d76)), closes [#273](https://github.com/SocialGouv/code-du-travail-numerique/issues/273)
* **data:** add Q/R on ass-mat to faq ([#329](https://github.com/SocialGouv/code-du-travail-numerique/issues/329)) ([f943a73](https://github.com/SocialGouv/code-du-travail-numerique/commit/f943a73))
* **data:** better warnings ([58ad37f](https://github.com/SocialGouv/code-du-travail-numerique/commit/58ad37f))
* **data:** faq: use nested tags property ([#205](https://github.com/SocialGouv/code-du-travail-numerique/issues/205)) ([e8e27be](https://github.com/SocialGouv/code-du-travail-numerique/commit/e8e27be))
* **data:** fiches s-p : restore old data but add html ([6f8694d](https://github.com/SocialGouv/code-du-travail-numerique/commit/6f8694d))
* **data:** fix python indexing ([#342](https://github.com/SocialGouv/code-du-travail-numerique/issues/342)) ([73afc30](https://github.com/SocialGouv/code-du-travail-numerique/commit/73afc30))
* **data:** remove convention-collective 2121 from ES ([#289](https://github.com/SocialGouv/code-du-travail-numerique/issues/289)) ([d8c9225](https://github.com/SocialGouv/code-du-travail-numerique/commit/d8c9225))
* **data:** update faq.json ([#240](https://github.com/SocialGouv/code-du-travail-numerique/issues/240)) ([5788716](https://github.com/SocialGouv/code-du-travail-numerique/commit/5788716))
* **data:** update fiches service public ([#268](https://github.com/SocialGouv/code-du-travail-numerique/issues/268)) ([7548ae2](https://github.com/SocialGouv/code-du-travail-numerique/commit/7548ae2))
* **data:** update themes.csv ([#320](https://github.com/SocialGouv/code-du-travail-numerique/issues/320)) ([c285f05](https://github.com/SocialGouv/code-du-travail-numerique/commit/c285f05))
* **dev:** update dev in npm run script ([a34ee9a](https://github.com/SocialGouv/code-du-travail-numerique/commit/a34ee9a))
* **docker:** fix ES_PORT, move data docker scripts to data ([850dc5b](https://github.com/SocialGouv/code-du-travail-numerique/commit/850dc5b))
* **docker:** restore docker setup ([ea229e5](https://github.com/SocialGouv/code-du-travail-numerique/commit/ea229e5))
* **dockerify:** add missing .env ([c612762](https://github.com/SocialGouv/code-du-travail-numerique/commit/c612762))
* **faq:** add info provider(DGT, DIRRECTE) to faq ([#188](https://github.com/SocialGouv/code-du-travail-numerique/issues/188)) ([d287852](https://github.com/SocialGouv/code-du-travail-numerique/commit/d287852))
* **frontend:** update convention modal to request elastic search  ([#319](https://github.com/SocialGouv/code-du-travail-numerique/issues/319)) ([0c91820](https://github.com/SocialGouv/code-du-travail-numerique/commit/0c91820))
* remove outils until fix bug ([#248](https://github.com/SocialGouv/code-du-travail-numerique/issues/248)) ([e089999](https://github.com/SocialGouv/code-du-travail-numerique/commit/e089999))
* typos in outils.json ([#292](https://github.com/SocialGouv/code-du-travail-numerique/issues/292)) ([013cbc6](https://github.com/SocialGouv/code-du-travail-numerique/commit/013cbc6))


### Features

* **courrier-type:** add page and search for standard mail ([#147](https://github.com/SocialGouv/code-du-travail-numerique/issues/147)) ([#173](https://github.com/SocialGouv/code-du-travail-numerique/issues/173)) ([24b8175](https://github.com/SocialGouv/code-du-travail-numerique/commit/24b8175))
* **courrier-type:** index standart mail ([bf94971](https://github.com/SocialGouv/code-du-travail-numerique/commit/bf94971))
* **data:** add faq conventions collectives ([1d303d4](https://github.com/SocialGouv/code-du-travail-numerique/commit/1d303d4))
* **data:** add sub dataset module to the monorepo ([#295](https://github.com/SocialGouv/code-du-travail-numerique/issues/295)) ([3288499](https://github.com/SocialGouv/code-du-travail-numerique/commit/3288499))
* **frontend:** add annuaire search ([#357](https://github.com/SocialGouv/code-du-travail-numerique/issues/357)) ([dc7b5db](https://github.com/SocialGouv/code-du-travail-numerique/commit/dc7b5db))
* **search:** ajout conventions collectives fix [#99](https://github.com/SocialGouv/code-du-travail-numerique/issues/99) : ([204c08d](https://github.com/SocialGouv/code-du-travail-numerique/commit/204c08d))


### BREAKING CHANGES

* **data:** add sub dataset module to the monorepo

This might impact the build script as the newest in range dependencies are used now.

* ci: ignore @cdt/data* packages when testing
