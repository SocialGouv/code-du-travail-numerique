# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 2.0.0 (2019-03-08)


### Features

* **data:** refactor KALI data to use legixplore API  ([e6ae16c](https://github.com/SocialGouv/code-du-travail-numerique/commit/e6ae16c)), closes [#533](https://github.com/SocialGouv/code-du-travail-numerique/issues/533)
* **frontend:** use spreadsheet for elastic tests ([#575](https://github.com/SocialGouv/code-du-travail-numerique/issues/575)) ([d343e98](https://github.com/SocialGouv/code-du-travail-numerique/commit/d343e98))


### BREAKING CHANGES

* **data:** json payload updated for KALI

- removed deprecated data files
- removed NAF information
- refactored kali dataset to hit the new legixplore API.





# 1.8.0 (2019-02-12)

**Note:** Version bump only for package @cdt/api





## 1.7.3 (2019-01-29)


### Bug Fixes

* **api:** update test after mapping change ([#461](https://github.com/SocialGouv/code-du-travail-numerique/issues/461)) ([59d6b43](https://github.com/SocialGouv/code-du-travail-numerique/commit/59d6b43)), closes [#330](https://github.com/SocialGouv/code-du-travail-numerique/issues/330) [#116](https://github.com/SocialGouv/code-du-travail-numerique/issues/116) [#416](https://github.com/SocialGouv/code-du-travail-numerique/issues/416)
* **data:** mise à jour des metadata des courrier ([#431](https://github.com/SocialGouv/code-du-travail-numerique/issues/431)) ([bc4c9e7](https://github.com/SocialGouv/code-du-travail-numerique/commit/bc4c9e7)), closes [#429](https://github.com/SocialGouv/code-du-travail-numerique/issues/429)





## [1.7.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v1.7.1...v1.7.2) (2019-01-21)

**Note:** Version bump only for package @cdt/api





## 1.7.1 (2019-01-18)

**Note:** Version bump only for package @cdt/api





# 1.7.0 (2019-01-15)


### Bug Fixes

* **frontend:** change trackEvent value for feedback ([#404](https://github.com/SocialGouv/code-du-travail-numerique/issues/404)) ([26b664b](https://github.com/SocialGouv/code-du-travail-numerique/commit/26b664b))





## [1.6.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v1.6.1...v1.6.2) (2018-12-19)

**Note:** Version bump only for package @cdt/api





# 1.6.0 (2018-12-18)


### Bug Fixes

* **api:** better error handling in getsingleitem response ([#388](https://github.com/SocialGouv/code-du-travail-numerique/issues/388)) ([1fd83c2](https://github.com/SocialGouv/code-du-travail-numerique/commit/1fd83c2))


### Features

* add related content for faq ([#370](https://github.com/SocialGouv/code-du-travail-numerique/issues/370)) ([853ae51](https://github.com/SocialGouv/code-du-travail-numerique/commit/853ae51))





## [1.5.2](https://github.com/SocialGouv/code-du-travail-numerique/compare/v1.5.1...v1.5.2) (2018-12-12)

**Note:** Version bump only for package @cdt/api





## 1.5.1 (2018-12-11)


### Bug Fixes

* **api:** getSingleItem only throw if no results found ([#352](https://github.com/SocialGouv/code-du-travail-numerique/issues/352)) ([54fd3a0](https://github.com/SocialGouv/code-du-travail-numerique/commit/54fd3a0))
* **api:** smaller api response for search request ([#361](https://github.com/SocialGouv/code-du-travail-numerique/issues/361)) ([f6f11f1](https://github.com/SocialGouv/code-du-travail-numerique/commit/f6f11f1))
* **api:** use process.env.API_PORT ([#364](https://github.com/SocialGouv/code-du-travail-numerique/issues/364)) ([263e012](https://github.com/SocialGouv/code-du-travail-numerique/commit/263e012))
* **dev:** update dev in npm run script ([a34ee9a](https://github.com/SocialGouv/code-du-travail-numerique/commit/a34ee9a))
* **docker:** dont use absolute container names ([1d27c09](https://github.com/SocialGouv/code-du-travail-numerique/commit/1d27c09))
* **docker:** restore docker setup ([ea229e5](https://github.com/SocialGouv/code-du-travail-numerique/commit/ea229e5))
* **frontend:** fix ccn search for idcc id ([#358](https://github.com/SocialGouv/code-du-travail-numerique/issues/358)) ([5a97e02](https://github.com/SocialGouv/code-du-travail-numerique/commit/5a97e02))
* **frontend:** update convention modal to request elastic search  ([#319](https://github.com/SocialGouv/code-du-travail-numerique/issues/319)) ([0c91820](https://github.com/SocialGouv/code-du-travail-numerique/commit/0c91820))
* **suggest:** dont restrict sources ([39f0424](https://github.com/SocialGouv/code-du-travail-numerique/commit/39f0424))
* **ui:** force update to npm-run-all@4.1.5 ([#321](https://github.com/SocialGouv/code-du-travail-numerique/issues/321)) ([3fdcb63](https://github.com/SocialGouv/code-du-travail-numerique/commit/3fdcb63))


### Features

* add /suggest route ([9a67c7c](https://github.com/SocialGouv/code-du-travail-numerique/commit/9a67c7c))
* **courrier-type:** add page and search for standard mail ([#147](https://github.com/SocialGouv/code-du-travail-numerique/issues/147)) ([#173](https://github.com/SocialGouv/code-du-travail-numerique/issues/173)) ([24b8175](https://github.com/SocialGouv/code-du-travail-numerique/commit/24b8175))
* **frontend:** add annuaire search ([#357](https://github.com/SocialGouv/code-du-travail-numerique/issues/357)) ([dc7b5db](https://github.com/SocialGouv/code-du-travail-numerique/commit/dc7b5db))
