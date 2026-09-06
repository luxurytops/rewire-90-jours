# Validation PWA — REWIRE YOUR MIND — 90 JOURS

- Date : 10 août 2026
- URL : `https://luxurytops.github.io/rewire-90-jours/`
- Navigateur : Google Chrome sur Windows
- Statut : **PWA INSTALLÉE — FONCTIONNEMENT HORS CONNEXION PRINCIPAL VALIDÉ**

## Contrôles confirmés

- publication HTTPS GitHub Pages ;
- manifeste et icône REWIRE reconnus ;
- service worker actif ;
- ouverture dans une fenêtre autonome ;
- rechargement réussi après désactivation du Wi-Fi.

## Contrôles complémentaires recommandés

- mini-diagnostic complet hors connexion ;
- nettoyage des caches suivi d’un nouveau test ;
- installation sur mobile ;
- zoom à 200 % et lecteur d’écran ;
- mise à jour automatique lors du prochain changement de cache.

---

## Recette de la correction — 6 septembre 2026

Le statut du 10 août ci-dessus est une trace historique. Il ne vaut pas validation humaine de la correction actuelle.

Version : correction locale depuis `5be33f8`, cache `static-v16`, recette locale préalable à la publication autorisée le 6 septembre 2026.
Navigateur : Microsoft Edge 145, Windows, headless, profil temporaire neuf.

Tests exécutés avec `audit-browser.mjs` (résultats dans `audit-browser-results.json`, à la racine du projet) :

- formulaires vides refusés, consentement requis ;
- diagnostic aux seuils 0, 4, 5, 9, 10 et 16 conforme ;
- message WhatsApp intercepté sans ouverture ni envoi, accents et caractères spéciaux conservés ;
- aucune valeur du diagnostic/formulaire dans les événements analytiques inspectés ; appels Google bloqués pendant la recette ;
- accueil et deux portfolios sans débordement horizontal à 320, 390, 768 et 1100 px ;
- largeur CSS de 550 px contrôlée pour simuler la place disponible à 200 % sur 1100 px ; ce contrôle ne remplace pas le zoom navigateur ;
- premier Tab atteint un lien ;
- après première visite, coupure des réponses du serveur local et réseau de la page désactivé : accueil et portfolios distincts, CSS/JS `?v=16` accessibles ;
- adresse inconnue : message explicite hors connexion ;
- mise à jour réelle du service worker avec version de test temporaire : activation du nouveau cache, suppression de l’ancien et rechargement hors ligne du portfolio et du JavaScript réussis. Fichier source restauré ensuite.

Restent à faire humainement : installation sur téléphone, rendu visuel et lisibilité détaillée, parcours clavier complet, zoom navigateur à 200 %, lecteur d’écran, trafic analytique réel et recette après publication. Aucun envoi WhatsApp à une personne effectué.
