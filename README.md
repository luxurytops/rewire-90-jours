# REWIRE YOUR MIND — 90 JOURS · Mini-site V1

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
