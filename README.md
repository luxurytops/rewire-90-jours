# REWIRE YOUR MIND — 90 JOURS · PWA

Cette copie est préparée pour être publiée à la racine de `luxurytops/rewire-90-jours` avec GitHub Pages.

## Objectif

Cette V2 conserve le mini-site de la séance 18 et sépare les quatre mouvements de la méthode REWIRE de leur affichage. Les données sont stockées dans `data/data.json`, chargées avec `fetch()` puis rendues dans le DOM avec JavaScript.

La source conservée intacte est `05-web/mini-site-v1/`.

## Différence entre V1 et V2

- V1 : les quatre cartes sont écrites directement dans `index.html`.
- V2 : `index.html` contient un conteneur et une zone d’état ; `js/app.js` récupère le JSON et construit les cartes.
- Le mini-diagnostic existant reste local et indépendant du JSON.
- Aucun manifest ni service worker n’est déclaré dans cette séance.

## Arborescence

```text
mini-site-v2/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── data/
│   └── data.json
└── assets/
    └── images/
        ├── hero-rewire.webp
        ├── mohamed-boumrah-about.webp
        └── mohamed-boumrah-hero.webp
```

`mohamed-boumrah-hero.webp` a été hérité de la V1 source mais n’est pas référencé par la page.

## Rôle des fichiers

- `index.html` : structure sémantique, conteneur des méthodes et interface accessible des états.
- `css/styles.css` : présentation responsive et styles Chargement, Succès, Vide et Erreur.
- `js/app.js` : mini-diagnostic existant, chargement JSON, validation des données et création des cartes.
- `data/data.json` : quatre mouvements REWIRE sous forme de données structurées.
- `assets/images/` : images locales héritées de la V1.

## Lancement obligatoire par HTTP

`fetch()` ne doit pas être validé avec une ouverture directe en `file://`, car les politiques de sécurité du navigateur peuvent empêcher ou modifier l’accès au JSON local.

Depuis la racine du projet, utiliser un serveur local disponible, par exemple :

```text
python -m http.server 8000
```

Puis ouvrir :

```text
http://localhost:8000/
```

Python n’était pas installé dans l’environnement d’exécution utilisé pour la recette. Le contrôle HTTP automatisé a donc employé un serveur TCP PowerShell temporaire sans dépendance.

## Tester les quatre états

- Succès : `http://localhost:8000/`
- Chargement maintenu : `http://localhost:8000/?data-state=loading`
- Données vides simulées : `http://localhost:8000/?data-state=empty`
- Erreur réseau simulée : `http://localhost:8000/?data-state=error`

Les paramètres de test ne modifient pas `data/data.json`. L’URL normale reste toujours l’état nominal.

## Contrôles exécutés

- syntaxe JSON validée avec PowerShell ;
- quatre objets et quatre champs obligatoires par objet confirmés ;
- réponses HTTP `200` pour HTML, CSS, JavaScript, JSON et images référencées ;
- type MIME `application/json; charset=utf-8` confirmé ;
- réponse `404` confirmée pour le chemin volontairement absent ;
- absence de chemin absolu, secret, ressource distante et encodage suspect dans les fichiers V2 ;
- inspection statique de `fetch()`, `response.ok`, validation du tableau, `try/catch` et rendu avec `textContent`.

Edge et Chrome headless sont restés bloqués dans l’environnement. Les quatre états n’ont donc pas été validés visuellement ou fonctionnellement dans un navigateur.

## Tests humains restant à effectuer

- ouvrir les quatre URL ci-dessus dans un navigateur ;
- contrôler la console pour chaque état ;
- vérifier les cartes à 320, 390, 768 et 1100 px ;
- vérifier le clavier, le focus, le zoom à 200 % et l’annonce des statuts ;
- exécuter le mini-diagnostic complet.

## Préparation PWA

Une future séance pourra ajouter :

- un `manifest.webmanifest` avec nom, nom court, couleurs, URL de départ et mode d’affichage ;
- des icônes dédiées 192 × 192 et 512 × 512 ;
- un service worker pour l’application shell ;
- une stratégie explicite pour la mise à jour de `data/data.json` ;
- une page ou un message hors connexion.

Le futur cache devra éviter de conserver indéfiniment une ancienne version du JSON. Une stratégie réseau prioritaire avec repli sur cache est à évaluer pour les données, tandis qu’un cache prioritaire peut convenir aux ressources statiques versionnées.

Les service workers nécessitent HTTPS, sauf sur `localhost`, et doivent être testés avant toute déclaration de fonctionnement hors connexion.

## Statut

**PRÊT POUR TEST HUMAIN** — aucune publication effectuée.

---

## Historique de la V1 source

## Présentation

Cette page locale présente REWIRE comme un parcours structuré destiné à faire évoluer progressivement les schémas, les décisions et les actions. Elle constitue le livrable de la séance 18.

## Public visé

Cadres, managers, entrepreneurs, salariés, freelances, chercheurs d’emploi et personnes en transition ou en reconversion qui rencontrent des blocages dans le passage à l’action.

## Sources utilisées

- `REWIRE_90_PROJECT_GUIDE.html`
- `REWIRE_90_Note_de_cadrage_mini_site.html`
- `REWIRE_90_Fiche_projet_mini_site.html`
- deux portraits REWIRE locaux fournis et validés dans le projet

Les fichiers sources n’ont pas été modifiés.

## Arborescence

```text
mini-site-v1/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── assets/
    └── images/
        ├── mohamed-boumrah-hero.webp
        └── mohamed-boumrah-about.webp
```

`index.html` porte le contenu sémantique, `css/styles.css` définit la présentation responsive et `js/app.js` gère uniquement le mini-diagnostic.

## Ouverture locale

Ouvrir `index.html` dans un navigateur récent. Aucun serveur, compte ou accès réseau n’est nécessaire.

## Interaction JavaScript

Le mini-diagnostic comporte six questions avec les réponses Jamais, Rarement, Parfois, Souvent et Très souvent. Le calcul reste local et affiche une courte orientation non médicale. Aucune réponse n’est enregistrée ni transmise. Sans JavaScript, les questions et le reste de la page demeurent lisibles.

## Visuels

Les portraits sont des déclinaisons locales de la création fournie par le candidat. Ils ne dépendent d’aucune ressource distante.

## Contrôles réellement exécutés

- inventaire des fichiers et vérification de tous les chemins relatifs : conforme ;
- inspection statique : un `h1`, huit sections et aucune ressource manquante ;
- recherche de lorem ipsum, champs résiduels, URL distante, chemin absolu exposé et technologie hors périmètre : aucun résultat ;
- rendu local avec Edge headless à 768 px et 1100 px : mise en page cohérente ;
- ouverture locale avec Google Chrome headless : document rendu et JavaScript chargé (`data-js-ready="true"`) ;
- tentative de rendu à 320 px : l’outil headless a appliqué une largeur minimale supérieure, le résultat ne constitue donc pas une validation mobile fiable ;
- correction préventive des largeurs minimales et des boutons sur petit écran.

Aucun moteur JavaScript moderne en ligne de commande n’était disponible pour une validation syntaxique indépendante.

## Tests humains restant à effectuer

- vérifier visuellement la page sur un appareil ou émulateur à 320–390 px ;
- tester les six questions, la validation et les trois niveaux de résultat à la souris, au toucher et au clavier (le chargement du script est confirmé, mais les trente choix n’ont pas tous été activés humainement) ;
- vérifier le focus visible, le zoom à 200 % et l’ordre de lecture ;
- contrôler le rendu des deux images et relire les contenus ;
- consulter la console du navigateur.

## Limites de la V1

Cette V1 ne contient ni formulaire envoyé, ni contact public vérifié, ni témoignage, ni prix, ni paiement, ni JSON, ni API, ni PWA. **Aucune publication effectuée.**
