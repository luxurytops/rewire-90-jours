# Preuve 19 — JSON, fetch(), DOM et préparation PWA

- Date : 10 août 2026
- Projet : REWIRE YOUR MIND — 90 JOURS
- Source : `05-web/mini-site-v1/`
- Cible : `05-web/mini-site-v2/`
- Statut : **PRÊT POUR TEST HUMAIN**

## Transformation réalisée

Les quatre cartes de la méthode REWIRE ont été retirées du HTML de la V2 et transférées dans `mini-site-v2/data/data.json`. Le script charge ce fichier avec `fetch()`, vérifie la réponse HTTP et la structure du tableau, puis crée les cartes dans le DOM.

Le rendu des données utilise `createElement()`, `textContent`, `append()` et `replaceChildren()`. Aucune donnée JSON n’est injectée avec `innerHTML`.

## Fichiers créés

- `05-web/mini-site-v2/index.html`
- `05-web/mini-site-v2/css/styles.css`
- `05-web/mini-site-v2/js/app.js`
- `05-web/mini-site-v2/data/data.json`
- `05-web/mini-site-v2/assets/images/hero-rewire.webp`
- `05-web/mini-site-v2/assets/images/mohamed-boumrah-about.webp`
- `05-web/mini-site-v2/assets/images/mohamed-boumrah-hero.webp`
- `05-web/mini-site-v2/README.md`
- `05-web/preuve-19-json-pwa.md`
- `05-web/recette-seance-19.md`

La troisième image a été héritée lors de la copie de la V1 et reste non référencée. Aucun fichier source n’a été supprimé.

## Quatre états prévus

- Chargement : message immédiat, `aria-live="polite"` et `aria-busy="true"`.
- Succès : quatre cartes et nombre d’éléments chargés.
- Vide : message distinct, sans traiter le tableau vide comme une erreur.
- Erreur : message utilisateur, page toujours disponible et détail technique limité à la console.

Les paramètres `data-state=loading`, `empty` et `error` permettent de maintenir ou simuler les états sans modifier le JSON nominal.

## Tests réellement exécutés

- `data.json` analysé avec `ConvertFrom-Json` : valide.
- Nombre d’objets : 4.
- Champs `id`, `number`, `title` et `description` : présents et non vides pour les quatre objets.
- HTML, CSS, JavaScript, JSON et deux images référencées : réponses HTTP `200`.
- JSON : type MIME `application/json; charset=utf-8`.
- Faux chemin utilisé par le test Erreur : réponse HTTP `404`.
- Recherche statique : aucun secret, chemin absolu, appel distant ou caractère d’encodage suspect trouvé dans la V2.
- V1 contrôlée par empreintes SHA-256 avant et après la transformation.

## Tests non validés

Edge et Chrome headless se sont bloqués lors du rendu DOM. Les processus ont été interrompus. Par conséquent, aucun des quatre états n’est déclaré validé dans un navigateur.

Restent à tester humainement :

- les quatre URL d’état ;
- la console ;
- le rendu responsive à 320, 390, 768 et 1100 px ;
- le zoom à 200 % ;
- le parcours au clavier et les annonces des statuts ;
- le mini-diagnostic complet.

## Difficultés et corrections

Python détecté par le système était uniquement un raccourci Microsoft Store. Un serveur TCP PowerShell temporaire a été utilisé sans installation. Le serveur a fourni tous les résultats HTTP attendus ; son processus de test a dépassé la limite lors de l’arrêt parce qu’il attendait une nouvelle connexion.

Les navigateurs headless disponibles n’ont pas terminé leurs rendus. Cette limite est documentée au lieu de convertir une inspection du code en faux résultat de test.

## Préparation PWA

Aucun manifest et aucun service worker n’ont été créés. La future PWA nécessitera des icônes 192 × 192 et 512 × 512, un manifest, un service worker testé, une stratégie de cache pour l’application shell et une politique de fraîcheur spécifique à `data/data.json`.

Le développement et les tests du service worker devront se faire sur HTTPS ou `localhost`. Le site n’est pas déclaré installable et son fonctionnement hors connexion n’est pas revendiqué.

## Conclusion

La séparation JSON → fetch() → JavaScript → DOM est implémentée et les ressources répondent par HTTP. Une validation dans un navigateur réel reste obligatoire avant le statut « PRÊT POUR VALIDATION ».
