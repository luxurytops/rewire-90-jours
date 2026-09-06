# REWIRE YOUR MIND — 90 JOURS

## État au 6 septembre 2026

Corrections locales préparées à partir du commit publié `5be33f8`. Publication autorisée par le candidat le 6 septembre 2026. Architecture HTML/CSS/JavaScript conservée ; cache statique `rewire-90-static-v16`.

- Site public : https://luxurytops.github.io/rewire-90-jours/
- Portfolio public existant : https://luxurytops.github.io/rewire-90-jours/portfolio-v1/
- Portfolio V2 local : `portfolio/index.html` (inclus dans cette publication).
- Recette actuelle et limites : [VALIDATION-PWA.md](VALIDATION-PWA.md).

## Fonctionnement

`index.html`, `css/styles.css` et `js/app.js` composent le site. `data/data.json` contient les quatre mouvements. Le manifeste et le service worker sont présents. Le cache précharge les URL CSS/JS exactes avec `?v=16`, les deux portfolios et les médias utiles. Chaque navigation retrouve uniquement sa propre réponse en cache. Une adresse inconnue affiche un message hors ligne explicite. WhatsApp et Google Analytics nécessitent Internet.

Le résultat du diagnostic reste en mémoire dans la page. Les statistiques reçoivent uniquement des noms génériques d’événements et un identifiant de page, sans score, orientation, réponse ou champ de candidature. Google Analytics reste chargé : il ne faut donc pas présenter le site comme dépourvu de statistiques. Le test a intercepté les appels externes ; il ne constitue pas une capture du trafic réel Google Analytics.

Après accord explicite, le prénom, le numéro, la difficulté et le résultat éventuel sont inclus dans une URL WhatsApp de préremplissage. Ces informations sont alors communiquées à WhatsApp ; leur envoi au destinataire nécessite une confirmation dans WhatsApp. Aucun stockage persistant de ces champs n’est implémenté par le site.

L’offre reste datée : avant le 10 septembre 2026, sous réserve des places disponibles. Avec JavaScript, à partir du 10 septembre à 00 h (UTC+1), le tarif promotionnel est remplacé par une demande de confirmation du tarif, dans la page et le message. Sans JavaScript, le texte garde sa date de validité explicite. La disponibilité réelle doit être confirmée par le candidat.

## Preuves

P01 à P06 : statut d’accès restreint affiché publiquement. Les originaux sont consultables dans le dossier local de soutenance. P07 donne accès au JSON et au code ; P08 au rapport PWA daté ; P09 au commit historique. Les mentions non étayées « Portfolio validé » ont été remplacées. La V2 conserve P10 comme synthèse anonymisée, sans ajout de données privées.

## Vérifier localement

Servir ce dossier par HTTP sur localhost, puis ouvrir `/` et `/portfolio-v1/`. Le script `serve-local.ps1` est fourni. Le portfolio seul reste lisible par ouverture de fichier ; la PWA et le chargement JSON nécessitent HTTP.

Le bilan de soutenance, le script navigateur reproductible et ses résultats sont conservés dans le dossier de projet parent. L’ancien README est archivé dans `90-archives/readme-deploiement-avant-audit-2026-09-06.md` ; ses validations historiques ne décrivent pas automatiquement cette version.

## Publication

Publication autorisée le 6 septembre 2026, avec toutes les ressources du cache. La recette documentée est locale ; elle ne constitue pas une validation humaine du site publié.