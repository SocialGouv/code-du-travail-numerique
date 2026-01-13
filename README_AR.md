# القانون الرقمي للعمل

![Quality Status](https://github.com/SocialGouv/code-du-travail-numerique/actions/workflows/quality.yml/badge.svg)

- تصفح الموقع [site internet code.travail.gouv.fr](https://code.travail.gouv.fr)
- حول القانون الرقمي للعمل: [https://code.travail.gouv.fr/a-propos](https://code.travail.gouv.fr/a-propos)

## المساهمات

- للإبلاغ عن مشكلة للفريق، أرسل بريدًا إلكترونيًا إلى [codedutravailnumerique@travail.gouv.fr](mailto:codedutravailnumerique@travail.gouv.fr).
- للإبلاغ عن خطأ تقني [افتح تذكرة](https://github.com/SocialGouv/code-du-travail-numerique/issues/new).

## التطوير

### التثبيت

```sh
# تثبيت جميع الحزم
pnpm install
pnpm build
```

### الاختبارات

```sh
pnpm test:frontend # لتشغيل اختبارات الواجهة الأمامية
TEST_MODE=heavy-and-light pnpm test:e2e # لتشغيل اختبار e2e بدون واجهة
TEST_MODE=heavy-and-light pnpm test:e2e:ui # لتشغيل اختبار e2e مع واجهة Cypress
# يمكن أن يكون TEST_MODE: light, heavy, heavy-and-light أو html-validation
```

## الحزم

| الحزم                                                        | الوصف                                                                    |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [code-du-travail-frontend](./packages/code-du-travail-frontend) | تطبيق Next.js                                                            |
| [code-du-travail-modeles](./packages/code-du-travail-modeles)   | تنفيذ [publicodes](https://publi.codes) للاتفاقيات الجماعية   |
| [code-du-travail-utils](./packages/code-du-travail-utils)       | أدوات مشتركة بين مشاريع القانون الرقمي للعمل المختلفة |

### واجهة-قانون-العمل

```sh
# لتشغيل التطبيق باستخدام API النسخة قبل الإنتاج:
cp packages/code-du-travail-frontend/.env.sample packages/code-du-travail-frontend/.env
pnpm dev:frontend

# لتشغيل التطبيق باستخدام Docker محلي
NEXT_PUBLIC_ES_INDEX_PREFIX=cdtn ELASTICSEARCH_URL=http://localhost:9200 pnpm --filter @cdt/frontend dev
```

### نماذج-قانون-العمل

تحتوي هذه الحزمة على نماذج [publicodes]
 لمحاكيات القانون الرقمي للعمل.

#### التنظيم

تحتوي الحزمة على النماذج في مجلد 'src/modeles' بصيغة YAML.
البنية لم تُنهَ بعد.

حاليًا، يتم وضع معلومات قانون العمل في الملف `contrat-salarie.yaml`
ومعلومات كل اتفاقية جماعية في المجلد `src/modeles/conventions`، حيث يحتوي كل ملف على اتفاقية واحدة.

تسمح الفئة `MergeModele` في المجلد `src/utils` بدمج جميع ملفات YAML في مجلد `modeles`  لتغذية محرك 'publicodes'.

أخيرًا، يحتوي المجلد `src/__test__` على اختبارات للتحقق من قواعد ملفات YAML.
الهدف هو تمكين تطوير قواعدنا بطريقة TDD (Test Driven Development).