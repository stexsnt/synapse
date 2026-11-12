# Synapse — comprendre l'IA en SNT

Site statique d'entraînement pour la Seconde, adapté du livret « L'intelligence artificielle en SNT » :
leçons courtes, questions, classements, manipulations interactives et exercices Python corrigés
automatiquement (Python réel dans le navigateur, grâce à Pyodide). Aucun serveur, aucun compte,
aucune donnée transmise. Le moteur est celui du site Mue (stexsnt/python-lycee).

Les évaluations du livret et leurs corrigés ne sont volontairement pas publiés sur le site.

## État

Parties 1 à 3 complètes (chapitres 1 à 11). Les chapitres 12 à 14 apparaissent comme
« Bientôt disponible ».

## Mise en ligne sur GitHub Pages

Déposer le contenu de ce dossier à la racine d'un dépôt public, puis, dans Settings > Pages,
choisir « Deploy from a branch », branche `main`, dossier `/ (root)`.

## Modifier le contenu

Tout le contenu est dans `js/contenu.js` ; le format de chaque type d'étape est décrit en tête de
fichier. Ajouter les nouvelles étapes à la fin d'un chapitre. Avant de publier :

    cd tests && npm install pyodide && node verifier.js

## Suivi de classe

Dans sa page Profil, l'élève génère un « code pour mon professeur ». La page `prof.html`
(lien « Espace professeur ») transforme les codes collés en tableau de classe, avec export CSV.
