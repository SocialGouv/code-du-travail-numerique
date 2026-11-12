## Contexte

<!-- Pourquoi cette PR ? Lien vers l'issue : Closes #… -->

## Changements

<!-- Ce qui change, en quelques points. -->

## Vérifications

<!-- Tests lancés, captures, URL de review à contrôler. -->

## Cette PR change ou supprime une URL ?

<!-- Si oui, cocher chaque point avant la mise en production (cf. BEST_PRACTICE.md, « Changement d'URL ou suppression de page (SEO) »). Sinon, supprimer cette section. -->

- [ ] Redirection 301 en un seul saut vers l'URL finale (`statusCode: 301` dans `redirects.json`, vérifiée avec `curl -sI`)
- [ ] Sitemap à jour après l'export
- [ ] Liens internes mis à jour (code et contenus de l'admin)
- [ ] Demande d'indexation dans la Google Search Console planifiée après la mise en production
- [ ] Suivi mensuel des clics sur les requêtes concernées planifié
